// Financial sorcery after Jason Miller, *Financial Sorcery: Magical Strategies to Create Real and
// Lasting Wealth* (2012). The book's strategies, rituals, recipes and warnings, retold in plain
// English for this site. The author's invocations and the illustrator's glyph drawings are not
// reproduced; page numbers point to the printed book.
import type { N } from '../lib/num';

export type Kind = 'act' | 'magic';
export interface WStep { do: string; why: string; kind: Kind }
export type FamilyK = 'base' | 'debt' | 'flow' | 'work' | 'rise' | 'build' | 'urgent' | 'grow';
export type Tool = 'payoff' | 'growth' | 'odds' | 'score' | 'kamea' | 'mandala' | 'dodont';
export interface Strategy {
  id: string; family: FamilyK; title: string; short: string; what: string; helps: string;
  need?: string[]; steps: WStep[]; care?: string[]; note?: string; pages: string; tool?: Tool;
}
export interface Family { k: FamilyK; title: string; need: string; intro: string; color: string }

export const FAMILIES: Family[] = [
  { k: 'base', title: 'Foundations', need: 'Build my base', color: 'var(--p3)', intro: 'The daily skills and allies the book builds everything on: a calm mind, the breath, good intelligence, an altar, and friendly powers.' },
  { k: 'debt', title: 'Get out of debt', need: 'I’m in debt', color: 'var(--p9)', intro: 'Seven steps, from opening the envelopes to spending wisely, with magic for every stage.' },
  { k: 'flow', title: 'Keep money flowing', need: 'Keep money flowing', color: 'var(--p5)', intro: 'Standing charms that keep wealth coming in, and the accounts and cards that hold it.' },
  { k: 'work', title: 'Find work', need: 'I need a job', color: 'var(--p6)', intro: 'A seven-step strategy that takes you from one applicant in eighty to the one.' },
  { k: 'rise', title: 'Get promoted', need: 'I want a promotion', color: 'var(--p1)', intro: 'Eleven steps to rise at work, from honest self-assessment to asking for it.' },
  { k: 'build', title: 'Start a business', need: 'I want to start something', color: 'var(--p4)', intro: 'Finding, testing and funding an idea, running it, and knowing when to quit the day job, or the business.' },
  { k: 'urgent', title: 'Money fast', need: 'I need money fast', color: 'var(--p8)', intro: 'The book’s emergency spells, and the ordinary ways to raise money quickly that must go with them.' },
  { k: 'grow', title: 'Make it grow', need: 'I want my money to grow', color: 'var(--p7)', intro: 'Making your money make money: investing, income that does not need your hours, and retirement.' },
];

// ---------------------------------------------------------------------------------------------
// The seven planets on a money strategy (Chapter 4, with the book's job-hunt example widened).
// ---------------------------------------------------------------------------------------------
export interface PlanetMoney { n: N; day: number; role: string; job: string; ask: string }
export const PLANET_MONEY: Partial<Record<N, PlanetMoney>> = {
  2: { n: 2, day: 1, role: 'Timing and rhythm', job: 'Being in the right place at the right time: seeing the right openings and having your efforts land when they should.', ask: 'Is my timing right? When should I act, and when should my efforts land?' },
  5: { n: 5, day: 3, role: 'Information and movement', job: 'Messages, applications, contracts and the flow of cash. Your checking account is Mercury’s.', ask: 'What do I need to know, and where must my word and my money move?' },
  6: { n: 6, day: 5, role: 'People and relations', job: 'Networking, sweetening relations, interviews and negotiation: bringing people together.', ask: 'Whom do I need on my side, and how can I sweeten things between us?' },
  1: { n: 1, day: 0, role: 'Inspiration and patrons', job: 'A fresh approach when you are stuck, health and energy, and finding patrons and helpers.', ask: 'Where am I stuck, and what new path or patron could light the way?' },
  9: { n: 9, day: 2, role: 'Competition and victory', job: 'Cutting through competition, banishing bad luck and crossed conditions, carrying an air of command.', ask: 'What am I up against, and what bad luck must go?' },
  3: { n: 3, day: 4, role: 'Increase and sovereignty', job: 'Salary, benefits, savings and wealth itself. Your savings account is Jupiter’s.', ask: 'How do I make sure this brings the increase I need?' },
  8: { n: 8, day: 6, role: 'Endings and binding', job: 'Ending projects well, killing poverty, binding yourself to discipline, and dealing with creditors.', ask: 'How should this end, and what discipline will hold me to the plan?' },
};

/** Traditional names for each planet (the book's chart, p. 62). The book warns against calling them all at once. */
export const CORRESPONDENCES: { n: N; roman: string; day: string; archangel: string; intelligence: string; spirit: string; olympic: string; babylonian: string }[] = [
  { n: 8, roman: 'Saturn', day: 'Saturday', archangel: 'Tzaphkiel', intelligence: 'Agiel', spirit: 'Zazel', olympic: 'Aratron', babylonian: 'Ninib' },
  { n: 3, roman: 'Jupiter', day: 'Thursday', archangel: 'Tzadkiel', intelligence: 'Iophiel', spirit: 'Hismael', olympic: 'Bethor', babylonian: 'Marduk' },
  { n: 9, roman: 'Mars', day: 'Tuesday', archangel: 'Khammael', intelligence: 'Nakhiel', spirit: 'Bartzabel', olympic: 'Phaleg', babylonian: 'Nergal' },
  { n: 1, roman: 'Sol', day: 'Sunday', archangel: 'Michael', intelligence: 'Graphiel', spirit: 'Sorath', olympic: 'Och', babylonian: 'Shammash' },
  { n: 6, roman: 'Venus', day: 'Friday', archangel: 'Haniel', intelligence: 'Hagiel', spirit: 'Kedemel', olympic: 'Hagith', babylonian: 'Inanna' },
  { n: 5, roman: 'Mercury', day: 'Wednesday', archangel: 'Raphael', intelligence: 'Tiriel', spirit: 'Taphthartharath', olympic: 'Ophiel', babylonian: 'Nebo' },
  { n: 2, roman: 'Luna', day: 'Monday', archangel: 'Gabriel', intelligence: '—', spirit: 'Chashmodai', olympic: 'Phul', babylonian: 'Nanna' },
];

// ---------------------------------------------------------------------------------------------
// Money behaves like a spirit (Chapter 2)
// ---------------------------------------------------------------------------------------------
export const QUALITIES: { k: string; title: string; text: string; do: string }[] = [
  { k: 'honor', title: 'Honour', text: 'Money likes to be valued. Many spiritual people quietly distrust it, then wonder why it stays away. Most of the world’s problems need money to fix.', do: 'Like money enough to learn about it and honour its place in your life.' },
  { k: 'move', title: 'Movement', text: 'Money never stands still: you are always either gaining or losing. What matters is not the size of the piles but whether more comes in than goes out.', do: 'Manage the flow, not just the pile. Get money out of the mattress and moving.' },
  { k: 'waste', title: 'Waste', text: 'Waste is spending that causes debt or crowds out what matters and gives little joy for its cost: the overflowing DVD shelf of the friend who can’t pay rent. Small real pleasures are not waste.', do: 'Find where you spend out of habit rather than enjoyment, and cut it.' },
  { k: 'charity', title: 'Charity', text: 'Money likes to be given away. People who tithe report opportunities opening and more money flowing in. A hand gripping money too tight is never open enough to receive.', do: 'Give regularly. Nearly all truly wealthy people do.' },
  { k: 'time', title: 'Time', text: 'Money is tied to time. A salary that needs ninety hours a week may pay less per hour than a wage. A business you own can eat every waking thought.', do: 'Plan your time as carefully as your money; keep them in balance.' },
  { k: 'people', title: 'People', text: 'Money moves through people: about seventy percent of jobs are filled through connections. Some friends will feel threatened when you rise; others can open doors.', do: 'Look honestly at who lifts you and who holds you back.' },
];

/** Chapter 1: what magic can and cannot do with money. */
export const CAN_CANT: { k: string; title: string; text: string }[] = [
  { k: 'can', title: 'What magic does', text: 'Beyond spiritual growth, practical magic does two things: it influences the minds of other people, and it shifts probability, making unlikely things more likely.' },
  { k: 'emergency', title: 'Emergency magic is bad magic', text: 'Treating magic as a last resort means you never practise it, and by the time things are an emergency it is usually too late. The book’s sorcery is planned ahead, so problems are prevented or caught early.' },
  { k: 'reactive', title: 'Beware of fixing everything', text: 'About two-thirds of money magic only keeps things as they are. Fix every crisis and you can stay stuck in a poor job or home. Sometimes the “emergency” is the door opening. Comfort can be the enemy of growth.' },
  { k: 'lottery', title: 'The lottery is not a plan', text: 'A big jackpot is about 1 in 18 million; lightning is about 45 times likelier. Thousands of people aim magic at every draw, which roughly cancels out, and about a third of winners are in serious trouble within five years. The author buys two tickets, and that is all.' },
  { k: 'rich', title: 'Rich is not wealthy', text: 'Rich means a high income, which can feed wealth or debt. Wealth, after Buckminster Fuller, is how many days you could keep living as you do without a paycheque.' },
  { k: 'deal', title: 'The old deal is gone', text: 'The book describes a world of no job security, no raises and no pensions. Hard times are also times of opportunity, and people who think outside the box are well placed to make their own path.' },
];

