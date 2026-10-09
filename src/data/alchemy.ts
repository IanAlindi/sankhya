// Practical alchemy after Robert Allen Bartlett, "Real Alchemy: A Primer of Practical Alchemy"
// (Quinquangle Press, 2006). Facts and procedures are summarised in fresh words. The plant and water
// works are given step by step; the mineral and metallic works are given stage by stage, for
// understanding only, with quantities and temperatures deliberately left out.
import type { N } from '../lib/num';

export type Essential = 'salt' | 'sulfur' | 'mercury';
export type ElementK = 'fire' | 'air' | 'water' | 'earth';
export type Tier = 'kitchen' | 'workshop' | 'read';
export type MetalKey = 'gold' | 'silver' | 'quicksilver' | 'copper' | 'iron' | 'tin' | 'lead' | 'shadow';

export const TIER: Record<Tier, { label: string; icon: string; long: string }> = {
  kitchen: { label: 'Kitchen · with care', icon: '✓', long: 'Household materials. Fire and alcohol still deserve respect.' },
  workshop: { label: 'Workshop · caustic, heat or a still', icon: '!', long: 'Caustic salts, open flame or distillation: gloves, eye protection, outdoors or under a hood. Distilling alcohol at home is licensed or illegal in many countries; check local law.' },
  read: { label: 'Read only · poisons', icon: '✕', long: 'Toxic metals, corrosive fumes or explosive mixtures. Every stage and its purpose is here so you can follow the tradition, but not so you can repeat it: quantities and temperatures are left out on purpose.' },
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

export const KINGDOMS = [
  { name: 'Vegetable', text: 'Spirit is alcohol, soul is the essential oil, body is the ash salt. Forgiving of mistakes: where every student begins.' },
  { name: 'Animal', text: 'Sodium salts carry its fire and sea salt is its magnet. Its most famous preparation is the volatile salt of urine.' },
  { name: 'Mineral', text: 'The densest form of the One, with the purest life locked in the crystal. Its works are longer, hotter and far more dangerous.' },
];

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

/** Herbs: only commonly eaten plants from Culpeper's lists (Bartlett's appendix).
 *  Qualities: the psychological virtues the old texts give each metal, offered for reflection only. */
export const PLANETS7: Planet7[] = [
  { n: 1, planet: 'Sun', glyph: '☉', metal: 'Gold', metalKey: 'gold', organ: 'Heart', weekday: 0, sephira: 'Tiphareth', sephiraEn: 'Beauty', herbs: ['rosemary', 'chamomile', 'bay leaf', 'pot marigold (calendula)'], quality: 'will, courage, vitality, creativity' },
  { n: 2, planet: 'Moon', glyph: '☽', metal: 'Silver', metalKey: 'silver', organ: 'Brain', weekday: 1, sephira: 'Yesod', sephiraEn: 'Foundation', herbs: ['lettuce', 'cucumber', 'watercress', 'chickweed'], quality: 'dreams, imagination, memory, sensitivity' },
  { n: 9, planet: 'Mars', glyph: '♂', metal: 'Iron', metalKey: 'iron', organ: 'Gall bladder', weekday: 2, sephira: 'Geburah', sephiraEn: 'Severity', herbs: ['basil', 'garlic', 'nettle', 'onion'], quality: 'instinct, drive, energy' },
  { n: 5, planet: 'Mercury', glyph: '☿', metal: 'Quicksilver', metalKey: 'quicksilver', organ: 'Lungs', weekday: 3, sephira: 'Hod', sephiraEn: 'Splendour', herbs: ['lavender', 'dill', 'caraway', 'parsley', 'marjoram'], quality: 'perception, quickness, speech' },
  { n: 3, planet: 'Jupiter', glyph: '♃', metal: 'Tin', metalKey: 'tin', organ: 'Liver', weekday: 4, sephira: 'Chesed', sephiraEn: 'Mercy', herbs: ['lemon balm (melissa)', 'dandelion', 'rose', 'bilberry'], quality: 'growth, generosity, good humour' },
  { n: 6, planet: 'Venus', glyph: '♀', metal: 'Copper', metalKey: 'copper', organ: 'Kidneys', weekday: 5, sephira: 'Netzach', sephiraEn: 'Victory', herbs: ['mint', 'marshmallow root', 'plantain', 'strawberry leaf'], quality: 'sensitivity, harmony, attraction' },
  { n: 8, planet: 'Saturn', glyph: '♄', metal: 'Lead', metalKey: 'lead', organ: 'Spleen', weekday: 6, sephira: 'Binah', sephiraEn: 'Understanding', herbs: ['barley', 'beetroot', 'sweetcorn', 'mullein'], quality: 'steadiness, patience, tolerance' },
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
  shadow: 'radial-gradient(circle at 30% 25%, #6b6f86 0, #2c2f42 40%, #0b0c14 100%)',
};

// --- Fire, operations, history -------------------------------------------------------------------

export const FIRE_DEGREES = [
  { n: 1, latin: 'Balneum Mariae', name: 'The water bath', heat: 'Never above boiling', text: 'The vessel sits in water, so its contents cannot scorch. Named, by one account, after Maria the Jewess, an early Alexandrian alchemist; by another, after mare, the sea.', use: 'Delicate work, such as rectifying spirit.' },
  { n: 2, latin: 'Balneum cineris', name: 'The ash bath', heat: 'Above boiling, still even', text: 'The vessel is bedded in ash, which insulates it and spreads the heat.', use: 'Gentle heats beyond what water allows.' },
  { n: 3, latin: 'Balneum arenae', name: 'The sand bath', heat: 'Higher, without hot spots', text: 'Sand holds a higher heat evenly and supports glass that might sag.', use: 'Oils and liquids that boil above water.' },
  { n: 4, latin: 'Balneum ignis', name: 'Naked flame', heat: 'As hot as the furnace goes', text: 'The fire touches the vessel.', use: 'Calcinations and fusions.' },
];

export const CORE_OPS = [
  { name: 'Distillation', what: 'Heat a liquid, catch its vapour on a cold surface, collect the drops.', why: 'To separate and purify liquids. In alchemy also to exalt them: each pass a death and a rebirth.' },
  { name: 'Rectification', what: 'Distil the same spirit again, six to twelve times.', why: 'To refine and "spiritualise" it. Distillation alone stops near 95% alcohol; drying salts take out the last water.' },
  { name: 'Digestion', what: 'Hold matter at a steady, gentle warmth, often near body heat, for a set time.', why: 'To let it ripen and react slowly. The whole Art is a controlled digestion.' },
  { name: 'Sublimation', what: 'Warm a solid that passes straight to vapour; it re-forms as crystals on a cool lid.', why: 'To lift the finer parts of a solid and leave the gross behind.' },
  { name: 'Circulation', what: 'Heat a liquid gently at the bottom of a tall closed vessel; it rises, condenses at the cool top and rains back, for weeks.', why: 'Hundreds of small rebirths. The step that turns a spagyric tincture into an alchemical one.' },
  { name: 'Calcination', what: 'Burn spent plant to ash, then keep heating and grinding until it is pale grey or white.', why: 'To burn off the volatile and reveal the mineral body. Long and slow beats short and fierce.' },
  { name: 'Leaching', what: 'Stir ash into ten to twenty times its volume of hot water, filter, evaporate the clear liquid.', why: 'White crystals remain, the "Salt of Salt". The insoluble rest, the caput mortuum or "dead head", is discarded.' },
  { name: 'Salt of Sulfur', what: 'For plants with little oil: evaporate the fermented liquid to a syrup and calcine it; wet the black mass with water, dry and re-calcine, again and again, until it pales; then leach.', why: 'A salt said to act as a magnet for the plant\'s own Sulfur.' },
  { name: 'Solve et coagula', what: 'Dissolve a salt, filter it, let it crystallise again; repeat.', why: 'Each cycle is a death and a rebirth, and in the liquid state matter is most impressionable, especially to the Moon. The "phlegm", the plain water distilled from the same plant, is held to be the best solvent for its own salts.' },
];

export const TIMELINE = [
  { when: 'before 300 BCE', what: 'Egyptian temple craftsmen work metals, dyes, glass, perfumes and medicines, always with words and rites as part of the recipe.' },
  { when: '332 BCE', what: 'Alexander enters Egypt; Alexandria becomes the meeting place of Greek and Egyptian learning. The Greek name for Egypt, Khem, the black land, is one root of "chemistry".' },
  { when: '1st–4th c. CE', what: 'The first surviving alchemical writers: Maria the Jewess, inventor of the water bath, and Zosimos of Panopolis.' },
  { when: 'c. 296 CE', what: 'Diocletian orders Egypt\'s books on making gold and silver burned.' },
  { when: '8th–11th c.', what: 'Arabic al-kīmiyā: the works attributed to Jābir ibn Ḥayyān, al-Rāzī, Ibn Sīnā. Translated into Latin from the 12th century.' },
  { when: '1317', what: 'Pope John XXII condemns alchemical counterfeiting; in 1404 England makes "multiplying" gold a felony.' },
  { when: '1493–1541', what: 'Paracelsus turns alchemy back toward medicine and names the spagyric art.' },
  { when: '1661', what: 'Boyle\'s The Sceptical Chymist. Newton, meanwhile, writes around a million words on alchemy.' },
  { when: '1960', what: 'Frater Albertus founds the Paracelsus Research Society in Salt Lake City; Bartlett studies there from 1974 and becomes chief chemist of its laboratory.' },
];

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

// --- The works ----------------------------------------------------------------------------------

export interface Step { title: string; how?: string; why: string; touches?: Essential[] }
export interface Work {
  id: string; title: string; latin?: string; tier?: Tier; time?: string; purpose: string;
  steps: Step[]; cautions?: string[]; honest?: string;
}

const ALL: Essential[] = ['salt', 'sulfur', 'mercury'];

export const WORKS: Record<string, Work> = {
  pattern: {
    id: 'pattern', title: 'The spagyric pattern', latin: 'Spagyria',
    purpose: 'Every work below, plant or metal, repeats one movement in three beats.',
    steps: [
      { title: 'Separate', how: 'Take the thing apart into its three: the oil (Sulfur), the spirit (Mercury) and, hidden in the residue, the salt (Salt).', why: 'Each part carries one principle, and each needs its own kind of cleansing.', touches: ALL },
      { title: 'Purify', how: 'Clean each part by the method that suits it: spirits and oils by repeated distillation, salts by fire and recrystallisation.', why: 'To remove what the plant needed to survive in a field but does not need as a medicine.' },
      { title: 'Recombine', how: 'Give the purified salt back its oil, then its spirit, and let the three digest together. This reunion is called cohobation.', why: 'The reunited whole is held to be stronger and more alive than what you started with. Paracelsus named the art from Greek words for drawing apart and gathering together.', touches: ALL },
    ],
  },

  basics: {
    id: 'basics', title: 'The Seven Basics', latin: 'The easy way', tier: 'kitchen', time: '3–4 weeks',
    purpose: 'A simple spagyric tincture any kitchen can make: one for each planet of the week, so each of your "interior stars" is tended in turn.',
    steps: [
      { title: 'Choose the plant and the hour', how: 'Pick a plant ruled by one of the seven planets (see the week below) that you would happily eat. Begin on that planet\'s weekday, ideally in the first hour after sunrise, and in a waxing Moon if you can.', why: 'Plant, day and hour all share one planet, so the tradition holds that its influence is gathered rather than scattered.' },
      { title: 'Dry and grind', how: 'Dry the herb and grind it to a fine powder.', why: 'Opening the body: more surface for the solvent to reach.', touches: ['salt'] },
      { title: 'Cover with strong drinking spirit', how: 'Put the powder in a glass jar and pour on the strongest drinkable alcohol you can buy (a 50% vodka is enough) until it stands two fingers above the herb. Never use methylated, denatured or rubbing alcohol. Lay plastic film under the metal lid.', why: 'Alcohol is the Mercury of the plant world, and Mercury draws out its own kingdom\'s Sulfur: the oils, colour and character. The film keeps metal away from the extract.', touches: ['mercury', 'sulfur'] },
      { title: 'Digest for two weeks', how: 'Keep the sealed jar somewhere warm and dark (the book suggests the top of a water heater) and shake it every day.', why: 'Digestion: slow warmth lets the extraction ripen. The spirit deepens in colour as it takes up the plant\'s soul.', touches: ['mercury', 'sulfur'] },
      { title: 'Press out the liquid', how: 'Pour everything through a clean cloth or stocking into a second jar and squeeze, wearing gloves. Seal the liquid and set it aside.', why: 'The liquid now holds Mercury and Sulfur together. The Salt is still locked in the wet residue.' },
      { title: 'Burn the residue, outdoors', how: 'Put the spent herb in a fireproof dish (not aluminium), set it on a brick outside, well away from the jar of spirit, and light it. Stir as it burns black.', why: 'Calcination begins: fire removes the structure that protected the living plant and is no longer needed.', touches: ['salt'] },
      { title: 'Whiten the ash', how: 'Grind the black ash and heat it again over a gas flame or under the oven grill, grinding between heats, until it is pale grey.', why: 'Every pass burns off more carbon. A whiter ash is a purer body.', touches: ['salt'] },
      { title: 'Leach the salt (optional)', how: 'Stir the ash into ten to twenty times its volume of hot water, filter, and let the clear liquid evaporate. Keep the white crystals; discard what stayed in the filter.', why: 'This separates the soluble true salt, the "Salt of Salt", from the earthy caput mortuum. Faster than whitening by fire alone.', touches: ['salt'] },
      { title: 'Reunite', how: 'Grind the salt while still warm and stir it into the extract you set aside. Seal.', why: 'Cohobation: the purified body receives its soul and spirit back. This is where a tincture becomes an elixir.', touches: ALL },
      { title: 'Digest one more week', how: 'Warm and dark again, shaking daily.', why: 'Time for the three to unite.' },
      { title: 'Filter, rest, bottle', how: 'Filter through a coffee filter, let it stand 48 hours, then pour the clear liquid off into dropper bottles, leaving any sediment behind.', why: 'Clarity. Whatever settles out did not join the union.' },
    ],
    cautions: [
      'Alcohol is flammable: burn the herb far from the spirit, and never over an indoor flame.',
      'Use only plants you would eat. Several plants in the old herbals, yew, nightshade, ivy, tobacco, pennyroyal and comfrey among them, are poisonous.',
      'The book\'s habit is a few drops in water on the planet\'s day. Ask a doctor first, especially if you are pregnant, take medication, or avoid alcohol.',
      'Hot ash and leached plant salt are alkaline. Keep them off skin and out of eyes.',
    ],
  },

  rosemary: {
    id: 'rosemary', title: 'The full separation', latin: 'Rosemary, the slow way', tier: 'workshop', time: 'several weeks',
    purpose: 'The long way round, which puts each of the three principles in your hands as a separate substance before they are joined.',
    steps: [
      { title: 'Gather with the Sun in mind', how: 'Rosemary is a Sun plant. Gather it fresh, ideally on a Sunday morning in a waxing Moon, chop it fine and wet it into a paste with a little water.', why: 'Fresh plant still holds its volatile oil; chopping and soaking loosen it.' },
      { title: 'Steam out the oil', how: 'Pass steam through the paste and condense the vapour. An oily layer floats on the water that collects; draw it off.', why: 'The essential oil is the Sulfur, the vehicle of the plant\'s soul and character.', touches: ['sulfur'] },
      { title: 'Let the rest ferment', how: 'Leave the watery mush to ferment.', why: 'The plant "gives up the ghost": its life passes into the liquid as alcohol.', touches: ['mercury'] },
      { title: 'Distil the spirit', how: 'Distil the fermented mush and collect the volatile liquid.', why: 'This is the Mercury, the spirit of the plant.', touches: ['mercury'] },
      { title: 'Refine oil and spirit', how: 'Redistil each several times.', why: 'Cleaner in the chemical sense, and raised in the alchemical one, since each distillation is a death and a rebirth.', touches: ['sulfur', 'mercury'] },
      { title: 'Dry and burn the residue', how: 'Dry what is left in the still and burn it to ash.', why: 'Calcination frees the Salt from the plant\'s spent structure.', touches: ['salt'] },
      { title: 'Wash out the white salt', how: 'Dissolve the pale ash in water, filter, evaporate to white crystals.', why: 'The purified Salt: the true body of the plant.', touches: ['salt'] },
      { title: 'Feed the body its soul', how: 'Powder the salt and soak it with its own oil.', why: 'The body takes up its Sulfur first.', touches: ['salt', 'sulfur'] },
      { title: 'Wake it with spirit', how: 'Add the purified spirit.', why: 'Mercury animates the reunited body and soul.', touches: ['mercury'] },
      { title: 'Digest', how: 'Seal and keep warm for some days.', why: 'Union. Isaac Holland, a fifteenth-century writer, claimed the reunited plant works a hundred times more strongly.', touches: ALL },
    ],
    cautions: ['Steam and stills scald. Distilling alcohol at home needs a licence in many countries, Kenya included.'],
  },

  magistery: {
    id: 'magistery', title: 'The Magistery', latin: 'After Paracelsus', tier: 'workshop', time: '5–6 months',
    purpose: 'A plant concentrated into a few oily drops, made by feeding its own distillate back onto fresh plant again and again.',
    steps: [
      { title: 'Cover fresh herb with strong spirit', how: 'Chop fresh herb and cover it with strong (about 95%) drinking alcohol. Seal.', why: 'The vegetable Mercury begins to draw the plant out.', touches: ['mercury'] },
      { title: 'Digest a month at blood heat', how: 'About 40 °C.', why: 'Slow ripening.' },
      { title: 'Distil to dryness, gently', how: 'In a water bath, so nothing scorches.', why: 'The spirit rises carrying the plant\'s own volatile liquid, so you collect more than you put in.', touches: ['mercury', 'sulfur'] },
      { title: 'Pour it onto fresh herb', how: 'Digest another month, then distil again.', why: 'Each round loads the liquid with more of the plant.' },
      { title: 'Repeat until five times the volume', how: 'If you began with 100 ml of spirit, continue until you have 500 ml.', why: 'The liquid is now mostly the plant itself.' },
      { title: 'Circulate a month', how: 'Seal it in a tall vessel with gentle heat below and a cool top.', why: 'The essence separates out as oily drops that sink or float, depending on the plant.' },
      { title: 'Collect the drops', how: 'Draw them off with a dropper into a small vial and seal it well.', why: 'This is the magistery. Paracelsus claimed one part equals two hundred parts of dried plant.', touches: ['sulfur'] },
    ],
  },

  ens: {
    id: 'ens', title: 'The Ens tincture', latin: 'Ens', tier: 'workshop', time: '3–5 weeks',
    purpose: 'An extraction made with an alkaline salt that has drunk the night air. The tradition counts it among the strongest plant medicines, acting on the subtle body.',
    steps: [
      { title: 'Get the salt', how: 'Potassium carbonate ("pearl ash", the old salt of tartar) from a chemical or pottery supplier, or leached from hardwood ash.', why: 'An alkaline salt that pulls water out of the air.', touches: ['salt'] },
      { title: 'Expose it to the night', how: 'Spread it no more than about 6 mm deep in an old glass dish you don\'t mind etching, outdoors from late evening to early morning, sheltered from rain and dust. Spring and early summer are preferred.', why: 'Deliquescence: the salt dissolves in the moisture it absorbs, which the tradition says carries a universal fire.', touches: ['salt'] },
      { title: 'Collect the "oil of tartar"', how: 'Draw off the liquid as it forms and filter it through a plug of cotton or glass wool; paper falls apart.', why: 'A strong alkaline solvent, charged, in the tradition\'s terms, with that fire.' },
      { title: 'Steep the herb in it', how: 'Cover about 50 g of finely ground herb until it becomes one liquid mass. Seal with a plastic lid and digest one to two weeks, shaking.', why: 'The alkali opens the plant, and the liquid turns dark.' },
      { title: 'Press it out', how: 'Squeeze through a stocking into a clean vessel, wearing gloves and eye protection.', why: 'To separate the coloured extract from the spent herb.' },
      { title: 'Float strong alcohol on top', how: 'Add an equal volume of 95% alcohol and shake daily. Two layers should form; if they don\'t, there is too much water, so stir in some dry carbonate.', why: 'The alcohol draws the plant\'s essence, its Ens, out of the caustic layer and leaves the salt behind.', touches: ['mercury', 'sulfur'] },
      { title: 'Draw off the alcohol', how: 'After two weeks or more, take off the coloured upper layer. Let it stand a day or two, ideally in a freezer, then filter.', why: 'Cold makes any dissolved carbonate crystallise out, keeping the caustic salt out of the tincture.' },
      { title: 'Keep the salt', how: 'Dry and re-calcine the alkaline layer.', why: 'It can be used again and again.', touches: ['salt'] },
    ],
    cautions: ['Wood-ash lye and oil of tartar are caustic: they burn skin and can blind. Gloves and eye protection throughout.'],
    honest: 'A famous seventeenth-century story tells of an Ens of melissa (lemon balm) that made a man\'s nails and an old hen\'s feathers fall out and grow back finer. It is a story, not evidence.',
  },

  vegstone: {
    id: 'vegstone', title: 'The Vegetable Stone', latin: 'Opus minor', tier: 'workshop', time: 'a year or more',
    purpose: 'The "little work": one plant\'s three principles purified and fixed together into a hard, stone-like body. A rehearsal, on a smaller scale, of the Great Work.',
    steps: [
      { title: 'Start big', how: 'Plan on 5 to 25 kg of one plant, chosen for plenty of oil and plenty of ash.', why: 'The yield is small, and you need enough body to work with.' },
      { title: 'Separate the three', how: 'Steam out the oil; ferment and distil the spirit; burn and leach the residue.', why: 'Sulfur, Mercury and Salt in separate vessels.', touches: ALL },
      { title: 'Purify each', how: 'Redistil oil and spirit many times. Leach the ash for the Salt of Salt; evaporate and calcine the fermented liquid for the Salt of Sulfur.', why: 'Every part should be as clean as you can make it before they are joined.' },
      { title: 'Charge the salts', how: 'Set them out at night to deliquesce, then dry them in sunlight.', why: 'In the tradition, crystals that form in sunlight trap more of the Sun\'s fire.', touches: ['salt'] },
      { title: 'Open the salts', how: 'Grind them, then roast them in an oven at 200–300 °C.', why: '"Opening the pores", in the old phrase, so they will drink.', touches: ['salt'] },
      { title: 'Feed them oil', how: 'Grind the salts warm, spread them in a vial and wet them with the oil until just saturated. Seal and keep at 40 °C for a week.', why: 'The body takes in its soul.', touches: ['salt', 'sulfur'] },
      { title: 'Feed until full', how: 'Each week, on the same planetary day, add more oil if the last has been drunk. Stop when a week leaves it untouched.', why: 'Saturation shows the body can hold no more Sulfur.' },
      { title: 'Then feed it spirit', how: 'Do the same with the purified alcohol until no more is taken up.', why: 'Mercury animates it. The stone is now finished "to the first degree".', touches: ['mercury'] },
      { title: 'Raise it', how: 'Grind it, distil it gently, calcine the residue, and feed it back with its distillate and fresh oil and spirit. Repeat several times.', why: 'Each round increases its strength.' },
      { title: 'Mature it', how: 'Six months to a year at incubator heat, adding oil and spirit in equal parts whenever it dries.', why: 'It congeals into a hard stone. The tradition says that dropped into a soaking herb it gathers that herb\'s three principles into a layer on the surface, and comes out unharmed.', touches: ALL },
    ],
    cautions: ['The book warns that such stones act strongly, and recommends months of the gentle Seven Basics first.'],
  },

  rain: {
    id: 'rain', title: 'Rainwater and the seed of nature', latin: 'The Gur', tier: 'kitchen', time: '1–12 months',
    purpose: 'Water itself as the subject: catch rain before it touches anything, let it ferment, and divide it into its elements.',
    steps: [
      { title: 'Catch spring rain', how: 'Ideally while the Sun is in Aries, Taurus or Gemini, and in a thunderstorm. Stretch plastic sheeting on stakes and lead the run-off into a plastic bucket.', why: 'In the tradition, rain that touches earth, metal, plants or people becomes "determined" to one kingdom. (Lightning really does fix nitrogen into rain as nitrates.)' },
      { title: 'Filter it and let it breathe', how: 'Filter, cover with cloth rather than a lid, and keep it at 30–40 °C.', why: 'It must ferment, and fermentation needs air.' },
      { title: 'Wait for the Gur', how: 'At least a month; some wait a year. White to brownish tufts like cotton appear in the water.', why: 'The alchemists called this the Gur, the universal seed. A biologist would call it a microbial mat. Both agree that something has begun to live.' },
      { title: 'Sweat off the first quarter', how: 'Distil very gently until a quarter of the volume has come over. Label it Fire and Air of Water.', why: 'The lightest, most volatile part comes first.' },
      { title: 'Distil the bulk', how: 'Raise the heat and continue until most has come over, but never to dryness. Label it Water of Water.', why: 'Stopping early protects what remains.' },
      { title: 'Dry the earth in the Sun', how: 'Pour the residue into a dish and let sunlight dry it. Label it Earth of Water.', why: 'The Gur is in this earth.', touches: ['salt'] },
      { title: 'Moisten the earth', how: 'Wet the dried earth with the fractions in different proportions and keep it warm.', why: 'The old text claims the proportions decide whether mineral, plant or animal life appears in it.' },
    ],
  },

  sevenfold: {
    id: 'sevenfold', title: 'The sevenfold distillation', latin: '4 × 3', tier: 'kitchen', time: 'a few days of distilling',
    purpose: 'A finer division of fermented water into twelve fractions: the body, soul and spirit of each of the four elements.',
    steps: [
      { title: 'Ferment the rain', how: 'As in the work above.', why: 'Only fermented water divides this way in the tradition.' },
      { title: 'Distil into four equal quarters', how: 'In order of coming over, label them Fire, Air, Water and Earth of Water. Stop before dryness; the residue is the Gur.', why: 'Lightest to heaviest: the four elements of the water.' },
      { title: 'Divide each quarter into thirds', how: 'Distil each again. The first third to come over is its Sulfur, the second its Mercury, what remains its Salt.', why: 'Soul, spirit and body of each element.', touches: ALL },
      { title: 'Name all twelve', how: 'Sulfur takes the element\'s cardinal sign, Mercury its mutable sign, Salt its fixed sign. The grid shows all twelve.', why: 'Twelve fractions, twelve signs. Each is said to carry its own medicinal character.' },
    ],
  },

  angel: {
    id: 'angel', title: 'Angel water', latin: 'Salt of tartar', tier: 'workshop', time: 'a few nights',
    purpose: 'Water charged, in the tradition, with the fire a salt draws from the night air: used to revive other salts.',
    steps: [
      { title: 'Spread the salt of tartar', how: 'A thin layer (6–12 mm) of potassium carbonate in a glass dish, outdoors from late evening until about 7 a.m., sheltered from rain and dust. Spring is best.', why: 'More generative fire is said to be present in spring.', touches: ['salt'] },
      { title: 'Collect the oil of tartar', how: 'Gather the liquid it forms.', why: 'The salt has dissolved in what it drank from the air.' },
      { title: 'Distil just to dryness', how: 'Gently.', why: 'The clear water that comes over is Angel Water.', touches: ['mercury'] },
      { title: 'Use it on salts', how: 'Recrystallise herbal salts from it.', why: 'As the crystals form, the tradition says, the fire is caught in them and the salts are revived: the volatile made fixed, the fixed volatile.', touches: ['salt'] },
      { title: 'Recover the salt', how: 'The dry carbonate left in the still can be used again.', why: 'Nothing is wasted.' },
    ],
    cautions: ['Oil of tartar is caustic. Gloves and eye protection.'],
    honest: 'Dried sea salt does the same for the "animal" kingdom, more slowly. Two other salts the book uses this way, ammonium nitrate and antimony trichloride, are left out here: one is an explosive precursor, the other toxic and corrosive.',
  },

  archaeus: {
    id: 'archaeus', title: 'The Archaeus of Water', latin: 'First being of water', tier: 'workshop', time: '2–3 months',
    purpose: 'Rain and Angel Water fermented together, divided into twelve, and rebuilt in balance: a "universal mercury".',
    steps: [
      { title: 'Marry the waters', how: 'Add Angel Water, the solar or "male" water, to collected rain, the lunar or "female".', why: 'Fire meets receptive water.' },
      { title: 'Ferment', how: 'At least a month.', why: 'The two become one living water.' },
      { title: 'Divide into twelve', how: 'Use the sevenfold distillation.', why: 'Each element\'s body, soul and spirit in its own flask.', touches: ALL },
      { title: 'Rebuild each element', how: 'Mix equal volumes of one element\'s Sulfur, Mercury and Salt and circulate them for several days. Do this for all four.', why: 'Each element is reconstituted in balance.' },
      { title: 'Rebuild the water', how: 'Mix the four rebuilt elements in equal parts and circulate a week to a month at about 40 °C. The Gur is not used.', why: 'The Archaeus: a solvent for any kingdom, or a healing water on its own.' },
      { title: 'Tune it to a kingdom', how: 'Weight the elements instead of using equal parts: Earth for metals; Earth and Water for minerals; Water and Air for plants; Fire and Air for animals.', why: 'In the tradition, proportion "determines" what the water will act on.' },
      { title: 'Feed the Gur', how: 'Moisten the dried Gur with it and keep it warm. When something grows and dies, calcine it, add the ash to fresh Gur, and go on.', why: 'The text promises ever more evolved life. In plain terms, what grows on damp mineral residue is algae and mould.' },
    ],
  },

  rotation: {
    id: 'rotation', title: 'The rotation of the elements', latin: 'Rotatio elementorum',
    purpose: 'How fire becomes earth and earth becomes fire again: the pattern underneath every cycle in the laboratory.',
    steps: [
      { title: 'Fire thickens into Air', how: 'The celestial fire condenses into what an old text calls "an invisible and most subtle humidity".', why: 'The descent begins. The alchemists called it inspissation, thickening.' },
      { title: 'Air into Water', how: 'The humidity grows heavier.', why: 'Fire and Air come down and impregnate the waters.' },
      { title: 'Water into Earth', how: 'The waters give their thickest part to the earth.', why: 'Now the fire is fixed in a body.' },
      { title: 'Earth back into Water', how: 'The fire trapped inside, the central fire, drives the cycle into reverse.', why: 'The ascent, volatilisation.' },
      { title: 'Water into Air, Air into Fire', how: 'Vapour rises and thins until it rejoins the celestial fire.', why: 'The fire is regenerated and the cycle begins again.' },
      { title: 'Always through the neighbour', how: 'Never jump from earth to fire. To fix fire in earth, unite it with air first, then add water, then earth; reverse the order to raise earth.', why: 'The "proper medium": each element is the solvent and the magnet of the next.' },
      { title: 'A spiral, not a circle', how: 'Each turn brings the four into closer balance.', why: 'Perfectly balanced, they bring forth a fifth: the quintessence. Ripley put it in a couplet: "When thou hast made the quadrangle round, then is all the secret found."' },
    ],
  },

  menstrua: {
    id: 'menstrua', title: 'Solvents of the Wet Way', latin: 'Menstrua', tier: 'read',
    purpose: 'Before metals can be worked they need solvents made from the plant world and "tuned" to minerals. Four classic ones, each prepared by the Moon.',
    steps: [
      { title: 'Vegetable radical menstruum', how: 'Red wine split in two: half soured to vinegar and concentrated, half distilled to spirit, with salts drawn from both residues. Spirit and vinegar are married for a lunar month, the salts added, and the whole distilled and returned to its salts seven to twelve times.', why: 'A "liquid plant stone" in which the volatile and fixed spirits of wine are joined. It distils without residue and opens iron and copper.' },
      { title: 'Kerkring\'s menstruum', how: 'Sal ammoniac sublimed three times, until orange-red, then digested with strong wine spirit from a new Moon and distilled three times.', why: 'A plant spirit "magnetised" to the mineral world by its contact with the salt.' },
      { title: 'Alkahest of tartar', how: 'Crude wine tartar distilled dry at rising heat: first a watery phlegm, then a yellow spirit and a black, foul oil. The spirit is rectified.', why: 'Said to open most metals, gold and silver included, and to lend its own life to what it extracts.' },
      { title: 'Alkahest of urine', how: 'Urine from a person on a clean diet, putrefied for a month, then distilled and returned to its residue three times. A white volatile salt sublimes at the end.', why: 'Van Helmont\'s famous salt (ammonium carbonate, in modern terms), which the tradition calls living sal ammoniac, able to revive what it extracts.' },
    ],
  },

  ores: {
    id: 'ores', title: 'Preparing the ores', latin: 'Via humida', tier: 'read',
    purpose: 'The Wet Way to a metal\'s Sulfur: a planetary ore, roasted, turned to a calx and drawn out with a menstruum over months.',
    steps: [
      { title: 'Choose the planet\'s ore', how: 'See the table of ores.', why: 'The tradition prefers ore fresh from the earth, which it regards as alive, over refined chemicals.' },
      { title: 'Sort and crush', how: 'The richest pieces are picked out and pounded to powder.', why: 'To expose the matter.' },
      { title: 'Roast off the volatile', how: 'A slow roast drives off arsenic, mercury, cadmium, selenium and free sulfur.', why: 'To remove impurities, which is exactly what makes this work deadly: those are the fumes.' },
      { title: 'Calcine to a calx', how: 'Longer, higher heat turns the ore into its oxide.', why: 'Oxides yield more easily to solvents.' },
      { title: 'Extract', how: 'The calx is covered with a menstruum and digested for months.', why: 'The solvent takes on colour: a tincture.', touches: ['sulfur'] },
      { title: 'Concentrate and clean', how: 'The solvent is distilled off and the residue taken up in alcohol; some go on through ether and back.', why: 'To leave dissolved metal salts behind and keep only what the tradition calls the metal\'s Sulfur.', touches: ['sulfur'] },
    ],
    honest: 'Bartlett himself warns that a "tincture of iron or copper" may be nothing but a solution of toxic metal salts. The book also repeats old claims that metal oils cured cancer and other illnesses. None has been shown, and several of these metals are cumulative poisons.',
  },

  acetate: {
    id: 'acetate', title: 'The acetate path', latin: 'Menstruum foetens', tier: 'read',
    purpose: 'A centuries-old secret: carry the life of wine into a metal through its acetate, then distil the crystals dry and catch its spirit, oil and salt.',
    steps: [
      { title: 'Make the radical vinegar', how: 'Copper is heated to a black oxide and dissolved in concentrated vinegar until deep green; the copper acetate crystals are dried and distilled at red heat.', why: 'Near-pure acetic acid, which the tradition says is loaded with mineral fire.' },
      { title: 'Turn the metal into its acetate', how: 'An oxide or carbonate of the chosen metal is dissolved in that vinegar and crystallised.', why: 'To pass plant life, from the wine, into the metal and hasten its evolution.' },
      { title: 'Distil the dry crystals', how: 'Heated in a retort with no liquid at all, the heat rising to fierce.', why: 'First the water of crystallisation comes over as phlegm, then a dense white vapour.' },
      { title: 'Catch the three wines', how: 'A burning spirit (acetone, the "aqua ardens"), a milky water ("virgin\'s milk") and drops of blood-red oil ("blood of the lion"). Ripley called the whole the menstruum foetens.', why: 'The burning spirit carries the metal\'s Philosophical Mercury, the red oil its Sulfur.', touches: ['mercury', 'sulfur'] },
      { title: 'Separate red from white', how: 'Gentle redistillation divides the clear "white wine" from the red.', why: 'Mercury and Sulfur, each purified.' },
      { title: 'Calcine the black lion', how: 'The black residue left in the retort is calcined and leached with the phlegm.', why: 'Its Salt. (The residue from lead can ignite on its own in air.)', touches: ['salt'] },
      { title: 'Reunite', how: 'Salt, Sulfur and Mercury of the metal are joined as in the plant work.', why: 'Holland describes a stone of lead made this way over some thirty weeks.', touches: ALL },
    ],
    honest: 'This is also how acetone was made industrially until the early 1900s. Lead acetate and its residues are seriously toxic; nothing made this way should ever be swallowed.',
  },

  dry: {
    id: 'dry', title: 'The Dry Way and the washing by fire', latin: 'Via sicca · Ysopaica', tier: 'read',
    purpose: 'Faster and fiercer: open metals by fusion with molten salts, and purify extracts by burning them.',
    steps: [
      { title: 'Fuse with alkali', how: 'Salt of tartar is melted in a crucible and the powdered ore stirred in until all is liquid, then poured out and ground.', why: 'Molten alkali "penetrates every metal" and, in the tradition, takes up its Sulfur.', touches: ['sulfur'] },
      { title: 'Extract the cake', how: 'The ground mass is left to deliquesce and drawn out with Kerkring\'s menstruum, or dissolved in rain water and the settled solid extracted.', why: 'The Sulfur passes into the solvent.' },
      { title: 'Wash it white by fire', how: 'An alcohol extract is set alight under a cooling dome; what condenses is collected and gently redistilled.', why: 'Glauber taught that flame consumes only the combustible and purifies the rest. A little volatile salt, the "incombustible mercury", remains.', touches: ['mercury'] },
    ],
  },

  antimony: {
    id: 'antimony', title: 'Antimony', latin: 'The black dragon', tier: 'read',
    purpose: 'The mineral of Malkuth, said to hold the rays of every planet. Seven classic preparations, from the raw ore to the star regulus.',
    steps: [
      { title: 'Roast the stibnite', how: 'The sulfide ore is roasted slowly.', why: 'Drives off arsenic, mercury and free sulfur. One folk etymology reads anti-monos, "never alone", for its company of impurities.' },
      { title: 'Calcine to a pale oxide', how: 'A long, slow heat kept below melting.', why: 'Burns the sulfur out.' },
      { title: 'Or purify it as kermes', how: 'The ore is dissolved in hot lye and thrown down by acid as a red-brown powder.', why: 'Cleans even poor ore, while releasing hydrogen sulfide, which kills at low concentrations.' },
      { title: 'Make the glass', how: 'The oxide, with a little sulfide, is fused until it runs clear and is cast: a transparent glass from yellow to ruby.', why: 'The favoured starting point for drawing antimony\'s Sulfur.' },
      { title: 'Ferment the vinegar of antimony', how: 'Ore and rain water are kept warm for up to a year, then distilled and returned three times; the strongest fraction is concentrated.', why: 'The "fixed spirit of antimony", called almost a universal solvent for the mineral world.', touches: ['mercury'] },
      { title: 'Draw the red oil', how: 'Powdered glass is extracted with radical vinegar, the acid washed out and the resin distilled dry; blood-red drops are caught in alcohol.', why: 'The "fixed red oil", the most prized antimonial tincture.', touches: ['sulfur'] },
      { title: 'Reduce the star regulus', how: 'The ore is fused with iron and tartar to give the metal, then fused again with niter until a star pattern appears on its surface.', why: 'The "little king", whose spirit the Flamel path passes into mercury on the way to the Stone. Mixtures with niter are, in effect, gunpowder.' },
    ],
    honest: 'Antimony poisons much as arsenic does. After deaths from antimonial remedies, the Paris Parlement banned them in 1566 for about a century.',
  },

  stone: {
    id: 'stone', title: 'The Philosopher\'s Stone', latin: 'Magnum opus', tier: 'read',
    purpose: 'Gold, the most perfect metal, "planted" in a living mercury and grown through the colours to a red stone. Three classic roads lead here: lead acetate (wet), the star regulus (dry), and the divine cinnabar.',
    steps: [
      { title: 'Purify the mercury', how: 'Washed, ground with salt and vinegar, pressed through leather.', why: 'Not to make it cleaner, the texts say, but to "open" it to receive life: the field made ready.' },
      { title: 'Animate it', how: 'By months of digestion with native gold, or by "flights of the eagle": repeated union with the antimony regulus through silver (the "doves of Diana"), or with sulfur as cinnabar and redistillation from iron, seven times.', why: 'To wake the generative power in the mercury: the prepared womb.', touches: ['mercury'] },
      { title: 'Join the opposites', how: 'Animated mercury and fine gold, four to one, sealed in a long-necked flask with the "Hermetic seal".', why: 'The Rebis, the "two-thing": mercury the female, gold the male. Their child is the Stone.', touches: ALL },
      { title: 'Nigredo', how: 'Months of gentle heat; the matter darkens to black.', why: 'Putrefaction: the old forms die.' },
      { title: 'The peacock\'s tail', how: 'Iridescent colours play across the surface.', why: 'The first sign that life is returning.' },
      { title: 'Albedo', how: 'About nine months more; the matter whitens.', why: 'Purification: the white stone, lunar and receptive.' },
      { title: 'Citrinitas and Rubedo', how: 'The heat is raised slowly; the white yellows, the yellow deepens to red, and the matter matures.', why: 'Completion: the Red Stone of the first degree, called a medicine for "man and metals".' },
      { title: 'Inceration', how: 'The stone is fed more mercury until it melts like wax.', why: 'To give it ingress into metals. After this it serves for transmutation only, never as medicine.' },
      { title: 'Multiplication', how: 'Each repetition with fresh mercury is said to multiply its power tenfold.', why: 'The texts warn that past about seven turns it grows luminous, then unstable.' },
      { title: 'Projection', how: 'A pinch is cast onto molten silver or base metal.', why: 'The final test, which the old adepts insisted was physical.' },
    ],
    honest: 'No transmutation has ever been verified. Physics can turn mercury into gold, but only a few atoms at a time, in a reactor or an accelerator. Mercury vapour causes permanent nerve and kidney damage, and spilled mercury contaminates a house for years. Bartlett\'s own conclusion is the one that matters: the real subject is the operator, who must become the living stone first.',
  },
};
