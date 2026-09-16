'use client';

import { useRef, useState } from 'react';
import { RotateCcw, Volume2 } from 'lucide-react';

const words = [
  { word: 'õun', image: './images/oun.webp', audio: './audio/oun.wav', color: 'coral' },
  { word: 'tass', image: './images/tass.webp', audio: './audio/tass.wav', color: 'blue' },
  { word: 'raamat', image: './images/raamat.webp', audio: './audio/raamat.wav', color: 'yellow' },
  { word: 'võti', image: './images/voti.webp', audio: './audio/voti.wav', color: 'gold' },
] as const;

export default function Home() {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [playing, setPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const revealAndPlay = (word: (typeof words)[number]) => {
    setRevealed((current) => new Set(current).add(word.word));
    audioRef.current?.pause();
    const audio = new Audio(word.audio);
    audioRef.current = audio;
    setPlaying(word.word);
    audio.addEventListener('ended', () => setPlaying(null), { once: true });
    audio.addEventListener('error', () => setPlaying(null), { once: true });
    void audio.play().catch(() => setPlaying(null));
  };

  const reset = () => {
    audioRef.current?.pause();
    setPlaying(null);
    setRevealed(new Set());
  };

  return (
    <main className="page-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Sõnapilt avaleht">
          <span className="brand-mark" aria-hidden="true">S</span>
          <span>Sõnapilt</span>
        </a>
        <span className="lesson-label">Igapäevased asjad</span>
      </header>

      <section className="intro" id="top">
        <p className="eyebrow">Eesti keele tund · 01</p>
        <div className="intro-row">
          <div>
            <h1>Mis on pildil?</h1>
            <p>Puuduta pilti, et näha ja kuulda eestikeelset sõna.</p>
          </div>
          <div className="progress" aria-label={`${revealed.size} sõna neljast avatud`}>
            <span className="progress-number">{revealed.size}</span>
            <span className="progress-total">/ 4 avatud</span>
          </div>
        </div>
      </section>

      <section className="word-grid" aria-label="Sõnakaardid">
        {words.map((item, index) => {
          const isRevealed = revealed.has(item.word);
          const isPlaying = playing === item.word;

          return (
            <article className={`word-card ${isRevealed ? 'is-revealed' : ''}`} key={item.word}>
              <button
                className={`picture-button color-${item.color}`}
                type="button"
                onClick={() => revealAndPlay(item)}
                aria-label={`${isRevealed ? 'Kuula uuesti' : 'Ava sõna'}: kaart ${index + 1}`}
                aria-pressed={isRevealed}
              >
                {/* The source assets are pre-sized WebP files, so native img keeps this fully static. */}
                {/* oxlint-disable-next-line next/no-img-element */}
                <img src={item.image} alt="" width="720" height="720" draggable="false" />
                <span className={`sound-badge ${isPlaying ? 'is-playing' : ''}`} aria-hidden="true">
                  <Volume2 size={18} strokeWidth={2.2} />
                </span>
              </button>

              <div className="answer" aria-live="polite">
                {isRevealed ? (
                  <button type="button" onClick={() => revealAndPlay(item)} className="word-button">
                    <span>{item.word}</span>
                    <Volume2 size={18} aria-hidden="true" />
                  </button>
                ) : (
                  <span className="hidden-word" aria-label="Sõna on peidetud">
                    <i /><i /><i />
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </section>

      <footer className="page-footer">
        <p>{revealed.size === words.length ? 'Tubli! Kõik sõnad on avatud.' : 'Iga pilt peidab üht sõna.'}</p>
        <button type="button" onClick={reset} disabled={revealed.size === 0}>
          <RotateCcw size={16} aria-hidden="true" />
          Alusta uuesti
        </button>
      </footer>
    </main>
  );
}
