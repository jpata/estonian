'use client';

import { useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';

const words = [
  { word: 'õun', image: './images/oun.webp', audio: './audio/oun.wav' },
  { word: 'tass', image: './images/tass.webp', audio: './audio/tass.wav' },
  { word: 'raamat', image: './images/raamat.webp', audio: './audio/raamat.wav' },
  { word: 'võti', image: './images/voti.webp', audio: './audio/voti.wav' },
] as const;

export default function Home() {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const revealAndPlay = (word: (typeof words)[number]) => {
    setRevealed((current) => new Set(current).add(word.word));
    audioRef.current?.pause();
    const audio = new Audio(word.audio);
    audioRef.current = audio;
    void audio.play().catch(() => undefined);
  };

  const reset = () => {
    audioRef.current?.pause();
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

          return (
            <article className={`word-card ${isRevealed ? 'is-revealed' : ''}`} key={item.word}>
              <button
                className="picture-button"
                type="button"
                onClick={() => revealAndPlay(item)}
                aria-label={`${isRevealed ? 'Kuula uuesti' : 'Ava sõna'}: kaart ${index + 1}`}
                aria-pressed={isRevealed}
              >
                {/* The source assets are pre-sized WebP files, so native img keeps this fully static. */}
                {/* oxlint-disable-next-line next/no-img-element */}
                <img src={item.image} alt="" width="720" height="720" draggable="false" />
              </button>

              <div className="answer" aria-live="polite">
                {isRevealed && (
                  <button
                    type="button"
                    onClick={() => revealAndPlay(item)}
                    className="word-button"
                    aria-label={`Kuula uuesti: ${item.word}`}
                  >
                    {item.word}
                  </button>
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
