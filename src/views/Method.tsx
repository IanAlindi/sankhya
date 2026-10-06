import { useState } from 'react';
import { NINE, vedicCells, yantra, yantraConstant, type N } from '../lib/num';
import { NUM } from '../data/numbers';
import { SectionHead } from '../components/bits';
import { VedicSquare, YantraGrid, Heptagram, NineCircle, FibRing, pc } from '../components/viz';

export function Method() {
  const [layers, setLayers] = useState<N[]>([1, 8]);
  const order: N[] = [1, 2, 9, 5, 3, 6, 8, 4, 7];
  return (
    <>
      <section className="section" style={{ paddingTop: 40 }}>
        <SectionHead eyebrow="Method" title="Four dimensions of a person" />
        <div className="cols">
          <div className="prose">
            <p className="lead">Harish Johari reads a person through three numbers. This site adds the one that moves.</p>
            <p><b>Psyche</b> is the day of the month you were born, reduced to one digit. It is how you see yourself, and it dominates until your mid-thirties.</p>
            <p><b>Destiny</b> is every digit of your birth date added and reduced. It is how the world meets you, tied in the book to past action, and it grows stronger after 35.</p>
            <p><b>Name</b> is the letters of the name you are known by. It shapes your social life, and it is the only one of the three you can change.</p>
            <p><b>Time</b> is the date, the weekday, the hour, the Moon and the year. Each day it meets the other three in a new arrangement, which is what the Today page reads.</p>
          </div>
          <div className="prose">
            <p>The instrument at the top of Today is a tesseract, the four-dimensional cube. It has 16 corners (each a choice of plus or minus on four axes, 2⁴), 32 edges, 24 square faces and 8 cubic cells.</p>
            <p>In four dimensions a body turns in a plane, not around an axis, and there are six planes. The cube turns in the planes that run into the fourth axis, each at a speed set by one of your numbers, and its edges along each axis take that number's colour. It is then projected twice, four dimensions to three to two, much as a cube's shadow falls on a wall.</p>
            <p className="muted">Its ring is the real sky for the moment shown: twelve signs, twenty-seven lunar mansions, the Sun, the Moon, and between them the arc that measures the lunar day.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHead eyebrow="Worked example" title="The author's own numbers">
          The book demonstrates every method on Harish Johari, born 12 May 1934. The site reproduces each result exactly.
        </SectionHead>
        <dl className="register">
          <div><dt>Psyche</dt><dd>Day 12 → 1 + 2 = <b>3</b>, Jupiter. Reached from 12, so exalted.</dd></div>
          <div><dt>Destiny</dt><dd>5 + 1 + 2 + 1 + 9 + 3 + 4 = 25 → <b>7</b>, Ketu. Also exalted, from 25.</dd></div>
          <div><dt>Name</dt><dd className="mono small">H8 A1 R2 I1 S3 H8 = 23 · J1 O7 H8 A1 R2 I1 = 20 · 23 + 20 = 43 → <b>7</b></dd></div>
          <div><dt>Year 1991</dt><dd>5 (May) + 12 + 91 + 1 (12 May 1991 was a Sunday) = 109 → <b>1</b>, a Sun year.</dd></div>
          <div><dt>The shortcut</dt><dd>Strike out every 9, and any digits that add to 9, before adding. In 5 1 2 1 9 3 4, the 9 and the pair 5 + 4 drop out, leaving 1 + 2 + 1 + 3 = 7.</dd></div>
        </dl>
      </section>

      <section className="section">
        <SectionHead eyebrow="Nine" title="Why nine behaves as it does">
          Reducing a number to one digit is arithmetic modulo 9: 43 becomes 7 because 43 = 4 × 9 + 7. Book-keepers called it casting out nines and used it to check sums by hand for centuries.
        </SectionHead>
        <div className="cols">
          <figure className="figure" style={{ margin: 0 }}>
            <div className="toggles" role="group" aria-label="Patterns to draw">
              {NINE.map((n) => (
                <button key={n} style={pc(n)} aria-pressed={layers.includes(n)} onClick={() => setLayers(layers.includes(n) ? layers.filter((x) => x !== n) : [...layers, n])}>
                  <i />{n} · {vedicCells(n).length}
                </button>
              ))}
            </div>
            <VedicSquare layers={layers} />
            <figcaption>Each button shows how many of the 81 cells a number fills. Try 1 with 8, 2 with 7, 3 with 6, 4 with 5.</figcaption>
          </figure>
          <div className="prose">
            <p>The Vedic Square is the multiplication table in this arithmetic. Six numbers, 1, 2, 4, 5, 7 and 8, share no factor with 9; each appears exactly six times. 3 and 6 share the factor 3 and appear twelve times. 9 behaves as zero and fills twenty-one cells. These are the counts the book reports; this is why they come out that way.</p>
            <p>The book's "play of opposites" pairs 1 with 8, 2 with 7, 3 with 6 and 4 with 5. Since i × (9 − j) = 9i − ij, the pattern of 9 − n is the pattern of n reflected left to right. Turn on a pair and the mirror appears.</p>
            <NineCircle />
            <p>Keep doubling from 1: 2, 4, 8, 16 → 7, 32 → 5, 64 → 1. The doubling visits exactly the six numbers that appear six times, and never touches 3, 6 or 9, which close a triangle of their own.</p>
            <p className="muted">The site takes its name from Sāṅkhya, the school of enumeration the book draws on: Prakriti, nature, is eightfold (three gunas and five elements), and Purusha, consciousness, is the ninth, the number that adding cannot change.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHead eyebrow="Yantras" title="One square, nine planets">
          Every planetary square in the book is the same 3 × 3 magic square with a constant added to each cell.
        </SectionHead>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 24 }}>
          {order.map((n) => (
            <figure key={n} className="figure" style={{ margin: 0 }}>
              <YantraGrid n={n} cells={yantra(n)} />
              <figcaption><b style={pc(n)} className="pc">{NUM[n].planet}</b> · every line sums to {yantraConstant(n)}</figcaption>
            </figure>
          ))}
        </div>
        <div className="prose">
          <p>Sun adds 0 (lines sum to 15), Moon 1 (18), Mars 2 (21), Mercury 3 (24), Jupiter 4 (27), Venus 5 (30), then Rahu 7 (36) and Ketu 8 (39). The steps follow the order of the weekdays. Adding k to all nine cells adds 3k to every row, column and diagonal, so the square stays magic.</p>
          <p>The gap at 6 belongs to Saturn. The book prints Saturn's square as the plain Lo Shu, 4 9 2 / 3 5 7 / 8 1 6, which is also the "table of Saturn" in Cornelius Agrippa's <i>Three Books of Occult Philosophy</i> (1533). In the usual Indian set Saturn takes the +6 square, summing to 33, which completes the series. The Lo Shu itself comes from Chinese legend: a pattern on the shell of a turtle rising from the Luo river.</p>
        </div>
      </section>

      <section className="section">
        <SectionHead eyebrow="Time" title="Where the week, the hours and the calendars come from" />
        <div className="cols">
          <figure className="figure" style={{ margin: 0 }}>
            <Heptagram />
            <figcaption>The seven classical planets in order of speed. Follow the star and you read Sunday through Saturday.</figcaption>
          </figure>
          <div className="prose">
            <p>Hellenistic astronomers ordered the seven visible planets from slowest to fastest: Saturn, Jupiter, Mars, Sun, Venus, Mercury, Moon. Each hour went to the next in line, and the planet of a day's first hour named the day. Twenty-four hours later the count has moved 24 = 3 × 7 + 3 places, so each day begins three steps on. That jump traces a seven-pointed star and spells the week. India took up the same scheme as the horā, which is what the Hours dial shows.</p>
            <p>The Indian almanac, the Panchāṅga, has five limbs. The <b>vāra</b> is the weekday. A <b>tithi</b> is the time the Moon takes to gain 12° on the Sun; thirty make a lunar month, which is why some days hold two and others none. A <b>nakshatra</b> is 13°20′ of the sky, one twenty-seventh of the circle. A <b>yoga</b> comes from adding the Sun's and Moon's longitudes. (The fifth, karaṇa, is half a tithi.) These are measured on the sidereal zodiac, which here subtracts the Lahiri ayanamsa, about 24° today: the drift of the equinox since the two zodiacs agreed around 285 CE.</p>
          </div>
        </div>
        <div className="cols">
          <figure className="figure" style={{ margin: 0 }}>
            <FibRing />
            <figcaption>Each term the sum of the two before, reduced. The cycle closes after 24 terms.</figcaption>
          </figure>
          <div className="prose">
            <p>The sequence 1, 1, 2, 3, 5, 8, 13 was worked out by Indian scholars counting the rhythms of verse, Virahāṅka around 700 CE and Hemachandra around 1150, before Fibonacci published it in 1202. Reduced to single digits it repeats every 24 terms, and any two digits twelve places apart add to 9 (the two 9s apart): the same mirror the Vedic Square shows.</p>
            <p>The Maya 260-day count interlocks thirteen numbers with twenty day signs. Thirteen and twenty share no factor, so every pairing occurs exactly once before the cycle repeats, after 13 × 20 = 260 days. The site uses the traditional count with the standard GMT correlation (Long Count zero = Julian day 584,283), not the 1987 "Dreamspell" calendar.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHead eyebrow="Sources and care" title="What this is, and what it is not" />
        <div className="cols">
          <div className="prose">
            <p>Number tables, correspondences, periods and dates follow Harish Johari, <i>Numerology with Tantra, Ayurveda, and Astrology</i> (Destiny Books, 1990). Every description is rewritten here in plain words. Where the book contradicts itself, as with periods marked both strong and weak, the site says so.</p>
            <p>The book gives two kinds of relationship between numbers: a planetary table of friends, enemies and neutrals, and a summary of how each number behaves toward each other. They do not always agree, so a date can read "helpful, friendly" while carrying a Friction tag. Both are shown as the book has them.</p>
            <p>Sun and Moon follow Jean Meeus, <i>Astronomical Algorithms</i> (1998), truncated to arcminute accuracy; the Moon's mansion near a boundary can differ from a printed almanac by a few minutes. Vedic Square patterns follow Keith Critchlow, <i>Islamic Patterns</i> (1976), which the book cites.</p>
          </div>
          <div className="prose">
            <p>The book also prescribes powdered gems taken by mouth, fasts and other remedies. The ingestion remedies are left out: mineral powders can be harmful, and nothing here is medical advice. Colours, mantras, days and stones are offered as aids to attention.</p>
            <p>Johari asks readers not to accept his numbers blindly but to watch real people and form their own language, and never to use numerology to gain power over others. The Journal exists for that first instruction. Read your numbers as a mirror, not a sentence.</p>
          </div>
        </div>
      </section>
    </>
  );
}
