// Practical alchemy after Robert Allen Bartlett, "Real Alchemy: A Primer of Practical Alchemy"
// (Quinquangle Press, 2006), taken as the book gives it: every process, quantity, temperature,
// claim and warning. Bartlett's prose is restated in fresh words; quotations are from public-domain
// sources. The chapters themselves live in book.ts.
import type { N } from '../lib/num';

export type Essential = 'salt' | 'sulfur' | 'mercury';
export type ElementK = 'fire' | 'air' | 'water' | 'earth';
export type Tier = 'easy' | 'skill' | 'danger';
export type MetalKey = 'gold' | 'silver' | 'quicksilver' | 'copper' | 'iron' | 'tin' | 'lead' | 'antimony' | 'shadow';

/** Difficulty as the book itself grades it. */
export const TIER: Record<Tier, { label: string; icon: string; long: string }> = {
  easy: { label: 'Beginner · household things', icon: '✓', long: 'The book counts this among the beginning works anyone can do with household materials.' },
  skill: { label: 'Laboratory skill', icon: '!', long: 'The book expects a still, steady fire and some laboratory skill here.' },
  danger: { label: 'The book warns: dangerous', icon: '✕', long: 'The book warns that mineral works are deadly without developed skill and precaution. Know the theory first, then the practice.' },
};

// --- The three essentials and the four elements --------------------------------------------------

export const ESSENTIALS: Record<Essential, { name: string; aspect: string; from: string; nature: string; plant: string; you: string }> = {
  sulfur: {
    name: 'Sulfur', aspect: 'Soul', from: 'Fire acting on Air',
    nature: 'Consciousness and character: the fiery spark that makes a thing itself, its "true colours".',
    plant: 'The essential oil: the scent and colour of the plant.',
    you: 'Your awareness and your will.',
  },
  mercury: {
    name: 'Mercury', aspect: 'Spirit', from: 'Air acting on Water',
    nature: 'Life force, the messenger between the volatile and the fixed, between soul and body. Prana, chi.',
    plant: 'The alcohol distilled after fermentation, which is why we still call liquor "spirits".',
    you: 'Your vitality and your breath.',
  },
  salt: {
    name: 'Salt', aspect: 'Body', from: 'Water acting on Earth',
    nature: 'Fixity and focus: the vessel that lets the other two act. Passive, receptive, the "virgin earth".',
    plant: 'The white crystalline salt washed out of the plant\'s ash.',
    you: 'Your body and the habits that hold your shape.',
  },
};

export const ELEMENTS: Record<ElementK, { name: string; qualities: string; nature: string; mind: string; side: string }> = {
  fire: { name: 'Fire', qualities: 'Hot and dry', nature: 'Radiance, expansion, warmth, light.', mind: 'The superconscious', side: 'Volatile, the most active' },
  air: { name: 'Air', qualities: 'Hot and wet', nature: 'Penetrating, diffuse, always moving.', mind: 'The self-conscious, thinking mind', side: 'Volatile' },
  water: { name: 'Water', qualities: 'Cold and wet', nature: 'Cooling, contracting, changeable.', mind: 'The subconscious', side: 'Fixed, the more active of the two' },
  earth: { name: 'Earth', qualities: 'Cold and dry', nature: 'Stability, rest, strength, solidity.', mind: 'The physical body', side: 'Fixed, the most at rest' },
};


// --- The twelve operations of the zodiac (Bartlett, ch. 5) ---------------------------------------

export interface Operation {
  sign: string; glyph: string; planet: string; pol: '+' | '−' | '±'; el: ElementK;
  mode: 'Cardinal' | 'Fixed' | 'Mutable'; name: string; what: string; why: string; inner: string; prompt: string;
}

