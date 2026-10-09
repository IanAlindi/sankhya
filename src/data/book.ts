// "Real Alchemy: A Primer of Practical Alchemy" by Robert Allen Bartlett (Quinquangle Press, 2006),
// chapter by chapter, as the book gives it. Every process is a list of steps, each with its purpose,
// keeping the book's quantities, temperatures, claims and warnings. Bartlett's wording is restated;
// quotations come from public-domain texts.
import type { Work } from './alchemy';

export type StageK = 'nigredo' | 'albedo' | 'citrin' | 'rubedo';
export type FigId =
  | 'essentials' | 'elements' | 'zodiac' | 'fires' | 'week' | 'fractions' | 'spiral' | 'tree'
  | 'hand' | 'ores' | 'golds' | 'stages' | 'herbs' | 'planets' | 'firecycle';

export type Block =
  | { k: 'p'; t: string }
  | { k: 'h'; t: string; eyebrow?: string }
  | { k: 'quote'; t: string; by: string }
  | { k: 'list'; items: string[]; title?: string; ordered?: boolean }
  | { k: 'cards'; items: { title: string; sub?: string; text: string }[] }
  | { k: 'caution'; t: string }
  | { k: 'claims'; title: string; intro?: string; items: { name: string; text: string }[]; after?: string }
  | { k: 'work'; id: string }
  | { k: 'fig'; id: FigId };

export interface BookChapter { id: string; n: string; title: string; stage: StageK; blocks: Block[] }

const ALL = ['salt', 'sulfur', 'mercury'] as const;

// =================================================================================================
// THE WORKS
// =================================================================================================

