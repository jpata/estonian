#!/usr/bin/env python3
"""Split one sentence-chunked WAV into a fixed number of locally trimmed clips."""

from __future__ import annotations

import argparse
import re
import subprocess
from pathlib import Path


SILENCE_RE = re.compile(
    r"silence_start: (?P<start>[0-9.]+).*?"
    r"silence_end: (?P<end>[0-9.]+) \| silence_duration: (?P<duration>[0-9.]+)",
    re.S,
)


def command_output(*args: str) -> str:
    return subprocess.run(args, check=True, text=True, capture_output=True).stdout


def duration(path: Path) -> float:
    return float(
        command_output(
            "ffprobe",
            "-v",
            "error",
            "-show_entries",
            "format=duration",
            "-of",
            "csv=p=0",
            str(path),
        ).strip()
    )


def silence_intervals(path: Path, total: float) -> list[tuple[float, float, float]]:
    result = subprocess.run(
        [
            "ffmpeg",
            "-hide_banner",
            "-i",
            str(path),
            "-af",
            "silencedetect=noise=-36dB:d=0.08",
            "-f",
            "null",
            "-",
        ],
        check=True,
        text=True,
        capture_output=True,
    )
    intervals = []
    for match in SILENCE_RE.finditer(result.stderr):
        start = float(match.group("start"))
        end = float(match.group("end"))
        length = float(match.group("duration"))
        if start > 0.02 and end < total - 0.02:
            intervals.append((start, end, length))
    return intervals


def choose_boundaries(
    candidates: list[tuple[float, float, float]], total: float, count: int
) -> list[tuple[float, float, float]]:
    """Select pauses that make `count` natural, similarly sized spoken segments."""
    needed = count - 1
    target = total / count
    midpoint = [(start + end) / 2 for start, end, _ in candidates]
    states: dict[tuple[int, int], tuple[float, list[int]]] = {}

    def segment_score(span: float) -> float:
        if span < target * 0.43 or span > target * 1.72:
            return float("-inf")
        return -((span - target) / (target * 0.42)) ** 2

    for index, (_, _, pause) in enumerate(candidates):
        score = segment_score(midpoint[index])
        if score != float("-inf"):
            states[(1, index)] = (score + pause * 4.0, [index])

    for used in range(2, needed + 1):
        next_states: dict[tuple[int, int], tuple[float, list[int]]] = {}
        for index, (_, _, pause) in enumerate(candidates):
            best: tuple[float, list[int]] | None = None
            for previous in range(index):
                prior = states.get((used - 1, previous))
                if prior is None:
                    continue
                score = segment_score(midpoint[index] - midpoint[previous])
                if score == float("-inf"):
                    continue
                candidate = (prior[0] + score + pause * 4.0, prior[1] + [index])
                if best is None or candidate[0] > best[0]:
                    best = candidate
            if best is not None:
                next_states[(used, index)] = best
        states.update(next_states)

    best_path: tuple[float, list[int]] | None = None
    for index in range(len(candidates)):
        state = states.get((needed, index))
        if state is None:
            continue
        final_score = segment_score(total - midpoint[index])
        if final_score == float("-inf"):
            continue
        completed = (state[0] + final_score, state[1])
        if best_path is None or completed[0] > best_path[0]:
            best_path = completed

    if best_path is None:
        raise RuntimeError("Could not find a valid set of word boundaries")
    return [candidates[index] for index in best_path[1]]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("words", nargs="+")
    args = parser.parse_args()

    total = duration(args.source)
    candidates = silence_intervals(args.source, total)
    boundaries = choose_boundaries(candidates, total, len(args.words))
    args.output.mkdir(parents=True, exist_ok=True)

    for index, word in enumerate(args.words):
        start = 0.04 if index == 0 else max(0, boundaries[index - 1][1] - 0.05)
        end = total - 0.04 if index == len(args.words) - 1 else boundaries[index][0] + 0.05
        subprocess.run(
            [
                "ffmpeg",
                "-hide_banner",
                "-loglevel",
                "error",
                "-y",
                "-ss",
                f"{start:.6f}",
                "-to",
                f"{end:.6f}",
                "-i",
                str(args.source),
                "-c:a",
                "pcm_s16le",
                str(args.output / f"{word}.wav"),
            ],
            check=True,
        )
        print(f"{index + 1:02d} {word:12s} {end - start:.3f}s")


if __name__ == "__main__":
    main()