export const OPERATIONS: Operation[] = [
  { sign: 'Aries', glyph: '♈', planet: 'Mars', pol: '+', el: 'fire', mode: 'Cardinal', name: 'Digestion',
    what: 'Matter held at a low, steady warmth for days or months, like an egg under a hen.',
    why: 'To let a mixture ripen and react at its own pace. The tradition calls the whole Art a controlled digestion.',
    inner: 'Let an experience settle in you before you act on it. Warmth and patience, not force.',
    prompt: 'What in your life needs warmth and time rather than more effort?' },
  { sign: 'Taurus', glyph: '♉', planet: 'Venus', pol: '−', el: 'earth', mode: 'Fixed', name: 'Fixation',
    what: 'Binding a volatile thing so it stays: a spirit made to hold in a body, so heat no longer drives it off.',
    why: 'To make a gain permanent. What has been raised up is anchored so it cannot fly away.',
    inner: 'Turn an insight into a habit. A realisation that is never fixed evaporates by the weekend.',
    prompt: 'Which recent insight have you not yet turned into something you do?' },
  { sign: 'Gemini', glyph: '♊', planet: 'Mercury', pol: '+', el: 'air', mode: 'Mutable', name: 'Distillation',
    what: 'Heat lifts the finer part of a liquid as vapour; cold returns it as purer drops.',
    why: 'To separate and refine. Each pass is read as a small death, a journey through the invisible and a rebirth.',
    inner: 'Step back, look from above, come back clearer. Rise out of a feeling and return with its essence.',
    prompt: 'Boil a worry down: what is the one true sentence inside it?' },
  { sign: 'Cancer', glyph: '♋', planet: 'Moon', pol: '±', el: 'water', mode: 'Cardinal', name: 'Separation',
    what: 'Dividing a thing into its parts, and the pure from the impure: oil from water, extract from residue.',
    why: 'You cannot cleanse what you have not taken apart. Each part needs its own kind of purification.',
    inner: 'Discernment. Sort what is truly yours from what you have absorbed from others.',
    prompt: 'Whose voice in your head today is not your own?' },
  { sign: 'Leo', glyph: '♌', planet: 'Sun', pol: '±', el: 'fire', mode: 'Fixed', name: 'Calcination',
    what: 'Fire burns a body down to pale ash, driving off everything volatile and leaving the mineral core.',
    why: 'To reveal the Salt, the true body, by removing what only protected it.',
    inner: 'Bartlett\'s own example: burn away the masks and defences that once kept you safe but now tie up your energy.',
    prompt: 'Which protective habit has outlived its purpose?' },
  { sign: 'Virgo', glyph: '♍', planet: 'Mercury', pol: '−', el: 'earth', mode: 'Mutable', name: 'Congelation',
    what: 'A liquid thickened until it sets: a solution coagulating into a solid, a vapour into crystals.',
    why: 'To give a refined essence a body it can live in.',
    inner: 'Give an idea a form: write it down, schedule it, build its first small piece.',
    prompt: 'What idea could you give a body to today?' },
  { sign: 'Libra', glyph: '♎', planet: 'Venus', pol: '+', el: 'air', mode: 'Cardinal', name: 'Sublimation',
    what: 'A solid that passes straight to vapour and settles again as crystals on a cool surface, finer than before.',
    why: 'To lift and purify a solid without melting it. The subtle rises, the dross stays below.',
    inner: 'Raise a heavy feeling to a wider view without drowning in it.',
    prompt: 'How would the wisest version of you see today\'s heaviest thing?' },
  { sign: 'Scorpio', glyph: '♏', planet: 'Mars', pol: '−', el: 'water', mode: 'Fixed', name: 'Dissolution',
    what: 'A hard body dissolved in a liquid until it disappears into it.',
    why: 'To open a closed body. In the tradition, subtle virtues pass from one thing to another only in the liquid state.',
    inner: 'Let rigid structures soften. Feel instead of holding firm.',
    prompt: 'Where would softening serve you better than holding on?' },
  { sign: 'Sagittarius', glyph: '♐', planet: 'Jupiter', pol: '+', el: 'fire', mode: 'Mutable', name: 'Incineration',
    what: 'Burning to ash at fierce heat, more completely than calcination.',
    why: 'To reduce a thing to what fire cannot destroy. Frater Albertus taught that the essential survives the fire and is only purified by it.',
    inner: 'Let something end completely, without keeping a smouldering corner.',
    prompt: 'What is ready to be fully over?' },
  { sign: 'Capricorn', glyph: '♑', planet: 'Saturn', pol: '−', el: 'earth', mode: 'Cardinal', name: 'Fermentation',
    what: 'Decay that releases new life: the plant dies and its spirit passes into the liquid as alcohol, then vinegar.',
    why: 'To free the life force from the body so it can be captured.',
    inner: 'The dark, rotting stretch that feeds what comes next. Inspiration often grows out of what has broken down.',
    prompt: 'What is breaking down in your life, and what might it feed?' },
  { sign: 'Aquarius', glyph: '♒', planet: 'Saturn', pol: '+', el: 'air', mode: 'Fixed', name: 'Multiplication',
    what: 'Repeating a finished work with fresh material so its quantity, or its power, grows.',
    why: 'Each turn is said to increase the Stone\'s strength tenfold.',
    inner: 'Repeat what works and share it. Good things multiply in use.',
    prompt: 'What good thing could you do again, on purpose?' },
  { sign: 'Pisces', glyph: '♓', planet: 'Jupiter', pol: '−', el: 'water', mode: 'Mutable', name: 'Projection',
    what: 'Casting the finished Stone onto molten base metal: the last act of the Work.',
    why: 'The proof. A real change is one that changes other things.',
    inner: 'Carry your inner work out into the world.',
    prompt: 'Where could the change in you reach someone else today?' },
];