export const WORKS: Record<string, Work> = {
  // ---------------------------------------------------------------- Chapter 4
  pattern: {
    id: 'pattern', title: 'The spagyric pattern', latin: 'Spagyria',
    purpose: 'Paracelsus’s name, from Greek words for “to separate” and “to reunite”. Every work in the book repeats these three movements.',
    steps: [
      { title: 'Separation', how: 'Take the thing apart into its Three Essentials: its Sulfur (oil), its Mercury (spirit) and its Salt (body).', why: 'Each essential is mirrored even on the physical level, in a form harmonious to its nature, so it can be held and worked on its own.', touches: [...ALL] },
      { title: 'Purification', how: 'Cleanse each essential by the operation that suits it: redistillation for oil and spirit, fire and recrystallisation for salt.', why: 'To refine them physically and exalt them spiritually.' },
      { title: 'Cohobation', how: 'Recombine the purified essentials and let them digest together.', why: 'To bring the three into perfect proportion and harmony, a greater state of perfection than the plant had in nature.', touches: [...ALL] },
    ],
  },

  rosemary: {
    id: 'rosemary', title: 'The Three Essentials of rosemary', latin: 'The detailed method', tier: 'skill', time: 'several weeks',
    purpose: 'The book’s fuller method, chosen because it shows each of the Three Essentials appearing as a separate substance. Rosemary is ruled by the Sun.',
    steps: [
      { title: 'Gather with the Sun and Moon in mind', how: 'Pick fresh rosemary with an eye to the disposition of the Sun and the Moon. Chop it finely, put it in a flask with a little water to make a paste, and let it stand a while to loosen.', why: 'Timing joins the work to the plant’s ruling planet; the paste opens the plant.' },
      { title: 'Steam out the oil', how: 'Inject steam into the herb paste and catch the hot vapours in a cooling condenser. Water collects, and on it floats a layer of oil, the essential oil of rosemary. Collect the oil.', why: 'The oil is the first essential, the Alchemical Sulfur: the material vehicle of the plant’s Soul and character.', touches: ['sulfur'] },
      { title: 'Ferment the remains', how: 'Leave the watery mush in the flask to ferment.', why: 'In fermentation the plant “dies” and “gives up the ghost”: its life force departs into the watery medium.', touches: ['mercury'] },
      { title: 'Distil the spirit', how: 'After fermentation, distil a volatile liquid, mainly alcohol, from the mush.', why: 'This is the Alchemical Mercury, carrying the Spirit of the plant, which is why liquor shops still sell “spirits”. The alcohol is not the spirit itself, only its vehicle and focal point in the plant world.', touches: ['mercury'] },
      { title: 'Purify oil and spirit', how: 'Redistil the Mercury and the Sulfur a number of times.', why: 'Until they are highly refined in the physical sense and exalted in the spiritual sense.', touches: ['sulfur', 'mercury'] },
      { title: 'Burn the residue to ash', how: 'Dry the extracted plant material and incinerate it to ash.', why: 'This purges the impurities and structural parts that protected the plant while it grew. They have served their purpose and are no longer needed.', touches: ['salt'] },
      { title: 'Draw out the white salt', how: 'Dissolve the light grey to white ash in water, filter, and evaporate the liquid.', why: 'A purified white crystalline salt remains: the Alchemical Salt, the true body of the plant.', touches: ['salt'] },
      { title: 'Saturate the salt with its Sulfur', how: 'Powder the salt finely and saturate it with the plant’s purified oil.', why: 'A kind of resurrection begins: the body receives its soul.', touches: ['salt', 'sulfur'] },
      { title: 'Awaken it with its Mercury', how: 'Add the purified spirit.', why: 'The life force wakes the body and soul into activity.', touches: ['mercury'] },
      { title: 'Digest', how: 'Let it digest for a period.', why: 'The “Elixir” is complete: an exalted, evolved living medicine said to express the plant’s true healing powers on body, soul and spirit. Isaac Holland wrote that spirit and body reunited this way have a hundred times more power than before.', touches: [...ALL] },
    ],
  },

  basics: {
    id: 'basics', title: 'The easy method', latin: 'A simple spagyric elixir', tier: 'easy', time: 'about 3–4 weeks',
    purpose: 'The method everyone can do with things most homes already have. The Mercury within a kingdom is universal, so the spirit can come from the liquor store.',
    steps: [
      { title: 'Buy your Mercury', how: 'Ideally Everclear (95% alcohol, depending on your state); 100-proof vodka (50%) is usually available and satisfactory. Any strong alcohol will do, provided it is potable. Never use denatured alcohol or methanol.', why: 'The life force that animates one plant is largely the same as in any other, so spirit distilled from any fermented plant serves as the first essential.', touches: ['mercury'] },
      { title: 'Grind the plant', how: 'Take the plant you want to work with and grind it to a fine powder.', why: 'The Mercury of each kingdom has an affinity for that kingdom’s Sulfur; the finer the powder, the more it can reach.' },
      { title: 'Cover it with spirit', how: 'Put the powder in a jar (a canning jar works well) and pour on the alcohol until it covers the herb by one or two finger widths. Lay plastic wrap over the top and screw the lid on tightly.', why: 'The spirit draws out the plant’s Sulfur. The plastic wrap prevents contact with the metal lid.', touches: ['mercury', 'sulfur'] },
      { title: 'Digest two weeks', how: 'Place the sealed jar in a warm place out of direct light (the top of a water heater is a good spot) for about two weeks, shaking it well every day.', why: 'Digestion: by the end the alcohol is deeply coloured with the plant.', touches: ['mercury', 'sulfur'] },
      { title: 'Press out the extract', how: 'Pour the whole contents into an old nylon stocking set in a second jar. Wearing rubber gloves, squeeze out as much liquid as you can, then seal the jar and let it stand.', why: 'This liquid holds the combined Mercury and Sulfur of the plant.', touches: ['mercury', 'sulfur'] },
      { title: 'Burn the residue outside', how: 'Put the extracted plant residue in a fire-resistant dish outdoors, touch a match to it and let it burn down to ash.', why: 'The first calcination, which frees the body.', touches: ['salt'] },
      { title: 'Whiten the ash', how: 'Grind the ash very fine, return it to the dish, and heat it over a gas burner or in the oven under the broiler until it is as light grey to white as possible.', why: 'This ash contains the Salt principle of the plant; the whiter, the purer.', touches: ['salt'] },
      { title: 'Reunite while warm', how: 'Grind the ash quickly while it is still warm and add it to the extract you collected.', why: 'The three essentials come back together.', touches: [...ALL] },
      { title: 'Digest one week', how: 'Seal the jar again and keep it warm for at least a week, shaking it very well every day.', why: 'Time for the reunion to take.' },
      { title: 'Filter and settle', how: 'Filter the liquid through a coffee filter and let it stand in a clean glass container for about 48 hours to see whether more insolubles settle out.', why: 'Only what has truly united stays in the liquid.' },
      { title: 'Bottle it', how: 'Decant the clarified extract into dropper bottles.', why: 'A simple spagyric elixir, holding the three essentials of the plant in exalted form, able to express its truest and most powerful healing on the various levels of our constitution.' },
      { title: 'Work with intent and timing', how: 'Work with conscious intent from a sacred space. Note whether the Moon waxes or wanes, and work on the day whose planet rules the herb, preferably within the hour after sunrise.', why: 'The book says the more you do this, the more effective the result.' },
    ],
  },

  sevenbasics: {
    id: 'sevenbasics', title: 'The Seven Basics', latin: 'One elixir for each day', tier: 'easy', time: 'a week of days, then ongoing',
    purpose: 'Seven elixirs made by the easy method, one for each planet of the week, to begin rebalancing and transformation at every level.',
    steps: [
      { title: 'Make seven elixirs', how: 'Use the easy method seven times, once with an herb of each planet (see the appendix lists).', why: 'One for each “interior star”.' },
      { title: 'Take the Sun’s on Sunday', how: 'The Sun herb elixir on Sunday, the Moon’s on Monday, and so on through the week.', why: 'Each day gently harmonises the system ruled by its planet.' },
      { title: 'A few drops at a time', how: 'Start with a few drops in a small amount of water or wine.', why: 'To begin the process gently.' },
      { title: 'Keep going', how: 'Use the Seven Basics over time.', why: 'You really are what you eat: their refined matter becomes part of you, and you in turn become more refined. The book also uses them as the preliminary purification before stronger medicines like the Vegetable Stone.' },
    ],
  },

  // ---------------------------------------------------------------- Chapter 5
  solar: {
    id: 'solar', title: 'Solar distillation', latin: 'The simplest still', tier: 'easy',
    purpose: 'A still anyone can build to try distillation before buying glassware. Old texts are full of pictures of it.',
    steps: [
      { title: 'Nest two jars', how: 'Stand a jar holding the liquid to be distilled inside a larger jar, and seal the larger one.', why: 'The outer jar becomes the condenser and the receiver.' },
      { title: 'Set it in the sun', how: 'Place it in a sunny spot.', why: 'The sun is the fire.' },
      { title: 'Collect the distillate', how: 'The distillate forms on the walls of the large jar and runs down to the bottom, where you collect it.', why: 'Not very efficient or suitable for every distillation, but available to anyone.' },
    ],
  },

  rectify: {
    id: 'rectify', title: 'Rectifying the spirit', latin: 'Rectification', tier: 'skill',
    purpose: 'The most frequent operation in herbal alchemy: redistilling alcohol until it is pure, and spiritualised.',
    steps: [
      { title: 'Distil in the water bath', how: 'Distil the spirit gently in a water bath (the first degree of fire).', why: 'The water bath cannot exceed 100 °C, so nothing scorches.' },
      { title: 'Repeat six to twelve times', how: 'Redistil the distillate again and again.', why: 'Often not so much to raise the purity as to elevate, or spiritualise, the matter.' },
      { title: 'Dry the last water out', how: 'Simple distillation will not take alcohol beyond about 95%. Add a drying agent such as potassium carbonate or calcium oxide (quicklime) and distil again.', why: 'These do not dissolve in alcohol but have a voracious affinity for water, which they take out of it.' },
    ],
  },

  digestion: {
    id: 'digestion', title: 'Digestion', tier: 'easy',
    purpose: 'One of the most common operations: the whole Art is a controlled digestion.',
    steps: [
      { title: 'Hold a constant warmth', how: 'Let the material incubate at a constant temperature.', why: 'To give the matter a heated environment in which to react or slowly mature, like hatching an egg.' },
      { title: 'Give it the time it needs', how: 'The period varies with what needs to happen.', why: 'Maturation cannot be hurried.' },
      { title: 'Raise the heat slowly over a long digestion', how: 'Over a lengthy course the temperature may need to be raised step by step.', why: 'To follow the matter as it changes.' },
    ],
  },

  sublimation: {
    id: 'sublimation', title: 'Sublimation', tier: 'skill',
    purpose: 'Rarefaction of a solid: the body opens and its finer parts ascend, to be caught in exalted form. The ammonia salts are the classic subjects.',
    steps: [
      { title: 'Lay out the matter', how: 'Spread it in a layer on the bottom of a Corning Ware casserole.', why: 'A heat-proof vessel to rise from.' },
      { title: 'Cover with a second casserole', how: 'Invert another casserole over it.', why: 'The upper dish is the cool condensing surface.' },
      { title: 'Heat the bottom gently', how: 'The sublimation temperature depends on the matter, from near room temperature to a full red heat.', why: 'The solid goes straight to vapour without passing through a liquid.' },
      { title: 'Collect the sublimate', how: 'Scrape the crystals from the upper surfaces.', why: 'The finer parts, purified and exalted. (The same happens to ice cubes left long in a freezer, and it is the basis of freeze-drying.)' },
    ],
  },

  circulation: {
    id: 'circulation', title: 'Circulation', tier: 'easy', time: 'a month or longer',
    purpose: 'Continuous distillation inside one vessel, to evolve the matter. The easy step from spagyric preparations to truly alchemical ones.',
    steps: [
      { title: 'Use a tall bottle', how: 'Put three or four ounces of your subject (one of the Seven Basics, say) into a tall bottle such as a long wine bottle.', why: 'Height gives the vapour room to cool.' },
      { title: 'Warm the bottom, keep the top cool', how: 'Set it on a warm heating pad.', why: 'The liquid distils upward, meets the cool upper glass, condenses and falls back into itself.' },
      { title: 'Let it circulate', how: 'A month or longer is usual.', why: 'The matter passes through many life, death and rebirth cycles, and is evolved toward a more perfect state.' },
    ],
  },

  calcination: {
    id: 'calcination', title: 'Calcination and leaching', latin: 'The Salt of Salt', tier: 'easy',
    purpose: 'Calx was the old word for lime, a white powder. Fire burns away the volatile parts and reveals the mineral body, the Salt. Leaching gets it pure even when the ash refuses to whiten.',
    steps: [
      { title: 'Go outside', how: 'Unless you have a good fume hood, this is outdoor work.', why: 'The smoke and smell attract the neighbours and the groans of your household.' },
      { title: 'Burn the residue', how: 'Put the plant residue left after extraction in a heat-resistant dish (metal is fine, but avoid aluminium) on a brick or other fireproof stand, and touch a match to it. Stir now and then so as much as possible burns.', why: 'It turns black, and with luck calcines itself to grey. A small propane camp stove is perfect for this and many other operations.', touches: ['salt'] },
      { title: 'Grind and calcine again', how: 'Grind the grey ash and keep calcining.', why: 'Prolonged calcining and grinding eventually gives a very light grey to almost white ash.', touches: ['salt'] },
      { title: 'Leach with water', how: 'To speed things up, mix the grey ash with ten to twenty times its volume of distilled water. Shake or stir well; you can heat it to near boiling. Filter and keep the liquid.', why: 'The soluble salts pass into the water.' },
      { title: 'Evaporate', how: 'Let the liquid evaporate in a bowl under gentle heat. Collect the white crystalline material, grind it fine, and keep it dry.', why: 'This is the Salt of Salt.', touches: ['salt'] },
      { title: 'Discard the dead head', how: 'What stayed in the filter is the Caput Mortuum (Dead Head), also called Terra Damnata (Damned Earth).', why: 'It is usually thrown away.' },
    ],
  },

  saltofsulfur: {
    id: 'saltofsulfur', title: 'The Salt of Sulfur', latin: 'For plants with a fixed Sulfur', tier: 'skill',
    purpose: 'Many plants give little volatile oil; their Sulfur is said to be fixed. This second plant salt is a magnet for the subtle Sulfur of that plant.',
    steps: [
      { title: 'Thicken the liquor', how: 'Take the fermentation liquor after the alcohol has been removed, or an alcohol extract of the plant, and evaporate it to a thick, honey-like mass.', why: 'This concentrates the fixed part.' },
      { title: 'Calcine it', how: 'Calcine the mass.', why: 'It turns black, and may reach grey with more heat, but usually does not.', touches: ['salt'] },
      { title: 'Wet and re-calcine', how: 'Grind the black material and wet it just to saturation with distilled water, or better, the plant’s own phlegm. Let it stand overnight, then calcine it again gently.', why: 'Each round it becomes lighter.' },
      { title: 'Repeat to white', how: 'Wet and calcine several times.', why: 'Slowly it comes to a very light grey or even white.' },
      { title: 'Leach and crystallise', how: 'Leach it with water as for the plant ash, filter and crystallise.', why: 'The Salt of Sulfur. In almost every case a long, slow calcination works better than a short, violent one.', touches: ['salt', 'sulfur'] },
    ],
  },

  solve: {
    id: 'solve', title: 'Solve et coagula', latin: 'Dissolve and coagulate', tier: 'easy',
    purpose: 'An ancient formula for exalting matter. Chemically a recrystallisation; alchemically a life, death and rebirth, repeated until the subject grows more powerful.',
    steps: [
      { title: 'Collect the phlegm', how: 'After the alcohol has been removed, keep distilling the fermentation liquid down to the honey-like residue used for the Salt of Sulfur. The water that comes over is the Phlegm; keep it.', why: 'It is held to be the best solvent for purifying the salts of the body it came from.' },
      { title: 'Dissolve', how: 'Dissolve your salts in distilled water, the phlegm, or a water specially prepared to have captured certain astrological influences.', why: 'In the liquid state materials are far more susceptible to astrological influence, especially the Moon’s, so a planetary power can be impressed or strengthened.', touches: ['salt'] },
      { title: 'Filter', how: 'Filter the solution.', why: 'To remove what will not dissolve.' },
      { title: 'Coagulate', how: 'Evaporate it to dryness again.', why: 'The salt is reborn.', touches: ['salt'] },
      { title: 'Repeat', how: 'Do it a number of times.', why: 'With each cycle the subject becomes more powerful. As fire purifies the spiritual energies (niter), water purifies the material ones (salt).' },
    ],
  },

  // ---------------------------------------------------------------- Chapter 6
  magistery: {
    id: 'magistery', title: 'The Magistery', latin: 'After Paracelsus', tier: 'skill', time: '5–6 months',
    purpose: 'A series of digestions and distillations that volatilise all three essentials, then a circulation. Seven can be made, one per planet, as with the Seven Basics.',
    steps: [
      { title: 'Cover fresh herb with strong spirit', how: 'Chop a fresh plant a little, put it in a container and cover it with alcohol: rectified spirit of wine ideally, but any strong potable alcohol (190 proof) works. Seal it.', why: 'The vegetable Mercury begins to take up the plant.', touches: ['mercury'] },
      { title: 'Digest a month at 40 °C', how: 'Let it digest at about 40 °C for one month.', why: 'Maturation.' },
      { title: 'Distil it dry', how: 'Distil the matter gently in a water bath until it is dry. Be careful not to burn it.', why: 'The distillate now holds the liquid of the plant as well as the alcohol you began with.', touches: ['mercury', 'sulfur'] },
      { title: 'Pour it over fresh herb', how: 'Pour the distillate over some fresh herb and digest again at 40 °C for a month. Distil the whole again.', why: 'The distillate increases in volume each time.' },
      { title: 'Repeat to five times the volume', how: 'Keep digesting fresh herb in the distillate for a month and distilling, until you have five times the volume of alcohol you started with: begin with 100 mL, end with 500 mL.', why: 'The liquid is now mostly the plant itself.' },
      { title: 'Circulate one month', how: 'Circulate the final distillate for one month.', why: 'The Magistery collects as oily-looking drops that sink to the bottom or float on top, depending on the herb’s nature.', touches: ['sulfur'] },
      { title: 'Collect and seal', how: 'Collect the drops with a dropper into a small vial and keep it well sealed.', why: 'Paracelsus says one part of the Magistery has the effect of two hundred times as much dried plant: half an ounce equals a hundred ounces.' },
    ],
  },

  ens: {
    id: 'ens', title: 'The Ens tincture', latin: 'After Paracelsus and Franz Hartmann', tier: 'skill', time: '3–5 weeks after collecting the oil of tartar',
    purpose: 'In his Paramirum, Paracelsus describes five powers, the Ens (plural Entia), that are the root causes of disease: subtle, spiritual, yet involved in physical causes. The Ens tinctures act at that level and are counted among the most powerful spagyric medicines, comparable to an elixir of greater maturity. One can be made for each planet.',
    steps: [
      { title: 'Gather the materials', how: 'Very strong alcohol, not less than 95%; one or two pounds of potassium carbonate; a wide glass baking dish.', why: 'The same materials as the Seven Basics, plus the salt.' },
      { title: 'Get the salt of tartar', how: 'Buy potassium carbonate from a chemical supplier or, much cheaper, as “pearl ash” from a ceramics supplier. Or leach it from wood ashes (oak, grapevine and fern ash especially): put the ashes in a large plastic bucket, pour clean water over them, stir, let settle, pour off the clear liquid, filter and evaporate.', why: 'In the old days potassium carbonate was called the Salt of Tartar.', touches: ['salt'] },
      { title: 'Whiten the crude salt', how: 'The crystalline mass left after evaporation is more or less white; set it under the broiler for a while to whiten it.', why: 'A purer salt.', touches: ['salt'] },
      { title: 'Purify it by deliquescence', how: 'Set the crystals outside, protected from dust and rain, from late evening to early morning several nights running. Much of it turns to liquid. Collect the liquid and evaporate it in a clean dish. You can calcine this crude carbonate, dissolve it in water and recrystallise it several times.', why: 'The process is free, the salt reusable, and it teaches the manipulation of salts.' },
      { title: 'Spread it in a glass dish', how: 'A thin layer, no more than a quarter of an inch thick. The carbonate will etch the glass, so don’t use anything you value.', why: 'A wide surface to drink the air.', touches: ['salt'] },
      { title: 'Expose it to the night air', how: 'Place the dish where the night air reaches it, ideally in spring and early summer.', why: 'As it liquefies (deliquesces) it absorbs moisture said to carry a Universal Fire or Vital Force, most easily gathered in spring and early summer.' },
      { title: 'Collect the Oil of Tartar per Deliquium', how: 'Draw the liquid off into a clean container as it accumulates. When you have several ounces, filter it through a ball of cotton or glass wool.', why: 'Paper filters soak up the liquid and fall apart from its corrosiveness.' },
      { title: 'Cover the herb with it', how: 'Put about two ounces of finely ground herb in a clean, dry jar and pour in the clear fluid until it covers the herb and the whole becomes a liquefied mass. Leave room to shake; seal with a tight plastic lid. Begin when the herb’s ruling planet is in a powerful position.', why: 'The timing assists the Work.' },
      { title: 'Digest one to two weeks', how: 'Shake it now and then.', why: 'The liquid becomes darkly coloured.' },
      { title: 'Press it out', how: 'Carefully squeeze the mixture through a nylon stocking into a clean vessel, with gloves and eye protection.', why: 'To keep the coloured liquid.' },
      { title: 'Add an equal amount of strong alcohol', how: 'Pour in an equal volume of alcohol of at least 95% and shake daily so the liquids mix; the lighter alcohol floats on top. If the two do not separate there was too much water in the herb or the alcohol: slowly add dry potassium carbonate to absorb it. If they still won’t separate, start again.', why: 'The alcohol floating on top will become the Ens tincture.', touches: ['mercury', 'sulfur'] },
      { title: 'Draw off the tincture', how: 'The alcohol darkens within a few days. After about two weeks or longer, carefully draw it off the top of the oil of tartar and herb layer. Let it stand a day or two, then filter.', why: 'The Ens tincture, ready for use.' },
      { title: 'Freeze out the salt', how: 'Let it stand in a freezer meanwhile.', why: 'Any water holding dissolved potassium carbonate crystallises out more easily, giving the cleanest separation.' },
      { title: 'Save the oil of tartar', how: 'Dry it, calcine it, and use it again.', why: 'Nothing is wasted.', touches: ['salt'] },
      { title: 'Take it on the planet’s day', how: 'Generally five to ten drops in a glass of wine or water on the day ruled by the herb’s planet.', why: 'It acts on the subtle or astral body as well as with the plant’s enhanced medicinal qualities. Note its physical effects and how it changes your habitual patterns of thought and emotion.' },
    ],
    cautions: [
      'The leached ash liquid is lye: it is caustic and can burn the skin and seriously injure your eyes.',
      'Avoid any exposure to the potassium carbonate, dry or liquefied. Wash your hands thoroughly after handling it, and protect your eyes.',
    ],
    notes: [
      'Mark Stavish (Practical Plant Alchemy, 1998), as the book quotes him: the Ens shows the highest initiatic virtue of its plant. Alchemy has no lodges or rituals of advancement, so initiation is interior: we initiate ourselves into the Work and the Work initiates us. The spagyric tinctures, the Ens above all, clear blocks in our psychic anatomy, like the nadis of yoga or the meridians of acupuncture.',
    ],
  },

  vegstone: {
    id: 'vegstone', title: 'The Vegetable Stone', latin: 'Opus minor · the Lesser Circulation', tier: 'skill', time: 'a year or longer',
    purpose: 'The Elements of one herb balanced in their most exalted form: the true Quintessence of the plant. The Stone acts powerfully on body and subtle energy, opens awareness of Nature’s operations between our “interior stars”, and stands as a merit badge of mastery over the vegetable realm and your own lower nature.',
    steps: [
      { title: 'Start with enough plant', how: 'Plan on ten to fifty pounds of herb, depending on the herb. Prefer plants that give a good quantity of essential oil and ample salts after calcination.', why: 'Start with too little and you end with very little.' },
      { title: 'Separate the Three Essentials', how: 'Steam-distil the essential oil; ferment the plant and distil the alcohol; redistil it many times until very pure.', why: 'Sulfur and Mercury, each in its own vessel.', touches: ['sulfur', 'mercury'] },
      { title: 'Make the Salt of Salt', how: 'Calcine the remaining plant residue and leach out the salts.', why: 'The body.', touches: ['salt'] },
      { title: 'Make the Salt of Sulfur', how: 'Evaporate and calcine the liquid left after fermentation and removal of the alcohol, then leach the calcined residue.', why: 'The second salt, the magnet for the Sulfur.', touches: ['salt'] },
      { title: 'Charge the salts with Solar Fire', how: 'Set them outside at night to deliquesce, then leave them to dry in the Sun.', why: 'As they crystallise they absorb and trap more of the Sun’s energy.', touches: ['salt'] },
      { title: 'Open their pores', how: 'Take the salts inside, grind them fine, put them in a Pyrex dish, and roast them in an oven at 200–300 °C.', why: 'The old artists said this roasting opens the salts’ “pores”.' },
      { title: 'Grind warm', how: 'Take the still-warm salts out, grind them fine in a warm mortar, and pour them into a vial in an even layer.', why: 'Ready to drink.' },
      { title: 'Saturate with oil', how: 'Pour on just enough essential oil to saturate the salts. Seal the vial and keep it in an incubator at 40 °C, undisturbed for a week.', why: 'The body takes in its soul.', touches: ['salt', 'sulfur'] },
      { title: 'Feed it weekly', how: 'On the appropriate day of the following week, check the salts; if they have absorbed all the oil, add more. When the same amount of oil remains on top as you put in a week before, they have taken all they can hold.', why: 'Saturation.' },
      { title: 'Then the alcohol', how: 'Add your alcohol the same way until no more will go in.', why: 'The stone is now finished to the First Degree.', touches: ['mercury'] },
      { title: 'Increase its virtue', how: 'Grind the stone, give it a gentle distillation, and calcine the residue. Grind the salts again and return the distillate, adding fresh oil and alcohol as needed. Repeat several times.', why: 'In the end you have a powerful medicine.' },
      { title: 'Mature it', how: 'Let it digest in the incubator’s heat for six months to a year. If it dries out, keep adding fresh oil and alcohol in equal amounts.', why: 'Done properly, the matter congeals into a hard stone.' },
      { title: 'Use it on fresh herb', how: 'Immerse the stone in a macerating herb-and-water mixture.', why: 'The herb’s Salt, Sulfur and Mercury gather as a layer on the water’s surface, ready for use with no further preparation, and the Stone is recovered unharmed.' },
      { title: 'Use it as medicine', how: 'Take a small amount in a little water or wine.', why: 'Its effects follow its planetary ruler: it can open doors of perception to that sphere and give lasting insight, and its effect on general health can be astonishing and overpowering.' },
    ],
    cautions: ['Because its effects can be overpowering, the book highly recommends first purifying the artist with preparations such as the Seven Basics.'],
  },

  // ---------------------------------------------------------------- Chapter 7
  rain: {
    id: 'rain', title: 'The Universal Seed from rainwater', latin: 'After The Golden Chain of Homer', tier: 'easy', time: 'a month to a year or more',
    purpose: 'A method of capturing the Universal Seed of Nature, determining it, and growing it toward perfection using only rainwater. The book calls the water works inherently safe and open to anyone.',
    steps: [
      { title: 'Choose the season', how: 'Collect in spring, when the Sun is in Aries, Taurus or Gemini. Thundershowers are preferred.', why: 'Lightning fixes more nitrogen in the air.' },
      { title: 'Catch it untouched', how: 'Stake out a piece of plastic sheeting and lead the run-off into a catch bottle or plastic bucket. The rain must not touch metal, the Earth, plants or animals, humans included. Filter all the water you collect.', why: 'Water charged with the Secret Fire becomes determined to a kingdom by what it touches: plants, animals or earth.' },
      { title: 'Let it breathe', how: 'Cover the container with a cloth to keep dust out while letting the water breathe.', why: 'It must ferment.' },
      { title: 'Ferment it warm', how: 'Keep it at 30–40 °C for at least a month; longer is better, and some wait a year or more.', why: 'White to brownish solid tufts like cotton appear floating in the water: the Universal Gur, the Seed of Nature.' },
      { title: 'Sweat off the first quarter', how: 'Put all the water, Gur included, in a still and very gently distil over the first quarter of its volume. Label it Fire and Air of Water.', why: 'The lightest parts come first.' },
      { title: 'Distil the Water of Water', how: 'Raise the temperature and continue until most of the water has come over, but not to dryness. Label it Water of Water.', why: 'Stopping short protects the earth below.' },
      { title: 'Dry the Earth of Water', how: 'Put the residue in a dish and let it dry slowly in the Sun. Label it Earth of Water; it contains the Universal Gur.', why: 'The seed is in this earth.', touches: ['salt'] },
      { title: 'Moisten and determine the Seed', how: 'Moisten the Earth with the Fire, Air and Water fractions in various proportions.', why: 'The text says that by the proportions one generates Mineral, Vegetable or Animal life in the Gur: the Universal Seed can be determined to grow any specified form to maturity.' },
    ],
  },

  sevenfold: {
    id: 'sevenfold', title: 'The seven-fold distillation', latin: '4 × 3', tier: 'easy',
    purpose: 'Another common way to separate the Elements of water, into twelve fractions: the Body, Soul and Spirit of each of the Four Elements.',
    steps: [
      { title: 'Ferment the water', how: 'As above.', why: 'Only the fermented water divides this way.' },
      { title: 'Distil four equal quarters', how: 'Distil gently into four equal volumes. The first to come over is Fire of Water, the second Air of Water, then Water, then Earth. Stop before dryness; dry the residue and label it the Gur.', why: 'The four Elements of the water.' },
      { title: 'Divide each quarter in three', how: 'Distil each quarter in turn into three parts, which come over in the order Sulfur, Mercury, Salt. The Fire fraction gives Sulfur of Fire of Water, then Mercury of Fire of Water, and what remains is Salt of Fire of Water.', why: 'Twelve fractions: Body, Soul and Spirit of each Element.', touches: [...ALL] },
      { title: 'Give each its sign', how: 'Cardinal signs go with the fiery Sulfur, Mutable with the mediating Mercury, Fixed with the Salt. Sulfur of Fire of Water is Aries, Mercury of it Sagittarius, Salt of it Leo; the other elements follow the same rule (see the grid).', why: 'Each of the twelve is said to have its own medicinal properties, and these correspondences.' },
      { title: 'Recombine for the Gur', how: 'The twelve fractions can be combined in various proportions to moisten the Gur.', why: 'As in the previous work. The book adds that by proper manipulation of these water works one can even grow and multiply metallic gold as one grows a vegetable crop, because the Mineral realm has its own seed.' },
    ],
  },

  angel: {
    id: 'angel', title: 'Salt of Tartar and Angel Water', latin: 'Vegetable Fire', tier: 'skill',
    purpose: 'Capturing the Universal Fire in a body through the salt’s ability to deliquesce. The water is said to be determined to the Vegetable World, since potassium is everywhere in plant ash.',
    steps: [
      { title: 'Spread the salt', how: 'A layer of potassium carbonate a quarter to half an inch thick in a glass baking dish.', why: 'A wide surface.', touches: ['salt'] },
      { title: 'Set it out at night', how: 'Outside, protected from rain and dust but open to the air, from late evening until six or seven in the morning. Better still in spring, with the Sun in Aries, Taurus or Gemini.', why: 'There is more of the Universal Fire with generative force present in spring.' },
      { title: 'Collect the Oil of Tartar', how: 'The salt deliquesces, liquefied by the moisture of the air, loaded with the condensed Universal Fire, the Secret Fire.', why: 'This liquid, the Oil of Tartar per Deliquium, is the same used in the Ens extraction.' },
      { title: 'Distil to dryness', how: 'Distil the liquid gently just to dryness.', why: 'The clear, watery distillate is called Angel Water.', touches: ['mercury'] },
      { title: 'Revive your herbal salts', how: 'Recrystallise the herbal salts from Angel Water.', why: 'The water, loaded with Secret Fire, becomes enmeshed in the crystals as they form and revivifies them. This transfer always takes place in the liquid state, which is why the alchemists stressed Solution: the volatile becomes fixed and the fixed volatile.', touches: ['salt'] },
      { title: 'Use it for extractions', how: 'Use the distillate in plant extractions.', why: 'It is useful for all work in the herbal realm.' },
      { title: 'Recover the carbonate', how: 'The dried potassium carbonate can be recovered and reused.', why: 'Nothing is wasted.' },
    ],
    cautions: ['The Oil of Tartar is quite caustic and will burn the skin and especially the eyes.'],
  },

  seasalt: {
    id: 'seasalt', title: 'Water of Animal Fire', latin: 'Sea salt', tier: 'easy',
    purpose: 'As potassium salts carry the Vegetable Fire, sodium salts carry the Fire of the Animal World. Both lie in the same period as Hydrogen, the Fire element, at denser levels.',
    steps: [
      { title: 'Use pure dried sea salt', how: 'Sea salt with nothing added to it.', why: 'Common salt is the Animal kingdom’s magnet.', touches: ['salt'] },
      { title: 'Expose it as with the salt of tartar', how: 'Set it out in the night air.', why: 'Salt will not deliquesce, but it absorbs a significant amount of moisture.' },
      { title: 'Distil the water', how: 'Distil off the absorbed water.', why: 'The yield is much smaller but just as powerful for work in the Animal realm.' },
    ],
  },

  dewsalt: {
    id: 'dewsalt', title: 'The Heavenly Dew Salt', latin: 'Mineral Fire', tier: 'danger',
    purpose: 'Ammonium nitrate, the Salt of Dew, carried in rain, snow, dew and hail. Highly deliquescent, determined especially to the Mineral realm but of a Universal nature. There really is a lot of fire in this salt.',
    steps: [
      { title: 'Obtain the salt', how: 'It can be got from collected dew or rainwater, thundershower rain especially, but that is long and tedious. It is sometimes sold in garden stores as fertiliser, though harder to find now because of its use in makeshift explosives. Or prepare it by mixing nitric acid and ammonium hydroxide until neutral, then crystallising.', why: 'The salt itself is ammonium nitrate.', touches: ['salt'] },
      { title: 'Revive it', how: 'Solve et coagula a few times by deliquescence.', why: 'To recharge it with fire.' },
      { title: 'Distil it when it liquefies', how: 'Distil the deliquesced liquid, stopping well before the dry point. Crystals form that can be reused.', why: 'The distillate is loaded with Mineral Fire.', touches: ['mercury'] },
      { title: 'Use the distillate in mineral work', how: 'Use it in place of distilled water in various mineral operations.', why: 'The Mineral Fire can be transferred to your subject to reanimate it. Copper salts also carry Mineral Fire, copper being in group 1B of the periodic table, related to the elements under Hydrogen, all carriers of Fire.' },
    ],
    cautions: ['A powerful oxidiser: it can ignite various kinds of fuel. Be careful with it.'],
  },

  butter: {
    id: 'butter', title: 'Butter of Antimony', latin: 'Universal Fire', tier: 'danger',
    purpose: 'Antimony trichloride, which belongs properly to the mineral works; the book mentions only its use here. Prepared, it has the colour and texture of butter.',
    steps: [
      { title: 'Expose it to the air', how: 'It has a ravenous appetite for moisture and deliquesces even on a hot, sunny day.', why: 'It drinks the fire of the air faster than any other salt.' },
      { title: 'Distil the water', how: 'Distil the water it has absorbed.', why: 'That water is said to carry a truly Universal Fire, which can be set to work in any of the three kingdoms.', touches: ['mercury'] },
    ],
    cautions: ['Its preparation and use are much more difficult and dangerous than any of the other salts: it is toxic and very corrosive, and needs skill and practice to handle safely.'],
  },

  archaeus: {
    id: 'archaeus', title: 'The Archaeus of Water', latin: 'First Being of Water', tier: 'skill', time: 'months',
    purpose: 'An evolved, reconstituted water with surprising medicinal effects: a Universal Mercury, usable as a solvent in any realm or as a healing water on its own.',
    steps: [
      { title: 'Impregnate the rain', how: 'Add distilled Angel Water to a quantity of collected rainwater.', why: 'Water drawn by deliquescence is loaded with Fire, the male, Sulfur, Sun aspect; rain or snow water is the female, Mercury, Lunar aspect of the Celestial Waters.' },
      { title: 'Ferment', how: 'At least a month.', why: 'The marriage takes.' },
      { title: 'Separate the twelve', how: 'Divide it by the 4 × 3 distillation.', why: 'Body, Soul and Spirit of each Element.', touches: [...ALL] },
      { title: 'Rebuild each Element', how: 'Starting with Fire, combine equal volumes of its Sulfur, Mercury and Salt and circulate for several days. Let it cool and set it aside. Repeat for each Element.', why: 'The four Elements in reconstituted form.' },
      { title: 'Rebuild the water', how: 'Combine equal volumes of the four and circulate for a week to a month at about 40 °C. The Gur is not used here.', why: 'The resulting Celestial Water is the Archaeus, the First Being of Water.' },
      { title: 'Determine it to a realm', how: 'Use the Elements unequally: Earth predominant for the Metallic realm; Earth and Water for the Mineral; Water and Air for the Vegetable; Fire and Air for the Animal. Circulate as before.', why: 'All four should be present in each Archaeus, but the proportions determine where it acts.' },
      { title: 'Impregnate the Gur', how: 'Put the dried Gur in a flask, moisten it with the Archaeus, close and digest: about 40 °C for Vegetable works, up to about 90 °C for Mineral and Metal works. Keep just moistening it as it dries.', why: 'The seed is fed.' },
      { title: 'Watch the Vegetable work', how: 'With a vegetable Archaeus, primitive plant life should appear after a time; keep it moist. When the plant appears to die, calcine it, add the ashes to fresh Gur and imbibe again.', why: 'A new and more evolved plant life appears; repeat as often as you like to watch the progression.' },
      { title: 'Watch the Mineral work', how: 'With a mineral Archaeus the moistened Gur first turns gritty like sand and passes through various colours.', why: 'It is said that with correct proportions a few grains of gold and silver may develop.' },
    ],
    notes: ['These works are long, laborious at first and slow to digest. Like cultivating a rare orchid, success may take several attempts; they give real insight into work in which “Nature is assisted by Art”.'],
  },

  // ---------------------------------------------------------------- Chapter 8
  rotation: {
    id: 'rotation', title: 'The Rotation of the Elements', latin: 'The Fountain of Nature',
    purpose: 'The perpetual circulation of the Celestial Fire, which the alchemist follows in the laboratory, and the key by which an essence is extracted, purified and raised to its most sublime state.',
    steps: [
      { title: 'Fire condenses into Air', how: 'The Celestial Fire coagulates into “an invisible, most subtle humidity”, the Element Air.', why: 'Inspissation, or thickening, begins.' },
      { title: 'Air into Water', how: 'The thickening continues.', why: 'Fire and Air come down into the Waters and impregnate them.' },
      { title: 'Water into Earth', how: 'The Waters give their thickest part to the Earth.', why: 'The Earth becomes saturated: the Fire is now trapped within, as the Central Fire.' },
      { title: 'The Central Fire reverses the cycle', how: 'Earth volatilises into a thickened Water, Water into vapour, and Air is rarefied into Fire.', why: 'There the Fire is regenerated by the Celestial Fire and the cycle begins anew.' },
      { title: 'In the laboratory', how: 'Volatilise the earthy parts of your matter (salts, coarse oils), fix the Fire in its ethereal forms (the vegetable Mercury, volatile oils), then unite and circulate them.', why: 'To create a new and exalted balance of the Fire in the original matter.' },
      { title: 'Always through the proper medium', how: 'To unite Fire with Earth, first unite it with its nearest volatile medium, Air; then give them Water as the medium between Air and Earth; then add Earth. Reverse the order to turn Earth into Fire.', why: 'You cannot move from one extreme to the other without the proper medium: each Element is the neighbour’s magnet, solvent, volatiliser, condenser and fixer.' },
      { title: 'Turn the wheel again', how: 'Repeat the rotation.', why: 'Each turn brings the Four Elements into greater balance and purity. The path is a corkscrew rather than a circle, drawing the Elements to a centre of balance: perfect harmony is the Quintessence.' },
    ],
  },

  // ---------------------------------------------------------------- Chapter 11
  vrm: {
    id: 'vrm', title: 'The Vegetable Radical Menstruum', latin: 'Liquid Vegetable Stone · Circulatum', tier: 'skill', time: '9–14 lunar months',
    purpose: 'The marriage of the volatile and fixed vegetable spirits. It belongs to the vegetable works but can be made to act on minerals too.',
    steps: [
      { title: 'Divide a large quantity of red wine', how: 'Set half aside to sour into vinegar (the Fixed Spirit); distil the other half for its alcohol (the Volatile Spirit). Collect all the residues, the feces, together.', why: 'Both spirits of the plant, and the material for its Salt.' },
      { title: 'Rectify the alcohol', how: 'Distil the wine-spirit six or seven times.', why: 'A strong alcohol.', touches: ['mercury'] },
      { title: 'Concentrate the vinegar by freezing', how: 'Half-fill a plastic bottle with vinegar and freeze it. Turn it upside down over a glass jar; after about thirty minutes the concentrated vinegar has thawed and dripped out, leaving a plug of ice. Discard the ice, refreeze, and repeat a third time.', why: 'Water freezes out first.' },
      { title: 'Distil the vinegar', how: 'Distil the concentrated vinegar, discarding the first quarter to third, which is mostly water. Distil to near dryness and keep the distillate.', why: 'This is the Fixed Spirit.' },
      { title: 'Make the salts', how: 'Combine all the solid residues of wine and vinegar and calcine them. Leach out the salts and crystallise several times, letting the salts deliquesce between crystallisations.', why: 'The body of the wine, charged with fire.', touches: ['salt'] },
      { title: 'Marry the spirits', how: 'Blend equal volumes of alcohol and vinegar in a roomy glass vessel, seal it, and circulate for a lunar cycle.', why: 'Volatile and fixed unite.' },
      { title: 'Add the salts', how: 'At the end of the month, slowly add the dry, powdered salts to the cooled liquid. Reseal and circulate another lunar cycle.', why: 'Body joins spirit.' },
      { title: 'Distil to dryness', how: 'At the end of the second cycle, distil the whole carefully to dryness.', why: 'The salts are volatilised into the spirit.' },
      { title: 'Cohobate seven to twelve times', how: 'Return the distillate to the salts left behind, seal, and circulate another cycle; repeat seven to twelve times.', why: 'On the final distillation the menstruum is ready: it should distil over completely and leave no residue.' },
      { title: 'Use it', how: 'Use it to extract plants, and many mineral and metal subjects such as iron and copper.', why: 'It contains ethyl acetate married to the volatile plant salts.' },
    ],
  },

  kerkring: {
    id: 'kerkring', title: 'The Kerkring Menstruum', latin: 'Philosophical Alcohol', tier: 'danger', time: 'about two months',
    purpose: 'Attributed to the Dutch physician Theodor Kerkring, in his commentary on Basil Valentine’s Triumphal Chariot of Antimony. A vegetable spirit magnetised, or determined, to the Mineral realm by contact with prepared salts.',
    steps: [
      { title: 'Take sal ammoniac', how: 'Ammonium chloride; a commercial product is all right here.', why: 'All the volatile ammonium salts are valuable in alchemy. Plants and animals contain sal ammoniac too, and if not captured it vapours away unseen. It was once got from animal wastes and from horns (Hartshorn); the priests of Amun may have made it by subliming soot, the Salt of Amun.' },
      { title: 'Sublime it once', how: 'Sublime it between Corning Ware casseroles over electric or gas heat.', why: 'The sublimed crystals turn pale yellow.' },
      { title: 'Sublime it again', how: 'Collect and sublime a second time.', why: 'It turns more yellow-orange, even reddish in places.' },
      { title: 'And a third time', how: 'Collect and sublime once more; store it in a glass container sealed from moisture.', why: 'Very yellow-orange to red-yellow crystals, ready for use.' },
      { title: 'Prepare the spirit', how: 'A very strong alcohol, at least 95%, preferably from red wine.', why: 'The vegetable Mercury.', touches: ['mercury'] },
      { title: 'Combine at the New Moon', how: 'Four parts sal ammoniac to ten parts alcohol, sealed in a glass vessel, digested at about 40 °C for at least a month.', why: 'The spirit takes on the salt’s mineral nature.' },
      { title: 'Distil three times', how: 'Distil the whole gently to near dryness; distil the distillate two more times.', why: 'The final distillate is the Kerkring Menstruum. Seal it tightly.' },
      { title: 'Keep the residues', how: 'Collect all the residues from the distillations.', why: 'They can charge more alcohol several times.' },
    ],
  },

  tartaralkahest: {
    id: 'tartaralkahest', title: 'The Alkahest of Tartar', tier: 'danger',
    purpose: 'Alkahest, Paracelsus’s word for a universal solvent: one that extracts the Sulfur and Mercury of living metals and even the Sulfur of dead, smelted metals, infusing them with its own vitality. Each Alkahest has remarkable healing power of its own.',
    steps: [
      { title: 'Crush the wine stone', how: 'Crude tartar as it comes from the wine barrel, crushed to 1/8–1/4-inch granules, in a distillation vessel.', why: 'The raw body of the wine.' },
      { title: 'Drive off the phlegm', how: 'Begin with gentle heat, then increase. A water, the Phlegm, comes over, then slows or stops.', why: 'The watery part leaves first.' },
      { title: 'Change receivers and raise the heat', how: 'Fit a new receiver, well cooled in an ice bath, and increase the heat.', why: 'The apparatus fills with thick white vapour; a clear yellowish liquid forms in the receiver, followed by drops of a black, foul-smelling oil.' },
      { title: 'Rectify in the water bath', how: 'Distil the distillate gently in a water bath.', why: 'The Alkahest of Tartar comes over clear and ready. A nasty-smelling black oil remains: the crude Sulfur of Tartar, said to help diseases from obstructing plaques once refined by distillation.', touches: ['mercury'] },
      { title: 'Extract metals with it', how: 'It extracts most metals, even gold and silver, which are hard to open because of their perfect coction of the elements.', why: 'With smelted or refined metals it gives its own alchemical life to revive the tincture and cannot be recovered.' },
      { title: 'Recover it from living minerals', how: 'With a living mineral, recover the Alkahest by gentle distillation and use it again; it is said to grow stronger with use. Dissolve the oily residue in rectified wine spirit, let it stand, and decant the clear tincture.', why: 'The mineral’s tincture, and the solvent returned.' },
    ],
  },

  urine: {
    id: 'urine', title: 'The Alkahest of Urine', latin: 'Niter Alkahest', tier: 'danger', time: 'about three months',
    purpose: 'Urine, “held in contempt by most people but esteemed by the wise”, yields the volatile ammonium salts in a Philosophical, living state.',
    steps: [
      { title: 'Prepare yourself', how: 'Several days at least of a cleansing diet and restricted salt, then only water or wine during the collection.', why: 'Only the finest urine is wanted.' },
      { title: 'Putrefy it', how: 'Close it in a glass vessel and let it putrefy in a warm place for a month or more.', why: 'The odours make it outdoor work.' },
      { title: 'Distil to dryness', how: 'Filter the putrefied urine into a distillation train and distil slowly to dryness.', why: 'The volatile spirit separates.' },
      { title: 'Cohobate three times', how: 'Return the distillate to the solids left (the caput mortuum), digest another month, and distil. Repeat a third time.', why: 'Each pass enriches the spirit.' },
      { title: 'Collect the spirit', how: 'On the final distillation keep the clear distillate.', why: 'The Spirit of Urine, or Alkahest of Urine.', touches: ['mercury'] },
      { title: 'Collect the white sublimate', how: 'As the final distillation ends, raise the heat gently; a white sublimate forms in the upper glass. Collect it and keep it.', why: 'The Volatile Salt of Urine, Van Helmont’s Alkahest, with which he became famous for miracle cures. Some of it is carried in the Alkahest.', touches: ['salt'] },
    ],
    notes: ['Like the Kerkring Menstruum but far superior, because it comes from live sal ammoniac and can revive its subject; the Kerkring, made with commercial sal ammoniac, cannot. John French (The Art of Distillation, 1651): “This spirit, by rectification may be made so pure and subtle that it will burn as fire and dissolve gold and precious stones.”'],
  },

  // ---------------------------------------------------------------- Chapter 12
  ores: {
    id: 'ores', title: 'Preparing and extracting the ores', latin: 'Via humida', tier: 'danger', time: 'months',
    purpose: 'Ores fresh from the earth are preferred to commercial chemicals, because to the alchemist minerals are alive: they grow, evolve, produce seed and die, at an imperceptibly slow rate.',
    steps: [
      { title: 'Choose the planet’s ore', how: 'See the table of ores. Plan on five to ten pounds of raw ore, depending on its quality.', why: 'Oxides, carbonates, sulfides and sulfates are the commonly preferred natural sources.' },
      { title: 'Hand-pick the high grade', how: 'Separate by hand as much high-grade material from the surrounding rock as you can.', why: 'Less rock to purge later.' },
      { title: 'Crush it', how: 'Fold it in cloth or canvas and strike it with a hammer; clean out freed impurities; keep crushing and grinding to a fine powder. A four-inch iron pipe cap with a four-to-six-inch length of pipe makes a good mortar. Heat very hard stones quite hot and throw them into cold water a few times.', why: 'The cloth stops flying debris; quenching cracks hard stone.' },
      { title: 'Roast off the volatile metals', how: 'Roast the powdered ore outside for a day or two at about 90 °C, stirring now and then.', why: 'Drives off associated impurities: arsenic, mercury, cadmium, selenium, zinc and free sulfur.' },
      { title: 'Finish at 250 °C', how: 'Raise the temperature slowly to about 250 °C for a day.', why: 'Removes the last traces of arsenic.' },
      { title: 'Calcine to a calx', how: 'Slowly calcine at higher temperatures, grind, and calcine again. Calcine sulfide ores slowly so their sulfur is replaced by oxygen. Carbonates calcine easily to oxides, or dissolve in acids as salts; a strong vinegar giving the metal’s acetate is often preferred.', why: 'Many ores can be extracted with a menstruum as an oxide (a calx).' },
      { title: 'Extract with a menstruum', how: 'Cover the subject with menstruum, seal, and digest warm, up to about 90 °C. It can take months.', why: 'The menstruum takes on a colour, a tincture.', touches: ['sulfur'] },
      { title: 'Recover the menstruum', how: 'Filter off the tincture and distil off most of the menstruum gently. Save it for future extractions.', why: 'Nothing wasted.' },
      { title: 'Take it up in alcohol', how: 'Evaporate the residue gently to an oily or resinous consistency, extract it in a little strong alcohol, let stand a week or two, and decant the clear tinted liquid.', why: 'The metal’s tincture, ready for use.', touches: ['sulfur'] },
      { title: 'Purify through ether (optional)', how: 'Evaporate the alcohol extract, dissolve the residue in a little ether, let stand, decant and evaporate; extract the residue again with alcohol and distil gently. Keep the distillate.', why: 'It contains the most volatile essence of the metal, free of metallic salts carried through the extractions: a purer Sulfur of the metal.', touches: ['sulfur'] },
    ],
    cautions: ['These fumes are not things you want to breathe: have good ventilation.', 'Without the developed skill and precaution that the plant work builds, certain mineral works are quite deadly.'],
  },

  // ---------------------------------------------------------------- Chapter 13
  radicalvinegar: {
    id: 'radicalvinegar', title: 'The Radical Vinegar', tier: 'danger',
    purpose: 'A very concentrated vinegar loaded with Mineral Fire, which opens most of the Mineral and metallic realm. From easy materials: copper wire and red wine vinegar.',
    steps: [
      { title: 'Blacken the copper', how: 'Ball copper wire up loosely and heat it to redness several times.', why: 'It oxidises to a brittle black mass.' },
      { title: 'Dissolve it in vinegar', how: 'Put the black mass in a glass vessel and cover it with wine vinegar concentrated by freezing. Seal, digest, and shake at least daily.', why: 'In time the liquid turns deep emerald green.' },
      { title: 'Repeat', how: 'Decant and keep the liquid. Heat the wire and extract with fresh vinegar several more times.', why: 'More copper acetate.' },
      { title: 'Crystallise', how: 'Filter all the extracts into a porcelain dish and evaporate gently; collect the deep green crystals of copper acetate. Recrystallise from rainwater to purify.', why: 'The salt to be distilled.', touches: ['salt'] },
      { title: 'Distil the dry crystals', how: 'Crush the dry crystals into a strong distillation apparatus with a cooled receiver. Heat slowly at first, then gradually up to about 400–500 °C.', why: 'The distillate is a very concentrated acetic acid, perhaps faintly blue-green: the Radical Vinegar.', touches: ['mercury'] },
    ],
    notes: ['It has strength enough to open many mineral and metallic substances, and is most useful for preparing metal acetates, from which the Philosophical Mercuries are separated.'],
  },

  acetate: {
    id: 'acetate', title: 'The Acetate Path', latin: 'The Secret Wine Spirit of the Adepts', tier: 'danger',
    purpose: 'A closely guarded secret for centuries: plant life, through vinegar, is transferred into the metal to accelerate its evolution, then the metal’s Mercury, Sulfur and Salt are separated by dry distillation.',
    steps: [
      { title: 'Prepare the metal', how: 'Prepare the mineral or metal ore as an oxide or carbonate.', why: 'A form the vinegar can take up.' },
      { title: 'Make its acetate', how: 'Convert it to an acetate with a live wine vinegar, or better, the Radical Vinegar. Isolate and purify the acetate.', why: 'The plant life enters the metal.', touches: ['salt'] },
      { title: 'Distil the dry crystals', how: 'Distil the crystals themselves, with no liquid: slowly at first, then gradually up to about 400–700 °C.', why: 'Dry distillation splits the matter into its principles.' },
      { title: 'Save the phlegm', how: 'As the temperature rises, moisture comes over first: the water of crystallisation. Collect it and set it aside.', why: 'This Phlegm is used later to extract the salts.' },
      { title: 'Catch the spirit, very cold', how: 'When the phlegm stops, fit a fresh receiver kept very cold. A thick, heavy white vapour comes over and a golden liquid forms.', why: 'Without the cold this spirit escapes.', touches: ['mercury'] },
      { title: 'Take it to the end', how: 'Near the final temperature, drops of blood-red oil distil over and the apparatus fills with white vapour, as if made of chalk. Let it cool and seal the distillate tightly.', why: 'This liquid, often red like wine, is the Menstruum Foetens or Secret Wine Spirit.', touches: ['mercury', 'sulfur'] },
      { title: 'Separate the red and white wine', how: 'Distil it gently.', why: 'A clear, very volatile liquid with the Philosophical Mercury of the metal, and a deep red liquid with its Philosophical Sulfur: the Red and White Wine.', touches: ['mercury', 'sulfur'] },
      { title: 'Purify the white', how: 'Redistil the volatile liquid several times.', why: 'It is mostly acetone with some of the oil’s most volatile parts: industry made acetone this way until the early 1900s.', touches: ['mercury'] },
      { title: 'Purify the red', how: 'Distil it gently: a clear acid phlegm comes over first. Distil the thick blood-red oil that remains at a higher heat, or dissolve it in alcohol and decant the clear tinted liquid.', why: 'The Sulfur, as complex as a plant’s essential oil.', touches: ['sulfur'] },
      { title: 'Extract the Salt', how: 'Remove and calcine the solid residue (the Black Lion), extract it with the combined phlegm, and crystallise.', why: 'The Salt of the metal. Any pure salt of the metal, even a “dead” commercial one, can serve as the body, reanimated with the Mercury and Sulfur as in the plant work.', touches: ['salt'] },
    ],
    cautions: ['The residue from lead is mostly fine lead metal that oxidises rapidly in air; it often ignites by itself and burns like a red-hot coal to ash.'],
    notes: [
      'George Ripley (c. 1450) called the distillate the Blessed Liquor or Menstruum Foetens, holding three things: the Aqua Ardens, which burns like wine spirit; a thick white water, the Lac Virginum or Virgin’s Milk; and a blood-red oil, the Sanguis Leonis or Blood of the Lion. He said the key to all chemistry is hidden in it.',
      'In the 1850s the physician C. A. Becker treated flu, nervous complaints, rheumatism, headaches, fevers and paralysis with the volatile spirit made the old way, which he called Spiritus Aceti Oleosus, and urged his colleagues to regain this remedy. He held that its etheric oils, missing from the commercial product, gave the effect.',
      'Some artists say Philosophical Mercuries come from the metals, while the minerals give an Alkahest.',
    ],
  },

  saturn: {
    id: 'saturn', title: 'The Work of Saturn', latin: 'After Isaac Holland, Opus Saturni', tier: 'danger', time: 'thirty to thirty-two weeks for the stone',
    purpose: 'Holland’s own acetate work on purified lead, which the book says applies equally to other metal and mineral acetates.',
    steps: [
      { title: 'Imbibe the purified Saturn with vinegar', how: 'Put half of the purified lead (lead acetate) in a stone pot, pour on a bottle or more of distilled wine vinegar, set a head on it, and distil the vinegar off in a bath. The head has a hole at the top to pour in fresh vinegar.', why: 'The matter drinks the spirit of the vinegar.' },
      { title: 'Repeat until the vinegar comes off as strong as it went in', how: 'Keep pouring on fresh vinegar and abstracting it.', why: 'Then the matter holds as much spirit of vinegar as it can.' },
      { title: 'Distil it in ashes', how: 'Put the matter in a thick fire-proof glass in a cupel of ashes on a furnace: a small fire at first, continually a little stronger.', why: 'Until the matter comes over red as blood, thick as oil, sweet as sugar, with a celestial scent.', touches: ['sulfur'] },
      { title: 'Drive it to the glow', how: 'Keep that heat while it distils; when it slackens, raise the fire until the glass glows, until no more will distil. Let it cool, and stop the receiver close with wax.', why: 'All that will rise is caught.' },
      { title: 'Powder and grind with vinegar', how: 'Beat the remaining matter to powder in an iron mortar with a steel pestle, then grind it on a stone with good distilled vinegar.', why: 'To open it again.' },
      { title: 'Imbibe, abstract and distil again', how: 'Put the ground matter back in the pot two parts full of vinegar, abstract and renew the vinegar until it comes off as strong as it went in, then distil again in ashes with a fire raised by degrees until the matter comes over red as blood and thick as oil.', why: 'Each round draws more.' },
      { title: 'Repeat until no spirit of vinegar remains', how: 'Reiterate until the matter has no more spirit of vinegar in it, then distil all that will come in ashes until it becomes a red oil.', why: '“Then have you the most noble Water of Paradise, to pour upon all fixed stones, to perfect the Stone.” The Ancients called it their sharp, clear vinegar, to conceal its name.' },
      { title: 'Make the stone of lead', how: 'Holland describes a further operation of thirty to thirty-two weeks giving a solid medicine, a stone, from lead.', why: 'His claims for it are below.' },
    ],
    notes: [
      'Holland on his stone of lead: those with external distempers such as fistulas, cancer, “wolf”, or evil boils, whatever they are, should take the weight of one wheatcorn in warm wine for two days, and the whole body, within and without, will be freed of all that is adverse to nature. Taken in that quantity every day for nine days, the body becomes as spiritual as after nine days in the terrestrial paradise, “fair, lusty and young”. Taken weekly, a wheatcorn’s weight in warm wine, one lives in health until the last hour appointed by God.',
    ],
  },

  // ---------------------------------------------------------------- Chapter 14
  niter: {
    id: 'niter', title: 'Niter, the King of Salts', latin: 'The thumb · the crown', tier: 'danger',
    purpose: 'Holland calls niter (saltpetre, potassium nitrate) the King of Salts: “He is the mill, through which everything must be ground.” A powerful oxidiser, the main ingredient of gunpowder.',
    steps: [
      { title: 'The old way: niter beds', how: 'Specially tended piles of decomposing plant and animal wastes, wood ashes and loose soil. The nitrogen compounds form nitric acid, which reacts with the potassium of the plant ash.', why: 'This takes one to three years, so many beds were worked at once.' },
      { title: 'Harvest', how: 'Leach the pile with water, evaporate, and recrystallise several times.', why: 'Crystals of niter.', touches: ['salt'] },
      { title: 'Recharge commercial niter', how: 'Today’s niter comes from industrial waste streams and is not Philosophical. Recrystallise it from rainwater several times, letting it absorb the moisture of the air between crystallisations.', why: 'It must be reanimated, recharged with Fire, before use.' },
      { title: 'The better trick', how: 'Dissolve the commercial niter in fresh urine, recrystallise, then crystallise again from rainwater.', why: 'A stronger recharging.' },
    ],
    notes: ['F. la Fontain (1797): “Niter is the corporified spirit of the stars, and therein is the nature of metals. Niter is the body of the stars, whose central fire or Sulfur is called Sol.”'],
  },

  vitriol: {
    id: 'vitriol', title: 'Vitriol, the True Mineral Salt', latin: 'The index finger · the six-pointed star', tier: 'danger', time: 'several months',
    purpose: 'Copper sulfate (blue) or iron sulfate (green), among others, used since at least 600 BCE. Old texts call it Atrament, for blackening inks and leather, or Lixivium of Marcasites, for how it was made. Its name is from vitrum, glass.',
    steps: [
      { title: 'Grind the pyrite', how: 'Gather ten to twenty pounds at least of iron pyrite and grind it to powder.', why: 'Vitriol forms near sulfide ores as water leaches the weathering ore.' },
      { title: 'Weather it artificially', how: 'Spread it on a large flat iron tray and alternately roast it gently and spray it with rainwater to moisten, then dry. Repeat many times over several months.', why: 'Imitating nature’s weathering.' },
      { title: 'Wash it', how: 'Put the weathered ore in a container and wash it well with rainwater. Keep the wash water; keep weathering the ore that remains.', why: 'The vitriol dissolves out.' },
      { title: 'Crystallise', how: 'Decant or filter the wash water into a wide bowl and let it evaporate; a few drops of concentrated sulfuric acid slow its oxidation by the air. Collect the emerald-green crystals and keep them airtight.', why: 'Raw green vitriol.', touches: ['salt'] },
      { title: 'Purify', how: 'Recrystallise from rainwater.', why: 'Very glassy, transparent crystals of ferrous sulfate (FeSO₄·7H₂O).' },
      { title: 'Distil the White Spirit', how: 'Distil vitriol alone: a clear liquid comes first with a strong sulfur-dioxide odour. Keep it tightly sealed.', why: 'The choking smell fades as the dissolved sulfur dioxide oxidises to a mild sulfuric acid: the White Spirit.' },
      { title: 'Distil the Red Spirit', how: 'Raise the heat quite high.', why: 'A more viscous reddish liquid finally ascends: concentrated sulfuric acid filled with martial essence, the Red Spirit. Basil Valentine called vitriol the True Mineral Salt that contains the Red and White Spirits.' },
    ],
  },

  lunatincture: {
    id: 'lunatincture', title: 'Sal ammoniac and the Tincture of Silver', latin: 'After Fulcanelli', tier: 'danger',
    purpose: 'Sal ammoniac, the star of the middle finger, sublimes into vapours of hydrochloric acid and ammonia that reunite as the salt on a cool surface. That corrosive atmosphere opens metals: their subtle parts are caught up and deposited, purified, with the sublimate.',
    steps: [
      { title: 'Prepare horn silver', how: 'Use the mineral cerargyrite (mostly silver chloride), or dissolve pure silver in nitric acid and precipitate it with a sea-salt solution. Wash the precipitate with water and dry it.', why: 'Silver chloride, the body of the Moon.', touches: ['salt'] },
      { title: 'Mix with sal ammoniac', how: 'Three times its weight, ground well together.', why: 'The key that opens it.' },
      { title: 'Sublime', how: 'Sublime the powder gently and collect all that comes over.', why: 'The silver’s subtle parts rise with the salt.' },
      { title: 'Dissolve in rainwater', how: 'Dissolve the sublimate in rainwater and let it settle.', why: 'A fine red to brown solid falls: it contains the Lunar Sulfur.', touches: ['sulfur'] },
      { title: 'Wash and dry', how: 'Decant and keep the clear liquid. Wash the solid several times with rainwater and dry it.', why: 'Clean Lunar Sulfur.' },
      { title: 'Extract with spirit', how: 'Extract the dried powder with rectified wine alcohol (95% or better) for a month.', why: 'The clear, golden extract is a Tincture of Silver, holding the Lunar Sulfur.', touches: ['sulfur', 'mercury'] },
      { title: 'Recover the sal ammoniac', how: 'Evaporate the liquid you decanted.', why: 'For future use.' },
    ],
    notes: ['Holland: “The Spirit of all things is Sal Ammoniac.” And: sal ammoniac can unite all things that are antagonistic and cannot be mixed, so that afterwards they mix and conjugate.'],
  },

  alum: {
    id: 'alum', title: 'Alum', latin: 'The ring finger · the lantern', tier: 'skill',
    purpose: 'Properly a vitriol, the double sulfate of potassium and aluminium, KAl(SO₄)₂, but so versatile since antiquity that it is a class of its own: cleaning, deodorising, dye mordant, leather, astringent and styptic. It melts low (92.5 °C), so it helps other salts and minerals fuse; at higher heat it releases sulfur oxides, assisting the making of sulfuric acid.',
    steps: [
      { title: 'Grind and roast alunite', how: 'The best native source is the mineral alunite, alum stone.', why: 'To open it.' },
      { title: 'Dissolve and filter', how: 'Dissolve the roasted stone in water and filter.', why: 'The alum passes into the water.' },
      { title: 'Crystallise', how: 'Evaporate to crystals; recrystallise to purify.', why: 'Being soluble in water, alum is easily purified.', touches: ['salt'] },
    ],
  },

  fixedsalt: {
    id: 'fixedsalt', title: 'The Fixed Spirit of Salt', latin: 'The little finger · the key', tier: 'easy',
    purpose: 'Common salt, sea salt or rock salt (Sal Gemma), rightly prepared has great healing power. This is Holland’s preparation.',
    steps: [
      { title: 'Dissolve sea salt in vinegar', how: 'Grind sea salt fine in a mortar and dissolve it in distilled white wine vinegar. Filter into a wide bowl.', why: 'To open the salt.' },
      { title: 'Skim the Spiritus', how: 'Heat gently to evaporate. A crust or skin forms on the surface: collect it carefully with a skimmer and set it aside, until the liquid is too little to continue.', why: 'Holland calls this skin the Spiritus of the salt.', touches: ['salt'] },
      { title: 'Repeat once', how: 'Dissolve the remains in vinegar again, evaporate, and collect the Spiritus a second time. Combine all the Spiritus.', why: 'It is not yet fixed. What stays in the bowl is the Corpora of the salt.' },
      { title: 'Recrystallise from rain', how: 'Recrystallise the Spiritus from rainwater several times.', why: 'Purification.' },
      { title: 'Add sal ammoniac', how: 'Dry and powder the crystals, then add sal ammoniac at about a tenth of the salt’s weight.', why: 'To fix it.' },
      { title: 'Digest a month', how: 'Seal it in a tall flask and digest for at least a month. Then dry it gently and seal it in glass.', why: 'This is the Fixed Spiritus Salis, said to have miraculous healing virtues.' },
    ],
    notes: ['Holland: one cannot work with any salt until the spiritus has been separated from the corpus; as with common salt, so with all other things. The same purification serves for other salts.'],
  },

  strongwaters: {
    id: 'strongwaters', title: 'Strong waters', latin: 'Aqua fortis · Aqua regia', tier: 'danger',
    purpose: 'Combinations of the salts, distilled at high heat, give the mineral acids used to prepare and purify mineral bodies.',
    steps: [
      { title: 'Aqua fortis (nitric acid)', how: 'Equal parts niter and vitriol with a third part alum, distilled up to about 800 °C.', why: 'About 20% of the solids’ weight comes over as nitric acid of around 50%.' },
      { title: 'Oil of vitriol (sulfuric acid)', how: 'Distil vitriol alone, or with alum.', why: 'Sulfuric acid.' },
      { title: 'Spirit of salt (hydrochloric acid)', how: 'Concentrated sulfuric acid reacting with common salt.', why: 'Hydrochloric acid.' },
      { title: 'Aqua regia, the King’s Water', how: 'Today, three parts hydrochloric acid to one part nitric. The old way: two parts niter with one part sal ammoniac, distilled at a high heat.', why: 'Strong enough to dissolve gold, the King of Metals.' },
      { title: 'Another royal water', how: 'Four parts vitriol, six parts niter and one part alum, distilled; add sal ammoniac to the distillate.', why: 'It dissolves gold, silver and sulfur.' },
      { title: 'Dry dissolving', how: 'Mix niter and sal ammoniac as powders, add the metal, and a few drops of rainwater to start it.', why: 'It generates aqua regia slowly and dissolves the metal: slower, and less violent, than the concentrated acids.' },
    ],
    cautions: ['Not all the mixtures are slow, so try a small amount first. The book’s spectacular example: four parts sal ammoniac, one part Dew Salt and four parts powdered zinc, with a few drops of water on top of a small pile, react until the material bursts into flame.'],
  },

  drymenstruum: {
    id: 'drymenstruum', title: 'The dry menstruum', latin: 'Fusion with alkali', tier: 'danger',
    purpose: 'In the Dry Way, salts become dry menstrua: total liquefaction of the mineral or metal by high-temperature fusion, from the ancient arts of glass and ceramics. The Fixed Salt of Tartar (K₂CO₃) is said to “penetrate every metal on fusion and take from them the Sulfurous part”; George Starkey fused the calx of an imperfect metal with alkali to extract its Sulfur.',
    steps: [
      { title: 'Melt the salt of tartar', how: 'Heat a large porcelain crucible and fuse salt of tartar until it is about half full. (Natron, sodium carbonate, behaves alike; both fuse around 900 °C.)', why: 'The fused alkali is far more corrosive than the deliquesced liquid and liquefies minerals and metals rapidly.' },
      { title: 'Add the ore', how: 'Slowly add the powdered ore, generally as its oxide, and let it fuse, stirring now and then with an iron rod. Add more ore and salt to keep the whole in complete flux.', why: 'The metal is opened in the melt.' },
      { title: 'Cool or cast', how: 'Let it cool in the crucible and break it out, or cast the molten liquid onto a smooth heat-resistant surface.', why: 'Either way you have the fused cake.' },
      { title: 'Grind warm', how: 'Collect the solid and grind it while still warm.', why: 'Before it takes up moisture unevenly.' },
      { title: 'Extract it', how: 'Either let the powder deliquesce and extract the metal’s Sulfur with Kerkring Menstruum, as in the Ens process; or dissolve the mass in rainwater, let the solids settle, dry them, and extract with a prepared menstruum.', why: 'The extract holds the Sulfur of the metal; if an Alkahest is used it is also reanimated with fresh Fire.', touches: ['sulfur'] },
    ],
  },

  ysopaica: {
    id: 'ysopaica', title: 'Ysopaica', latin: 'Washing things white by fire', tier: 'danger',
    purpose: 'An auxiliary method of purifying extracts from plants or minerals, mentioned by Paracelsus and praised by Glauber, with roots in the burnt offerings of the temples. Frater Albertus often said: that which is essential is not destroyed by the fire, only purified by it.',
    steps: [
      { title: 'Distil the wine', how: 'Take red wine, distil out the alcohol, and rectify it several times.', why: 'The burning spirit.', touches: ['mercury'] },
      { title: 'Make the honey', how: 'Evaporate the remaining wine to a thick, honey-like residue.', why: 'The fixed part.' },
      { title: 'Distil the black oil', how: 'Distil the honey at a higher temperature.', why: 'A black, stinking oil comes over, its healing virtue locked inside an impure form.', touches: ['sulfur'] },
      { title: 'Dissolve it in the spirit', how: 'Dissolve the black oil in the rectified wine spirit.', why: 'The flame will carry it.' },
      { title: 'Burn it under a cooling helm', how: 'Ignite the solution under a cooling dome or similar setup that catches and condenses the hot vapours.', why: 'The flame consumes only the combustible; the mercury of the purest essential salt is loosened and passes over with the flame.' },
      { title: 'Distil gently', how: 'Use the distillate as it is, or distil it gently.', why: 'A small amount of volatile solid remains: what Glauber calls the incombustible mercury of the subject, a powerful medicine.', touches: ['mercury', 'salt'] },
      { title: 'For minerals and metals', how: 'Treat the subject with salts as above, extract it with a menstruum such as the Kerkring, burn the extract under the helm, and use the distillate or gently distil it for the volatile salt.', why: 'Glauber says iron, copper, antimony and sulfur can all be matured this way into lovely, fragrant, incombustible tinctures.' },
    ],
    notes: [
      'Glauber (De Purgatorio Philosophorum, c. 1650): “The flame of fire can consume nothing but its like, i.e. the combustible sulfur, but cannot consume the incombustible mercury, nor destroy, burn or annihilate it, the flames only serving to meliorate and exalt it.”',
      'Glauber: “Learn to prepare medicines by fire; because whatsoever can without hurt or loss abide the fire, the same must needs be pure and good. The art of washing things snow white by philosophical purgatory fire appears to be the head skill of philosophy, physik, and alchemy.” The yields are small but very powerful.',
    ],
  },

  // ---------------------------------------------------------------- Chapter 15
  stibnite: {
    id: 'stibnite', title: 'Roasting and calcining the stibnite', latin: 'Antimony ore', tier: 'danger',
    purpose: 'By far the commonest source of antimony is stibnite (Sb₂S₃), which the old texts mean by “antimony”; the metal they call Regulus, the Little King. Stibnite often carries arsenic, mercury, bismuth, lead and uncombined sulfur, which some say earned it the name anti monos, “not alone”.',
    steps: [
      { title: 'Roast gently', how: 'About 90 °C for a day, then slowly up to about 250 °C.', why: 'Eliminates the impurities as far as possible.' },
      { title: 'Calcine long and slow', how: 'At a much higher temperature than the roast, but below 520 °C at the start or it begins to melt. As the sulfur goes and the ore lightens, the temperature can be raised. Stir now and then with an iron rod.', why: 'All the sulfur is eliminated, leaving a very light grey to white antimony oxide for many works.' },
      { title: 'Don’t overdo it', how: 'Watch the time and temperature.', why: 'Antimony oxide is somewhat volatile at these heats.' },
    ],
    cautions: ['Outside work, or under a fume hood.'],
  },

  kermes: {
    id: 'kermes', title: 'Kermes Mineral', latin: 'Antimony oxysulfide', tier: 'danger',
    purpose: 'Antimony is amphoteric, acting as an acid or an alkali by its surroundings. That lets you purify even low-grade stibnite chemically into a red-brown powder named after the insect dye kermes.',
    steps: [
      { title: 'Grind the ore', how: 'To a fine powder; set it aside.', why: 'Ready for the lye.' },
      { title: 'Make the lye', how: 'Dissolve sodium hydroxide in rainwater to a 20–30% solution. It gets very hot as it dissolves: add it slowly to avoid boiling. Wear eye and hand protection.', why: 'A strong alkali to dissolve the stibnite.' },
      { title: 'Dissolve the stibnite', how: 'Add the powdered ore to the still-hot lye, stirring with a non-metal rod. Add the ore in excess of the lye’s weight. You can heat it to near boiling, and leach several times to pull out all the antimony.', why: 'The antimony passes into the alkali.' },
      { title: 'Filter through glass wool', how: 'After an hour’s digestion let it settle a little and filter through a wad of glass wool (from aquarium suppliers).', why: 'The solution is so caustic it eats through paper. The filtrate is a deep golden yellow.' },
      { title: 'Neutralise with vinegar acid', how: 'Slowly pour in a 10–30% acetic acid solution until the pH is 7.', why: 'A red-brown solid forms and falls: the Kermes Mineral.' },
      { title: 'Keep the liquid', how: 'Let the solid settle and decant the clear liquid; set it aside.', why: 'It is mostly sodium acetate, valuable for the acetate work, and more so for its association with antimony.' },
      { title: 'Wash and dry', how: 'Cover the moist Kermes with ten to twenty times its volume of rainwater, let settle, decant; repeat several times. Dry it in a dish.', why: 'A red-brown powder cleansed of many impurities, alumina and silica included: a complex mixture of antimony trisulfide and trioxide, far easier to calcine to a light oxide.' },
      { title: 'Play with colour', how: 'Other alkalis work too: potassium hydroxide, even liquid ammonia. Varying the concentrations and the order of mixing changes the particle size.', why: 'The powder can range from canary yellow through brilliant orange to crimson red.' },
    ],
    cautions: ['The neutralising is the smelly part: a lot of very toxic hydrogen sulfide is released. Be outside and upwind.'],
  },

  glass: {
    id: 'glass', title: 'The Glass of Antimony', tier: 'danger',
    purpose: 'Antimony is a glass-former; ancient glass and ceramics bear witness. Many hold the glass to be the best starting material for extracting the Sulfur of antimony.',
    steps: [
      { title: 'Calcine to the oxide, not too far', how: 'Calcine stibnite or Kermes to the oxide, leaving a small proportion of sulfide.', why: 'Pure oxide melts to a beautiful orange liquid but cools to an opaque yellowish-white mass; a little sulfide gives transparent glasses of intense red, yellow and orange.' },
      { title: 'Fuse it', how: 'Fuse the finely ground oxide/sulfide in a strong porcelain crucible at about 700–1000 °C, sometimes up to 1300 °C. A little raw stibnite powder helps give a deep ruby glass.', why: 'Some use borax as a flux, but it is hard to remove later, and some claim borax, and aluminium, bring alchemical death to the subject and avoid them at all costs.' },
      { title: 'Test it on a rod', how: 'When the crucible is three-quarters full and entirely molten, dip a thin iron rod in and pull it out. Transparent glass on the rod means it is ready; cloudy means keep heating until it clears.', why: 'But don’t prolong the fusion: the matter volatilises throughout.' },
      { title: 'Pour it on copper', how: 'With tongs, pour the melt quickly into a wide, flat copper dish.', why: 'Once cool you have the glass of antimony: transparent, yellow to deep red, and with other proportions and heats even green or blue.' },
      { title: 'Grind it very fine', how: 'Before extraction with a prepared menstruum.', why: 'To open it to the solvent.' },
    ],
  },

  antimonyvinegar: {
    id: 'antimonyvinegar', title: 'The Vinegar of Antimony', latin: 'The pure Fixed Spirit of Antimony', tier: 'danger', time: 'up to a year or more',
    purpose: 'Stibnite is one of the few minerals that ferment, like wine but warmer. The liquid is nearly a Universal Menstruum for the Mineral world, and a powerful medicine for internal and external use.',
    steps: [
      { title: 'Grind and roast', how: 'Grind several pounds of stibnite fine; roast at about 90 °C for a day.', why: 'Removes arsenic, mercury and any free sulfur.' },
      { title: 'Mix with rainwater', how: 'Cool it, then mix three parts ore with seven parts distilled rainwater by weight.', why: 'The ferment.' },
      { title: 'Ferment it warm', how: 'Seal in a flask at 40–50 °C, shaking often. Up to a year or longer is often allowed.', why: 'As the Antimony Spirit enters the water the liquid may grow more viscous, soapy or foamy: a good sign the ore has opened.' },
      { title: 'Distil over three days', how: 'Attach a distillation train and start slowly at 80 °C, rising to about 400 °C over three days.', why: 'The spirit rises.', touches: ['mercury'] },
      { title: 'Return it to the residue', how: 'Let the apparatus cool fully. You should see a yellow to red sublimate on the glass or a crust above the residue. Return the distillate, rinsing all the sublimate from the walls.', why: 'The spirit is fed back its body.' },
      { title: 'Repeat twice more', how: 'Two more distillation cycles.', why: 'The final liquid is the Vinegar of Antimony: still weak, but with excellent healing qualities. Basil Valentine says it eliminates all toxins from the body.' },
      { title: 'Concentrate it', how: 'Make a 4 × 3 distillation into twelve fractions and test each one’s pH. Combine the most acidic, distil into four parts, test again; continue until you isolate the distillate with a pH of one.', why: 'Called a vinegar for its fermentation and acidity, though it is neither acetic nor sulfuric acid. The concentrate extracts the Sulfur from gold in a short time.' },
    ],
    notes: ['The yield is small but very powerful medicinally, and as a menstruum it extracts the essentials from virtually the whole Mineral realm.'],
  },

  redoil: {
    id: 'redoil', title: 'The Fixed Red Oil of Antimony', tier: 'danger',
    purpose: 'Of the many oils of antimony, whose properties vary with their preparation, one of the most important and valuable.',
    steps: [
      { title: 'Oxide, then glass', how: 'Calcine stibnite or Kermes to the oxide, grind very fine, make it into glass, and powder the glass.', why: 'The preferred body.' },
      { title: 'Extract with vinegar', how: 'Extract with a strong vinegar, or better the Radical Vinegar, for several weeks at about 40 °C. Agitate it now and then, especially the first days.', why: 'Otherwise it coalesces into a thick mass. The solution turns golden to deep red.', touches: ['sulfur'] },
      { title: 'Repeat', how: 'Filter off the extract and repeat with fresh vinegar. Combine and filter into a still.', why: 'All the colour.' },
      { title: 'Wash out the acid', how: 'Distil gently until thickened, add water to dissolve the residue, and distil again; repeat. Or wash with alcohol, which forms ethyl acetate and distils out faster.', why: 'A golden-brown, gummy resin remains.' },
      { title: 'Distil the resin', how: 'Distil it in a suitable vessel as in the acetate work.', why: 'Drops of blood-red oil come over.', touches: ['sulfur'] },
      { title: 'Catch it in alcohol', how: 'Dissolve the drops in alcohol and rinse any oil from the glass with alcohol too. Seal and let stand several days, then decant the clear tinted extract.', why: 'The Fixed Tincture of Antimony, with powerful healing properties unrecognised by modern medicine.' },
    ],
  },

  regulus: {
    id: 'regulus', title: 'The Star Regulus of Antimony', latin: 'The Flamel Path', tier: 'danger',
    purpose: 'An advanced work, in very veiled terms in the old texts; the clearest come from Eirenaeus Philalethes, Nicholas Flamel and Isaac Newton. Taken to completion it leads to the Philosopher’s Stone, the summit of the Dry Way. Hidden in the Regulus is the spirit of antimony.',
    steps: [
      { title: 'Reduce the ore: Newton’s proportions', how: 'Two parts stibnite, one part iron filings, four parts burnt tartar, fused in a crucible and cooled slowly.', why: 'The iron takes the sulfur as iron sulfide, leaving the antimony free as metal, which sinks.' },
      { title: 'Or with niter', how: 'For example twelve parts stibnite, five parts iron filings, six parts niter and nine parts raw tartar. Small iron nails can replace the filings. Exact proportions depend on the stibnite.', why: 'The raw tartar is said to increase the Seed of Gold in the slag.' },
      { title: 'Save the scoria', how: 'A slag forms on top and comes off the metal with a hammer blow. Keep the scoria from this first reduction.', why: 'It contains the Seed of Gold.' },
      { title: 'Purify with niter', how: 'Grind the Regulus, mix with twice its weight of niter, and fuse again. Repeat several times.', why: 'Until the starry pattern develops on the surface: the Star Regulus, also called the Martial Regulus for the iron used.' },
      { title: 'The Balm of Antimony', how: 'Extract the powdered metal with spirit of turpentine, which turns deep red. Remove the turpentine and dissolve the oil left in spirit of wine.', why: 'The Regulus has healing power of its own: this balm is used for all pulmonary illnesses.', touches: ['sulfur'] },
    ],
    cautions: ['The niter mixtures are essentially a gunpowder you are putting into a very hot crucible. Add the material slowly, or you will find out why the ancients called it Detonation.'],
    notes: ['Newton: “In Antimony are Mercury (in the regulus), Sulfur (in the redness) and Salt (in the black earth which sinks to the bottom), which three, corrected, separated, and finally united together in the proper manner of Art so that fixation be obtained without poison, give an opportunity to the artificer to approach the Stone of Fire.”'],
  },

  doves: {
    id: 'doves', title: 'The Eagles and the Doves of Diana', latin: 'From the Regulus to the Red Stone', tier: 'danger',
    purpose: 'The greatest interest in the Regulus is its fixed spirit, its Mercury, which can be passed to other metals to reanimate them and awaken their generative power.',
    steps: [
      { title: 'Make the Lunar Venusian Regulus', how: 'Alloy the Martial Regulus with about twice as much pure silver and a little copper.', why: 'A regulus of a beautiful violet colour. The Regulus will not amalgamate easily with mercury, so the silver absorbs antimony’s fixed spirit to pass it on.' },
      { title: 'Amalgamate and distil', how: 'Amalgamate it with purified metallic mercury, wash, and distil.', why: 'The silver, the Doves of Diana, carries the life force of the antimony into the mercury.', touches: ['mercury'] },
      { title: 'Let the eagles fly', how: 'Repeat the amalgamation and distillation seven to ten times. Clean the silver left in the retort (the Dead Doves of Diana) and use it again.', why: 'With each cycle the mercury grows more enlivened, until it is Animated Mercury, holding the generative power of the metallic realm: the fertile field where the seed of metals is sown.' },
      { title: 'Seed it with gold', how: 'Seed purified gold into the animated mercury and digest over a long period.', why: 'The matter passes through black, then whitens, and finally reddens into the ferment, the Red Stone, which can be multiplied with fresh animated mercury.', touches: [...ALL] },
      { title: 'The other road', how: 'Without metallic mercury: unite the Regulus with gold through a long digestion with a menstruum made like the urine alkahest, in a closed vessel.', why: 'The same colours appear. Here the Regulus is called the Mercury, or Our Luna; the gold is Sol, or Sulfur; and the liquid menstruum, the catalyst that unites the contrary metals, is the Secret Fire (and also called Mercury, to confuse you).' },
    ],
    notes: ['The Red Stone is the basis of the Elixir, the Universal Medicine for Man and Metals. It can also transmute the lesser metals into gold, but must first be dedicated to that by Inceration, after which it serves only for transmutation, not as medicine.'],
  },

  // ---------------------------------------------------------------- Chapter 17
  mercurypure: {
    id: 'mercurypure', title: 'Purifying the mercury', latin: 'The field prepared', tier: 'danger',
    purpose: 'Triple-distilled mercury can be bought, but it is still purified the old way: not to make it purer, but to exalt it alchemically and open its body to receive new life.',
    steps: [
      { title: 'Wash and press', how: 'Wash the mercury well with rainwater, then squeeze it through chamois or another thin, pliable leather.', why: 'A first cleansing.' },
      { title: 'Grind with sea salt', how: 'Cover it with dried, powdered sea salt and mix completely in a mortar. Depending on its impurities the salt may darken, even to black.', why: 'The salt draws out the dirt.' },
      { title: 'Wash out and repeat', how: 'Wash out the dirty salt with rainwater; repeat the salt washing once or twice.', why: 'The mercury keeps some of the salt’s subtle essence, which matters for what follows.' },
      { title: 'Grind with salt and vinegar', how: 'Add an equal amount of sea salt, saturate with strong distilled vinegar (about 10% acetic acid), and grind vigorously for about ten minutes.', why: 'A deeper cleansing.' },
      { title: 'Wash to brightness', how: 'Wash out the salt with rainwater until the mercury is shiny and bright, and press it through chamois.', why: 'No residue should stay in the chamois; the mercury should leave no trail when rolled across a smooth surface and show no scum. Now it is “the field prepared and fit to receive our noble king.”' },
    ],
  },

  animategold: {
    id: 'animategold', title: 'Animating the mercury with gold', latin: 'The simplest method', tier: 'danger', time: 'six months',
    purpose: 'Animation adds etheric essences to the etheric shell of a substance and awakens its generative virtue. This way keeps the handling of hazardous materials to a minimum.',
    steps: [
      { title: 'Use native gold', how: 'A pure native gold: nuggets, or gold dust panned from a river.', why: 'Gold still alive from the earth.' },
      { title: 'Powder it', how: 'Grind the gold with salt and vinegar into a paste, wash out the salt, and dry the gold.', why: 'To make it fine enough to amalgamate.' },
      { title: 'Amalgamate', how: 'To twenty-nine parts of purified mercury add one and a quarter parts of gold powder and grind them into a fluid amalgam.', why: 'The noble metal enters the mercury.' },
      { title: 'Clean it', how: 'Wash the amalgam with water until clean and bright; wipe the surface dry with paper towel.', why: 'Ready to seal.' },
      { title: 'Digest three months at 40 °C', how: 'Seal the dry amalgam well in a tall, strong glass vessel.', why: 'The mercury’s hidden power, wholly surrounding the gold, slowly dissolves it and takes its power into itself.' },
      { title: 'Then three months at 60 °C', how: 'Raise the heat and continue.', why: 'The result is Animated Mercury. Make plenty: multiplying and augmenting the Stone will need it.', touches: ['mercury'] },
    ],
  },

  cinnabar: {
    id: 'cinnabar', title: 'The Divine Cinnabar', latin: 'Seven Eagles', tier: 'danger',
    purpose: 'Held to be one of the most powerful ways to animate mercury and produce the Philosopher’s Stone, and a dangerous one. The use of metallic mercury is also established in Chinese and Indian alchemy.',
    steps: [
      { title: 'Purify the mercury', how: 'With salt and vinegar, as above.', why: 'The field prepared.' },
      { title: 'Make cinnabar', how: 'Grind the mercury with an equal amount of native sulfur in a mortar. It turns black, forming mercury sulfide. Check with a magnifier: no tiny globules of mercury may remain; grind with more sulfur if they do.', why: 'A crude black cinnabar, the ore of mercury.' },
      { title: 'Sublime it (best)', how: 'You can go on with the black, or improve it by sublimation.', why: 'The beautiful orange variety of cinnabar is best.' },
      { title: 'Distil it from iron', how: 'Mix the cinnabar with an equal weight of iron filings in a strong retort (some use half Star Regulus, half iron filings). Lead the outlet into a container of water.', why: 'The iron takes up the sulfur and the mercury distils over, condensing in the water as a pool of bright mercury. It is the subtle essence from the iron that is the key: its red, solar, sulfurous principle acts on the mercury more strongly each time.', touches: ['mercury'] },
      { title: 'A simple retort', how: 'Build a small retort from iron pipe fittings, pack charcoal briquettes round it, and light the fire outside, the outlet under water.', why: 'An easy way to distil mercury amalgams.' },
      { title: 'Lift the outlet before it cools', how: 'When the distillation stops, take the retort outlet out of the water.', why: 'Otherwise the vacuum of the cooling retort draws the water in, with possibly dire results, that is, an explosion.' },
      { title: 'One Eagle', how: 'Collect all the mercury and squeeze it through chamois.', why: 'This concludes one cycle, or Eagle.' },
      { title: 'Seven Eagles', how: 'Repeat the cinnabar with fresh native sulfur and its distillation from iron until seven Eagles have flown.', why: 'The mercury grows no purer; its inner etheric shell of sulfurous and mercurial principles is activated.' },
      { title: 'Distil it twice alone', how: 'After the last Eagle, distil the mercury by itself two times.', why: 'Animated Mercury: “the fertilised matrix in which you may plant your corn.”', touches: ['mercury'] },
    ],
    cautions: [
      'The reaction can become quite vigorous: careful heating, strong vessels and proper ventilation.',
      'Mercury is particularly insidious and can quickly contaminate an area that is then very hard to clean. Some alchemists avoid it altogether for their own and others’ sake. More than one alchemist has lost his life in this work: know the theory first before attempting the praxis.',
    ],
  },

  rebis: {
    id: 'rebis', title: 'The Rebis and the colours of the Work', latin: 'From Nigredo to Rubedo', tier: 'danger', time: 'about eighteen months',
    purpose: 'The opposites united: mercury the female, gold the male. Their proper union gives birth to the Chemical Child, the Philosopher’s Stone. Gold is the true leaven of the Elixir; the mercury draws the seed of the gold, which makes the mercury like itself by digestion alone.',
    steps: [
      { title: 'Amalgamate', how: 'Carefully amalgamate four parts Animated Mercury with one part fine gold powder in a glass mortar. Wash until clean and shining; blot dry with a cloth.', why: 'The marriage.', touches: [...ALL] },
      { title: 'Seal the vessel', how: 'Put the amalgam in a long-necked, strong glass vessel only a third full. Warm the whole to about 50 °C and seal it airtight quickly; let it cool a bit.', why: 'Once the Hermetic Seal, melting the neck shut; precision ground-glass joints now suffice.' },
      { title: 'Nigredo', how: 'Digest at about 40–50 °C. After about three months the matter darkens and finally turns black.', why: 'The Black Stage.' },
      { title: 'The Peacock’s Tail', how: 'Once wholly black, raise the heat gently to about 60–65 °C. After two to three months an iridescence plays on the surface.', why: 'The adepts named this stage for its peacock colours.' },
      { title: 'Albedo', how: 'Continue digesting; the matter gradually lightens. It takes about nine more months to become entirely white.', why: 'The Whitening.' },
      { title: 'Rubedo', how: 'When it is white, raise the heat very slowly to about 130 °C over several months. The whiteness gives way to a yellowness that deepens with time into red.', why: 'The Red Stage of the Stone.' },
      { title: 'Mature it', how: 'Digest at about 200 °C for two more months.', why: 'To ripen it.' },
      { title: 'Open the vessel', how: 'Let it cool slowly, then break the vessel.', why: 'The contents are the Red Stone in the First Degree.' },
    ],
  },

  inceration: {
    id: 'inceration', title: 'Inceration', latin: 'Making it like wax', tier: 'danger', time: 'one year',
    purpose: 'Further processing that lets the Red Stone transmute metals by increasing its fusibility and ingress, its power to penetrate. After it, the Stone is no longer used as medicine, only for transmutation.',
    steps: [
      { title: 'Amalgamate with six parts mercury', how: 'Grind a portion of Red Stone to powder and amalgamate it with six times its weight of Animated Mercury.', why: 'The Stone is fed.' },
      { title: 'Clean and press', how: 'Wash with rainwater several times, blot dry, and squeeze through chamois. Save the mercury that passes through. Put the soft amalgam left inside into a tall glass vessel.', why: 'Only the united matter goes on.' },
      { title: 'Digest through the four heats', how: 'Three months each at 40, 65, 130 and 200 °C.', why: 'The same heats that made the Red Stone.' },
      { title: 'Take it out', how: 'Break open the vessel.', why: 'The matter should now fuse easily, like wax, and not smoke at all: ready for Projection on metals.' },
    ],
  },

  multiplication: {
    id: 'multiplication', title: 'Multiplication of the Red Stone', tier: 'danger',
    purpose: 'The Red Stone of the First Degree transmutes metal one part to ten. Each multiplication increases its power tenfold, much faster than the first making.',
    steps: [
      { title: 'Amalgamate one to ten', how: 'One part Red Stone of the First Degree with ten parts Animated Mercury. Wash with rainwater and blot dry.', why: 'Fresh matter for the Stone to convert.' },
      { title: 'Seal and digest from 40 °C', how: 'A tall glass vessel, sealed as before, the same regimen of heats.', why: 'The same black, white and red succession comes, in much less time. Raise the heat by the colours.' },
      { title: 'Red again', how: 'At the Red Stage, cool it and remove the matter.', why: 'One part now acts on one hundred parts of metal.' },
      { title: 'And again', how: 'Repeat the multiplication.', why: 'One part to a thousand, then ten thousand, and so on. Whatever its degree, it must go through Inceration before use on metals.' },
    ],
    cautions: ['Some believe it is quite dangerous to multiply the Stone more than seven times: it is said to become first luminous, then unstable, with possibly catastrophic results.'],
  },

  projection: {
    id: 'projection', title: 'Projection', tier: 'danger',
    purpose: 'The final test of the Stone and the proof that the operator worked correctly: the Perfected Solar Medicine projected onto molten metal, transmuting it.',
    steps: [
      { title: 'Know your Stone’s strength', how: 'If one part acts on a hundred of pure silver, it may affect only ten of a cruder metal like tin or lead.', why: 'Silver, the noble metal next to gold, is the usual guide to the Stone’s power.' },
      { title: 'Melt the silver', how: 'For a Stone of one to a hundred, melt one hundred parts of pure silver in a crucible.', why: 'The base to be transmuted.' },
      { title: 'Make pills', how: 'Form one part of Incerated Red Stone into several small balls.', why: 'To add it gradually.' },
      { title: 'Project them', how: 'Add one pill at a time and let it fuse with the silver, until the full part is in.', why: 'The Stone penetrates the metal.' },
      { title: 'Hold it molten two hours', how: 'Keep the contents molten for two more hours.', why: 'The metal matures and evolves.' },
      { title: 'Cool, re-melt, cast', how: 'Cool slowly, break it from the crucible, re-melt and cast an ingot.', why: 'All the silver should have changed to 24-carat gold.' },
      { title: 'Assay it', how: 'An assay may show unchanged silver (the Stone was, say, 80 to 1), or a portion melted with more silver may show it stronger (say 150 to 1).', why: 'Knowing its true power, you can project the right amount and waste none of this most precious of medicines.' },
    ],
    notes: ['The Elizabethan scholar-physician John Dee and the alchemist Edward Kelly are said to have learned this the hard way: having come into a quantity of Red Stone, they made transmutations before discovering its power was far greater than they had imagined, by which time more than half of it was gone.'],
  },
};