// ---------------------------------------------------------------------------------------------
// The strategies
// ---------------------------------------------------------------------------------------------
export const STRATEGIES: Strategy[] = [
  // ------------------------------------------------------------------ foundations
  {
    id: 'meditate', family: 'base', title: 'Meditation', short: 'Sit, focus on one thing, notice when you drift, come back.', pages: 'Ch. 3, pp. 39–44',
    what: 'Meditation here means cutting through distraction. You rest on one thing, such as the breath or a mantra, and let other thoughts rise and fall without following them. It is not about visions or special states; it is about knowing your own ordinary mind.',
    helps: 'Every real money change means acting against the impulse of the moment: paying debt instead of buying, saving instead of spending, buying when everyone sells. Meditation trains exactly that. You learn to catch a habit as it rises and choose your will instead.',
    steps: [
      { kind: 'act', do: 'Sit with a straight back and choose one focus, such as the breath.', why: 'One object gives the mind somewhere to come back to.' },
      { kind: 'act', do: 'Expect to be distracted almost constantly, for months.', why: 'The book says people quit because they expect calm at once. Six months of constant distraction is normal.' },
      { kind: 'act', do: 'When you notice you have drifted, simply come back. Don’t scold yourself.', why: 'Noticing the drift is the meditation. You only stop meditating when you knowingly stay distracted.' },
      { kind: 'act', do: 'Practise every day.', why: 'Slowly you win against wandering thoughts, then agitation, then dullness, until you can rest clear without effort.' },
      { kind: 'act', do: 'Carry it into the day: when a purchase tempts you or someone pushes your buttons, catch the reaction.', why: 'Seeing habit on the cushion teaches you to see it in life, and act from thought instead of reflex.' },
    ],
    care: ['People with serious mental illness should not meditate: the book notes it can stir up disturbing material.', 'You cannot be bad at it. Don’t chase special states; they come with time.'],
  },
  {
    id: 'vase', family: 'base', title: 'The vase breath', short: 'Fill the lungs from the bottom up, like water in a vase.', pages: 'Ch. 3, pp. 44–46',
    what: 'A slow, full breath that fills the lower lungs first, then the upper, the way water fills a vase. We normally use about a seventh of our lungs and breathe faster when stressed.',
    helps: 'It calms the mind in the moment and returns it to clear will, which is when good money decisions are made. The book adds that it improves oxygen to the brain, helps the pituitary gland, and lets you move vital energy with breath and will.',
    steps: [
      { kind: 'act', do: 'Sit or stand with your back straight. Not lying down.', why: 'A straight spine lets the lungs fill fully.' },
      { kind: 'act', do: 'Breathe in through the nose, mouth closed, letting the belly swell first.', why: 'The lower lungs fill first, like the bottom of a vase.' },
      { kind: 'act', do: 'Then let the upper chest fill almost to the top.', why: 'You aim to take in about six pints of air.' },
      { kind: 'act', do: 'Settle into about eight breaths a minute instead of fifteen.', why: 'A slow, full breath tells the mind to return to the calm it knows when breathing that way.' },
      { kind: 'act', do: 'Use it whenever temptation or panic rises.', why: 'Meditation trains the skill; the vase breath is the key that unlocks it on the spot.' },
    ],
  },
  {
    id: 'pillar', family: 'base', title: 'The pillar', short: 'White light down from the heavens, red light up from below.', pages: 'Ch. 3, pp. 46–47',
    what: 'A breathing visualisation that connects you to sky and earth, heaven and underworld, with two currents running through your body.',
    helps: 'It grounds and charges you, and prepares the body for every other working in the book.',
    steps: [
      { kind: 'magic', do: 'Sit or stand straight and begin the vase breath. Learn it both ways.', why: 'Both postures should be mastered.' },
      { kind: 'magic', do: 'On a deep in-breath, see a column of pure white light descend from the highest heavens, enter your crown and pass down into the ground.', why: 'The white light ennobles and purifies.' },
      { kind: 'magic', do: 'On the next in-breath, see a reddish light rise from beneath you, up through the column and out of your crown.', why: 'The red light vivifies: it is the old, ancestral energy of the earth.' },
      { kind: 'magic', do: 'Breathe in and feel both currents enter; breathe out and feel them flood every fibre of your body.', why: 'You become the link between earth and sky.' },
      { kind: 'act', do: 'Practise while walking.', why: 'The sign of mastery: you feel you stay still while the world moves around you, like a figure in a video game.' },
    ],
  },
  {
    id: 'spheres', family: 'base', title: 'The spheres', short: 'Balance the five elements along the centre of the body.', pages: 'Ch. 3, pp. 47–48',
    what: 'After the pillar, you breathe five coloured spheres into being along the central channel, each holding one element.',
    helps: 'It balances the elements in the body, which the book says are tied to the mind and emotions, and mends imbalances behind physical and emotional troubles. It also sets them in an alchemical order: earth holds the fire, fire boils the water, the steam rises into air and dissolves into space.',
    steps: [
      { kind: 'magic', do: 'Do the pillar first.', why: 'The spheres sit on its central column.' },
      { kind: 'magic', do: 'Crown: an empty sphere inside and above the skull. Breathe in clear light.', why: 'Space, or azoth: clarity and spacious awareness.' },
      { kind: 'magic', do: 'Throat: breathe in a bright yellow energy, warm and moist like humid air, moving quickly.', why: 'Air.' },
      { kind: 'magic', do: 'Heart: breathe in a deep blue, cool and fluid.', why: 'Water.' },
      { kind: 'magic', do: 'Just below and behind the navel, near the base of the spine: breathe in red, hot, dry and expanding.', why: 'Fire.' },
      { kind: 'magic', do: 'Perineum, between the legs: breathe in a dark earth tone, dense, cool and dry.', why: 'Earth.' },
      { kind: 'magic', do: 'Rest a few minutes and contemplate the elements within you.', why: 'Settling lets the balance hold. The Geometry page shows each element’s solid.' },
    ],
  },
  {
    id: 'intel', family: 'base', title: 'Gathering intelligence', short: 'Readings you can act on: three methods, checked against the world.', pages: 'Ch. 3, pp. 48–50',
    what: 'Divination treated the way an intelligence service treats information: one reading is a rumour; several sources that agree are something you can act on.',
    helps: 'Almost nobody makes a life decision on one reading, and rightly so: any reader can be wrong, and your own wishes colour readings for yourself. Cross-checked readings turn divination into decisions.',
    steps: [
      { kind: 'magic', do: 'Master three different kinds of divination: drawing lots (tarot, runes), reading signs (candle wax, bones), and omens and dreams.', why: 'Different methods fail in different ways, so agreement means more.' },
      { kind: 'magic', do: 'On a serious question, never act on a single reading. Ask other readers too.', why: 'Each confirming source raises the odds you are right.' },
      { kind: 'act', do: 'Check it against ordinary information: office rumours, news, what people tell you in confidence.', why: 'A tarot reading backed by a rumour from HR is actionable intelligence.' },
      { kind: 'act', do: 'Judge every piece for two things: how relevant it is, and how accurate.', why: 'That is the difference between data and intelligence.' },
    ],
  },
  {
    id: 'altar', family: 'base', title: 'Keeping a wealth altar', short: 'A permanent control panel for your financial life.', pages: 'Ch. 3, pp. 50–51',
    what: 'A permanent altar for money: anything from a temple-sized table to the corner of a shelf. You will deal with money until the day you die, so the book recommends a standing altar rather than one-off spells.',
    helps: 'It keeps long-term spells running and your strategies coordinated. The book warns that whatever sits on it manifests, even by accident: dust on the altar becomes dust in your life.',
    need: ['A space you can keep clean', 'A green, blue or gold cloth', 'Images, amulets and talismans of wealth'],
    steps: [
      { kind: 'act', do: 'Decide how much space you can truly keep up, and clear it.', why: 'If you won’t keep it up, the book says, it is better not to have one.' },
      { kind: 'magic', do: 'Lay a green, blue or gold cloth to mark the space as sacred.', why: 'The colours of money and of Jupiter.' },
      { kind: 'magic', do: 'Place your wealth images, amulets and talismans, arranged as your inner sense directs.', why: 'Every item should have a purpose.' },
      { kind: 'magic', do: 'Consecrate it with a short rite of your own.', why: 'It becomes a living thing, not furniture.' },
      { kind: 'act', do: 'Keep it spotless: change liquids, clear incense ash, never let anything rot.', why: 'Treat it as alive, because on a subtle level it is.' },
    ],
    note: 'The author’s own altar holds a print of Dzambhala, a print of White Mahakala, a statue of Mary with a Miraculous Medal from his grandmother, a picture of his businessman grandfather, green and gold candles for clients, a Jupiter cashbox, a sigil-carved box of bank papers, spirit bottles for Marie Laveau and Dr. John, his year petition and lodestone, and a Rose of Jericho in water changed every Friday.',
  },
  {
    id: 'offering', family: 'base', title: 'A daily offering to the powers', short: 'A gift that asks for nothing, made regularly.', pages: 'Ch. 4, pp. 53–59',
    what: 'A regular offering to every spirit that wishes to come, from the smallest nature spirit to the gods, including those you may have angered without knowing. You ask for nothing in return.',
    helps: 'It builds friendship instead of bargains. A stranger won’t lend you fifty dollars; a best friend will and won’t chase you for it. Long kindness to the powers around you opens the paths of prosperity.',
    need: ['Incense', 'A light used only for offering', 'Bowls of clean water (one, three, seven or more)', 'A drink to pour on the ground'],
    steps: [
      { kind: 'act', do: 'Choose a time and how often, and be realistic.', why: 'A weekly Thursday offering you keep beats an elaborate daily one you drop after a week.' },
      { kind: 'magic', do: 'Cleanse the offerings by the four elements: earth, the body of the gods; water, their blood; air, their breath; fire, their soul.', why: 'Physical offerings are blessed and made pure before they are given.' },
      { kind: 'magic', do: 'Invite them: the highest and perfected beings, angels and guardians, the gods of the spheres, the dead, spirits of earth, air and underworld, spirits who do harm in response to human acts, and above all the powers of wealth, luck, opportunity and affluence. Ask them to come as they wish and be seated.', why: 'The offering is open to all, friend and enemy alike. Healing quarrels with spirits is one of the oldest arts.' },
      { kind: 'magic', do: 'Offer: light the incense, hold out the light, pour the drink on the ground, set the gifts down. Offerings for beings you owe go outside.', why: 'Rising smoke, outward light, still water and downward pouring carry the gift in every direction.' },
      { kind: 'magic', do: 'Multiply it in your mind into clouds of offerings in whatever form each guest desires. Thank them for past kindness, say you regret any offence, and ask them to open the paths of prosperity and meet kindness with kindness.', why: 'Visualisation lets a small physical gift fit the needs of every being.' },
      { kind: 'magic', do: 'Dismiss them: ask them to take their fill, go home in peace, and always act as friends and helpers.', why: 'A proper offering has a clean ending.' },
      { kind: 'act', do: 'Empty the water bowls at night.', why: 'Set out in the morning, cleared at night.' },
    ],
    care: ['Research a particular class of spirit before making it a special offering: meat or musk offends Nagas, and salt offends the dead. If unsure, stick to incense and liquor.'],
    note: 'The author’s full words for each stage are on pp. 57–58.',
  },
  {
    id: 'ancestors', family: 'base', title: 'The financially savvy dead', short: 'Your ancestors, and the founders and officials who have passed.', pages: 'Ch. 4, pp. 59–61',
    what: 'Your ancestors already share a psychic link with you and are usually inclined to help. The dead of your company or town can help too.',
    helps: 'Strong, willing allies. The author counts his two businessman grandfathers among his.',
    need: ['A white cloth and a white candle', 'A glass of water and seven smaller cups', 'Coffee or food they loved'],
    steps: [
      { kind: 'magic', do: 'Begin simply with a bowl of water and a white candle, or set up a bóveda: a table with a white cloth, a cross or sign of the divine, a white candle, and a central glass of water ringed by seven smaller cups.', why: 'A traditional seat for the dead.' },
      { kind: 'magic', do: 'Once a week, give them an hour: set out what they enjoyed, raise the glasses, sing their praises, and say prayers that would mean something to them, even if they are not your religion.', why: 'What matters to them matters more than your own beliefs here.' },
      { kind: 'magic', do: 'For a week-long offering, raise one glass a day, telling them you lift your spirit to them. On the last day, open yourself to feelings and messages.', why: 'It opens a door to your whole line. The author met a twin who died in infancy this way, later confirmed by his grandmother.' },
      { kind: 'magic', do: 'If the bond is strong, build an ancestor altar with photos and belongings, and gather earth from their graves for money spells.', why: 'Graveyard dirt carries their power into your workings.' },
      { kind: 'magic', do: 'For work and local matters, call on your company’s late founder, or a recently passed council member.', why: 'A founder helps with promotion; a council member can ease local government for a new business.' },
    ],
    care: ['Some believe the dead should be left alone. The book takes no side: if you choose not to work with them, there are plenty of other options.'],
  },
  {
    id: 'jupiter', family: 'base', title: 'Working with Jupiter', short: 'The toast, the chant and the timing.', pages: 'Ch. 5, pp. 73–79',
    what: 'Jupiter rules wealth, increase and wellbeing, and also sovereignty: being king of your own domain. The book’s weekly practice is a toast to Jupiter in his day and hour, an invocation, and a rising chant.',
    helps: 'Sovereignty means freedom outwardly from being ruled by others, inwardly from your own self-defeating habits, and secretly from whatever clouds your awareness. Jupiter is the being the financial sorcerer hopes to become.',
    need: ['The seal of Jupiter (the emblem on the book’s cover)', 'A glass of whiskey or a drink you like (not water)', 'Good clothes; the author wears a suit and tie'],
    steps: [
      { kind: 'act', do: 'Time it: Thursday, in an hour of Jupiter. This page shows your next one. Or use the old method of Abramelin: any time Jupiter is right overhead.', why: 'A planetary hour is a twelfth of the daylight (or of the night), so its length changes with the seasons. The first after sunrise belongs to the day’s planet.' },
      { kind: 'magic', do: 'Gaze at the seal of Jupiter for a few moments and reach through it to his power.', why: 'The seal is made as a direct door to the planet, past other influences.' },
      { kind: 'magic', do: 'Raise your glass and say the invocation. It hails Jupiter as supreme sovereign and gracious governor, whose laughter sends out lightning and life, and asks him to enlarge your empire, open opportunity, wake your angels, protect you from the profane, favour you with fortune and grant his grace.', why: 'Praise, then clear requests. The full words are on pp. 75–76.' },
      { kind: 'magic', do: 'Chant “Iovis Optimus Maximus” (“Jove, best and greatest”) over and over, louder and louder. See the words circle your heart, throwing off lightning, and feel his power build around you like a whirlwind.', why: 'It builds power and the presence of his grace. It is meant to be loud, not silent.' },
      { kind: 'act', do: 'Make it regular. The author toasts every Thursday.', why: 'A relationship, not a transaction.' },
    ],
    note: 'Jupiter’s workings are said to come with freak storms and lightning. The book’s message: go and shake your own heavens.',
  },
  {
    id: 'goddesses', family: 'base', title: 'The four goddesses', short: 'Victory, Liberty, Harmony and Abundance at the four gates.', pages: 'Ch. 5, pp. 76–78',
    what: 'In a vision after his Thursday toast, the author saw Jupiter give him four coins, each with a goddess. Then he sat on the throne, as Jupiter, with the four around him at the cardinal points, like the seal of Jupiter in Agrippa. All four did appear on Roman coins.',
    helps: 'Each brings a different power to your money: winning, freedom, harmony with people, and plenty. They match the four magical actions of Tibetan tantra.',
    steps: [
      { kind: 'magic', do: 'Perform the Jupiter invocation first.', why: 'The goddesses come through him.' },
      { kind: 'magic', do: 'Ask Jove to send you the graces of the goddesses of the four gates.', why: 'Opening the mandala.' },
      { kind: 'magic', do: 'Victoria: ask her to overcome your competition and conquer crossed conditions.', why: 'Victory and triumph: the wrathful action.' },
      { kind: 'magic', do: 'Libertas: ask her for financial freedom, and freedom from fear and force of habit.', why: 'Liberty: the pacifying action (not an exact match, the book admits).' },
      { kind: 'magic', do: 'Concordia: ask for harmony and healing, and smooth dealings with those around you.', why: 'Harmony: the enchanting action.' },
      { kind: 'magic', do: 'Abundantia: ask for prosperity and the bounty of her cornucopia.', why: 'Abundance: the action of increase.' },
      { kind: 'magic', do: 'Ask all four to take their places, surround you with the splendour of sovereignty, and pour their nectar on you.', why: 'You sit at the centre, as Jupiter.' },
    ],
    tool: 'mandala',
  },
  {
    id: 'setpoint', family: 'base', title: 'Moving your set point', short: 'Release the past, move the present, reset through success.', pages: 'Ch. 6, pp. 89–100',
    what: 'Like a body that keeps drifting back to the same weight, we keep drifting back to the station in life we feel we are “supposed” to have. Until the set point moves, all your sorcery circles around it.',
    helps: 'It frees you to aim higher than your upbringing taught you to expect, in wealth, health, love and spirit, and makes your other magic land.',
    need: ['A list of three to nine real regrets: times you chose comfort over progress'],
    steps: [
      { kind: 'act', do: 'List three to nine times you gave in to your set point: the rental you didn’t buy, the degree you didn’t start, the promotion you went for half-heartedly.', why: 'Look for where you chose comfort, not for causes.' },
      { kind: 'magic', do: 'Open sacred space your usual way, then do the pillar and the spheres.', why: 'A calm, balanced state lets you see each memory clearly but at a distance.' },
      { kind: 'magic', do: 'See a fire before you so fierce that whatever it burns leaves not even its name. Call up each regret, fold the image into a cube and cast it in, saying that you release yourself from the past and cast the failure and your feelings about it into the fire. End with a sharp, shouted “PHET!”.', why: 'The past is released, not argued with. PHET is a word of power hurled like lightning.' },
      { kind: 'magic', do: 'Rebalance with the pillar and spheres, then draw your attention up to the star centre above your head and sound “HUE”, long and slow. Feel its energy descend and seal the work.', why: 'It fills the space left by what you released with spirit descending into matter.' },
      { kind: 'act', do: 'Repeat the rite for nine days running.', why: 'The first session gives a beginner’s high. These are deep programs; one session never removes them.' },
      { kind: 'act', do: 'Move the point: read the lives of people who did it well, make friends who already live at your target, picture success each morning, kill excuses each afternoon, replay the day better each evening, and consider hypnosis.', why: 'Only an all-consuming passion moves it, worked into every part of life. People rub off on you.' },
      { kind: 'act', do: 'Reset it by succeeding: apply what you learned, fail, and try again until it works.', why: '“First comes the working, then comes the work.” The moment you get real results, you no longer believe you can; you know.' },
    ],
    care: ['The book recommends a session with a qualified hypnotist before self-hypnosis.'],
  },

  // ------------------------------------------------------------------ debt
  {
    id: 'face', family: 'debt', title: 'Face the numbers', short: 'Tonight, open every envelope.', pages: 'Ch. 7, pp. 102–105',
    what: 'Step 1 of the debt strategy: find out exactly what comes in and what goes out.',
    helps: 'The author has never met anyone in long-term debt who knew what they earned and spent, himself included. People in debt are not stupid; they are overwhelmed, and not looking is a way of coping. You can’t move from a place you can’t see.',
    steps: [
      { kind: 'act', do: 'Tonight, open every bill and look at every payslip.', why: 'The day you plan to deal with it later never comes.' },
      { kind: 'act', do: 'List the monthly bills: rent or mortgage, car and other loans, credit cards, insurance, electricity, gas, water, rubbish, every phone, internet, cable.', why: 'These are easy to find and set the floor.' },
      { kind: 'act', do: 'For the next few days keep every receipt: fuel, groceries, eating out, coffee, cleaning, gym, holidays, clothes, entertainment, grooming, vices, charity, pets, magic books and supplies.', why: 'Small daily spending is where most people get a shock.' },
      { kind: 'act', do: 'List what you have (cash, accounts, money owed to you, shares) and what comes in (pay, returns from assets).', why: 'Now you can set the two piles side by side.' },
    ],
    note: 'The author checked his own coffee habit: about $150 a month, $1,800 a year. He could afford it, but in debt it would be the first thing to go.',
  },
  {
    id: 'jabez', family: 'debt', title: 'The debt-free working', short: 'One overall spell, short enough to do every day.', pages: 'Ch. 7, p. 105',
    what: 'Step 2: a macro-enchantment, one working for the whole goal of becoming debt-free. Smaller micro-enchantments then support each step.',
    helps: 'It keeps the goal alive daily and backs up your daily effort. Invoking your Holy Guardian Angel or personal genius works especially well; saints, gods, candles, talismans and mojo bags can anchor it.',
    steps: [
      { kind: 'magic', do: 'Choose a working short enough to do every day.', why: 'It must reinforce your daily efforts, not replace them.' },
      { kind: 'magic', do: 'One the book offers is the Prayer of Jabez: “Oh that thou wouldest bless me indeed, and enlarge my coast, and that thine hand might be with me, and that thou wouldest keep me from evil, that it may not grieve me!” (1 Chronicles 4:10).', why: 'It puts the divine squarely in the middle of material life, which is what strategic sorcery is about.' },
      { kind: 'magic', do: 'You may say “debt” in place of “evil”.', why: 'The book suggests it.' },
    ],
  },
  {
    id: 'lean', family: 'debt', title: 'Live lean for a while', short: 'Stop the bleeding, keep the small joys.', pages: 'Ch. 7, pp. 106–109',
    what: 'Step 3: discipline. Act on your will, not your whim, until the debt is gone.',
    helps: 'Paying off a debt is like getting a raise: when the author paid off two cars, $700 a month came back into the budget.',
    steps: [
      { kind: 'act', do: 'Set aside the cost of your home. If you bought more house than you can afford, look at moving.', why: 'Shelter costs what it costs; everything else bends around it.' },
      { kind: 'act', do: 'Cut food costs: eat in, cook simply and healthily from an ordinary shop. Neither fast-food value menus nor artisanal farmers’ markets for now.', why: 'You need your health to solve your problems, and you can’t afford luxury food while in debt.' },
      { kind: 'act', do: 'Find the least you can live on, then live on it, but keep the small things that give the most joy for the money.', why: 'Cut everything and you won’t keep it up. Your computer and internet are probably your best value: they can replace TV, papers, books and the house phone.' },
      { kind: 'act', do: 'Follow the do’s and don’ts below.', why: 'These are temporary. You will find your enjoyment of life depends less on things than you thought.' },
      { kind: 'magic', do: 'Make a debt-killing mojo bag: High John root for self-mastery, cinnamon to draw money, sassafras to hold it. Add slippery elm for dealing with creditors, cinnamon bark to bring money, cascara and galangal for lawsuits, master of the woods for self-control.', why: 'Magical support for discipline.' },
      { kind: 'magic', do: 'Use the Lightning Glyphs for financial discipline, reversing bad luck and holding money: see them in your aura, make seals, or put them in the bag.', why: 'They bind you to the plan and keep money with you.' },
      { kind: 'act', do: 'Above all, meditate.', why: 'You must keep seeing the whim of the moment as a distraction from your true will. Sorcery helps; the effort is yours.' },
    ],
    tool: 'dodont',
  },
  {
    id: 'cards', family: 'debt', title: 'Beat the credit cards', short: 'Pay far more than the minimum.', pages: 'Ch. 7, pp. 109–110',
    what: 'Step 4. Card companies make most of their money from fees, and target the people least able to pay: students, the elderly, the poor and those already in debt. If you are digging a hole with a shovel, they will gladly lend you a digger.',
    helps: 'The book’s example: $5,000 at 17% paying only the minimum takes about thirteen years and costs about $9,000. Paying $300 a month clears it in about twenty months for around $700 in interest. Then that $300 moves on to the next debt.',
    steps: [
      { kind: 'act', do: 'Stop paying only the minimum. Use the calculator below to see how much you can pay and for how long.', why: 'Minimum payments are mostly interest. You will never get out that way.' },
      { kind: 'act', do: 'Move the balance to a low-interest card.', why: 'Less of each payment is lost to interest.' },
      { kind: 'act', do: 'When one card is clear, roll the same payment onto the next debt.', why: 'This is how you work up to the big ones: student loans and mortgages.' },
      { kind: 'act', do: 'Keep a card for emergencies, car hire and hotels, but stop using it for anything else for now.', why: 'A necessary evil, but still an evil. It is easy to slide back.' },
    ],
    tool: 'payoff',
  },
  {
    id: 'creditors', family: 'debt', title: 'Deal with creditors', short: 'Pick up the phone, agree a plan you can keep.', pages: 'Ch. 7, pp. 110–111',
    what: 'Step 5: if people are calling about unpaid bills, talk to them, one by one.',
    helps: 'Creditors, the tax office included, are often surprisingly reasonable once you make even a small effort. Tell them what you can do and they will often agree.',
    steps: [
      { kind: 'act', do: 'Call each creditor and set up a plan you can actually stick to.', why: 'You know your real numbers from step 1, so you can promise only what you can keep.' },
      { kind: 'act', do: 'Avoid firms that promise to settle your debts for you.', why: 'They rarely get it lower than you could yourself, and their fees eat the difference.' },
      { kind: 'magic', do: 'Bring the creditors’ logos to your money altar and set them under the seal of Saturn or a picture of a great power.', why: 'Saturn rules binding and endings.' },
      { kind: 'magic', do: 'If it is going badly, bind the paperwork up inside a master root.', why: 'A traditional way to bring a situation under control.' },
      { kind: 'magic', do: 'Or dress a logo with Bend Over oil and put it in your shoe, so you walk all over your creditors.', why: 'An old influencing trick.' },
      { kind: 'act', do: 'If bankruptcy seems the only way, speak to at least two lawyers first.', why: 'Since the 2005 US law it covers far less and the damage to your credit is harder to repair.' },
    ],
  },
  {
    id: 'report', family: 'debt', title: 'Check your credit report', short: 'Once a year, free, and fix the mistakes.', pages: 'Ch. 7, p. 112',
    what: 'Step 6: find any debts you have forgotten and any companies reporting on you in error. Errors are more common than you would think.',
    helps: 'You clear the last surprises and stop paying for other people’s mistakes.',
    steps: [
      { kind: 'act', do: 'Get your free yearly report from the official source. In the US that is AnnualCreditReport.com, covering Experian, TransUnion and Equifax.', why: 'Ignore advertised “free” sites that charge for the same thing.' },
      { kind: 'act', do: 'Contact any company reporting in error and have it fixed.', why: 'Your score drives your borrowing costs.' },
    ],
  },
  {
    id: 'spend', family: 'debt', title: 'Spend wisely', short: 'Lists, waiting, and saving instead of borrowing.', pages: 'Ch. 7, pp. 112–113',
    what: 'Step 7, and the last of any debt strategy: not saving money but spending it well.',
    helps: 'As the debt disappears you will have more each week. The trick is not to fall back into old habits.',
    steps: [
      { kind: 'act', do: 'Shop with a list and stick to it.', why: 'Most impulse buys feel unnecessary a few hours or days later.' },
      { kind: 'act', do: 'Wait before buying, and weigh the real pleasure it will give you and yours.', why: 'Waiting turns whims back into choices.' },
      { kind: 'act', do: 'Save for big things, like a computer or a car, instead of borrowing.', why: 'You pay not a cent more than you must, and education and training become possible too.' },
    ],
  },

  // ------------------------------------------------------------------ flow
  {
    id: 'frog', family: 'flow', title: 'The money frog and the beckoning cat', short: 'Two standing charms from China and Japan.', pages: 'Ch. 8, pp. 116–117',
    what: 'The Chan Chu, a three-legged money frog sitting on coins with a coin in its mouth, often with the Big Dipper and a Pa Kua on its back; and the Maneki Neko, the cat with a raised paw that beckons.',
    helps: 'They keep a steady flow of wealth coming in. Taoism sees wealth and long life as signs of spiritual growth, not obstacles to it.',
    steps: [
      { kind: 'magic', do: 'Place the frog just inside your front door, or your office door, facing in, at waist height.', why: 'Where wallets are carried. Never in the kitchen or bathroom.' },
      { kind: 'magic', do: 'Leave the coin in its mouth. If it ever falls out, take it as an early warning.', why: 'The author has found this eerily accurate. (Some people turn the frog outward at night instead.)' },
      { kind: 'magic', do: 'For a cat: right paw raised to draw customers to a business; left paw raised for good fortune at home.', why: 'The raised paw is a gesture of beckoning in Japan.' },
      { kind: 'act', do: 'Keep toilet lids closed.', why: 'An old feng shui rule, so money does not escape down the plumbing.' },
    ],
  },
  {
    id: 'floorwash', family: 'flow', title: 'The two-day floor wash', short: 'Wash out the bad, then wash in the good.', pages: 'Ch. 8, pp. 117–118',
    what: 'A cleansing wash that pushes negativity out of the house, followed days later by a money-drawing wash that pulls wealth in.',
    helps: 'It clears what blocks money and invites it in. Protection and money-drawing go hand in hand if you want to keep what you gain.',
    need: ['Cleansing: lemongrass, pine, ammonia, or a ready-made wash such as Chinese Wash', 'Drawing: cinnamon, sugar and chamomile', 'A spray bottle for carpets'],
    steps: [
      { kind: 'magic', do: 'On a Sunday or Tuesday, wash with the cleansing wash from the top floor down and out of the front door.', why: 'The days of the Sun and Mars rout out negativity; you push it out with the water.' },
      { kind: 'magic', do: 'On a Thursday or Wednesday, wash with the drawing wash from outside in and upwards.', why: 'The days of Jupiter and Mercury draw money and business; you pull the good in.' },
      { kind: 'magic', do: 'While you are at it, renew your protection: nine pieces of devil’s shoestring in the path, seals at the gates.', why: 'What you draw in should be guarded.' },
    ],
  },
  {
    id: 'cashbox', family: 'flow', title: 'The Jupiter cashbox', short: 'A box that turns cash into talismans that bring more cash.', pages: 'Ch. 8, pp. 118–119',
    what: 'A small wooden box dedicated to Jupiter. Cash rests in it, comes out marked with Mercury’s sign, is spent, and draws more back.',
    helps: 'It works like an investment: as more comes back you can put more in, and more returns.',
    need: ['A small wooden box (the author’s is 6 × 3 × 3 inches)', 'Blue or gold paint', 'Money-drawing and money-keeping oils', 'Earth from outside your bank', 'A gator’s hand, sassafras leaves, a lodestone, Irish moss, allspice, cinnamon'],
    steps: [
      { kind: 'magic', do: 'Carve or paint the symbols of the planet, intelligence and spirit of Jupiter on the front.', why: 'They name the power that lives in the box.' },
      { kind: 'magic', do: 'Put four astrological signs of Jupiter on the lid, with one of the pentacles of Jupiter from the Key of Solomon.', why: 'Your choice of pentacle.' },
      { kind: 'magic', do: 'Inside the lid, place the magic square (kamea) of Jupiter, shown below.', why: 'The square holds the planet’s numbers.' },
      { kind: 'magic', do: 'Paint the box blue for Jupiter or gold for wealth. Rub money-drawing oil on the outside and money-keeping oil inside, working it into the symbols.', why: 'Drawing outside, holding inside.' },
      { kind: 'magic', do: 'Line the bottom with a little earth from outside your bank, or dust from inside it, or soil from a potted plant there.', why: 'It links the box to where your money lives.' },
      { kind: 'magic', do: 'Add symbolic items: a gator’s hand to grab money and chances, sassafras to hold it, a lodestone to attract it, and money-drawing herbs.', why: 'Each does one job.' },
      { kind: 'magic', do: 'Put cash in for a week. Then take it out, mark each note with Mercury’s sign four times on each side, eight in all, and spend it.', why: 'Eight is Mercury’s number. The notes are now talismans that call more cash back to the box.' },
    ],
    tool: 'kamea',
  },
  {
    id: 'lodestone', family: 'flow', title: 'The petition and the lodestone', short: 'A year-long letter to the gods, held down by a magnet.', pages: 'Ch. 8, pp. 119–120',
    what: 'At the centre of the author’s altar: a written petition of your money wishes for the year, under a lodestone you feed with iron.',
    helps: 'As the iron grit clings to the stone, the powers in the stone draw the events in the petition to you.',
    need: ['Paper and pen', 'A tin plate (tin is Jupiter’s metal)', 'The largest lodestone you can find', 'Whiskey', 'Iron grit'],
    steps: [
      { kind: 'magic', do: 'On New Year’s Day (or any day), write your money wishes as a letter to the gods. Be specific about what you want to work on and what doors you want opened.', why: 'Clear requests get clear answers.' },
      { kind: 'magic', do: 'Fold it, lay it on a tin plate, and add sigils or oils if you like.', why: 'Tin is Jupiter’s.' },
      { kind: 'magic', do: 'Cleanse the lodestone with whiskey, set it on the petition, and say the prayer: calling the powers of earth into the stone, promising to feed it iron, and asking it to feed you wealth in return.', why: 'The full words are on p. 119.' },
      { kind: 'magic', do: 'Every week, or every day if you can, sprinkle a little iron grit on the stone with a short prayer.', why: 'Feeding keeps it working.' },
      { kind: 'magic', do: 'At the end of the year write a new petition and bury the old one on your land.', why: 'Its blessings are now part of your life.' },
      { kind: 'magic', do: 'If your wishes change completely, thank the powers in the stone, clean it with whiskey, and start fresh.', why: 'You release the old commission cleanly.' },
    ],
    care: ['Pick a few of these standing rituals and keep them up. Doing everything wears you out, and most of it duplicates the rest.'],
  },
  {
    id: 'accounts', family: 'flow', title: 'Set up your accounts', short: 'Checking is Mercury’s; savings is Jupiter’s.', pages: 'Ch. 8, pp. 120–122',
    what: 'Your everyday account is Mercurial: it is where money moves. Your savings account is Jupiterian: it holds and grows.',
    helps: 'Your magic works better when the places money lives are set up well.',
    steps: [
      { kind: 'act', do: 'Make sure your checking account has no fees and no minimums. Ask for them to be waived; if the bank refuses, change banks.', why: 'Mercury is movement: easy access matters.' },
      { kind: 'act', do: 'Turn off overdraft “protection”.', why: 'It is a fee machine dressed as a service. The author paid $40 for a coffee and $40 more for a sandwich: an $80 lunch.' },
      { kind: 'act', do: 'Keep about three months of living costs in savings, plus money for planned things like holidays or a deposit.', why: 'Savings are for emergencies and goals; long-term money belongs in investments.' },
      { kind: 'act', do: 'Consider an online savings account.', why: 'They pay consistently better interest than branches.' },
      { kind: 'magic', do: 'On the first Thursday of each month, lay your savings statements on the altar under a seal or statue of Jupiter and do the invocation.', why: 'A long-term working, not a one-off spell. Only promise offerings you will keep.' },
    ],
  },
  {
    id: 'usecards', family: 'flow', title: 'Use credit cards well', short: 'A necessary evil, optimised.', pages: 'Ch. 8, pp. 122–124',
    what: 'You need a real credit card (not a debit card) for car hire, hotels and travel. Make it work for you.',
    helps: 'A low rate protects you when bad times come; good rewards and services are a bonus.',
    steps: [
      { kind: 'act', do: 'Negotiate a low interest rate, or find a card that has one.', why: 'If hard times ever push you to minimum payments, a low rate makes recovery far easier.' },
      { kind: 'act', do: 'Choose rewards you will actually use: extended warranties, travel miles, a concierge service.', why: 'Concierge lines will book, research and find almost anything.' },
      { kind: 'act', do: 'Pay the full balance on time every month.', why: 'The only way to avoid the traps.' },
      { kind: 'act', do: 'Ignore offers that come in the post; research and choose your own card.', why: 'Mailed offers rarely have the best terms.' },
      { kind: 'act', do: 'Never open a store card for “10% off today”.', why: 'Terrible rates and terms; you pay more in the end.' },
    ],
  },
  {
    id: 'score', family: 'flow', title: 'Build your credit score', short: 'Once the debt is paid, and not before.', pages: 'Ch. 8, pp. 124–125',
    what: 'Your credit score sets the rate on every loan and, increasingly, whether employers hire you. Knowing how it is made lets you raise it.',
    helps: 'Better mortgage, card and insurance rates, and possibly better jobs. Paying on time literally saves money.',
    steps: [
      { kind: 'act', do: 'Pay every bill on time.', why: 'About 35% of the score.' },
      { kind: 'act', do: 'Get your limits raised and keep balances low. Never carry a balance month to month once out of debt.', why: 'About 30%: what you owe against what you could borrow.' },
      { kind: 'act', do: 'Build a history. If you have none, get some bills and pay them.', why: 'About 15%. Only time fixes this.' },
      { kind: 'act', do: 'Value your oldest accounts.', why: 'About 10%: they show reliability.' },
      { kind: 'act', do: 'Have a mix: a card, a car loan, a home loan, each kept up.', why: 'About 10%: variety.' },
      { kind: 'magic', do: 'Do magic for your own discipline rather than summoning spirits to raise the number.', why: 'Apart from the odd bank officer overlooking something, the book says, there is little a spirit can do here.' },
    ],
    tool: 'score',
  },
  {
    id: 'taxes', family: 'flow', title: 'Taxes', short: 'Just pay them, and take the refund.', pages: 'Ch. 8, pp. 125–126',
    what: 'The book’s one piece of tax advice: pay them, and have enough withheld to get a refund.',
    helps: 'Clever advisers say to withhold the minimum and keep the interest. The book’s reply: you won’t actually save it, and the interest on an average refund is tiny.',
    steps: [
      { kind: 'act', do: 'Pay your taxes.', why: 'Dealing with the tax office is manageable but never pleasant.' },
      { kind: 'act', do: 'Let enough be withheld that you get a refund at year end.', why: 'Almost nobody banks the difference, and the interest on about $3,000 comes to very little. Sometimes the sorcerer’s move is not to be clever.' },
    ],
  },

  // ------------------------------------------------------------------ work
  {
    id: 'jobhunt', family: 'work', title: 'The job-finding strategy', short: 'Seven steps from one in eighty to the one.', pages: 'Ch. 9, pp. 129–138',
    what: 'A full strategy for finding work in a hard market, where what matters is not how many are unemployed but how many jobs are on offer.',
    helps: 'Each step narrows the field. With about eighty applicants for each professional job, the book shows how ordinary good practice plus sorcery brings you to the one.',
    steps: [
      { kind: 'magic', do: 'Macro-enchantment: one ritual for work that suits you, pays what you need and does not clash with your spiritual path. Let your intuition, divination and guides choose its form.', why: 'It sets the quality of the work and tunes you to powers both spiritual and material.' },
      { kind: 'act', do: 'Put the word out: tell family and friends, old colleagues and people you haven’t spoken to in years, and use LinkedIn and Facebook.', why: 'About 80% of openings are never advertised; they go by referral. Fewer rivals, and a contact can vouch for skills you lack paper for.' },
      { kind: 'magic', do: 'Invoke Mercury and the powers of air. Combine the glyphs for viral marketing, steady work and finding a job into one petition, charge it and carry it.', why: 'Mercury carries messages. With a clear mind you may sense the threads that link all people.' },
      { kind: 'act', do: 'The résumé of Mercury: keep a long CV of everything you have ever done. For each job, copy the relevant parts and mirror the advert’s exact words.', why: 'Résumés are often screened by software or by an assistant who doesn’t know that “a/r” means accounts receivable. Mismatched words go in the bin. One in 80 becomes one in 40.' },
      { kind: 'act', do: 'The cover letter of Venus: tell a short story that shows you in action. Look at examples, but never copy one.', why: 'Only about 40% send one. It says why they will love you. One in 40 becomes one in 16.' },
      { kind: 'magic', do: 'Charge both without marking the paper: read them aloud to a spirit or to angels, the messengers, asking them to move the readers; or charge a master copy on your altar with oils, incense and sigils; or pass the pages over a candle flame.', why: 'What you do to the master affects every copy, even emails. Oil stains, invisible ink, powder or visible sigils would cost you the job. One in 16 becomes about one in 8.' },
      { kind: 'act', do: 'The interview: be clean, smiling, and dressed two steps above the job. Have answers ready, talk about what you bring, ask about the role and team, and ask for the job.', why: 'Too many applicants talk about what they want from the company.' },
      { kind: 'magic', do: 'Carry a simple talisman and make an invocation. Use conversational sorcery or covert hypnosis only if you are skilled.', why: 'Googly-eyed staring and heavy-handed commands will not land the job.' },
      { kind: 'act', do: 'Post a plain thank-you card on your way home. Breathe a prayer onto it; add nothing messy.', why: 'Only about 4% send one. It can make you the one. One manager told a colleague he never hires anyone who doesn’t.' },
      { kind: 'act', do: 'Negotiate. See the next card.', why: 'Most jobs above entry level have room.' },
    ],
    care: ['Never let magic hurt you on the ordinary level. Anything odd on the paper will disqualify you.'],
    tool: 'odds',
  },
  {
    id: 'negotiate', family: 'work', title: 'Negotiating your pay', short: 'Sweeten them, command yourself.', pages: 'Ch. 9, pp. 136–138',
    what: 'In Nepal you would never pay the asking price for a T-shirt; in the West people are shy of negotiating salary. Done in a friendly way, it shows pride and a sense of your worth, which makes others value you too.',
    helps: 'More pay from the first day, which compounds through your career.',
    need: ['The interviewer’s business card and yours', 'A jar of honey, molasses and sugar', 'Licorice root and cinnamon sticks'],
    steps: [
      { kind: 'magic', do: 'Make a honey jar: put the interviewer’s card in a jar with your own card or name, fill with honey, molasses and sugar, and add licorice root and cinnamon sticks. Invoke a kindly Venusian power, on the day and hour of Venus if you can.', why: 'Sweetening, not control: so they look kindly on your suggestions and forgive missteps.' },
      { kind: 'magic', do: 'Command yourself: a touch of commanding oil, the seal of Jupiter on your person, or a mojo bag with a whole High John root fed with a mild oil.', why: 'Sweet towards them, commanding in yourself.' },
      { kind: 'act', do: 'Leave salary to the end of the process.', why: 'The longer you have to show you are the one, the stronger you are.' },
      { kind: 'act', do: 'Let them name a number first.', why: 'It may be higher than you expected. You can accept, or say you were thinking a little higher.' },
      { kind: 'act', do: 'Know the going rate from searches and from peers at other firms.', why: 'A group you are not competing with is a kind of financial coven.' },
      { kind: 'act', do: 'If salary is capped, ask about bonuses, options, benefits or an extra week’s leave.', why: 'Find where they can bend.' },
      { kind: 'act', do: 'Keep it friendly. If fear freezes you, practise haggling at a flea market.', why: 'They are not the enemy; you are building a deal you can both live with.' },
    ],
  },

  // ------------------------------------------------------------------ rise
  {
    id: 'promotion', family: 'rise', title: 'The promotion strategy', short: 'Eleven steps to rise at work.', pages: 'Ch. 10, pp. 141–152',
    what: 'You can only cut spending so far; income can grow without limit. Promotions are not fair: looks, dress, connections and bias count as much as performance. Master the skills and you can be one of the people with the advantage.',
    helps: 'More income, the pile that has no ceiling.',
    steps: [
      { kind: 'act', do: 'Assess yourself: ask a friendly colleague (not your best friend) how the office sees you, and push for honesty.', why: 'The person who looks busy is often rated above the one who quietly gets more done. We rarely see ourselves as others do.' },
      { kind: 'act', do: 'Educate yourself: free courses from MIT, Stanford and Khan Academy, intensive certificates, or an accredited degree for working adults.', why: 'A job needs skills more than a degree; but sometimes the paper matters. Check for regional accreditation, and ask about credit for life experience.' },
      { kind: 'magic', do: 'Macro-enchantment: one prayer, puja, mantra, novena, spell or power over the whole effort. Say the position you want, and what you will do with the power and money.', why: 'Some promise a statue or a donation in return. Long-term vows are traditional, but a broken promise to a spirit can be catastrophic.' },
      { kind: 'act', do: 'Do your job really well, and be seen to: in before the boss, out after, error-free writing, dressed well for your build.', why: 'If you can’t do your job well, it is time for a change, not a promotion: the Peter Principle says we rise to the level where we can’t cope.' },
      { kind: 'magic', do: 'Get noticed: use Mercury and the glyphs to spread your good name, volunteer and offer ideas. Track a useful number nobody tracks and hand in an unsolicited report, after a late-night influence working on your boss’s and your boss’s boss’s business cards.', why: 'Managers love metrics, and it shows initiative. Aim to become a linchpin, someone they can’t do without.' },
      { kind: 'magic', do: 'Look and act one step ahead: tailored clothes, a proper silk tie. Charge a tie, cufflink or scarf in a planet’s colours as a talisman, or sew a sigil inside a tie.', why: 'You are judged by how you dress, dress code or not. A friend in a ruthless trade has protection wards sewn into his jackets.' },
      { kind: 'act', do: 'Stop gossiping and swearing; think like a shareholder, not a disgruntled wage slave.', why: 'The goal is for people to think you have already made the step.' },
      { kind: 'act', do: 'Spend time with people above you: find common ground outside work, be in the room when an opinion is wanted.', why: 'Eventually one of them champions you when a post is discussed.' },
      { kind: 'act', do: 'Have a replacement in mind.', why: 'Often you can’t move up unless someone can step into your place.' },
      { kind: 'magic', do: 'Divine the timing: a retirement or transfer can open the way. Combine a reading with rumours and what you hear in meetings.', why: 'Shake-ups are rarely what they first seem.' },
      { kind: 'act', do: 'Ask for it: humble but frank, a discussion not an ultimatum. If the answer is no, be gracious and find out why.', why: 'Asking shows confidence. Let your competence be its source.' },
    ],
  },
  {
    id: 'obstacles', family: 'rise', title: 'Removing obstacles at work', short: 'Confusion and expelling, for severe cases only.', pages: 'Ch. 10, pp. 150–152',
    what: 'Step 10 of the promotion strategy. When nepotism, racism, a threatened boss or a dirty rival blocks you, you have three options: accept it, leave, or fight. The author uses this only in severe cases, and says plainly that it is traditional in magic and witchcraft and often effective.',
    helps: 'Confusion jinxes make opponents forget you or bungle their own moves. Expelling rituals remove someone from your working life.',
    need: ['Confusion: poppy seeds, twitch grass and black mustard seed in a powder base such as talc (red if coloured; add black and red pepper to cause infighting)', 'Expelling: red and black pepper, sulfur, crushed hornets and other hot or stinging things', 'A personal link to the target', 'A cheap doll or a cloth packet'],
    steps: [
      { kind: 'magic', do: 'Always divine first to see what the result will be.', why: 'Confusion spells are tricky.' },
      { kind: 'magic', do: 'Rather than powdering someone’s desk or shoes, bring the target to the spell: work a personal link into a packet or doll stuffed with the confusion mixture.', why: 'Laying powders at work is hard to do unseen, and not worth getting caught.' },
      { kind: 'magic', do: 'At night, when they are likely asleep, hold the doll by a string and spin it dizzily over confusion incense, speaking your wishes to it. Then hang it somewhere dark, swaying.', why: 'The same recipe works as powder, oil or incense.' },
      { kind: 'magic', do: 'To expel: make a packet or doll with the expelling mixture and get rid of it ceremonially: into a river, never looking back. The author prefers to post his anonymously somewhere far away.', why: 'Hot foot powder is the traditional tool, but is hard to use at work.' },
    ],
    care: ['The book warns that confusion spells can cause vehicle accidents and more serious harm. You are responsible for your actions.', 'It does not suggest death curses or any offensive magic for a promotion; it only notes that such things are traditional.'],
  },

  // ------------------------------------------------------------------ build
  {
    id: 'motive', family: 'build', title: 'Passion or money?', short: 'Know which one drives you.', pages: 'Ch. 11, pp. 157–159',
    what: 'People start businesses for passion or for money. Both are fine, but you should know which comes first. Owning a business sidesteps many obstacles: degrees, gaps in a CV, age or past mistakes don’t matter if you can do the thing.',
    helps: 'Seeing the traps of a passion business before you fall into them.',
    steps: [
      { kind: 'act', do: 'If money drives you, simply find something profitable, from a website for a local shop to a new app.', why: 'The passion is for business itself, and there is nothing wrong with that.' },
      { kind: 'act', do: 'If passion drives you, guard the passion: a hobby done on demand can become just another crappy job.', why: 'Even the author has days he would rather watch a film than do a client’s protection spell.' },
      { kind: 'act', do: 'Don’t let love blind you to a weak business model.', why: 'Many write to the author for magic to save an ill-advised business with no plan, trusting the gods. If an idea is bad enough, no sorcery will force it to succeed.' },
      { kind: 'act', do: 'Make sure you love the business of the product, not just the product.', why: 'Books, games or oils, in the end they are units. If you hate selling units, you will hate selling what you love.' },
    ],
  },
  {
    id: 'idea', family: 'build', title: 'Find the idea and the market', short: 'Invoke for an idea, then test it against four questions.', pages: 'Ch. 11, pp. 159–161',
    what: 'Coming up with the idea is where most people stall. Here a sorcerer has an advantage.',
    helps: 'A marketable, profitable idea and a clear group to sell it to.',
    steps: [
      { kind: 'act', do: 'Make sure you are meditating regularly.', why: 'A clear mind hears the idea when it comes.' },
      { kind: 'magic', do: 'Invoke for a good and profitable idea: your Holy Guardian Angel or good daemon, a saint, or a Jupiterian or Mercurial power. The author most often uses Manjushri, and has used Jupiter and Tiriel.', why: 'Ask for “profitable” as well as “good”: good alone is too vague.' },
      { kind: 'magic', do: 'Watch for omens and signs.', why: 'The answer may come sideways.' },
      { kind: 'act', do: 'Give your mind free time during repetitive tasks, like driving or laundry, and always have a way to note ideas down.', why: 'That is when the deep mind connects things. Ideas fade like dreams at dawn.' },
      { kind: 'act', do: 'List the skills your hobbies, including magic, have given you, and combine two interests.', why: 'An astrologer who loves gardening stands out with an ad in a horticulture magazine. Spells for investors; yoga for surfers.' },
      { kind: 'act', do: 'Check your market against four tests: narrow enough to reach, wants what you offer, able to pay, and ideally you are one of them.', why: 'If two of the four are missing, it is probably not a good idea.' },
      { kind: 'act', do: 'Avoid ready-made systems and multi-level marketing.', why: 'Most people lose money on the training materials, and turning friends into customers loses you friends. Schemes in neat packages make money for someone else.' },
    ],
  },
  {
    id: 'test', family: 'build', title: 'Test it cheaply', short: 'Ask people to actually buy.', pages: 'Ch. 11, pp. 162–164',
    what: 'Today most ideas can be crash-tested for very little: a website, a blog, a few ads.',
    helps: 'You learn whether it sells before you risk much.',
    steps: [
      { kind: 'act', do: 'Ask people to actually buy, not whether they would.', why: 'People say they will buy many things.' },
      { kind: 'act', do: 'Ask three questions: can I test it cheaply? Is the overhead low? Will the profit be worth my time?', why: 'The author pre-sold his course, refunds promised if too few signed up within thirty days; his costs were a computer.' },
      { kind: 'act', do: 'Weigh shops honestly.', why: 'An occult shop can’t really be tested, has huge overheads and needs you there. Many owners pay their bills from a second job or a spouse.' },
    ],
  },
  {
    id: 'shop', family: 'build', title: 'If you open a shop', short: 'Five rules and a shop full of standing magic.', pages: 'Ch. 11, pp. 164–166',
    what: 'A physical shop or office has higher costs, staff and hours, but also lets you work direct, long-term magic on the place.',
    helps: 'Avoiding the common mistakes, and a premises that draws and keeps money.',
    need: ['A lodestone and iron filings', 'Floor wash: sassafras, cinnamon, licorice', 'An oil lamp', 'A Rose of Jericho'],
    steps: [
      { kind: 'act', do: 'Pay for location.', why: 'Better to be where people stumble on you on a night out than next to a 7-Eleven an hour away.' },
      { kind: 'act', do: 'Don’t fear competitors nearby.', why: 'Shops of a kind cluster into districts. Three occult shops made New Hope, Pennsylvania worth an hour’s drive.' },
      { kind: 'act', do: 'Keep it small and full.', why: 'Empty shelves look like a closing-down sale, and you pay for every square foot.' },
      { kind: 'act', do: 'Work with the internet, not against it.', why: 'Let people scan barcodes and read reviews; most still buy what is in front of them.' },
      { kind: 'act', do: 'Own the building if you can.', why: 'You control your rent, and can let out the rest. Ivo Dominguez’s ownership of his shop’s building has been key to its survival.' },
      { kind: 'magic', do: 'Keep a lodestone in the cash drawer and feed it iron filings daily.', why: 'Money that goes out brings more in.' },
      { kind: 'magic', do: 'Wash the floor and front step with sassafras (to keep money), cinnamon (to draw it) and licorice (to sweeten relations).', why: 'The business is cleansed and charged together.' },
      { kind: 'magic', do: 'Keep a money-drawing lamp in the back room, refilled and relit daily.', why: 'Constant pressure.' },
      { kind: 'magic', do: 'Keep a Rose of Jericho in water, changed every Friday; hide sigils of Jupiter and Mercury behind the art; bless the place with charged statues or pictures.', why: 'Indian restaurants often keep Ganesha or Lakshmi; there is no reason not to keep Jupiter or a saint.' },
    ],
  },
  {
    id: 'funding', family: 'build', title: 'Funding', short: 'A business plan, enchanted.', pages: 'Ch. 11, pp. 166–168',
    what: 'Shops and hardware-heavy businesses usually need outside money, and harder times make it harder to get.',
    helps: 'The author’s first business plan, written from what he found online plus a little magic, won a $900,000 commitment from a large company.',
    steps: [
      { kind: 'act', do: 'Write a solid business plan, using good examples.', why: 'It is daunting, but very doable.' },
      { kind: 'magic', do: 'Enchant a master copy, as with a résumé, and keep it on your money altar.', why: 'The master affects every copy anywhere.' },
      { kind: 'act', do: 'Look at small-business loans, angel investors and micro-lending, and ask around for angels.', why: 'Word of mouth finds investors best. Keep friends and family out if you don’t want to risk the relationship.' },
    ],
  },
  {
    id: 'pareto', family: 'build', title: 'The 80/20 rule', short: 'Focus on the fifth that gives most, and handle the fifth that costs most.', pages: 'Ch. 11, pp. 168–169',
    what: 'About 80% of results come from 20% of effort; 80% of profits from 20% of customers, and 80% of the trouble from another 20%.',
    helps: 'Your time, which a business will otherwise swallow whole. The author realised most of his hassle came from clients who wanted phone calls, so he stopped taking calls.',
    steps: [
      { kind: 'act', do: 'Look for the 20% of work and customers that brings 80% of the reward, and give it your best.', why: 'It is almost a law of nature.' },
      { kind: 'act', do: 'Find the 20% that causes 80% of the hassle and deal with it deftly, even by changing how you work.', why: 'Learn to say no; you can’t please everyone.' },
    ],
  },
  {
    id: 'help', family: 'build', title: 'Getting help', short: 'Free mentors exist.', pages: 'Ch. 11, pp. 169–170',
    what: 'Tax and company rules change by place and year, so books only go so far.',
    helps: 'Expert help, often free.',
    steps: [
      { kind: 'act', do: 'Find a mentoring body like SCORE in the US, retired executives who advise small businesses free or cheaply.', why: 'They help with tax, incorporation, management and rescuing a struggling business.' },
      { kind: 'act', do: 'Ask your re-employment office, your small-business agency, and small foundations aimed at people like you.', why: 'The Circle of Habondia, named for the goddess of abundance, lends to women and teaches money skills.' },
    ],
  },
  {
    id: 'systemd', family: 'build', title: 'System D', short: 'The informal economy, and its protection.', pages: 'Ch. 11, pp. 170–171',
    what: 'System D, from French-speaking Africa and the Caribbean, is the economy of the resourceful: businesses run without registration or taxes. It is not mostly crime; it is markets, stalls and fixers, and the book says half the world’s workers are in it. Sears and Van Heusen began there.',
    helps: 'Knowing it exists, and the extra protection it needs.',
    steps: [
      { kind: 'act', do: 'Run above board if you can.', why: 'It is better and safer.' },
      { kind: 'magic', do: 'If you are in it, add magical protection. The Lightning Glyph of protection from the law was made for exactly this.', why: 'Many legal businesses started this way.' },
      { kind: 'act', do: 'Get above board before you are big enough to be noticed.', why: 'The author doesn’t want to know what you’re doing; just be smart.' },
    ],
  },
  {
    id: 'quit', family: 'build', title: 'When to quit the day job', short: 'Follow the money.', pages: 'Ch. 11, pp. 172–173',
    what: 'Going from a side business to your only income swaps the comfort of two incomes for sleepless slow weeks.',
    helps: 'Leaping at the right time, not too early.',
    steps: [
      { kind: 'act', do: 'Let the business tell you. Daymond John kept waiting tables at Red Lobster for two years while building FUBU.', why: 'Quit when it is making ends meet, or when you decide to give it a last full push.' },
      { kind: 'act', do: 'Soften the jump: go part-time, or take a part-time job elsewhere.', why: 'Flip the old balance gradually.' },
      { kind: 'act', do: 'Save a few months of living costs, and do the maths.', why: 'If you don’t have hard numbers, you are not ready.' },
      { kind: 'magic', do: 'Consult several readers and several kinds of divination.', why: 'Aim for actionable intelligence, not one reading.' },
      { kind: 'magic', do: 'When you do magic for the side business, tell your powers about your main job too.', why: 'Otherwise a spirit may help the side business the easy way: by getting you fired from the day job. It is your job to run your life, not the spirit’s.' },
    ],
  },
  {
    id: 'plug', family: 'build', title: 'Know when to pull the plug', short: 'Never giving up can be deadly advice.', pages: 'Ch. 11, pp. 173–174',
    what: 'If more goes out than comes in, the business fails. The savvy owner sees it in time and fixes it, or cuts the losses.',
    helps: 'Saving your home and savings from a dream that isn’t working.',
    steps: [
      { kind: 'act', do: 'Watch the two piles honestly.', why: 'Doing the same thing and hoping for a different result is the definition of insanity.' },
      { kind: 'act', do: 'If it can’t be fixed, stop throwing good money after bad.', why: 'Many owners risk their homes for “a few more months” without changing the plan.' },
      { kind: 'magic', do: 'If you summon Jupiter while in over your head, don’t be surprised if the best he can do is help you cut your losses.', why: 'A bad idea is a bad idea; no magic holds it together for long. Letting go makes room for a bigger dream.' },
    ],
  },

  // ------------------------------------------------------------------ urgent
  {
    id: 'glyphpowder', family: 'urgent', title: 'The money-drawing glyph in powder', short: 'A sum, a glyph, seven nights.', pages: 'Ch. 12, p. 178; Ch. 5, p. 80',
    what: 'The first of the Lightning Glyphs, used for an exact sum. Emergency magic is often some of the most powerful and exact magic people do: $500 short on rent, a spell, exactly $500 in time.',
    helps: 'Pulling in a specific amount quickly. The author’s first spell for someone else, a talisman for $50, was followed three days later by a wallet with exactly $50 found on a roller coaster.',
    need: ['Money-drawing powder', 'Paper', 'A small bag'],
    steps: [
      { kind: 'magic', do: 'Draw the money-drawing glyph in money-drawing powder, with every line drawn from the outside in toward the circle.', why: 'Drawing inward draws money in. The glyph is on p. 80 of the book.' },
      { kind: 'magic', do: 'Write the amount you need in the circle.', why: 'Be exact.' },
      { kind: 'magic', do: 'Pray to Jupiter for seven nights.', why: 'Jupiter is increase.' },
      { kind: 'magic', do: 'Gather the powder and the written amount into a bag and carry it until the money comes.', why: 'You keep the working on you.' },
      { kind: 'magic', do: 'When it comes, bury the glyph in your yard or in the wild, thank Jove profusely, and tell others what he did.', why: 'Public thanks is part of the bargain.' },
    ],
  },
  {
    id: 'petitions', family: 'urgent', title: 'Petitions', short: 'Written requests, folded and weighted.', pages: 'Ch. 12, pp. 179–180',
    what: 'A petition is a spell in itself and part of many others: anything from a detailed letter to the gods to your name written over someone else’s.',
    helps: 'Focusing a request and giving it a body.',
    steps: [
      { kind: 'magic', do: 'Write it in a special ink like Dragon’s Blood, or with ink or a pen you have consecrated.', why: 'Dragon’s Blood is excellent for money.' },
      { kind: 'magic', do: 'Dress it with oil and pass it through incense.', why: 'Consecration.' },
      { kind: 'magic', do: 'Fold it toward you to draw something in; away from you to repel.', why: 'The fold carries the direction.' },
      { kind: 'magic', do: 'Set something on it: for days, a seven-day candle dressed with oil; for longer, a lodestone or a statue of a deity.', why: 'The weight holds the request in place.' },
    ],
  },
  {
    id: 'baths', family: 'urgent', title: 'Money baths', short: 'Immerse yourself in the spell.', pages: 'Ch. 12, pp. 179–181',
    what: 'A ritual bath to reverse bad money luck or open the way for money. The author finds baths among the fastest-acting magic there is.',
    helps: 'Being completely immersed in the working.',
    need: ['Water, from a spring, lake or rain if you can (tap water is fine)', 'Three or more ingredients, usually an odd number'],
    steps: [
      { kind: 'magic', do: 'Choose your water: the more natural the source, the better.', why: 'But a tap-water bath beats no bath.' },
      { kind: 'magic', do: 'Money-drawing: bayberry leaf, myrrh, Irish moss. Fast luck: cinnamon, wintergreen, vanilla. Reversing bad money luck: eucalyptus, nine pieces of devil’s shoestring, sassafras. Job-finding: gravel root, salt, licorice root.', why: 'What the ingredients stand for sets the bath’s purpose.' },
      { kind: 'magic', do: 'Wash upward from feet to head to draw things to you; downward from head to feet to push away; soak to ease what troubles you.', why: 'This bath is not for getting clean; it is ritual.' },
      { kind: 'magic', do: 'Pray while you bathe: the Jupiter invocation, the four goddesses, Psalm 23, or another prayer for wealth.', why: 'Words give the water its task.' },
    ],
  },
  {
    id: 'key', family: 'urgent', title: 'The key spell', short: 'Seven doors and a crossroads at dawn.', pages: 'Ch. 12, p. 181',
    what: 'For when the emergency is not a sum but not knowing what to do next.',
    helps: 'Unlocking an opportunity you can’t yet see.',
    need: ['A skeleton key', 'Cord soaked in Road Opener or Wealthy Way oil (optional)'],
    steps: [
      { kind: 'magic', do: 'Touch the key to seven doors: a bank, a courthouse, a church, a shop, a hospital, a business and your home.', why: 'It gathers the openings of each.' },
      { kind: 'magic', do: 'If you like, wrap it with cord soaked in Road Opener or Wealthy Way oil.', why: 'More opening power.' },
      { kind: 'magic', do: 'At dawn, place it in the centre of a crossroads.', why: 'The crossroads is where ways meet.' },
      { kind: 'magic', do: 'Invoke Papa Legba, the Vodou power who opens the gates, to bless the key and open opportunities you cannot see. Or call your own power.', why: 'The author learned it from a Vodou priest and keeps a relationship with Papa.' },
    ],
  },
  {
    id: 'lamps', family: 'urgent', title: 'Lamp spells', short: 'Steady pressure until something gives.', pages: 'Ch. 12, pp. 181–182',
    what: 'A small oil lamp, charged with oils, herbs and a petition, kept burning day by day.',
    helps: 'Keeping constant pressure on a situation until it breaks.',
    need: ['A bowl or coconut shell', 'Olive or vegetable oil', 'Condition oils and herbs for your purpose', 'A petition'],
    steps: [
      { kind: 'magic', do: 'Fill the vessel with olive or vegetable oil and add a few drops of condition oils and some solid herbs.', why: 'The base carries the charge.' },
      { kind: 'magic', do: 'For a loan: Crown of Success oil, alfalfa, myrrh, frankincense, calamus, 16 allspice berries, High John root.', why: 'The book’s recipe.' },
      { kind: 'magic', do: 'For emergency funds: Fast Luck and Attraction oils, chamomile flowers, cinnamon, Irish moss, alkanet, basil, and shredded foil or metallic glitter.', why: 'The book’s recipe.' },
      { kind: 'magic', do: 'For promotion: Wealthy Way oil, High John, gravel root, licorice root, calamus root, benzoin powder, a buckeye nut.', why: 'The book’s recipe.' },
      { kind: 'magic', do: 'For legal issues: Court Case and Money Stay With Me oils, sassafras root, galangal root, High John root, cascara sagrada, oregano.', why: 'The book’s recipe.' },
      { kind: 'magic', do: 'Put the petition under the lamp, or sunk at the bottom if the oil never runs low enough to catch it.', why: 'The flame works on it.' },
      { kind: 'magic', do: 'Pray over it every time you light it, and never let it run dry.', why: 'The lamp must always be refilled.' },
    ],
    care: ['The author never leaves the lamp burning unattended. He puts it out at night and relights it next day rather than moving it somewhere like a bathtub to burn all night.'],
  },
  {
    id: 'bags', family: 'urgent', title: 'Conjure hands', short: 'Mojo bags for a job and for money.', pages: 'Ch. 12, pp. 182–183',
    what: 'A conjure hand, mojo bag or gris-gris bag is a staple of American hoodoo: ingredients gathered in a drawstring bag of a fitting colour, or tied in cloth as in New Orleans.',
    helps: 'A working you carry with you.',
    steps: [
      { kind: 'magic', do: 'Use an odd number of ingredients, usually three, seven or nine, and never more than thirteen.', why: 'More than thirteen gets too complex.' },
      { kind: 'magic', do: 'Job-finding bag: the job-finding glyph, High John for mastery, gravel root for finding work, a lodestone to draw offers, licorice root for influence, steady work powder, chamomile for speed, cinnamon for money, Irish moss for business.', why: 'Each ingredient has one task.' },
      { kind: 'magic', do: 'Money-drawing bag: the money-drawing glyph, a lodestone, seven sunflower seeds for illumination, nine pieces of devil’s shoestring to protect what you get, bayberry, 16 allspice berries for business, chamomile for power, cinquefoil for manipulation, and a gator hand tied outside to grab what the bag attracts.', why: 'The book’s recipe.' },
      { kind: 'magic', do: 'Feed it a few drops of oil once a week.', why: 'Feeding stirs its powers.' },
      { kind: 'magic', do: 'Talk to it, and give it up-to-the-minute instructions.', why: 'Some treat it as a living thing.' },
    ],
  },
  {
    id: 'seals', family: 'urgent', title: 'Consecrated jewellery and paper seals', short: 'Discreet talismans for business.', pages: 'Ch. 12, pp. 183–184',
    what: 'For business, the author prefers a consecrated metal talisman or a hidden paper seal to a bulky bag that smells like a hippie is hiding in his pocket.',
    helps: 'Power you can wear anywhere without anyone knowing.',
    steps: [
      { kind: 'magic', do: 'Buy a well-made talisman from a grimoire, or commission one. Make your own only if you have the skill.', why: 'Something that inspires you beats nine agonised hours on something you secretly loathe.' },
      { kind: 'magic', do: 'Or consecrate what you already own: a gold cross or Star of David is a solar talisman; a silver fairy can house a spirit; a ring can be dedicated to the power of its stone.', why: 'The author’s grandfather’s platinum and star-sapphire ring is consecrated to Jupiter.' },
      { kind: 'magic', do: 'Draw Lightning Glyphs on paper, consecrate them with a light-scented oil, and keep them in the right place: money-drawing and holding in your wallet; promotion, sweetening and dominating inside your tie; protection from the law, reversing bad luck and legal matters inside your jacket, like a shield; intelligence and pure luck inside your hat or collar.', why: 'Each place suits the glyph’s work.' },
      { kind: 'magic', do: 'If you work with subtle energy, brand the glyphs onto your aura or see them spinning in your channels.', why: 'Permanent installation is best taught in person.' },
    ],
  },
  {
    id: 'speech', family: 'urgent', title: 'Stopping harmful talk', short: 'A knotted cord or a beef tongue.', pages: 'Ch. 12, pp. 185–186',
    what: 'Sometimes the emergency is someone sabotaging you, and the fastest route is to bind their speech.',
    helps: 'Silencing or sweetening what someone says about you.',
    steps: [
      { kind: 'magic', do: 'Speech cord: cleanse a string with salt water or whiskey.', why: 'It clears earlier patterns.' },
      { kind: 'magic', do: 'Out of sight but within earshot of the person, tie a loose knot, call their name, and pull it tight the moment they answer.', why: 'The knot catches their voice.' },
      { kind: 'magic', do: 'Repeat over several days until there are ten knots, then close the loop with an eleventh.', why: 'All in one day would be conspicuous, and annoying.' },
      { kind: 'magic', do: 'Use the cord like a rosary, chanting a wish such as “Speak no ill of me”; or put it in a jar of honey and sugar to sweeten their speech; or in the freezer to freeze it.', why: 'Three ways to direct the bound voice.' },
      { kind: 'magic', do: 'Stronger: cut open a beef tongue, put links to the person inside, sew it with black cord, wrap it in dark cloth with Saturn symbols, then freeze, sweeten or burn it.', why: 'One of the author’s students ate the tongue afterwards and said the person agreed to whatever he asked from then on.' },
    ],
  },
  {
    id: 'ninenight', family: 'urgent', title: 'Jupiter and the four goddesses: nine nights', short: 'A complete financial makeover.', pages: 'Ch. 12, pp. 186–187',
    what: 'The book’s rite for when you need your whole financial life remade: Jupiter at the centre and the four goddesses at the gates, nine nights running.',
    helps: 'Rescue from your own lack of wisdom, guidance toward stability, freedom from debt, victory over distraction, goodwill from others, and wealth inside and out.',
    need: ['An altar cloth with the seal of Jupiter from Agrippa drawn on it', 'One blue candle', 'Four blue or white candles'],
    steps: [
      { kind: 'magic', do: 'Draw Agrippa’s seal of Jupiter on the altar cloth: a circle crossed by an X, with a small circle at each end.', why: 'The mandala the vision showed.' },
      { kind: 'magic', do: 'Carve or paint Jupiter’s sigil and your own name or seal on the blue candle and set it in the centre.', why: 'You and Jupiter share the throne.' },
      { kind: 'magic', do: 'Write the goddesses’ names on the four other candles and set them at the four points.', why: 'Victoria, Libertas, Concordia and Abundantia at the gates.' },
      { kind: 'magic', do: 'Light the centre candle and say the Jupiter invocation. Then call the four goddesses, lighting each candle as you speak her name.', why: 'The circle comes alive one gate at a time.' },
      { kind: 'magic', do: 'Ask for help in your own words, addressing every figure: Jove to rescue you from your lack of wisdom and guide you to stability; Libertas to free you from debt and servitude; Victoria to win your fights against debt and distraction; Concordia that all may look kindly on you; Abundantia that you may become wealthy inside and out.', why: 'Every power is given its job.' },
      { kind: 'magic', do: 'Chant IOVIS OPTIMUS MAXIMUS slowly and loudly, more forcefully each time, with a drum if you like. On the last repetition add “HO!” to release the power.', why: 'The chant builds; the HO sends it out.' },
      { kind: 'magic', do: 'Do this nine nights in a row in the hour of Jupiter, then let the candles burn down, relighting them each night until they are gone.', why: 'The working is finished when the candles are.' },
    ],
    tool: 'mandala',
  },
  {
    id: 'quickcash', family: 'urgent', title: 'Ordinary ways to raise money fast', short: 'Give the magic a door to come through.', pages: 'Ch. 12, pp. 187–190',
    what: 'Magic and mundane steps always go together. If you do a money spell and sit back, the money comes the bad way: the aunt who dies and leaves you the sum, or the crash that pays out but leaves you a battered car.',
    helps: 'Making real openings through which the magic can arrive.',
    steps: [
      { kind: 'act', do: 'Sell what you don’t need, on a blog, Amazon, eBay or Craigslist.', why: 'Yard sales rarely pay unless you own a ton of blue glass bottles.' },
      { kind: 'act', do: 'Try mystery shopping, focus groups, or paid tasks online like Amazon’s Mechanical Turk.', why: 'Small sums, but the right job may arrive at the right time.' },
      { kind: 'act', do: 'Get paid to advertise on your car, or rent out a parking space near a busy station.', why: 'One person the author knows makes $600 a month from a driveway.' },
      { kind: 'act', do: 'Take a part-time job paid in tips, like waiting tables or bartending.', why: 'No two-week wait for a paycheque.' },
      { kind: 'act', do: 'Use food pantries and emergency help if things are really bad.', why: 'Money not spent on food is money in your pocket.' },
      { kind: 'act', do: 'Join medical studies, or sell plasma or hair. Egg or sperm donation means months of commitment.', why: 'A five-day sleep study paid a friend several thousand dollars.' },
      { kind: 'act', do: 'Only in true emergencies, borrow from retirement savings or a whole-life policy.', why: 'Penalties are steep. Unless someone is going to break your legs, find another way.' },
    ],
  },

  // ------------------------------------------------------------------ grow
  {
    id: 'invest', family: 'grow', title: 'Start investing now', short: 'Compound interest is beautiful magic.', pages: 'Ch. 13, pp. 193–199',
    what: 'If you have only a checking and a savings account as an adult, the book says you are making a big mistake. Interest earned is added back so it earns interest too. It grows slowly at first, then astonishingly.',
    helps: 'The difference between retiring well and greeting customers at Walmart at 80. $2,000 invested once at 20, at 8%, becomes about $63,800 by 65; start at 25 and it is about $43,400. Five years’ wait costs $20,000.',
    steps: [
      { kind: 'act', do: 'Start now, whatever your age.', why: 'If you found money for a guitar or a car, you can find it for this. Even at 65 it is worth it: by the book’s figures, $2,000 a year for twenty years earns about $58,000 more than you put in.' },
      { kind: 'act', do: 'Automate it: have the bank move money every payday from checking to savings and investments.', why: 'It takes the human out of the decision, like tax withheld: once it is gone you stop thinking about it.' },
      { kind: 'act', do: 'Take free money first: put the most you can into your workplace pension, especially if your employer matches.', why: 'In the US that is the 401(k); you invest before tax.' },
      { kind: 'act', do: 'Then a tax-free account such as a Roth IRA.', why: 'Tax on what you put in, none on what you take out.' },
      { kind: 'act', do: 'Prefer index funds to managed funds.', why: 'Most managers fail to beat the market and charge for it. Index funds follow the whole market.' },
      { kind: 'act', do: 'Shift from shares toward bonds and cash as you near retirement, or use a lifecycle fund that does it for you.', why: 'Shares earn more but swing; you need safety when you will soon need the money. Many 2008 retirees would have been spared.' },
      { kind: 'act', do: 'Don’t follow the markets daily.', why: 'Most of us are better off not watching.' },
    ],
    tool: 'growth',
  },
  {
    id: 'investmagic', family: 'grow', title: 'Magic for investments', short: 'Divination and one long working. Nothing more.', pages: 'Ch. 13, pp. 199–200',
    what: 'Unless you trade for a living, the book’s investment magic has only two parts.',
    helps: 'Choosing well and protecting the whole without fiddling.',
    steps: [
      { kind: 'magic', do: 'Divine about which funds and how much.', why: 'A cabal of trader-sorcerers uses the multiple-divination method to pick stocks, with promising results; for the rest of us, this is enough.' },
      { kind: 'magic', do: 'Make one long-term macro-enchantment over the health of your portfolio: Jupiter, Mercury, Habondia, Ganesha, Dzambhala or another power.', why: 'A friend, a successful investor, uses Baphomet: an alchemical figure of dissolving and binding (solve et coagula), suited to the market’s ebb and flow.' },
      { kind: 'act', do: 'Don’t do more than that.', why: 'Anything else is overkill.' },
    ],
  },
  {
    id: 'passive', family: 'grow', title: 'Income that doesn’t need your hours', short: 'Residual and leveraged income.', pages: 'Ch. 13, pp. 200–202',
    what: 'A fireman the author met afforded a beach house because, besides working as a fireman, he owns a bagel shop he barely visits. Money not tied to your hours is the most valuable kind.',
    helps: 'Income that keeps coming while you live your life.',
    steps: [
      { kind: 'act', do: 'Residual income: do the work once and get paid for years: royalties, licensing a patent, renewal commissions, e-books and recordings.', why: 'Small upkeep is fine, an hour or two a week at most.' },
      { kind: 'act', do: 'Or what remains from an asset after costs: rent from a property run by a management company, a blog with ads.', why: 'The residue after the mortgage and costs is yours.' },
      { kind: 'act', do: 'Leveraged income: earn from others’ work: subcontractors, referrals, franchises, affiliates.', why: 'Your time is no longer the limit.' },
      { kind: 'magic', do: 'Place enchantments for sales, for honest helpers, for word of mouth and for protection.', why: 'You aren’t there to watch, so the magic matters more.' },
      { kind: 'act', do: 'But don’t over-enchant.', why: 'The point is to keep it passive.' },
    ],
  },
  {
    id: 'retire', family: 'grow', title: 'Retirement', short: 'You will have to hustle for it yourself.', pages: 'Ch. 13, pp. 202–203',
    what: 'The average US Social Security cheque was $1,177 a month when the book was written, and you may live 25 to 40 years past retirement age. Unless you have a good state pension, retirement is up to you.',
    helps: 'Not working until the day you die.',
    steps: [
      { kind: 'act', do: 'Get a good job, max the workplace pension, open a tax-free account, and automate money into index funds, maybe an annuity.', why: 'You already have most of the puzzle from this page.' },
      { kind: 'act', do: 'Start a side business you can turn into passive income by 60.', why: 'Then manage it from your condo in the Seychelles.' },
      { kind: 'magic', do: 'Invoke what you like, but know it comes second.', why: 'The willpower to start putting money aside matters most, and once begun it becomes its own reward.' },
    ],
  },
];

