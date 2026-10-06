# Sankhya · सांख्य

A daily mirror in four dimensions. Built on Harish Johari's *Numerology with Tantra,
Ayurveda, and Astrology* (Destiny Books, 1990), joined to the live sky.

| Dimension | From | Reads |
|---|---|---|
| **Psyche** | day of birth, reduced | how you see yourself; leads until ~35 |
| **Destiny** | every digit of the birth date | how the world meets you; grows after 35 |
| **Name** | letters of the name you're known by (book's table) | social life; the one you can change |
| **Time** | date, weekday, planetary hour, Moon, year | the moving dimension, read fresh each day |

## Pages

- **Today**: the day against your numbers, a tesseract instrument ringed by the real
  sidereal Sun and Moon, Panchanga (tithi, nakshatra, yoga), planetary hours (hora) on a
  24-hour dial, Rahu Kala, the Maya 260-day count, a question and a journal entry.
- **Your numbers**: the four numbers with compounds and exaltations, age-weighted balance,
  inner harmony, portraits, name lab (book / Chaldean / Pythagorean), Vedic Square overlay,
  Lo Shu birth grid, your yantra, the book's correspondences, birth sky.
- **Cycles**: the book's year projection as a 10-year path; a month calendar.
- **Others**: compare like with like, both directions.
- **Journal**: energy, one word, a guessed number; patterns appear after 7 entries.
- **Method**: the mathematics under it (mod 9, the yantra series, the weekday heptagram,
  Fibonacci's 24-cycle, 13 × 20 = 260) and sources.

Everything runs in the browser. Personal data lives in `localStorage` only; the Journal
page has copy/download/restore backup.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static site in dist/
npm run check      # engine checks against the book's worked example and known sky events
npm run typecheck
```

Deploys as a static site (Vercel: framework "Vite", output `dist`).

## Code

- `src/lib/num.ts`: reduction, psychic/destiny/name, year projection, Vedic Square, Lo Shu, yantras
- `src/lib/astro.ts`: Sun & Moon (Meeus, truncated), Lahiri ayanamsa, sunrise, horas, Rahu Kala, Tzolk'in
- `src/data/numbers.ts`: the book's tables as data; all descriptive text rewritten
- `src/components/viz.tsx`: tesseract, Vedic Square, hora dial, method figures
- `src/views/*`: one file per page

Gem-powder ingestion and medical remedies in the book are deliberately left out.