export const opIndex = (longitude: number) => Math.floor((((longitude % 360) + 360) % 360) / 30) % 12;

/** In the sevenfold distillation each element's thirds take its signs: Sulfur the cardinal,
 *  Mercury the mutable, Salt the fixed (Bartlett gives Fire: Aries, Sagittarius, Leo). */
export function fraction(el: ElementK, ess: Essential) {
  const mode = ess === 'sulfur' ? 'Cardinal' : ess === 'mercury' ? 'Mutable' : 'Fixed';
  return OPERATIONS.find((o) => o.el === el && o.mode === mode)!;
}

// --- The seven planets, their metals and herbs ------------------------------------------------

export interface Planet7 {
  n: N; planet: string; glyph: string; metal: string; metalKey: MetalKey; organ: string; weekday: number;
  sephira: string; sephiraEn: string; herbs: string[]; quality: string;
}

/** Herbs: the book's appendix (after Culpeper's Complete Herbal), in full.
 *  Qualities: the mental effects the book reports for each metal's oil. */
export const PLANETS7: Planet7[] = [
  { n: 1, planet: 'Sun', glyph: '☉', metal: 'Gold', metalKey: 'gold', organ: 'Heart', weekday: 0, sephira: 'Tiphareth', sephiraEn: 'Beauty', herbs: ['angelica', 'bay', 'chamomile', 'celandine', 'eyebright', 'juniper', 'marigold', 'rosemary', 'rue', 'saffron', "St. John's wort", 'sundew', 'walnut'], quality: 'will, ambition, courage, vitality, creativity' },
  { n: 2, planet: 'Moon', glyph: '☽', metal: 'Silver', metalKey: 'silver', organ: 'Brain', weekday: 1, sephira: 'Yesod', sephiraEn: 'Foundation', herbs: ['chickweed', 'cleavers', 'watercress', 'cucumber', 'lettuce', 'water-lily', 'moonwort', 'wallflower', 'willow'], quality: 'dreams, the hidden past, imagination, psychic sensitivity' },
  { n: 9, planet: 'Mars', glyph: '♂', metal: 'Iron', metalKey: 'iron', organ: 'Gall', weekday: 2, sephira: 'Geburah', sephiraEn: 'Severity', herbs: ['all-heal', 'barberry', 'basil', 'garlic', 'gentian', 'hawthorn', 'hops', 'nettle', 'onion', 'radish', 'rhubarb', 'tobacco', 'wormwood'], quality: 'natural instincts, energy' },
  { n: 5, planet: 'Mercury', glyph: '☿', metal: 'Quicksilver', metalKey: 'quicksilver', organ: 'Lungs', weekday: 3, sephira: 'Hod', sephiraEn: 'Splendour', herbs: ['wild carrot', 'caraway', 'dill', 'hazelnut', 'horehound', 'lavender', 'lily', 'liquorice', 'marjoram', 'oats', 'parsley', 'parsnip', 'savory', 'honeysuckle', 'valerian'], quality: 'sensory awareness, quick perception, speech' },
  { n: 3, planet: 'Jupiter', glyph: '♃', metal: 'Tin', metalKey: 'tin', organ: 'Liver', weekday: 4, sephira: 'Chesed', sephiraEn: 'Mercy', herbs: ['melissa', 'bilberry', 'borage', 'chervil', 'cinquefoil', 'dandelion', 'dock', 'endive', 'hyssop', 'house-leek', 'melilot', 'oak', 'roses'], quality: 'growth and wealth, jovial light-heartedness' },
  { n: 6, planet: 'Venus', glyph: '♀', metal: 'Copper', metalKey: 'copper', organ: 'Kidneys', weekday: 5, sephira: 'Netzach', sephiraEn: 'Victory', herbs: ['burdock', 'columbine', 'coltsfoot', 'daisy', 'eringo', 'featherfew', 'figwort', 'goldenrod', 'marshmallow', 'mint', 'mother-wort', 'mugwort', 'catnip', 'pennyroyal', 'plantain', 'periwinkle', 'poppy', 'purslane', 'primrose', 'strawberry', 'yarrow'], quality: 'psychic sensitivity, attraction' },
  { n: 8, planet: 'Saturn', glyph: '♄', metal: 'Lead', metalKey: 'lead', organ: 'Spleen', weekday: 6, sephira: 'Binah', sephiraEn: 'Understanding', herbs: ['amaranthus', 'barley', 'corn', 'beet', 'comfrey', 'dodder', 'elm', 'fumitory', 'horsetail', 'holly', 'ivy', 'mullein', 'nightshade', "shepherd's-purse", 'blackthorn', 'woad', 'wintergreen', 'yew'], quality: 'steadiness, patience, tolerance' },
];
export const P7: Partial<Record<N, Planet7>> = Object.fromEntries(PLANETS7.map((p) => [p.n, p]));