// ---------------------------------------------------------------------------------------------
// Do's and don'ts while killing debt (Chapter 7)
// ---------------------------------------------------------------------------------------------
export const DO_DONT: { do: string; dont: string }[] = [
  { do: 'Borrow books from the library.', dont: 'Buy more books (the author notes the irony).' },
  { do: 'Work out at home or outside, with cheap weights if needed.', dont: 'Join a gym, and cancel one you have.' },
  { do: 'Invite people over: potlucks and parties.', dont: 'Eat out with friends more than once a month.' },
  { do: 'Stream films through a subscription.', dont: 'Buy DVDs or Blu-rays.' },
  { do: 'Buy yourself one thing you really want each month.', dont: 'Buy lots of small things because they are “on sale”.' },
];

// ---------------------------------------------------------------------------------------------
// The sixteen Lightning Glyphs of Jupiter (Chapter 5). Purposes and uses only: the drawings are the
// illustrator's artwork and live in the book.
// ---------------------------------------------------------------------------------------------
export interface GlyphInfo { k: string; name: string; page: number; purpose: string; use: string; place?: string; warn?: string }
export const GLYPHS: GlyphInfo[] = [
  { k: 'draw', name: 'Drawing money', page: 80, purpose: 'The most basic money magic: a specific sum. The only glyph not drawn in one continuous line.', use: 'Draw it on paper and write the amount in the circle. Pray to Jupiter; when he grants it, bury the paper in your yard or the wild, thank him profusely and tell others.', place: 'Wallet' },
  { k: 'entrepreneur', name: 'Entrepreneurial work', page: 80, purpose: 'The delicate problems of your own business: growing too fast, a side business clashing with the day job.', use: 'Consecrate it and place it at the centre of your business: the shop, the home office, the envelope of paperwork. Leave it there, and address your requests to it when you pray to Jupiter.' },
  { k: 'hold', name: 'Holding on to money', page: 80, purpose: 'Keeping what you draw.', use: 'Inscribe it on a two- or three-pronged sassafras leaf and keep it in your wallet to curb spending, or on the corner of every retirement statement to guard against losses.', place: 'Wallet' },
  { k: 'job', name: 'Finding a job', page: 81, purpose: 'A waving flag that announces you need work, and makes sure it is the right work for your life.', use: 'Trace it in the air and see it burn in blue flame. Ask Jupiter to let it fill your résumés and letters. Carry it to interviews and networking.' },
  { k: 'steady', name: 'Steady work', page: 81, purpose: 'Keeping the job you have, when no job is safe.', use: 'Inscribe, consecrate, and keep it in your office, cubicle or desk.' },
  { k: 'promotion', name: 'Promotion', page: 82, purpose: 'Its upward lines keep lifting you: a promotion, a higher freelance rate, a jump in market share.', use: 'Inscribe it on a brass triangle and wear it round your neck while seeking a promotion.', place: 'Inside your tie' },
  { k: 'discipline', name: 'Financial discipline', page: 82, purpose: 'Self-binding to your plan, for when the money-holding glyph is not enough.', use: 'Use it while cutting up cards, killing debt, or forcing yourself to invest each month.', warn: 'It binds you to the plan by whatever means necessary. Resist the nagging and events will impose the discipline: it is hard to waste money shopping with a broken leg. Use with care.' },
  { k: 'sweeten', name: 'Sweetening relations', page: 83, purpose: 'Often what lands the job or the deal is not magic aimed at it, but better relations between people: a difficult boss, a merger.', use: 'Use it in honey jars and petitions toward the people involved.', place: 'Inside your tie' },
  { k: 'dominate', name: 'Dominating relations', page: 83, purpose: 'When sweetening is not enough or not fitting: direct influence over a person or situation.', use: 'Draw it over their business card or photo, seeing the zig-zags bind their limbs and the swirl cast your influence over their senses and speech. At night, put it in a box with your commands written round the inside walls.', place: 'Inside your tie', warn: 'However strong the spell, magic is only one of many influences on a person.' },
  { k: 'legal', name: 'Legal matters', page: 83, purpose: 'Permits, incorporation, depositions and any legal snag in your work.', use: 'Inscribe it on a candle that stands for the judge, with the sweetening or dominating glyph as needed.', place: 'Inside your jacket' },
  { k: 'law', name: 'Protection from the law', page: 84, purpose: 'Not for gangsters: for the many legal businesses with grey edges, or that began in the informal economy.', use: 'Carry it, or keep it with the business’s papers.', place: 'Inside your jacket' },
  { k: 'compete', name: 'Defeating competition', page: 84, purpose: 'Competition is a fact of life: every promotion you win is one someone else doesn’t.', use: 'Use it on a specific rival as with the dominating glyph, or on yourself to drive off all competition.' },
  { k: 'viral', name: 'Viral marketing', page: 84, purpose: 'Buzz. Made to work in digital formats, it affects every copy of whatever it is placed on.', use: 'Mark a master copy of a product or résumé. Combine it with other glyphs to fine-tune the message. The first of the set the author used; he vouches for its speed.' },
  { k: 'intel', name: 'Intelligence gathering', page: 85, purpose: 'Goes out into the world and brings back the information you need: on an investment, on sales, or as a trade in itself.', use: 'Works best visualised and released rather than inscribed.', place: 'Inside your hat or collar' },
  { k: 'reverse', name: 'Reversing bad luck', page: 85, purpose: 'Finds the fortune inside the misfortune and flips the situation round. Lost the house? Live with your parents and blow through your debt. A crash is a sale on investments.', use: 'Use it on the situation, or carry it.', place: 'Inside your jacket' },
  { k: 'luck', name: 'Pure luck', page: 86, purpose: 'When you need the universe to smile on you: when everything must go just right, or you have no idea what to do next.', use: 'Write it in gold ink on white card and keep it over your heart.', place: 'Inside your hat or collar', warn: 'Don’t be greedy: the more you use it, the weaker it becomes for you. Keep it for special occasions.' },
];