// =================================================================================================
// THE CHAPTERS
// =================================================================================================

export const BOOK: BookChapter[] = [
  // ----------------------------------------------------------------------------------- front
  {
    id: 'front', n: 'Before the book', title: 'The warning, the foreword and the preface', stage: 'nigredo',
    blocks: [
      { k: 'caution', t: 'The book opens: “Kids! Don’t try this at home!” The practice of real alchemy is inherently dangerous. Formal laboratory training is encouraged. Consulting a licensed physician is encouraged before consuming herbal preparations. Know the laws that apply where you live and act accordingly. Read as many other books on alchemy as possible, learn as much as you can from a qualified teacher, and above all know the theory before attempting the practice. The book is sold for information; author and publisher are not accountable for its use or misuse.' },
      { k: 'h', eyebrow: 'Foreword', t: 'Dennis William Hauck: “But have you tried it?”' },
      { k: 'p', t: 'Hauck calls the book a revelation of the genuine craft. Jung and others showed the archetypal power of alchemy’s symbols, but alchemy is more than a commentary on the psyche: lasting transformation happens only when the work is done on every level, mental, spiritual and physical, with the hands, the heart and the soul. A medieval alchemist would laugh at modern theorists and ask, “Has no one ever tried it?”' },
      { k: 'p', t: 'Alchemy is not chemistry, he says. Chemistry rearranges atoms to show different properties of the same dead material; the alchemist exposes a substance’s essences, brings them alive and makes them grow. An experiment is the culmination of planning, timing and personal purification. The alchemist becomes an ingredient in his own experiment: he suffers as essences are teased from the substance, and is elated when the hidden spark brings dead matter back to life on a new level. Read the book with a free heart and an open mind, and an ancient voice may whisper through the noise: but have you tried it?' },
      { k: 'h', eyebrow: 'Preface', t: 'How the book began' },
      { k: 'p', t: 'Bartlett’s wife mentioned his interest in alchemy in her hypnotherapy class. Asked for a two- or three-hour talk, he spoke for five; the class asked for more, and it became three six-hour classes taught every year. The book is something of a transcription of those classes: a short primer for anyone who wants to explore first-hand the “Sacred Science and Royal Art”.' },
    ],
  },
  {
    id: 'intro', n: 'Introduction', title: 'Practical alchemy', stage: 'nigredo',
    blocks: [
      { k: 'p', t: 'Isaac Holland, in the fifteenth century, promised to teach the secret at the heart of all secrets in the art: to know the spirits of herbs, trees and all growing things; to separate them from their bodies; to purify the four elements and restore them to their first being and perfect power; and to put the purified elements together again into a perfect and fixed body, glorified, with a miraculous effect.' },
      { k: 'p', t: 'Most people think alchemy means a discredited way of turning lead into gold. Psychologists after Jung say it is only a metaphor for psychological reintegration. Yet the alchemists’ lives show real laboratory work, much like what we now call chemistry. Many of the old masters described alchemy as a kind of “Celestial Agriculture”.' },
      { k: 'p', t: 'Once called the Divine Art or Sacred Science, alchemy is now remembered only as primitive chemistry. Yet it lies at the root of every Western esoteric tradition and of many arts and sciences, medicine and pharmacology among them. It has been called “the Mother of all Science and Wisdom”. In a nutshell: an ancient art and science of the mysteries of life, of consciousness and its evolution. Many “New Age” tools borrow the word (alchemical massage, alchemical hypnotherapy) for transforming something of little worth into something of great value; this book is about Real Alchemy, practical laboratory alchemy: its history, theory and simple practices anyone can use to prepare herbal and mineral extracts in the ancient tradition.' },
      { k: 'h', eyebrow: 'The author', t: 'From Paracelsus Research Society to Paralab' },
      { k: 'p', t: 'Bartlett had explored alchemy since about twelve, with a laboratory of some kind even before that. In 1974 he began intensive study at the Paracelsus Research Society, later Paracelsus College, in Salt Lake City, under Dr Albert Riedel, known as Frater Albertus, one of the best-known practical alchemists of the twentieth century, who also taught in Germany, Switzerland, New Zealand and Australia.' },
      { k: 'p', t: 'The campus had a dormitory, a lecture hall and a laboratory. Classes were limited to twelve students, and outside contact (radio, television, telephones, newspapers) was discouraged so students could immerse themselves: it was a Mystery School. Classes ran Monday to Saturday, 9 to 5, with homework and lab work running on, for two weeks a year over seven years, with work set between years.' },
      { k: 'p', t: 'In 1976 he returned to university to finish a chemistry degree, hoping to work at Paralab, the society’s commercial laboratory, which made herbal and mineral preparations on alchemical principles for research and alternative healthcare. He graduated in 1979, became Paralab’s Chief Chemist, and stayed until it closed in late 1983. Frater Albertus died in 1984. As a professional research and analytical chemist since, Bartlett has collected state-of-the-art analytical data on many products of alchemical experiments.' },
      { k: 'quote', t: 'Alchemy is about Evolution, and “Raising the Vibratory Rate”.', by: 'Frater Albertus’s definition, as the book gives it' },
      { k: 'p', t: 'Understanding that needs some knowledge of natural law and occult philosophy. This ageless wisdom, handed down orally and then in deliberately obscure language and symbol, is the Hermetic Philosophy, after its legendary founder Hermes Trismegistus, the Greek name for Thoth, Egyptian god of wisdom and inventor of all science and magic. The old sages called themselves the Sons of Hermes, or Sons of Wisdom. The earliest descriptions tie alchemy to the transformation of matter by light, spirit or fire: the metamorphosis of matter orchestrated by spirit. Ancient Egypt is generally agreed to be its Western birthplace.' },
    ],
  },
  {
    id: 'ch1', n: 'Chapter 1', title: 'A brief history of alchemy', stage: 'nigredo',
    blocks: [
      { k: 'list', title: 'Theories of its origin, as the book lists them', items: [
        'God taught it to Adam, and later to Moses.',
        'Fallen angels taught it to human women in exchange for sex.',
        'It is a remnant of lost Atlantean technology.',
        'Extraterrestrials taught it to our ancestors.',
      ] },
      { k: 'p', t: 'Whatever its origin, recorded history shows an esoteric tradition thousands of years old. Egypt, a theocratic state ruled by a powerful priesthood divided into castes (scribes, astronomers and others), had priests who worked with materials in what we would call chemistry, often under oaths of secrecy: metallurgy, ceramics, medicine, mummification and winemaking. Their primary study was the operative forces of the universe, which they called the Neteru, from which, the book says, comes our word “Nature”.' },
      { k: 'p', t: 'These priests were skilled healers with a materials science still partly a mystery. Their sciences always had two parts, mental-spiritual and physical: a medicine was prepared with words, spells, incantations or rituals, and the patient took it while repeating a spell or prayer, and the timing mattered equally. In the Egyptian Mysteries, Man had several spiritual and mental components besides the physical, each with its own medicine. Tales survive of wondrous healing oils, life-giving potions and imitations of gold and precious stones; tomb robbers took the precious oils first, as valuable as gold and easier to carry and sell, since stolen gold had to be melted down.' },
      { k: 'list', title: 'The book’s timeline', items: [
        'Around 300 BCE: Alexander the Great arrives in Egypt, loves its culture, and is welcomed: the Greco-Egyptian or Ptolemaic period begins. The Greeks called Egypt Khem or Khemet, the Black Land, for the dark soil of the Nile floods; Egypt’s secret sciences reached Greece as Khemia, the Black Art, and spawned a long line of Greek alchemists.',
        'Alexandria and its Great Library, estimated at nearly a million volumes: scholars from everywhere make it a melting pot, and there the Hermetic Philosophy and alchemy congeal into a path of spiritual attainment, revealed only to initiates under an oath of silence.',
        'Around 30 BCE: the last Ptolemies fall to Rome, and much of the Library is lost to fire. Rome is tolerant at first (Isis has temples in Rome itself) but less so as its emperors convert to Christianity.',
        '290 CE: Diocletian, fearing that imitation gold from the Egyptian art could disrupt the Roman economy, or finance an army against Rome, orders all texts and materials on making gold and precious stones destroyed, with great severity; masses of information perish, and what remained of the Library.',
        '325 CE: Rome officially becomes Christian. 391: Theodosius makes heresy punishable by death and orders pagan temples destroyed. Most Hermetic practitioners flee east to Arab lands, where the early Persian caliphs are more hospitable; the Arabic al- joins Khemia to give Al-Khemia, later Alchemy.',
        'The fall of Rome: scientific pursuits lie dormant for centuries; the Dark Ages begin.',
        'From around 800 CE, with the Islamic invasions, alchemy spreads into Western Europe, largely through Ibn Sina (Avicenna), whose medical system was popular for centuries, and Abu Musa Jabir ibn Hayyan, whose deliberately cryptic writing, the book says, gave us the word “gibberish”. They collected and translated the Egyptian and Greek works into Arabic, later translated into Latin.',
        'Medieval Europe: alchemy becomes fashionable; kings, rich and poor chase gold-making; cons and scams cost many their life savings, and alchemy gets its reputation for fraud.',
        'Around 1310: Pope John XXII forbids the practice of alchemy, and gold-making especially, with heavy fines for trading in alchemical gold. 1404: Henry IV of England makes gold-making a crime against the Crown. In the 15th century the printing press makes alchemical texts popular and they multiply.',
        '1493: Paracelsus (Theophrastus Bombast von Hohenheim) is born in Switzerland. Physician and university lecturer, skilled in every Hermetic art, he repeatedly demonstrates alchemical medicines, urges colleagues to study alchemy, and is at odds with the doctors and suspected by the Church; some believe he was murdered in 1541. Ironically his work helped end the age of alchemy and begin chemistry, while turning alchemy back from gold toward its original intent: medicines for body and soul, wholeness, and initiation into Nature’s mysteries.',
        '17th century: growing religious freedom sparks interest in all things mystical. Scholars openly call themselves Rosicrucians, Adepts or Alchemists, and many take up alchemy’s spiritual side alone.',
        'Robert Boyle and Isaac Newton study alchemy. Newton, fully involved, wrote volumes and considered himself more alchemist than physicist or mathematician; his notes suggest he believed himself close to metallic transmutation. Boyle distinguished Philosophical from Unphilosophical work; The Sceptical Chymist questioned the number and nature of the elements and called for clearer terms. Misread as debunking vital alchemy, it began a mechanical world-view that lasted into the twentieth century.',
        'Around 1660: Charles II signs the first charter of the Royal Society, and chemistry soon becomes an officially recognised science.',
        'America has its alchemists too, several state governors among them, and groups in Pennsylvania bring many early German alchemical writings.',
        'By the 1800s: alchemy has largely vanished from the outer world in favour of its young offshoot, chemistry, and survives in secret societies popular toward the end of the century.',
        'Early 1900s: H. Spencer Lewis receives a charter from European contacts to form AMORC (Ancient Mystical Order Rosae Crucis), which teaches laboratory alchemy handed down from Rosicrucian sources.',
        'Early 1940s: Albert Riedel is a student of those classes; he teaches them himself, then founds the Paracelsus Research Society in 1960, accredited as Paracelsus College in the early 1980s.',
        '1984: Frater Albertus dies. In the early 1990s former students contact a French group and form the Philosophers of Nature (PON), which closes in the late 1990s. Now the Internet is the new Library of Alexandria, and chemistry, left to grow unfettered, has nearly come full circle back to the Hermetic Philosophy.',
      ] },
    ],
  },
  {
    id: 'ch2', n: 'Chapter 2', title: 'The theory of alchemy', stage: 'nigredo',
    blocks: [
      { k: 'h', eyebrow: 'The First Law of Hermetics', t: 'All is from One' },
      { k: 'p', t: 'The most concise statement of alchemical theory, acknowledged by adepts of every age, is the Emerald Tablet of Hermes Trismegistus. Legend says it predates the Flood and was inscribed by Thoth himself on a plate of alchemically made emerald.' },
      { k: 'quote', t: 'Tis true without lying, certain and most true. That which is below is like that which is above, and that which is above is like that which is below, to do the miracles of one only thing. And as all things have been and arose from one by the mediation of one, so all things have their birth from this one thing by adaptation. The Sun is its father, the Moon its mother; the wind hath carried it in its belly; the earth is its nurse. The father of all perfection in the whole world is here. Its force or power is entire if it be converted into earth. Separate thou the earth from the fire, the subtle from the gross, sweetly, with great industry. It ascends from the earth to the heaven and again it descends to the earth, and receives the force of things superior and inferior. By this means you shall have the glory of the whole world, and thereby all obscurity shall fly from you. Its force is above all force, for it vanquishes every subtle thing and penetrates every solid thing. So was the world created. From this are and do come admirable adaptations, whereof the means is here in this. Hence I am called Hermes Trismegistus, having the three parts of the philosophy of the whole world. That which I have said of the operation of the Sun is accomplished and ended.', by: 'The Emerald Tablet, in Isaac Newton’s translation' },
      { k: 'p', t: 'The alchemists always told students: know the theory before the praxis, and “walk in the Book of Nature” to understand the Art. Jean Dubuis (PON seminars, 1992) put alchemy’s view at the opposite pole from science’s: science asks how matter created life; alchemy says life created matter. At the origin is consciousness, the Absolute’s need to Be; to satisfy it consciousness created life, and to evolve, life created matter.' },
      { k: 'p', t: 'Alchemy explores the involution of the Absolute into matter and its evolution back to the source: the Ouroboros. The All, or the One, is the fundamental truth, the substantial reality standing under all reality, beyond naming: we call it the All, the Absolute, the Divine, Spirit, the Force, the One Only One; perhaps best, Infinite Living Mind.' },
      { k: 'quote', t: 'THE ALL is MIND; The Universe is Mental.', by: 'The Kybalion (1908)' },
      { k: 'p', t: 'Only by mental creation can the All make a universe and still remain the All, since any substance used would be separate from it (The Kybalion). “Matter” is only the part of the All our senses apprehend. All things are connected, separated only by their rates of vibration. Each of us is a unique, complex waveform sharing many harmonics with others, unique like fingerprints yet related; modern science identifies materials the same way, by their spectral resonances in light, infrared and microwaves. The book quotes Einstein: “Everything is energy, beyond that is divine.” We live in an ocean of energy the alchemists called the Celestial Fire, Prima Materia, the First Matter, Chaos. All is from One.' },
      { k: 'h', eyebrow: 'The Second Law of Hermetics', t: 'Polarity' },
      { k: 'p', t: 'The One reflecting on itself moves toward polarity: a most subtle, spiritualised energy and a dense material energy, Spirit and Matter (today, energy and matter, which are the same). Everything has its opposite: day and night, male and female, hot and cold, wet and dry. The active mode is the energy of life; the passive, the energy of matter: like a sine wave, two opposite energies, one wave. The Golden Chain of Homer (c. 1730), esteemed by generations of alchemists, calls the active energy Celestial Niter and the passive Celestial Salt: the Volatile and the Fixed.' },
      { k: 'fig', id: 'essentials' },
      { k: 'h', eyebrow: 'The Four Elements', t: 'States of energy, not substances' },
      { k: 'p', t: 'The energy of Life (Niter) works through Fire and Air, both active, Fire more so: the volatile energies. The energy of Matter (Salt) works through Water and Earth, Water the more active: the fixed energies. These Elements have nothing to do with the bodies of the same names; they are energetic states, recognised as early as 500 BCE as the qualities by which Nature operates and is formed.' },
      { k: 'cards', items: [
        { title: 'Fire', sub: 'hot and dry', text: 'Radiance, expansion, warmth, light. On the psychological level, the Superconscious Mind.' },
        { title: 'Air', sub: 'wet and hot', text: 'Penetrating, diffuse, moveable. Psychologically, the Self-conscious Mind.' },
        { title: 'Water', sub: 'wet and cold', text: 'Coolness, contraction, mutability, change. The perfect representative of the Subconscious Mind.' },
        { title: 'Earth', sub: 'dry and cold', text: 'Stability, rest, inertia, strength, solidity. In the human economy, the physical body.' },
      ] },
      { k: 'fig', id: 'elements' },
      { k: 'p', t: 'Modern science agrees that four fundamental forces govern all activity in the universe. The book relates them to the Elements: the Strong Nuclear Force to Fire, the Weak Nuclear Force to Water, Electromagnetism to Air, and Gravitation to Earth. The Elements and their mixtures are the vehicles through which the Three Essentials work, the clothing we take for physical reality.' },
      { k: 'h', eyebrow: 'The Three Essentials', t: 'Salt, Sulfur and Mercury' },
      { k: 'p', t: 'Not table salt or thermometer mercury, but subtle philosophical principles active in Nature. Alchemical Salt, the Body, is the matrix in which Sulfur and Mercury act: a passive medium, the Virgin Earth, subject to the fixed energies of Water and Earth, influenced by the psychic and instinctual forces of the subconscious and by the conditions of matter. Alchemical Sulfur, the Soul, conducts the volatile Fire and Air: consciousness, intellect, the “True Will” or personal fire. Alchemical Mercury, the Spirit, is the vital or life force, predominant in Air and Water, carrying intellectual, instinctual and psychic energies: the bridge between the higher Sulfur and the lower body of matter, like Mercury, messenger between gods and mortals.' },
      { k: 'p', t: 'The energies of Celestial Niter are often equated with Kundalini, the spiritual force of Indian philosophy: in alchemy, the Secret Fire in Man. Celestial Salt is equated with Prana, the vital energy carried by the air we breathe, which maintains physical life, works at instinctual and unconscious levels, and is influenced by cosmic cycles. Kundalini, or Niter, increases our sense of True Self and True Will by opening wider awareness: at its lowest the self-centred ego, at its highest awareness of our Divine nature. Awakening this Secret Fire is a true initiation into Nature’s mysteries, changing how we perceive Nature, a direct liberating knowledge, and changing and improving the body too: a genuine rebirth, spiritual and physical. The alchemical process fans this fire “carefully, with great judgment and skill.”' },
      { k: 'p', t: 'In the laboratory the Three Essentials are what let us manipulate the Elements: many alchemists say the primal Elements are too subtle for even the most skilled artist, and only Nature works at that level. Michael Sendivogius, in his New Chemical Light (c. 1600), explains that Nature, obeying God, set the four Elements acting on one another without rest: fire acting on air produced Sulfur; air acting on water produced Mercury; water acting on earth produced Salt. Earth, having nothing to act on, produced nothing, but became the nurse, the womb, of the three.' },
      { k: 'cards', items: [
        { title: 'Salt', sub: 'the Body', text: 'The vehicle that lets the other two express themselves. Fixity, consolidation, focus: the material basis, the matrix.' },
        { title: 'Sulfur', sub: 'the Soul', text: 'Consciousness; a fiery principle, brightness. The spiritualised male aspect of the One. Kundalini. A thing’s character, its true colours, its intelligence; the Divine Spark.' },
        { title: 'Mercury', sub: 'the Spirit', text: 'The vital life force, the animating spirit, Chi, Prana. The subtle, spiritualised feminine aspect of the One; pure energy. It bridges Air and Water, the spiritual and material worlds, the volatile and the fixed.' },
      ] },
      { k: 'p', t: 'The Sulfur, consciousness, directs the life force through the body. Directing more life force through ever more refined bodies is the course of Nature and evolution, and alchemical work aims to create and strengthen an incorruptible spiritual body, of which the physical is a reflection.' },
      { k: 'h', eyebrow: 'Vegetable · Animal · Mineral', t: 'The Three Kingdoms' },
      { k: 'p', t: 'To the alchemist everything is alive and has Body, Soul and Spirit, Salt, Sulfur and Mercury, in all three kingdoms. The mineral world seems lifeless because we only understand carbon-based life, but to the alchemist it teems with life and consciousness as much as the others. Everything is evolving, yet exposed to a wave of energies descending into matter, and so to hindrances and impurities from matter not mature enough to evolve further (corruptible matter): the energies of life are weakened and those of matter predominate, when it is life that should. By understanding Nature’s laws and applying them with Art, the alchemist removes the hindrances so life can predominate and lift the subject toward perfection. Nature is the greatest alchemist of all, with all of time; the alchemist assists her with her own laws and methods, and in the laboratory can speed the processes up.' },
      { k: 'h', eyebrow: 'Sacred cycles', t: 'There is a rhythm to everything' },
      { k: 'p', t: 'Nature moves in cycles. Vibration is periodic, circular, and so harmonies arise between things. People have watched the stars to understand Nature’s rhythm, and to help evolution one has to keep within its laws: you would not plant lettuce in the snow. So in the laboratory the alchemist waits for a specific time to carry out an operation, to catch the momentum of subtle forces. There are many such links between gardening and alchemy.' },
    ],
  },
  {
    id: 'ch3', n: 'Chapter 3', title: 'Astrology and alchemy', stage: 'nigredo',
    blocks: [
      { k: 'h', eyebrow: 'As above, so below', t: 'Guidance for the practical Art' },
      { k: 'p', t: 'Astrology is intimately tied to the Hermetic Philosophy and supplies much of the guidance for practical alchemy; the forces of nature are reflected at every level, in Salt, Sulfur and Mercury. Man is a microcosm inseparable from the macrocosm. The Sun is the source of all life and light in our system: it radiates; the planets absorb what they need and radiate the excess, a complex interplay of subtle energies reaching Earth, which is the basis of astrology. The stars join in, and radio astronomy shows we constantly receive energy “fingerprints” from stars and planets.' },
      { k: 'p', t: 'All things are products of their natural cycles. Medicinal plants are harvested at the right time for the part needed, and each stage of the laboratory work is done at an optimal astrological configuration for that operation. It has been said that without knowledge of astrological tools and methods, a true alchemical medicine is not possible. Each illness is a vibratory disharmony in our waveform; through correspondences, alchemical medicine restores the harmony of our true selves.' },
      { k: 'p', t: 'Herbs act on particular organ systems, and herbs and organs alike fall under a planet or sign by affinity. Each planetary sphere has its own signatures: colour, musical tones, parts of the body, diseases, medical effects, herbs, stones and metals. Venus, for example, rules copper, the herb yarrow, and the kidneys. Rulership is two-way, a sympathy, which today we might call resonance: each thing below resonates with planetary energies above. In man’s occult anatomy these planetary representatives are our “Interior Stars”, and practical alchemy uses astrological timing to assist the work on all three levels.' },
      { k: 'cards', items: [
        { title: 'The Waxing Moon', sub: 'enrich and exalt', text: 'Good for enriching an essential by circulations or distillations. Its magnetic pull draws things up: volatilising, exalting and spiritualising them.' },
        { title: 'The Waning Moon', sub: 'separate the pure from the impure', text: 'Good for separating the pure from the impure, by distillation, extraction or calcination. Like the dying moonlight, the matter undergoes the fermentation and putrefaction of death and releases its essence.' },
      ] },
      { k: 'p', t: 'Astrology helps harness subtle forces acting on our subject matter. Physical forces at play have been shown by crystallisation experiments and capillary dynamics, but there is a subtle, spiritual side we seek to capture as well: the subject is the magnet that gathers the energy and holds it.' },
      { k: 'h', eyebrow: 'The importance of the birth chart', t: 'Your own energy signature' },
      { k: 'p', t: 'The natal horoscope shows our own energy signature and how other energies, matter included, affect it; examined in detail it reveals one’s essence. Start with the planets and signs, their energies and rulerships. Understanding their sympathies lets us correct the imbalances that lead to illness and strengthen chosen energies for physical or spiritual improvement. At birth each person is of a particular zodiac type: their energetic imprint predisposes them to a temperament and to an organ weakness peculiar to that sign.' },
      { k: 'list', title: 'Ways of healing with planetary energies', items: [
        'The simplest: use each planet’s energy to support the organs, systems or functions it rules, or to oppose disorders, all according to rulership.',
        'Deeper: study the birth chart and the whole self rather than passing symptoms, for a deeper and longer-lasting balance. At birth the planetary energies are locked into physical material and stamp their influence on every level; the rulers of the houses reveal strengths, weaknesses, disease and health tendencies, and affinities for particular treatments.',
        'Deliberate: introduce planetary energies on purpose to produce effects in body, mind or spirit, experiencing and working with each planetary influence in turn to create physical and spiritual balance.',
      ] },
      { k: 'p', t: 'The pattern of life, death and rebirth repeats in the work. In distillation the liquid passes into an invisible state and condenses in improved form: death, a visit to the spiritual world, and rebirth. In recrystallisation the matter dissolves, becomes clear, and reappears improved. As the birth chart shows the cosmos’s imprint at birth, so at each rebirth of our matter the heavens leave their imprint; by reinforcing one planetary power through many rebirths, the subject becomes polarised to that force.' },
    ],
  },

  // ----------------------------------------------------------------------------------- albedo
  {
    id: 'ch4', n: 'Chapter 4', title: 'Introduction to laboratory alchemy', stage: 'albedo',
    blocks: [
      { k: 'p', t: 'Magophon, commenting on the Mutus Liber, insisted that theory and practice go together, each the consequence of the other: only laboratory practice gives mastery, practice must be controlled by theory, the rigour of the one corrects the vagaries of the other, and the disciple must labour to realise all his concepts.' },
      { k: 'p', t: 'There is only the One Thing; all we perceive is its adaptation. The One takes on the “clothing” of the Four Elements to bring forth Sulfur, Mercury and Salt. The alchemist’s work is to separate, purify and recombine them until they are in perfect proportion and harmony: alchemy is all about bringing things to a greater state of perfection.' },
      { k: 'quote', t: 'Everything which is generated of its elements is divided into three, namely, into salt, sulphur, and mercury. Learn the form which is peculiar to these three. One is liquor, and this is the form of mercury; one is oiliness, which is the form of sulphur; one is alkali, and this is from salt.', by: 'Paracelsus' },
      { k: 'work', id: 'pattern' },
      { k: 'p', t: 'Learning to prepare herbs spagyrically is the usual starting point: it builds skill and understanding and gives some very powerful remedies on the way. These first plant experiments lead to the “Lesser Circulation”, the Plant Stone, very like the “Greater Circulation” that makes the Philosopher’s Stone.' },
      { k: 'work', id: 'rosemary' },
      { k: 'work', id: 'basics' },
      { k: 'work', id: 'sevenbasics' },
      { k: 'fig', id: 'week' },
      { k: 'p', t: 'It is said that the attitude of the artist, more than the process, is what makes alchemy the Divine Art: that energy is transferred to the matter, affects the outcome, and is released again within us from the Elixir in a nobler state. You are the lead that is transmuted into pure gold. Start with simple things and progress as skill and experience lead: these simple procedures are the beginning of a fascinating self-transformation.' },
    ],
  },
  {
    id: 'ch5', n: 'Chapter 5', title: 'Alchemical processes', stage: 'albedo',
    blocks: [
      { k: 'h', eyebrow: 'Spagyrics, alchemy, chemistry', t: 'The subtle something' },
      { k: 'p', t: 'In chemistry the same ingredients and process give the same result whoever mixes them. In alchemy not always: a subtle something can influence the end. The chemist’s materials, compounded and purified by processes the alchemist calls Unphilosophical, are dead bodies only. To work Philosophically is to follow alchemy’s philosophy and know you are working with the life force and consciousness of your materials as well as their body: the quality of your attention affects the quality of life in the subject, as with a houseplant or a pet. Alchemical processes aim to capture and preserve subtle essences in suitable vehicles, all the way down to their material forms.' },
      { k: 'p', t: 'Between 1600 and 1700, the transition from alchemy to chemistry, come some of the clearest descriptions of the processes. Apothecaries used them; the branch of pharmacy for plants came to be called Spagyrics, widely popular until faster, cheaper products of the chemical industry pushed it into obscurity. Some say Spagyrics is the plant work and alchemy the metal work, but alchemy is universal and works at all levels; the spagyric process is fundamental to both, and alchemy also seeks to promote the matter’s evolution.' },
      { k: 'p', t: 'Spagyrics gives powerful medicines for the body; anyone who follows the methods can make them, with no strong dependence on the operator’s state of mind. Alchemy aims at medicines for soul and spirit as well, and the operator is strongly linked to the material: the right state of mind is essential. Once purified to a degree, your essentials become very susceptible to the mental impressions of those around them, good or bad: another reason for alchemy’s secrecy, and why often only the artist may see or handle materials at certain points. These processes can bring deep insight, contact with other realms of consciousness and direct knowledge beyond words: the marriage of intellect and intuition, of Sun and Moon.' },
      { k: 'p', t: 'Alchemy is a spiritual path to enlightenment, a psycho-physiological transformation directed by human self-consciousness. The Great Work, the Magnum Opus, is the spiritual and physical regeneration of the alchemist. Its stages, repeated over and over until perfection, are Nature’s active principles at every level, in plants, metals, our body and psyche. It is not a spring-cleaning or detox from which we fall back into routine, but a true and lasting purification.' },
      { k: 'p', t: 'The transmutation of the alchemist modifies the vibratory activity of our “interior stars” so that lower rates are transmuted and sublimated, lifted up, with a triple result: spiritual illumination; radiant health, from the perfect coordination of the chemical and electrical energies that keep the body; and the activity of powers dormant in most people. Paracelsus: “You will transmute nothing if you have not first transmuted yourself.” Man is the primary subject of the Hermetic Art; making the Stone outside oneself is useless before the first part of the work slowly transforms the operator into the Living Stone. Only then does he have the skill and understanding of subtle forces to make a substance that transmutes others. Astrology and practical Qabalah supply the tools for relating things and raising the Secret Fire in Man; separating the lab work from these interior connections reduces it to common chemistry.' },
      { k: 'h', eyebrow: 'Ora et labora', t: 'Pray and work' },
      { k: 'p', t: 'The old rule of practice, which gives us the word “laboratory”: the lab is a temple and oratory where we labour. Making tinctures and elixirs is a first step in correcting the imbalances of our own Sulfur, Mercury and Salt, and many improvements can increase their power. Each process teaches something of Nature’s operations. You don’t need expensive apparatus to begin: household things will do, as with the Seven Basics, and as you go on, the materials you need have a way of showing up when they are needed.' },
      { k: 'p', t: 'Fire is the main tool of transformation. Alchemy has been called the Work of Vulcan, smith of the gods, and the old masters called themselves Fire Philosophers; the sages agree that control of the fire is the key to success. Without thermostats, and earlier without thermometers, they made delicate distillations and searing heats with coal and charcoal furnaces: anyone who has tended a woodstove or campfire can appreciate the diligence of keeping a crucible at red heat for a month or more with coal. Of the many grades of fire in the texts (Celestial, Central, Secret, and Elemental or Common), the lowest, Common Fire, was graded in the Four Degrees.' },
      { k: 'fig', id: 'fires' },
      { k: 'p', t: 'Today’s electric hot plates and gas can be regulated easily for long periods. In general, start with the lowest temperature that can do the operation and avoid hot spots from uneven heating; you can always raise the heat.' },
      { k: 'h', eyebrow: 'The operations', t: 'Nature’s principles in the vessel' },
      { k: 'p', t: 'The operations represent Nature’s operative principles at every level, and the sages say that knowing the occult operations of the elements is another essential key.' },
      { k: 'h', eyebrow: 'Distillation', t: 'You have already done it' },
      { k: 'p', t: 'Lift the lid of a simmering pot and liquid streams off it; breathe on a cold window and drops form: that is distillation. The earliest accounts describe hanging flocks of wool over boiling pots and wringing the distillate out of the wool. Once many households had a still for medicines, cordials and cosmetics, and you can go a long way in alchemy by mastering it. There are many kinds (simple, fractional, steam, vacuum, solar); chemistry uses it to separate and purify liquids, alchemy also to exalt and evolve the matter through the cycle of life, death and rebirth. A thrift store and some ingenuity can furnish a simple still.' },
      { k: 'quote', t: 'This admirable art teaches how to make spirits, and sublime gross bodies, and how to condense, and make spirits become gross bodies; and to draw forth of plants, minerals, stones and jewels the strength of them, that are involved and overwhelmed with great bulk, lying hid as it were in their chests; and to make them more pure, and thin, and more noble, and so lift them up as high as heaven.', by: 'Giambattista della Porta, Natural Magic (1589)' },
      { k: 'work', id: 'solar' },
      { k: 'p', t: 'In herbal work distillation prepares the Sulfur and Mercury. In steam distillation live steam is injected into a plant-and-water mush and carries the oils over to float on the distilled water; or simply distil the mush and collect the oil from the top. The oil can be mixed with water and distilled again to purify it.' },
      { k: 'work', id: 'rectify' },
      { k: 'work', id: 'digestion' },
      { k: 'work', id: 'sublimation' },
      { k: 'work', id: 'circulation' },
      { k: 'work', id: 'calcination' },
      { k: 'work', id: 'saltofsulfur' },
      { k: 'work', id: 'solve' },
      { k: 'h', eyebrow: 'Inner alchemy', t: 'As you work on your matter, it works on you' },
      { k: 'p', t: 'Each operation can become a powerful transformative meditation if we consciously relate ourselves to the subject. In calcination we burn off the plant’s volatile structural parts that protected it and ensured its propagation; it no longer needs them in its new life as an elixir. Likewise our personality has gathered ephemeral components in its mask, some good, some bad, that have served their purpose. Things tucked away in the unconscious take a great deal of energy to keep hidden, and pop out now and then. We have all been in “the hot seat” when they do, or been forced by some catastrophe to look deep within for what is truly essential: that is part of our personal calcination.' },
      { k: 'p', t: 'We can consciously pull these things out, examine them, learn from them, defuse the grip they have through erroneous beliefs, and move on, purposely calcining out what ties up our energy and freeing it for our transformation into our True Selves. So with every operation: there is a corresponding inner process toward an evolved being. It is often not easy, comfortable or pretty, which is why it is called the Great Work, but in the end what kept us heavy as lead is transmuted into incorruptible spiritual gold. The laboratory processes have a strange way of working on us at every level in spite of ourselves.' },
      { k: 'h', eyebrow: 'The zodiac and the operations', t: 'Twelve operations, one for each sign' },
      { k: 'p', t: 'The stages a matter passes through depend on the subject. Alchemy recognises twelve common operations, one for each sign: when the Moon is in a constellation, the corresponding operation is performed, because the subtle energies governing it are considered optimal, or at least active.' },
      { k: 'fig', id: 'zodiac' },
    ],
  },
  {
    id: 'ch6', n: 'Chapter 6', title: 'Herbal alchemy', stage: 'albedo',
    blocks: [
      { k: 'p', t: 'Beyond tinctures and elixirs there are many ways to obtain the Three Essentials, and many preparations along the path, each with its own medicinal and initiatory powers, with colourful names and surprisingly powerful effects.' },
      { k: 'work', id: 'magistery' },
      { k: 'work', id: 'ens' },
      { k: 'h', eyebrow: 'The Primum Ens Melissae', t: 'Lemon balm, Paracelsus’s favourite' },
      { k: 'p', t: 'The best-known Ens is of Melissa. Paracelsus praised the herb as loaded with an easily obtained Quintessence of great rejuvenating virtue. Franz Hartmann recounts an often-quoted case from Le Fèvre, physician to Louis XIV, in his Guide to Chemistry (c. 1685):' },
      { k: 'p', t: 'A close friend of Le Fèvre made the Primum Ens Melissae and, wanting to see its effects for himself, took a glass of white wine tinctured with it every morning at sunrise. After fourteen days his finger- and toenails began to fall out, painlessly. Not courageous enough to continue, he gave it to an old servant woman of seventy, who took it every morning for about ten days and began to menstruate again as in former days; surprised and frightened, not knowing she had taken any medicine, she refused to continue. He then soaked grain in the wine and fed it to an old hen: on the sixth day it began losing its feathers until it was quite bare, but within two weeks new feathers grew, much more beautifully coloured; her comb stood up again and she began laying eggs.' },
      { k: 'work', id: 'vegstone' },
    ],
  },

  // ----------------------------------------------------------------------------------- citrinitas
  {
    id: 'ch7', n: 'Chapter 7', title: 'Water works', stage: 'citrin',
    blocks: [
      { k: 'p', t: 'Practical alchemy is an experimental art for exploring Nature’s works first-hand. The old masters, often called Chemical Philosophers, understood the unity of all creation and, by exploring materials, came to understand the subtler realms before physical manifestation. Beyond the Stone there are many paths, each lighting another. The alchemist gives Nature the right materials and conditions, and Nature is all too happy to bring them to fruition. As F. la Fontain wrote (1797): Nature and Art must assist each other to perfect the works; Art operates without, and Nature within the glass.' },
      { k: 'h', eyebrow: 'Volatile and fixed solvents', t: 'Two spirits of the plant' },
      { k: 'p', t: 'We use a Mercury to extract or separate the essentials, and it can be a fixed or a volatile solvent. A volatile solvent evaporates faster than water, a fixed one more slowly; but the real difference is in how they act on the subject. Alcohol is the volatile solvent and gives an unfixed tincture; vinegar is a fixed solvent and gives a fixed tincture. In winemaking the plant dies and its spirit enters the water as alcohol; left open, the wine dies a second death as vinegar, which fixes the spirit. These two spirits, one fixed and one volatile, lie at the heart of practical work in both the herbal and mineral realms.' },
      { k: 'p', t: 'Medicinally, volatile (unfixed) elixirs are warming, energising and toning, and more effective in acute illness; fixed elixirs are cooling and contracting, more useful in chronic disease.' },
      { k: 'quote', t: 'Remedies that are unfixed heal unfixed diseases and the radically fixed nonvolatile ones expel fixed diseases which do not move the excrements through evacuation but through sweating and by other means.', by: 'Isaac Newton, Keynes MS 64' },
      { k: 'h', eyebrow: 'Water', t: 'A strange creature' },
      { k: 'p', t: 'Some experiments lie on the border of the Vegetable and Mineral worlds: the use of salts as magnets for subtle forces, and the work on water itself. Water is the only substance on Earth existing as solid, liquid and gas at once in our normal range of temperature and pressure. The Sun radiates the vital energies through the solar system; this Universal Fire of life, one of the alchemist’s Secret Fires, condenses in the air as it reaches our atmosphere, then into the water as the air fills with moisture, and the water gathers and falls as rain. This water, charged with the Secret Fire, a Universal Mercury, becomes determined to a kingdom when it lands: to the Vegetable if it falls on plants, the Animal if touched or drunk by man or beast, the Mineral if it strikes the earth.' },
      { k: 'p', t: 'The Golden Chain of Homer describes the Universal Fire generating “an invisible and most subtle humidity”, which ferments gently into the Universal Acid, “a most subtil, spiritual, incorporeal Niter, Spiritus Mundi”; entering the atmosphere it grows more material, meets an alkaline, passive principle, and is fixed as native Niter.' },
      { k: 'p', t: 'In modern practical alchemy Hydrogen is attributed to Fire, Nitrogen to Air, Oxygen to Water and Carbon to Earth, with the other elements of their periods sharing those qualities. Hydrogen, the most abundant element in the universe, is a true First Matter and the first carrier of Fire; Nitrogen has the most oxidation states of any element and is said to “coagulate matter”. Together they form the Fire-and-Air group the ancients called Alkali (NH₃, ammonia), the matrix of the ammonium (NH₄) salts. The second atmospheric group, Fire-Air-Water (H₂, N₂, O₂), is the “Acid Niter” group: nitric acid (HNO₃) is ammonia with the element of Water added. The Spirit of the World, the embodied Alkali, is the ammonium radical, often called Sal Ammoniac, deposited as rain, snow, dew and hail; it travels in the water as the Salt of Dew, ammonium nitrate, at about 0.5 to 4 grams per ton of rain.' },
      { k: 'work', id: 'rain' },
      { k: 'work', id: 'sevenfold' },
      { k: 'fig', id: 'fractions' },
      { k: 'h', eyebrow: 'The salts', t: 'Magnets for the Universal Fire' },
      { k: 'p', t: 'Certain salts can capture and concentrate the Universal Fire in a body, for evolving our matter and ourselves. They are the basis of many of the Secret Fires in the texts, acting as catalysts to separate or join principles. Jean Dubuis taught that the secrets of the ancients are in the salts: the magnetic salts should attract and capture the astral spirit, the universal seed, which, concentrated, gives a power of germination directed by the matrix it is built into. Isaac Holland’s Hand of the Philosophers gathers the important salts: Niter (potassium nitrate), Sal Ammoniac (ammonium chloride), Vitriol (copper or iron sulfate), Alum (potassium aluminium sulfate) and common salt (sodium chloride). Combined and manipulated properly, they make anything yield its spiritualised essence: keys to unlock matter.' },
      { k: 'quote', t: 'Salts are keys; they open the chest wherein the treasure lies, but you must be sure to take the true key, otherwise you may spoil the lock and not open the chest.', by: 'Theodor Kerkring, commentary on Basil Valentine’s Triumphal Chariot of Antimony' },
      { k: 'quote', t: 'Few persons know how to extract from the rays of the Sun or of the Moon. The means to make this water descend from Heaven is truly wonderful; it is in the stone which contains the Central Water, which is indeed one sole and the same thing with the Celestial Water; but the secret consists in knowing how to make the stone a magnet to attract, embrace, and unite this Astral Quintessence to itself.', by: 'The Hermetical Triumph (1723)' },
      { k: 'p', t: 'For these beginning operations of capturing Celestial Fire, it is each salt’s ability to deliquesce in the air that is used.' },
      { k: 'work', id: 'angel' },
      { k: 'work', id: 'seasalt' },
      { k: 'work', id: 'dewsalt' },
      { k: 'work', id: 'butter' },
      { k: 'work', id: 'archaeus' },
    ],
  },
  {
    id: 'ch8', n: 'Chapter 8', title: 'Return to the fire', stage: 'citrin',
    blocks: [
      { k: 'p', t: 'From common fire to its subtler aspects: Nature has its degrees of volatility and fixity, and alchemy is really all about the Fire in its various aspects.' },
      { k: 'quote', t: 'Fire is the primary agent, that of the whole Art. It is the first of the Four Elements.', by: 'Olympiodorus (c. 500 CE)' },
      { k: 'quote', t: 'Fire, notwithstanding the diversities of it in this sub-lunary kitchen of the elements, is but one thing from one root. This fire is at the root and about the root, I mean about the center of all things both visible and invisible. It is in water, earth and air; it is in minerals, herbs and beasts; it is in men, stars and angels. But originally it is in God Himself; for He is the fountain of heat and fire, and from Him it is derived to the rest of the creatures in a certain stream of sunshine.', by: 'Dr John Dee, The Rosie Crucian Secrets (copied 1712, Harleian MS 6485)' },
      { k: 'p', t: 'In its most subtle form Fire is the One Only Thing, the Undivided Light from which all comes: fire is energy and energy is matter. This finest fire is called Celestial Fire, Heaven, Universal Fire, Astral Gold, Divine Will and much else: the purest grade of fire, not burning but gentle, invisible, known only by its works, the source of every other fire, whose visible representative is the Sun. Remember the “Sun behind the Sun”, the spiritual source of which our visible star is a condensation.' },
      { k: 'cards', items: [
        { title: 'The Universal Fire', text: 'Diffused everywhere; it stirs movement in bodies, warms and preserves the Germ of all things, and develops the Particular Fire.' },
        { title: 'The Particular Fire', sub: 'Innate Fire, Central Sun, Central Fire', text: 'Implanted in each mixture with its Germ. It does little unless excited, then does in its body what its father the Sun does in the universe.' },
        { title: 'The Quintessence', sub: 'the Divine Spark', text: 'The reflection of the Celestial Fire hidden in all things, “the most purified and fixed part of a matter”, formed by the perfect balance of the Four Elements: a whole new, exalted state, the Fifth Element. Its action is digestive and maturing, driving the elements upward to regenerate fire.' },
      ] },
      { k: 'p', t: 'Michael Sendivogius, in The New Chemical Light (1608), called it the Seed: the Elixir or Quintessence of anything, its most perfect digestion and decoction; the Balm of Sulfur, the same as the Radical Moisture in metals. The Four Elements by their unceasing action send a constant supply of seed to the centre of the Earth, where it is digested and sent out again in generative motion: the fountainhead of all earthly things. Projected from the centre in all directions, the Seed produces different things according to the quality of the places it reaches.' },
      { k: 'fig', id: 'firecycle' },
      { k: 'quote', t: 'Thus Fire and Air come down into Waters and impregnate them. The Waters dispose of their thickest part and give it to the Earth. The Earth thereby becomes overloaded or saturated, which superfluity of Earth and Water is again volatilized and sublimed upwards by the Fire (Inverted Fire or Central Fire) into vapors; which ascension and descension God has implanted into the Universal Fire as the great and only Agent of Nature.', by: 'The Golden Chain of Homer' },
      { k: 'quote', t: 'The Earth itself is a condensed or fixed Celestial Fire, and this Fire is a volatilized Earth.', by: 'The Golden Chain of Homer' },
      { k: 'p', t: 'This cycle of Spiritual or Celestial Fire, from the most sublime level (the Qabalistic World of Atziluth) to its densest form in the physical (the World of Assiah) and back again, is the course of the Active Agent in Nature, often called the Fountain of Nature. These are occult elements, not the air we breathe or the water we drink.' },
      { k: 'quote', t: 'You can not move from one extreme to another extreme without the proper medium.', by: 'The Golden Chain of Homer' },
      { k: 'work', id: 'rotation' },
      { k: 'fig', id: 'spiral' },
      { k: 'quote', t: 'When thou hast made the quadrangle round, then is all the secret found.', by: 'George Ripley (c. 1480)' },
    ],
  },
  {
    id: 'ch9', n: 'Chapter 9', title: 'Qabalah and alchemy', stage: 'citrin',
    blocks: [
      { k: 'p', t: 'Like astrology, Qabalah is a study in itself, and the book can only introduce it. Alchemy, Astrology and Qabalah form the three pillars of the Hermetic Art. Paracelsus warned that whoever does not understand the use of the Qabalists and the old astronomers is not born by God for the spagyric art, nor chosen by Nature for the work of Vulcan, nor made to open his mouth about alchemical arts.' },
      { k: 'p', t: 'Jean Dubuis described Qabalah as a comprehensive, integral study of all that exists on the physical and metaphysical planes: the process of creation, the ties between the created and its source, the mechanisms of Nature, the various worlds and spacetimes. The word comes from the Hebrew Qibel, “to receive”: an oral tradition of secret knowledge of Nature’s mysteries. For the alchemist it is a symbolic map of the path the One Only One followed in creating the universe, man included, and of the return to Oneness along the same path. It has always offered a way to approach the spiritual directly, without priestly intervention, a freedom once seen as close to heresy, and the alchemists used its framework in their secret language to reveal and conceal certain works.' },
      { k: 'h', eyebrow: 'The Tree of Life', t: 'Ten spheres, twenty-two paths, thirty-two paths of secret wisdom' },
      { k: 'fig', id: 'tree' },
      { k: 'cards', items: [
        { title: 'The Pillar of Severity', sub: 'left · feminine', text: 'Binah (Understanding), Geburah (Severity) and Hod (Splendour): Saturn, Mars and Mercury.' },
        { title: 'The Pillar of Mercy', sub: 'right · masculine', text: 'Chokmah (Wisdom), Chesed (Mercy) and Netzach (Victory): the band of the Zodiac, Jupiter and Venus.' },
        { title: 'The Pillar of Equilibrium', sub: 'middle · balance', text: 'Kether (Crown), Tiphareth (Beauty), Yesod (Foundation) and Malkuth (Kingdom): the Undivided Light, the Sun, the Moon, and the Earth or physical world.' },
      ] },
      { k: 'p', t: 'One view needs four Trees, one for each World, stacked so that one tree’s Malkuth gives rise to the next one’s Kether, in the order of the Elements: Fire, Air, Water, Earth. For ease they are usually condensed into one tree divided among the Four Worlds, which, though drawn as levels, are superimposed, a continuum of the One.' },
      { k: 'cards', items: [
        { title: 'Atziluth', sub: 'the Archetypal world · Fire', text: 'Pure divinity, superconsciousness, the spiritual world: the Supernal Triad of Kether, Chokmah and Binah.' },
        { title: 'Briah', sub: 'the Creative world · Air', text: 'The archangelic, self-consciousness, the mental world: Chesed, Geburah, Tiphareth, Netzach and Hod.' },
        { title: 'Yetzirah', sub: 'the Formative world · Water', text: 'The angelic, the subconscious, the astral world: Yesod.' },
        { title: 'Assiah', sub: 'the Material world · Earth', text: 'Man, the body, the physical world: Malkuth.' },
      ] },
      { k: 'p', t: 'The Qabalistic view is one of energy and emanation: the universe issues from a single source into all we perceive, light, matter, even space and time, its condensation progressively giving the illusion of matter. Qabalah studies the source of energy, the arenas of its transfer, and its behaviour, which is Nature: what is below reflects what is above. As in alchemy, creation happens in ever denser levels of energy, from the subtlest, Fire, to the densest, Earth, and in this ocean arise the Sephiroth, unique levels of consciousness, the “Spheres of Being”. Each World and each Sephira reflects what comes before or after, but only partially, so each sphere has its own character, as the planets absorb the Sun and radiate the rest, coloured differently. Only the spheres of the Middle Pillar equilibrate, able to harmonise or reflect all the energies of creation.' },
      { k: 'p', t: 'Practical Qabalah is a system of operation built on the Tree’s interconnections. As the planets have their correspondences, the Tree shows their relationships; used properly, they let the alchemist gather and direct subtle energies at any level, progressively condensing Celestial Fire into physical manifestation. This is where the alchemist’s mental and spiritual exercises bear on the subject and finally condense into physical reality.' },
    ],
  },

  // ----------------------------------------------------------------------------------- rubedo
  {
    id: 'ch10', n: 'Chapter 10', title: 'Introduction to mineral and metallic works', stage: 'rubedo',
    blocks: [
      { k: 'caution', t: 'The book strongly cautions: know the theory first before attempting the praxis. The plant work prepares you for the minerals, but plants are much more forgiving of mistakes and accidents. Without that developed skill, and the sense of precaution that comes from experience, certain kinds of mineral work are quite deadly.' },
      { k: 'p', t: 'Minerals and metals are crystalline: the densest forms of the One, with the life force locked inside the crystal matrix very pure and very powerful; look at the power of crystalline materials in our technology, from the silicon chip to nuclear power. Herbal elixirs are powerful tools you could spend a lifetime exploring, but the most powerful alchemical medicines have always been sought in the Mineral world. The basics are the same: separation and purification of the Three Essentials, then their reunion and revivification, with longer, more complex methods at higher temperatures. Because the work is more complex you form a stronger link with your subject, and many operators have felt a sacred space or field of force during intense mineral procedures.' },
      { k: 'p', t: '“There are many paths that lead to the one effect”, as one old master said. The processes for mineral works, and for the Stone, divide into two modes; some masters say there is no true Dry Way, since the liquid state is essential for the transfer of celestial and vital forces.' },
      { k: 'cards', items: [
        { title: 'Via Humida', sub: 'the Wet Way', text: 'Separates the three essentials by fermentation and exaltation, or by extraction with a menstruum derived from a fermentation and determined to the matter’s kingdom.' },
        { title: 'Via Sicca', sub: 'the Dry Way', text: 'Separates the essentials by calcination, fusion, sublimation, amalgamation and dry distillation of prepared materials. The subtle principles pass from medium to medium during fusion.' },
      ] },
    ],
  },
  {
    id: 'ch11', n: 'Chapter 11', title: 'Via Humida: the menstruums', stage: 'rubedo',
    blocks: [
      { k: 'p', t: 'In the Wet Work the best solvent is the Mercury of the particular kingdom: a vegetable Mercury for plants, and the right solvent for minerals and metals. The alchemists called these solvents Menstruums, or Menstrua. They were not solvents in the modern sense: many took months to prepare, often following the Moon’s phases, which partly explains the name. They were held to be full of vital life force, able to pass the Universal Fire into the subject, even to revive it: as the menstruum nourishes and forms the foetus, the alchemist’s menstrua have a nutritive power to bring forth the Chemical Child, the Living Medicine. In some texts a special menstruum is a Secret Fire, which dissolves or separates the subject without external fire. Water, alcohol, vinegar, acetone and ether are the commonest starting points. Wine and vinegar, the volatile and fixed spirits of the plant kingdom, are all the solvent power the plant work needs; their combination is the first menstruum for mineral work.' },
      { k: 'work', id: 'vrm' },
      { k: 'work', id: 'kerkring' },
      { k: 'work', id: 'tartaralkahest' },
      { k: 'work', id: 'urine' },
    ],
  },
  {
    id: 'ch12', n: 'Chapter 12', title: 'Concerning the minerals', stage: 'rubedo',
    blocks: [
      { k: 'quote', t: 'The bodies of metals are domiciles of their spirits. When their terrestrial substance is by degrees made thin, extended, and purified, the life and fire hitherto lying dormant is excited and made to appear: for the life which dwells in the metals is laid hid, as it were, asleep, nor can it exert its power or show itself unless the bodies be first dissolved and turned into their radical source. Being brought to this degree at length, by abundance of their internal light they communicate their tinging properties to other imperfect bodies.', by: 'The Golden Treatise of Hermes Trismegistus' },
      { k: 'p', t: 'The species of the Mineral realm are as varied as plants and animals; some forms are easier to find and work to obtain the essentials of each planetary type.' },
      { k: 'fig', id: 'ores' },
      { k: 'work', id: 'ores' },
      { k: 'h', eyebrow: 'Metallic oils', t: 'The Sulfur of the metals' },
      { k: 'quote', t: 'The Sulphur of the metals is an oiliness extracted from the metals themselves, endowed with very many virtues for the health of man.', by: 'Paracelsus' },
      { k: 'p', t: 'If you carefully follow the sages’ instructions for oils and elixirs from the metals, you do get the products they describe, which increases confidence in what they say about using them. The medicinal use of mineral oils has a long history, some reports bordering on the miraculous; but, again, the Vegetable world forgives mistakes far more than the Mineral. Without understanding the theory and practice, an assumed “Tincture of Iron or Copper” may be just a solution of toxic metal salts and not the true alchemical Sulfur of the metal. Many operators consider the metal a catalyst that changes the solvent in characteristic ways, with no actual metal in the final product. Still, the metallic works teach Nature’s operations and give tangible results that show the operator’s progress. Many different oils come from the metals, depending on the subject and the method of extraction.' },
      { k: 'claims', title: 'The metallic oils and their reported effects', intro: 'For curiosity’s sake, the book summarises reported medicinal and psychological effects from older texts and modern workers, and says they are not to be taken as medical advice.', items: [
        { name: 'Oil of Antimony', text: 'Not one of the seven ancient metals, but long used in alchemy. Many alchemists claimed it the best blood purifier available. The volatilised oil is said to help restore youth. Depending on preparation, it rids the body of toxins by purgation, catharsis or sweating. Many claims over the centuries of curing cancer and leprosy. Held to be nearly a universal medicine, with a penetrating fire that works with any other planetary medicine and delivers it powerfully to its target: hence the Triumphal Chariot.' },
        { name: 'Oil of Gold', text: 'A medicine of the highest order: strengthens circulation as a heart tonic, generally strengthens every system, a good blood purifier and regenerative. A true universal medicine, often called Potable Gold, prized since ancient times. Used successfully, the book reports, for rheumatism, arthritis, cancer, syphilis, uraemia and multiple sclerosis. Mentally, good for a weak will; strengthens ambition, courage, vitality and creativity. The smallest amount strengthens any other herbal or mineral elixir.' },
        { name: 'Oil of Silver', text: 'Effective for disorders of the brain, cerebellum, nervous system, memory and emotions; used in epilepsy, depression, mania and emotional trauma. Affects the subconscious and dreams; useful for understanding one’s hidden past; removes fears and mental blocks; enhances psychic sensitivity and imagination.' },
        { name: 'Oil of Mercury', text: 'Powerfully affects the nervous system, respiratory system and liver. Used for skin problems, soothing the nerves, asthma and breathing problems. Promotes sensory awareness and quickens perception; useful for speech and other communication problems.' },
        { name: 'Oil of Copper', text: 'Useful for diseases of the liver, thyroid and reproductive organs. Stabilises blood pressure and purifies the body of blood-borne infections. Used in leukaemia and cancer. Enhances psychic sensitivity and attraction to the opposite sex.' },
        { name: 'Oil of Iron', text: 'Another powerful regenerative for the whole body. Strengthens and purifies the blood and rapidly heals wounds, cuts and abrasions. Used for the gall bladder, pancreas, bleeding ulcers and ulcers in general. Said to enhance natural instincts and give extra energy, especially mixed with Sun herbs; said to activate the potentials of most other herbs.' },
        { name: 'Oil of Tin', text: 'Useful for problems of the liver and lungs; balances how the body stores and uses sugars. Held to be sudorific, vermifuge and antispasmodic. Mentally it affects attitudes to growth and wealth and brings a jovial light-heartedness.' },
        { name: 'Oil of Lead', text: 'Especially effective for diseases of the bones, atrophy of the body and muscles, and the spleen. Used for acute lead toxicity, anaemia and neuropathy. Said to increase steadiness, patience and tolerance.' },
      ] },
    ],
  },
  {
    id: 'ch13', n: 'Chapter 13', title: 'Via Humida, part two: the acetates', stage: 'rubedo',
    blocks: [
      { k: 'p', t: 'A different and very effective process through the acetates of the metals, beginning with the last menstruum of the Wet Way, the Radical Vinegar, which opens the way to the Philosophical Essentials of the mineral realm and is one of the paths to the Philosopher’s Stone.' },
      { k: 'work', id: 'radicalvinegar' },
      { k: 'work', id: 'acetate' },
      { k: 'work', id: 'saturn' },
      { k: 'p', t: 'An illustration from The Art of Distillation shows the basic design for the acetate work: the still on the furnace holds the acetate; the vapour passes through a cooling system into a receiver that catches most of the distillate, and a second cooling system leads on to a second receiver for the most volatile spirits.' },
    ],
  },
  {
    id: 'ch14', n: 'Chapter 14', title: 'Via Sicca: the Dry Way', stage: 'rubedo',
    blocks: [
      { k: 'p', t: 'The Dry Way is held to be faster, but more dangerous and requiring developed skill: fierce heat, toxic materials, molten salts or metals, and agility in handling them. Some artists shun its violent methods altogether.' },
      { k: 'quote', t: 'Fire is the life of metals while they are still in their ore, and the fire of smelting is their death.', by: 'Michael Sendivogius' },
      { k: 'p', t: 'The death of the material, its putrefaction, is the key that frees the spiritual components from the prison of the body. The trick, wet or dry, is to capture the subtle essence in a suitable vehicle before it vapours away. Paracelsus: to grasp the invisible elements, attract them by their material correspondences, and control, purify and transform them by the living power of the spirit: this is true alchemy. In the solid state the body is subject to the forces of Earth and the Universal Fire is its prisoner; the Dry Way opens an entrance into minerals and metals to free their Quintessence. Most of its operations use amalgamation with metallic mercury, or melting and fusion, since the vital and spiritual energies transfer in the liquid state, and escape unless captured by a magnet or proper medium.' },
      { k: 'h', eyebrow: 'The Hand of the Philosophers', t: 'Five salts, five keys' },
      { k: 'p', t: 'The alchemical Sulfur and Mercury are released and captured by “the Hand of the Philosophers”: Isaac Holland’s name for the handful of mineral salts that unlock mineral and metallic essences. Combined and prepared in many ways they open any metal or mineral so a suitable medium can extract its spiritual essence. “In the power of the salts and their preparation lies the whole art of alchemy.”' },
      { k: 'fig', id: 'hand' },
      { k: 'work', id: 'niter' },
      { k: 'work', id: 'vitriol' },
      { k: 'work', id: 'lunatincture' },
      { k: 'work', id: 'alum' },
      { k: 'work', id: 'fixedsalt' },
      { k: 'h', eyebrow: 'Dissolving waters and mineral acids', t: 'Aqua fortis, strong waters' },
      { k: 'work', id: 'strongwaters' },
      { k: 'work', id: 'drymenstruum' },
      { k: 'work', id: 'ysopaica' },
    ],
  },
  {
    id: 'ch15', n: 'Chapter 15', title: 'Antimony', stage: 'rubedo',
    blocks: [
      { k: 'p', t: 'Once you begin on the alchemical path, it is said, strange coincidences (synchronicity) draw toward you the information and materials you need. So it was for Bartlett and antimony: home from the PRS class on antimony’s wonders, within a month and by an odd series of events he was working underground in an antimony mine he had not known existed, sixteen miles from home, and soon had all the fresh-picked antimony he needed.' },
      { k: 'p', t: 'Known from very ancient times as Mestem, Asinat, Stimmi and Stibium (hence the symbol Sb), antimony has always held a special place in alchemy. It is considered toxic, very like arsenic, and fascination with it led to abuses and scams that killed many who had heard of its healing virtues, so that in 1566 Parliament forbade its use in medicine for about a hundred years. Antimony is said to be the mineral of Malkuth, with Earth as its planetary ruler. It contains the rays of all the other planets, and so is said to be immortal; its spirit is fixed to the sphere of Earth.' },
      { k: 'p', t: 'Frater Albertus wrote that the ancients praised antimony highly for its hidden medicinal virtues, and that in medieval times Basil Valentine and Paracelsus rediscovered its extraordinary curative power and wrote much about it. Valentine called it one of the Seven Wonders of the World and the best blood purifier available, and claimed to have cured many diseases with it, cancer among them; about two hundred and fifty years later Dr Kerkring of Holland, preparing and using antimonial tinctures in his practice, confirmed those claims. Its hidden power is pictured in alchemical images as a black dragon, a venomous serpent, a wolf, or an orb surmounted by a cross. The authoritative text is Valentine’s Triumphal Chariot of Antimony, first printed around 1600, though some say it is two or three hundred years older.' },
      { k: 'work', id: 'stibnite' },
      { k: 'work', id: 'kermes' },
      { k: 'work', id: 'glass' },
      { k: 'work', id: 'antimonyvinegar' },
      { k: 'work', id: 'redoil' },
      { k: 'work', id: 'regulus' },
      { k: 'work', id: 'doves' },
    ],
  },
  {
    id: 'ch16', n: 'Chapter 16', title: 'The seed of metals', stage: 'rubedo',
    blocks: [
      { k: 'quote', t: 'Matter is no other than a meer vapor, which extracted from the elementary earth by the superior stars, as by a sidereal distillation of the Macrocosm, which sidereal hot infusion, with an airy-sulphureous property descending upon inferiors, so acts and operates, that in those metals and minerals is implanted spiritually and invisibly a certain power and virtue, which fume afterwards resolves itself in the earth into a certain water, from which mineral water all metals are thenceforth generated and ripened to their perfection; and thence proceeds this or that metal or mineral, according as one of the three principles acquires dominion.', by: 'Basil Valentine, The Triumphal Chariot of Antimony' },
      { k: 'p', t: 'Today no one thinks minerals have, or come from, seeds; in alchemy this is a great secret of the Art. Sendivogius taught that Nature is invisible though she acts visibly, a volatile spirit showing herself in material shapes, whose existence is in the Will of God: she is One, and produces different things only through the instrument of Seed, doing whatever the Sperm requires of her. The Seed is the Quintessence of a thing, its most perfect digestion and decoction, the Radical Moisture. There is only one seed: its differences come only from the place (the womb) and the degree of cooking, and it is perfectly ripened in gold.' },
      { k: 'quote', t: 'The seed of metals is what the Sons of Wisdom have called their Mercury, to distinguish it from quicksilver, which it nearly resembles, being the Radical Moisture of metals. This, when judiciously extracted, without corrosives or fluxing, contains in it a seminal quality whose perfect ripeness is only in gold; in the other metals it is crude, like fruits which are yet green, not being sufficiently digested by the heat of the Sun and action of the elements. We observed that the Radical Moisture contains the Seed, which is true; yet it is not the Seed, but the Sperm only, in which the Vital Principle floats, being invisible to the eye. Though the seed is the most glorious of all created things, yet the womb is its life, which causes the putrefaction of the enclosing grain or sperm, brings about the congelation of the Vital Atom, nourishing and stimulating its growth by the warmth of its own body.', by: 'Collectanea Chemica' },
      { k: 'p', t: 'The Salt, the body, determines how the Fire, the Seed, burns in this physical world: Salt is the Womb in which the sulfurous and mercurial natures unite to produce the Living Chemical Child in which the Celestial Fire incarnates. Everything produces seed after its kind, and the sages remind us that putting the right seed in the right matrix is the artist’s work; then Nature takes over, all too happy to bring it to fruit. You won’t get a dog by planting wheat, or a cow from a hen’s egg, so don’t expect to grow a metal without the Metallic Seed. Where is it found? The Collectanea Chemica says plainly: in the metals’ ores, as they occur in nature. The most coveted is the Seed of Gold, gold holding the most perfect reflection of the Celestial Fire.' },
      { k: 'quote', t: 'The Stone you seek, we said and still affirm, is only gold, brought to so high perfection as it is possible; which though a firm compacted body is, yet by art’s direction and nature’s operation, made a tinging spirit which will never fade.', by: 'Philalethes' },
      { k: 'p', t: 'As the alchemists describe many degrees of fire, so they describe many grades of gold, and we must discern which they mean. The Hermetical Triumph names three.' },
      { k: 'fig', id: 'golds' },
      { k: 'p', t: 'Johannes Trithemius described the Astral Gold as a living Universal Fluid extending through all Nature, penetrating every being, the subtlest of all things, incorruptible, filling infinite space. The Sun and planets are condensed states of it, distributing their abundance through their beating hearts to the forms of the lower worlds and every being, pushing those forms toward perfection. The spirit can be obtained the same way the stars give it to the Earth; the forms in which it becomes fixed become perfect and permanent; the Philosophical Stone is the ultimate that can be made with it, making the volatile fixed.' },
      { k: 'quote', t: 'The gold of the wise is properly the gold of the second species; for when this gold is perfectly calcinated, and exalted to the cleanness and whiteness of snow, it acquires by Magistery a natural sympathy for the Astral Gold, of whom it has visibly become a true magnet; it attracts and concentrates in itself so great a quantity of Astral Gold and of solar particles, received from the continuous emanation of them in the center of the Sun and Moon, that it is in a disposition near to become the living gold of the Philosophers.', by: 'The Hermetical Triumph (1723)' },
    ],
  },
  {
    id: 'ch17', n: 'Chapter 17', title: 'The Philosopher’s Stone', stage: 'rubedo',
    blocks: [
      { k: 'p', t: 'In the Hermetic tradition the Stone is a heavy crystalline substance, much like powdered glass, from crimson to saffron in colour. It has no smell, will not burn, yet melts like wax in a candle flame alone and dissolves readily in water or wine. Its materials are abundant and available to anyone. It is said to cure all sickness, restore lost youth, and transmute other metals into gold. The old adepts constantly assure us of its physical reality; several European museums exhibit gold reportedly made by alchemy, and reports of transmutations continue to our day.' },
      { k: 'p', t: 'By the end of the nineteenth century transmutation was a dead issue: “the elements are immutable”. Then came radioactivity, transmutation happening naturally. In the 1960s it was announced that the alchemist’s dream had come true when scientists made a tiny amount of gold by bombarding mercury with high-energy particles. In the 1970s and 80s the French biochemist Louis Kervran showed elemental transmutation as a natural process in living things, “Biological Transmutations”. The Cold Fusion controversy goes on, and quantum physics says the observer affects the material world. Alchemy’s promises seem far from dead.' },
      { k: 'p', t: 'The perfection and evolution of the alchemist is the true goal. One must become the Living Stone before making the tangible one, and the skills to make it are revealed gradually as one’s own transformation unfolds. The physical Stone is more a final test, a proof of success, by which point making gold will seem trivial. In the wrong hands it could devastate the world economy: it could be multiplied in quantity and power until an ounce made ten thousand ounces of gold and cured hundreds at Death’s Door. Christopher Glaser asked, around 1650, whether you would feel safe walking down the street with the power to make ten thousand ounces of gold in your vest pocket; in the past many were imprisoned and tortured for the secret, and it would be no different now. Some say that is why the adepts guarded alchemy so closely: with great power comes great responsibility, and the ability to attract great consequences.' },
      { k: 'quote', t: 'Therefore the philosophers say their matter is in all things, yet have selected such subjects wherein the Universal Spirit is more abundantly contained and more concentrated and easier to be obtained.', by: 'The Golden Chain of Homer' },
      { k: 'h', eyebrow: 'Divine Cinnabar', t: 'The third road to the Stone' },
      { k: 'p', t: 'Two common paths to the Stone have been shown: the Wet Way through lead acetate and the Dry Way through the Star Regulus of Antimony. The last is the way of the Divine Cinnabar, left for last because it uses very toxic metallic mercury. Every skill learned in the Lesser Works will be needed in the Great Work to avoid mishap.' },
      { k: 'p', t: 'Common metallic mercury is a curious thing: liquid at ordinary temperatures, bright as silver and heavy as gold, seemingly poised to become any metal. The least vibration sets it quivering for some time; it seems alive. The ancients called it Argent Vive, living silver, or Quicksilver, quick to move and quickened with life; being liquid, it is still strongly influenced by the subtle spiritual energies around it. The idea of the mercury work is that mercury plays the female and gold the male, and their proper union gives birth to the Chemical Child. Neither common mercury nor common gold will do: both need Philosophical preparation. The mercury is purified, then reanimated, recharged with Universal Fire to awaken its generative power; the Animated Mercury is digested with prepared gold in the right proportion and regimen of heat through the black, the white, and finally the red, the Red Stone, much as with the Star Regulus.' },
      { k: 'p', t: 'De Lintaut (Friend of the Dawn) wrote that gold is the true leaven of the Elixir: a marriage takes place between the mercury menstruum, the female, and the Sun, gold, the male; the woman draws the seed of the gold, and that seed makes the mercury like itself by digestion alone.' },
      { k: 'work', id: 'mercurypure' },
      { k: 'work', id: 'animategold' },
      { k: 'work', id: 'cinnabar' },
      { k: 'work', id: 'rebis' },
      { k: 'fig', id: 'stages' },
      { k: 'work', id: 'inceration' },
      { k: 'work', id: 'multiplication' },
      { k: 'work', id: 'projection' },
    ],
  },
  {
    id: 'conclusion', n: 'Conclusion', title: 'There is only the One Thing', stage: 'rubedo',
    blocks: [
      { k: 'p', t: 'Chemists ask Bartlett, “Is alchemy like chemistry?”, and he usually answers, “No, not at all really.” They parted ways centuries ago, not on the best of terms; laboratory alchemy was further obscured by chemistry’s new terms and goals, and most chemists today have no idea what alchemy is really about. The stigma since medieval times has left much of its potential unexplored.' },
      { k: 'p', t: 'Science, for all its progress, is not all-knowing. Around 1900 it celebrated its three essential building blocks of matter (proton, neutron, electron) under four fundamental forces; then the particles were found to be made of smaller ones, and those of smaller still. We have reached limits of divisibility, a tangle of statistics and probability, where the powers of mind begin to show and the observer becomes key: at the quantum level science recognises the influence of mind, and modalities of time and space like sheets, layers or spheres of being. It is starting to sound a bit “Jabir-ish”. Science is coming full circle to what the ancient mystery schools taught; medicine is beginning to recognise man’s subtle energy structure, such as the acupuncture meridians. Practical alchemy has been branded fraud, or at best pseudo-science, by those with no practical experience of it.' },
      { k: 'p', t: 'Many secrets wait in the ancient Art for the practising artist to rediscover. As Magophon said, the disciple must exert himself to realise all his concepts: you have to do the work for the light to shine, and Nature will do her part. Israel Regardie, who in 1938 had published The Philosopher’s Stone reading alchemy mystically and psychologically, later studied with Frater Albertus, and wrote in his second edition that a few minutes in the laboratory showed him how presumptuous he had been to insist that all alchemy was psycho-spiritual, and that in doing so he had done a grave disservice to the ancient sages.' },
      { k: 'p', t: 'There is only the One Thing, the Celestial Fire, and we all have a part in its journey of self-realisation. The Great Work is to follow Nature and help her unfold. The Celestial Fire is often called the Divine Will; our own will is its reflection, the fire that drives all creation. Discovering our True Will, our purpose, and fulfilling it is the alchemist’s highest accomplishment and service to Nature.' },
      { k: 'p', t: 'Fulcanelli, as the book closes: the secret of alchemy is that there is a way of manipulating matter and energy to produce what modern scientists call a “field of force”. This field acts on the observer and puts him in a privileged position in the universe, from which he has access to realities ordinarily hidden from us by time and space, energy and matter. This is what we call the Great Work.' },
    ],
  },
  {
    id: 'appendix', n: 'Appendix', title: 'Planets, metals, organs, days and herbs', stage: 'rubedo',
    blocks: [
      { k: 'fig', id: 'planets' },
      { k: 'p', t: 'A short selection of common herbs and their planetary rulers, mostly from the 16th-century herbalist Nicholas Culpeper’s Compleat Herbal, held in esteem by alchemists old and modern.' },
      { k: 'fig', id: 'herbs' },
      { k: 'h', eyebrow: 'Bibliography', t: 'The book’s sources' },
      { k: 'p', t: 'Bartlett notes that most of these works, and many more, are available in translation online; two of his favourite places for original texts are alchemyweb.com and alchemylab.com.' },
      { k: 'list', items: [
        'Paul M. Allen (ed.), “Secret Symbols of the Rosicrucians of the 16th and 17th Centuries”, in A Christian Rosenkreutz Anthology (1968)',
        'Anonymous, Collectanea Chemica (1893; repr. 1963)',
        'Anonymous, Praxis Spagyrica Philosophica (1711), tr. with commentary by Frater Albertus (1966)',
        'Altus, Mutus Liber (La Rochelle, 1677), with Magophon’s commentary, tr. Kjell Hellesoe (1985)',
        'Christian August Becker, Das Acetone (1867), tr. Shuck and Nintzel (1981)',
        'Brian Cotnoir, The Weiser Concise Guide to Alchemy (2006)',
        'Henri De Lintaut, Friend of the Dawn (1700), tr. Wilson Wheatcroft (1982)',
        'Giambattista della Porta, Natural Magic, Book Ten',
        'B. J. T. Dobbs, The Foundations of Newton’s Alchemy (1975)',
        'Jean Dubuis, PON Seminars 1992, tr. Patrice Maleze',
        'Essentia: Journal of Evolutionary Thought in Action, Paracelsus College (1980)',
        'Nicholas Flamel, Hieroglyphical Figures (1624)',
        'Frater Albertus, Alchemist’s Handbook (1974)',
        'John French, The Art of Distillation (1651)',
        'Fulcanelli, The Dwellings of the Philosophers, tr. Donvez and Perrin (1999)',
        'Johann Rudolf Glauber, Complete Works, tr. Christopher Packe',
        'Christopher Glaser, The Complete Chymist (1677)',
        'Franz Hartmann, The Life of Paracelsus',
        'Dennis William Hauck, The Emerald Tablet: Alchemy for Personal Transformation (1999)',
        'Isaac Holland, A Compendium of Writings by Johan Isaaci Hollandus (1981)',
        'Phillip Hurley, Herbal Alchemy (1977)',
        'Manfred M. Junius, The Practical Handbook of Plant Alchemy (1985)',
        'Louis Kervran, Biological Transmutations (1972)',
        'Anton Kirchweger, The Golden Chain of Homer (1723), tr. Sigismund Bacstrom (1797)',
        'Petri Murien, Alchemically Purified and Solidified Mercury, tr. Brigitte Donvez (1992)',
        'Isaac Newton, Keynes MS 64, King’s College, Cambridge',
        'Paracelsus, The Hermetic and Alchemical Writings, ed. A. E. Waite (1894)',
        'Paracelsus, Volumen Medicinae Paramirum, tr. Kurt F. Leidecker (1949)',
        'Eirenaeus Philalethes, An Open Entrance to the Closed Palace of the King',
        'Israel Regardie, The Philosopher’s Stone, 2nd ed. (1970)',
        'George Ripley, Liber Secretissimus',
        'Michael Sendivogius, The New Chemical Light (1608)',
        'The Hermetical Triumph (1723)',
        'Three Initiates, The Kybalion (1908)',
        'Hermes Trismegistus, Golden Tractate of Hermes',
        'Basil Valentine, The Triumphal Chariot of Antimony, with annotations by Theodore Kerkring (1678)',
        'Johannes Segerus Weidenfeld, Secrets of the Adepts (1685)',
      ] },
    ],
  },
];

/** Stage headers: the four colours of the Work, each holding its chapters. */
export const STAGE_HEADS: { k: StageK; roman: string; latin: string; title: string; lede: string }[] = [
  { k: 'nigredo', roman: 'I', latin: 'Nigredo', title: 'Theory before the fire', lede: 'The warning, the history, the laws of Hermes, the Elements and the Essentials, and the sky that times every operation.' },
  { k: 'albedo', roman: 'II', latin: 'Albedo', title: 'The laboratory and the plants', lede: 'The spagyric art, every operation of the laboratory, and the herbal works up to the Vegetable Stone.' },
  { k: 'citrin', roman: 'III', latin: 'Citrinitas', title: 'Water, fire and the Tree', lede: 'Rain and its seed, the salts that drink the Universal Fire, the rotation of the Elements, and the Qabalah.' },
  { k: 'rubedo', roman: 'IV', latin: 'Rubedo', title: 'Minerals, metals and the Stone', lede: 'The Wet Way and the Dry, the salts of the Hand, antimony, the seed of metals, and the Philosopher’s Stone.' },
];
