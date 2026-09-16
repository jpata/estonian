'use client';

import { useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';

const words = [
  { word: 'õun', image: './images/oun.webp', audio: './audio/oun.wav' },
  { word: 'tass', image: './images/tass.webp', audio: './audio/tass.wav' },
  { word: 'raamat', image: './images/raamat.webp', audio: './audio/raamat.wav' },
  { word: 'võti', image: './images/voti.webp', audio: './audio/voti.wav' },
  { word: 'tool', image: './images/tool.webp', audio: './audio/tool.wav' },
  { word: 'lamp', image: './images/lamp.webp', audio: './audio/lamp.wav' },
  { word: 'uks', image: './images/uks.webp', audio: './audio/uks.wav' },
  { word: 'aken', image: './images/aken.webp', audio: './audio/aken.wav' },
  { word: 'voodi', image: './images/voodi.webp', audio: './audio/voodi.wav' },
  { word: 'peegel', image: './images/peegel.webp', audio: './audio/peegel.wav' },
  { word: 'kell', image: './images/kell.webp', audio: './audio/kell.wav' },
  { word: 'telefon', image: './images/telefon.webp', audio: './audio/telefon.wav' },
  { word: 'arvuti', image: './images/arvuti.webp', audio: './audio/arvuti.wav' },
  { word: 'televiisor', image: './images/televiisor.webp', audio: './audio/televiisor.wav' },
  { word: 'kaamera', image: './images/kaamera.webp', audio: './audio/kaamera.wav' },
  { word: 'pliiats', image: './images/pliiats.webp', audio: './audio/pliiats.wav' },
  { word: 'pastakas', image: './images/pastakas.webp', audio: './audio/pastakas.wav' },
  { word: 'käärid', image: './images/kaarid.webp', audio: './audio/kaarid.wav' },
  { word: 'kott', image: './images/kott.webp', audio: './audio/kott.wav' },
  { word: 'king', image: './images/king.webp', audio: './audio/king.wav' },
  { word: 'müts', image: './images/muts.webp', audio: './audio/muts.wav' },
  { word: 'särk', image: './images/sark.webp', audio: './audio/sark.wav' },
  { word: 'püksid', image: './images/puksid.webp', audio: './audio/puksid.wav' },
  { word: 'sokk', image: './images/sokk.webp', audio: './audio/sokk.wav' },
  { word: 'lusikas', image: './images/lusikas.webp', audio: './audio/lusikas.wav' },
  { word: 'kahvel', image: './images/kahvel.webp', audio: './audio/kahvel.wav' },
  { word: 'nuga', image: './images/nuga.webp', audio: './audio/nuga.wav' },
  { word: 'taldrik', image: './images/taldrik.webp', audio: './audio/taldrik.wav' },
  { word: 'pudel', image: './images/pudel.webp', audio: './audio/pudel.wav' },
  { word: 'klaas', image: './images/klaas.webp', audio: './audio/klaas.wav' },
  { word: 'pann', image: './images/pann.webp', audio: './audio/pann.wav' },
  { word: 'pott', image: './images/pott.webp', audio: './audio/pott.wav' },
  { word: 'leib', image: './images/leib.webp', audio: './audio/leib.wav' },
  { word: 'piim', image: './images/piim.webp', audio: './audio/piim.wav' },
  { word: 'muna', image: './images/muna.webp', audio: './audio/muna.wav' },
  { word: 'juust', image: './images/juust.webp', audio: './audio/juust.wav' },
  { word: 'banaan', image: './images/banaan.webp', audio: './audio/banaan.wav' },
  { word: 'apelsin', image: './images/apelsin.webp', audio: './audio/apelsin.wav' },
  { word: 'porgand', image: './images/porgand.webp', audio: './audio/porgand.wav' },
  { word: 'tomat', image: './images/tomat.webp', audio: './audio/tomat.wav' },
  { word: 'kartul', image: './images/kartul.webp', audio: './audio/kartul.wav' },
  { word: 'auto', image: './images/auto.webp', audio: './audio/auto.wav' },
  { word: 'buss', image: './images/buss.webp', audio: './audio/buss.wav' },
  { word: 'jalgratas', image: './images/jalgratas.webp', audio: './audio/jalgratas.wav' },
  { word: 'rong', image: './images/rong.webp', audio: './audio/rong.wav' },
  { word: 'maja', image: './images/maja.webp', audio: './audio/maja.wav' },
  { word: 'puu', image: './images/puu.webp', audio: './audio/puu.wav' },
  { word: 'lill', image: './images/lill.webp', audio: './audio/lill.wav' },
  { word: 'koer', image: './images/koer.webp', audio: './audio/koer.wav' },
  { word: 'kass', image: './images/kass.webp', audio: './audio/kass.wav' },
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
          <div className="progress" aria-label={`${revealed.size} sõna viiekümnest avatud`}>
            <span className="progress-number">{revealed.size}</span>
            <span className="progress-total">/ {words.length} avatud</span>
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
                <img
                  src={item.image}
                  alt=""
                  width="720"
                  height="720"
                  draggable="false"
                  loading={index < 8 ? 'eager' : 'lazy'}
                />
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