// ---------------------------------------------------------------------------------------------
// Spirits and powers the author has worked with (Chapter 4), and his three rules.
// ---------------------------------------------------------------------------------------------
export const SPIRITS: { name: string; from: string; text: string }[] = [
  { name: 'Saint Expedite', from: 'Folk Catholic', text: 'A Roman soldier, patron of getting things done fast. Public thanks and a slice of pound cake are all he asks. Don’t ask him for the impossible, or rush what doesn’t need rushing: his energy will spill over your life unpleasantly.' },
  { name: 'Saint Homobonus', from: 'Catholic', text: 'A merchant of Cremona who believed his success was for supporting the poor. Very responsive to business deals in which you promise a small share of profit to the poor.' },
  { name: 'Saint Jude', from: 'Catholic', text: 'Patron of impossible causes and last-ditch efforts: the end of your benefits, a business near bankruptcy, a portfolio down 50% at 60.' },
  { name: 'Our Lady of the Miraculous Medal', from: 'Catholic', text: 'Mary as she appeared to St Catherine Labouré in 1830. Many turn to her novenas for work. The author’s medal, blessed in Philadelphia, has always acted in good faith.' },
  { name: 'Our Lady of Prompt Succor', from: 'New Orleans', text: 'Mary who turned the Battle of New Orleans and has been called on against hurricanes. Like Expedite, she works fast; the author has had small requests granted within the hour.' },
  { name: 'Dzambhala', from: 'Tibetan and Indian', text: 'A round-bellied wealth deity holding a mongoose that spits jewels, in five colours: yellow for plain wealth, black overcomes obstacles, white is peaceful and kind, blue works through the spirit, red works through charm and influence.' },
  { name: 'White Mahakala', from: 'Tibetan', text: 'A wrathful form of the Bodhisattva of Compassion, standing on two Ganeshas, carrying blades, wish-granting gems and a hook. He overcomes obstacles with speed and style. Best approached with an empowerment from a lama, but anyone may pray to him.' },
  { name: 'Ganesha', from: 'Hindu', text: 'Remover of obstacles, and linked to gambling. One mantra: Om Gam Ganapataye Namah.' },
  { name: 'Mahalakshmi', from: 'Hindu', text: 'Probably the foremost Hindu goddess of wealth, consort of Vishnu.' },
  { name: 'The thirty-six Yakshinis', from: 'Asian', text: 'Female guardians of treasure, easier to work with than the male Yakshas; listed with their mantras and rites in the Uddamareshvara Tantra.' },
  { name: 'Maximon', from: 'Guatemala', text: 'A Mayan underworld god joined with St Simon. Offered fine cigarettes, cigars and whiskey. Water from washing his clothes is blessed and sprinkled in shop doorways to draw customers.' },
  { name: 'High John the Conqueror', from: 'Hoodoo', text: 'A trickster who always outwits his masters. Call on him while holding a whole High John root.' },
  { name: 'The Green Devil', from: 'Folk magic', text: 'Invoked to make people who owe you money pay. Dress his candle with compelling oil and pray for him to plague your debtor until the debt is paid. It worked on a company too.' },
  { name: 'Hertha', from: 'German', text: 'An earth goddess honoured by witches for centuries. Every earth goddess is a power of wealth: the bounty and buried gold of the earth.' },
  { name: 'Habondia', from: 'European', text: 'Daughter of Hertha, sometimes the same being, goddess of abundance. A lending circle for women is named after her.' },
];
export const RULES: { title: string; text: string }[] = [
  { title: 'Depth beats quantity', text: 'Praise one being well rather than shouting a crowd of names. Even beings traditionally merged, like Thoth and Hermes, are not the same. Research, then experiment and listen, then research again.' },
  { title: 'Relationship beats association', text: 'A power you have known for years, even one not “for” wealth, may serve better than a new wealth spirit. A student devoted to Aphrodite for fifteen years asked her, and landed her first six-figure job.' },
  { title: 'Keep your sovereignty', text: 'Your life is yours to run. Weigh what spirits say as you would a person’s advice. If a god asks for an offering that would bankrupt you, rethink the relationship.' },
];