export const METAL_BG: Record<MetalKey, string> = {
  gold: 'radial-gradient(circle at 30% 25%, #fff6cf 0, #f3cf6a 24%, #c48c22 60%, #6e4a0e 100%)',
  silver: 'radial-gradient(circle at 30% 25%, #ffffff 0, #e6eaf0 24%, #a9b1bc 60%, #5d6571 100%)',
  quicksilver: 'radial-gradient(circle at 32% 22%, #ffffff 0, #eef3f9 14%, #8f9caa 48%, #3a414c 100%)',
  copper: 'radial-gradient(circle at 30% 25%, #ffe2cc 0, #e99b63 24%, #b0582c 60%, #58260f 100%)',
  iron: 'radial-gradient(circle at 30% 25%, #e8ebf0 0, #9ca3ad 24%, #5b626d 60%, #262a31 100%)',
  tin: 'radial-gradient(circle at 30% 25%, #ffffff 0, #dadde2 28%, #a3a8b0 64%, #696d76 100%)',
  lead: 'radial-gradient(circle at 30% 25%, #c9ced8 0, #8a92a1 24%, #555c6a 60%, #2a2e37 100%)',
  antimony: 'radial-gradient(circle at 30% 25%, #f1f4fa 0, #b9c1d0 22%, #6b7487 58%, #2b303c 100%)',
  shadow: 'radial-gradient(circle at 30% 25%, #6b6f86 0, #2c2f42 40%, #0b0c14 100%)',
};

// --- Fire, operations, history -------------------------------------------------------------------




export const HAND = [
  { finger: 'Thumb', emblem: 'Crown', salt: 'Niter', modern: 'potassium nitrate', role: 'The "king of salts", the mill everything must pass through. A powerful oxidiser, the heart of gunpowder.' },
  { finger: 'Index', emblem: 'Six-pointed star', salt: 'Vitriol', modern: 'iron or copper sulfate', role: 'The "true mineral salt", holding a white and a red spirit. Distilled, it gave the old world sulfuric acid.' },
  { finger: 'Middle', emblem: 'Sun', salt: 'Sal ammoniac', modern: 'ammonium chloride', role: 'Turns to vapour and re-forms; that corrosive vapour opens metals. Said to unite things that will not mix.' },
  { finger: 'Ring', emblem: 'Lantern', salt: 'Alum', modern: 'potassium aluminium sulfate', role: 'Melts low and helps other salts fuse. A mordant and styptic since antiquity.' },
  { finger: 'Little', emblem: 'Key', salt: 'Salt', modern: 'sodium chloride', role: 'Sea or rock salt, the key. Purified as the "fixed spirit of salt".' },
];

export const ORES: { planet: string; ore: string }[] = [
  { planet: 'Saturn', ore: 'Galena, cerussite (lead)' }, { planet: 'Jupiter', ore: 'Cassiterite (tin)' },
  { planet: 'Mars', ore: 'Pyrite, magnetite (iron)' }, { planet: 'Sun', ore: 'Native or placer gold' },
  { planet: 'Venus', ore: 'Malachite, azurite, native copper' }, { planet: 'Mercury', ore: 'Cinnabar (mercury sulfide)' },
  { planet: 'Moon', ore: 'Argentite, cerargyrite (silver)' },
];

export const GOLDS = [
  { name: 'Astral gold', text: 'The Sun\'s continual outpouring, filling the whole universe; we breathe it in and out without knowing.' },
  { name: 'Elemental gold', text: 'The purest, most fixed part of every compound: a grain of it at the centre of every being in the three kingdoms. This is the gold of the wise.' },
  { name: 'Metallic gold', text: 'The bright, unchanging metal that the world prizes, and the one most perfectly "cooked" by nature.' },
];

