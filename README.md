# Sõnapilt

A mobile-friendly Estonian vocabulary app with 50 illustrated everyday objects. Tap an object to reveal its Estonian name and hear its pronunciation.

## Run locally

```bash
npm install
npm run dev
```

## Publish on GitHub Pages

Push the project to a GitHub repository using the `main` branch. In **Settings → Pages**, choose **GitHub Actions** as the source. The included workflow builds and publishes the static site automatically.

The speech files in `public/audio` were generated in one sentence-chunked request with the [Jutusta text-to-speech API](https://jutusta.ee/arendajatele#tag/text-to-speech), then split locally with `scripts/split_tts.py`. The API key is used only at generation time and is not part of the site.