/** The book's closing hopes for the reader. */
export const TAKEAWAYS = [
  'Money is not bad or unspiritual. Bring it onto the path instead of keeping it apart.',
  'The gods, spirits and angels are not there to run your life. Support them and they support you, but you must go after what you want.',
  'Practical sorcery is a kind of life-hacking, and works best woven into ordinary life-hacks.',
  'If you want people with money to use it better, become a person with money and lead by example.',
];

/** Agrippa's magic square of Jupiter: every row, column and diagonal makes 34. */
export const JUPITER_KAMEA = [[4, 14, 15, 1], [9, 7, 6, 12], [5, 11, 10, 8], [16, 2, 3, 13]];

/** The job-hunt funnel the book walks through (Chapter 9). */
export const ODDS: { step: string; odds: string; n: number }[] = [
  { step: 'Everyone applying', odds: '1 in 80', n: 80 },
  { step: 'A résumé fitted to the advert', odds: '1 in 40', n: 40 },
  { step: 'Plus a real cover letter', odds: '1 in 16', n: 16 },
  { step: 'Plus effective sorcery', odds: '1 in 8', n: 8 },
  { step: 'Plus a thank-you card', odds: 'the one', n: 1 },
];

/** How a US credit score is made up (Chapter 8). */
export const SCORE_PARTS: { k: string; pct: number }[] = [
  { k: 'Paying on time', pct: 35 }, { k: 'Owed vs. available', pct: 30 }, { k: 'Length of history', pct: 15 },
  { k: 'Age of accounts', pct: 10 }, { k: 'Mix of credit', pct: 10 },
];