export const STAGES = [
  { k: 'nigredo', latin: 'Nigredo', en: 'Blackening', meaning: 'Putrefaction. The old form dies so that its seed can be freed.', inner: 'Facing the shadow: loss, confusion, the parts of yourself you avoid.', question: 'What has to die for something new to begin?' },
  { k: 'cauda', latin: 'Cauda pavonis', en: 'The peacock\'s tail', meaning: 'A play of colours across the dark matter.', inner: 'First signs of life after a hard stretch; moods and possibilities flickering.', question: 'Which small colour has appeared in your darker season?' },
  { k: 'albedo', latin: 'Albedo', en: 'Whitening', meaning: 'Washing. The matter is purified to white.', inner: 'Clarity and calm: the reflective, lunar mind.', question: 'What has become clear that was muddy a month ago?' },
  { k: 'citrinitas', latin: 'Citrinitas', en: 'Yellowing', meaning: 'Dawn: the white begins to take colour.', inner: 'Solar awareness wakes; insight turns toward action.', question: 'What does your clarity want you to do?' },
  { k: 'rubedo', latin: 'Rubedo', en: 'Reddening', meaning: 'Completion: the Red Stone.', inner: 'Integration: spirit and body at one, the work carried into life.', question: 'What have you finished becoming, and who can it serve?' },
] as const;

// --- The Tree of Life -------------------------------------------------------------------------

export const SEPHIROTH: { i: number; name: string; en: string; ruler: string; n: N | null; x: number; y: number }[] = [
  { i: 1, name: 'Kether', en: 'Crown', ruler: 'the undivided light', n: null, x: 232, y: 50 },
  { i: 2, name: 'Chokmah', en: 'Wisdom', ruler: 'the zodiac', n: null, x: 327, y: 106 },
  { i: 3, name: 'Binah', en: 'Understanding', ruler: 'Saturn', n: 8, x: 137, y: 106 },
  { i: 4, name: 'Chesed', en: 'Mercy', ruler: 'Jupiter', n: 3, x: 327, y: 220 },
  { i: 5, name: 'Geburah', en: 'Severity', ruler: 'Mars', n: 9, x: 137, y: 220 },
  { i: 6, name: 'Tiphareth', en: 'Beauty', ruler: 'the Sun', n: 1, x: 232, y: 276 },
  { i: 7, name: 'Netzach', en: 'Victory', ruler: 'Venus', n: 6, x: 327, y: 334 },
  { i: 8, name: 'Hod', en: 'Splendour', ruler: 'Mercury', n: 5, x: 137, y: 334 },
  { i: 9, name: 'Yesod', en: 'Foundation', ruler: 'the Moon', n: 2, x: 232, y: 392 },
  { i: 10, name: 'Malkuth', en: 'Kingdom', ruler: 'the Earth', n: null, x: 232, y: 492 },
];
export const PATHS: [number, number][] = [
  [1, 2], [1, 3], [1, 6], [2, 3], [2, 4], [2, 6], [3, 5], [3, 6], [4, 5], [4, 6], [4, 7],
  [5, 6], [5, 8], [6, 7], [6, 8], [6, 9], [7, 8], [7, 9], [7, 10], [8, 9], [8, 10], [9, 10],
];
export const WORLDS: { name: string; en: string; el: ElementK; mind: string; y0: number; y1: number }[] = [
  { name: 'Atziluth', en: 'Archetypal', el: 'fire', mind: 'pure divinity', y0: 0, y1: 156 },
  { name: 'Briah', en: 'Creative', el: 'air', mind: 'the mental world', y0: 156, y1: 362 },
  { name: 'Yetzirah', en: 'Formative', el: 'water', mind: 'the astral, subconscious', y0: 362, y1: 440 },
  { name: 'Assiah', en: 'Material', el: 'earth', mind: 'the physical world', y0: 440, y1: 540 },
];

// --- Works ---------------------------------------------------------------------------------------

export interface Step { title: string; how?: string; why: string; touches?: Essential[] }
export interface Work {
  id: string; title: string; latin?: string; tier?: Tier; time?: string; purpose: string;
  steps: Step[]; cautions?: string[]; notes?: string[];
}

/** Plants in Culpeper's lists that are poisonous if swallowed: marked, never removed. */
export const POISONOUS = new Set(['celandine', 'columbine', 'pennyroyal', 'periwinkle', 'tobacco', 'comfrey', 'holly', 'ivy', 'nightshade', 'yew']);
