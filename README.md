# Neuro Reset Console (Next.js)

Mood cards, per-mood geometric patterns, breathing guide, binaural tone, and a **hypothetical** brain-region illustration.

## Run
```bash
npm install
npm run dev      # http://localhost:3000
```
Deploy: push to GitHub and import into Vercel.

## Structure
- `lib/moods.js`  moods, frequencies, surahs, pattern presets
- `lib/scene.js`  pattern engine (layers, rotation styles)
- `lib/audio.js`  opening tone + binaural beat
- `components/BrainMap.js`  illustration only, not a measurement
- `components/Console.js`  UI and session screen

## Next steps
1. Quran recitation: stream from the Quran.com API or a CDN (check access terms and each reciter's licence), add reciter picker, looping, ayah-by-ayah text, tone/Quran mixer.
2. Sunnah tab with graded duas and hadith.
3. Optional real EEG feedback (Muse over Web Bluetooth).
4. Have surah pairings and notes reviewed by a qualified teacher.
