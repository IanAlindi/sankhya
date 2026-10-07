// The nine numbers. Tables (friends, colours, gems, periods, dates) are the book's data;
// every portrait and paraphrase is written fresh for this site.
import type { N } from '../lib/num';

export interface Period { from: [number, number]; to: [number, number] }
const month = (m: number): Period => ({ from: [m, 1], to: [m, 31] });

export interface NumberInfo {
  n: N; planet: string; sanskrit: string; deva: string; glyph: string;
  qualities: string; guna: string; aspect: string; dosha: string;
  element: string; metal: string; role: string; direction: string; hour: string; season: string;
  taste: string; lesson: string; professions: string; behaviour: string;
  colors: { name: string; hex: string }[];
  gem: string; gemAlt: string; deity: string; focus: string;
  mantra: string; japa: string; restDay: string;
  goodDays: number[]; goodDates: number[]; alsoDates: number[]; datesNote?: string;
  strong: Period[]; weak: Period[]; periodNote?: string;
  friends: N[]; enemies: N[]; neutral: N[];
  business: N[]; marriage: N[]; romance: N[]; harmoniousYears: N[];
  asPsychic: string; asDestiny: string;
  psyche: { portrait: string; light: string[]; shadow: string[]; practice: string[]; note?: string };
  destiny: string; name: string; year: string[]; day: string; prompts: string[];
}

export const NUM: Record<N, NumberInfo> = {
  1: {
    n: 1, planet: 'Sun', sanskrit: 'Surya', deva: '१', glyph: '☉',
    qualities: 'kinglike, kind, royal, disciplined, authoritative, strong, original',
    guna: 'Sattva', aspect: 'Rajas', dosha: 'Pitta (bile)',
    element: 'Fire', metal: 'Gold', role: 'King', direction: 'East', hour: 'Noon', season: 'Summer',
    taste: 'Hot, spicy', lesson: 'Renunciation', behaviour: 'Assertive',
    professions: 'department heads, administrators',
    colors: [{ name: 'Orange', hex: '#E8812A' }, { name: 'Golden yellow', hex: '#E9B422' }, { name: 'Copper', hex: '#B5683A' }, { name: 'Gold', hex: '#D4A84A' }],
    gem: 'Ruby', gemAlt: 'red spinel, garnet', deity: 'Surya, the Sun', focus: 'the rising Sun, or a ruby',
    mantra: 'Aum hrim hrim suryaye namah aum', japa: '7,000 repetitions within one waxing fortnight', restDay: 'Sunday',
    goodDays: [0, 1], goodDates: [1, 19, 28], alsoDates: [4, 10, 13, 22, 31],
    strong: [{ from: [3, 21], to: [4, 28] }, { from: [7, 10], to: [8, 20] }],
    weak: [month(10), month(11), month(12)],
    friends: [2, 3, 9], enemies: [4, 6, 8], neutral: [5],
    business: [1, 4, 8, 9], marriage: [1, 2, 4, 8, 9], romance: [1, 3, 4, 6, 8], harmoniousYears: [1, 2, 4, 7],
    asPsychic: 'Hard work as a psychic number', asDestiny: 'Lucky as a destiny number',
    psyche: {
      portrait: 'A steady inner sun runs you: a fixed sense of purpose, and ideas that form quickly and then hold. You want to lead and be seen leading well, and you change course for the truth, rarely for pressure. People find you punctual, clear, generous and oddly lucky with anyone in authority. Freedom matters more to you than comfort, and interference in your work is the one thing you cannot stand.',
      light: ['Clear, decisive expression', 'Generosity with friends and guests', 'Known ideas, seen from a new angle', 'Steadiness under pressure'],
      shadow: ['Bossiness and a need for constant attention', 'Spending on show', 'Giving criticism more easily than taking it', 'Struggling alone rather than asking'],
      practice: ['Check the budget before gifts or loans', 'Slow down one quick judgment', 'Ask someone for help'],
    },
    destiny: 'As destiny, the Sun is generous. Leadership, opportunities and money tend to arrive without a chase, and you see far enough ahead to plan for them. Love and marriage are the weaker ground. October to December, when the Sun is weak, is when your judgment slips; the mistakes teach tolerance.',
    name: 'As a name, 1 is remembered for a long time. It helps writers, musicians, actors and leaders, and works hardest when destiny is also 1.',
    year: ['Problems that have dragged on for years loosen.', 'Help arrives, especially from people in authority.', 'Organised plans succeed in work and business.', 'A significant change improves how you live.', 'You meet people who matter later.', 'Good for writing, competitions, a new venture or new creative work.'],
    day: 'authority, clarity and being seen',
    prompts: ['Where did you lead today, and where did you need to be seen leading?', 'What did you decide quickly today? Would you decide it the same way again?'],
  },
  2: {
    n: 2, planet: 'Moon', sanskrit: 'Chandra', deva: '२', glyph: '☽',
    qualities: 'queenlike, royal, attractive, ever-changing, delicate',
    guna: 'Tamas', aspect: 'Sattva', dosha: 'Kapha (mucus)',
    element: 'Water', metal: 'Silver', role: 'Queen', direction: 'Southwest', hour: 'Afternoon', season: 'Summer',
    taste: 'Salty, alkaline', lesson: 'Individual stability', behaviour: 'Noncommittal',
    professions: 'diplomats, arbitrators, teachers, researchers, reformers',
    colors: [{ name: 'White', hex: '#F2F0EA' }, { name: 'Light green', hex: '#A9D6A0' }, { name: 'Cream', hex: '#EDE3C8' }, { name: 'Grape', hex: '#6F3F7A' }],
    gem: 'Pearl', gemAlt: 'moonstone, quartz, jade, white agate', deity: 'Shiva', focus: 'Shiva, or a pearl or moonstone',
    mantra: 'Aum som somaye namah', japa: '11,000 repetitions within one waxing fortnight', restDay: 'Monday',
    goodDays: [1], goodDates: [2, 11, 20, 29], alsoDates: [1, 4, 7, 10, 13, 16, 19, 22, 25], datesNote: 'The second group is strongest when it falls on a Monday.',
    strong: [{ from: [6, 20], to: [7, 27] }], weak: [month(12), month(1), month(2)],
    friends: [1, 3], enemies: [5, 4], neutral: [6, 8, 9],
    business: [2, 7, 8], marriage: [1, 2, 7, 8], romance: [2, 3, 7, 8], harmoniousYears: [1, 2, 4, 7],
    asPsychic: 'Good as a psychic number', asDestiny: 'Unsettled as a destiny number',
    psyche: {
      portrait: 'Your inner weather moves with the Moon: imaginative, tender, romantic, quick to feel and quick to change. You reflect whatever surrounds you, so the people and places you choose shape you more than most. You make peace between others with real skill and read intentions before they are spoken. You love privacy, water, scent and beauty. Hurt or humiliated, you become a surprisingly hard fighter.',
      light: ['Diplomacy and peacemaking', 'Intuition about people', 'Aesthetic refinement', 'Loyalty in friendship'],
      shadow: ['Moods that track the Moon', 'Doubt and worry', 'Saying yes to people who cost you', 'Leaving things half done when interest fades'],
      practice: ['Decide important things mid-fortnight, not at full or new moon', 'Finish one thing you started', 'Get outdoors and move'],
      note: 'The book observes that 2s often have to do a thing twice before it lands.',
    },
    destiny: 'As destiny, the Moon brings sharp rises and falls: chances slip away just as they ripen, then come round again. Home, family, gardens and water anchor you. With good company and clear understanding you can do remarkable work, and after 35 the pull toward philosophy and the inner life grows.',
    name: 'As a name, 2 brings gentleness, calm and a youthful air. It draws help from elders and suits trade, import–export and herbal work, best when it agrees with your destiny.',
    year: ['Personal magnetism rises.', 'New friends who help later.', 'Less worry, more practicality.', 'Benefit through property; possibly a new home.', 'A change in how you think.', 'Watch for needless worry and hurry.'],
    day: 'feeling, receptivity and change',
    prompts: ['Whose mood did you carry today that was not yours?', 'Where did you say yes when you meant "not yet"?'],
  },
  3: {
    n: 3, planet: 'Jupiter', sanskrit: 'Guru · Brihaspati', deva: '३', glyph: '♃',
    qualities: 'spiritual, counselling, friendly, self-centred, disciplined',
    guna: 'Rajas', aspect: 'Sattva', dosha: 'Kapha (mucus)',
    element: 'Ether', metal: 'Gold', role: 'Prime minister', direction: 'Northeast', hour: 'Dawn', season: 'Late summer',
    taste: 'Sweet', lesson: 'Selfless service', behaviour: 'Optimist, opportunist',
    professions: 'scholars, professors, bankers, scientists, executives, actors',
    colors: [{ name: 'Yellow', hex: '#F2CF3B' }, { name: 'Pink', hex: '#EBA3B8' }, { name: 'Blue', hex: '#5A86C4' }, { name: 'Light purple', hex: '#B9A3D9' }],
    gem: 'Yellow sapphire', gemAlt: 'yellow topaz', deity: 'Vishnu', focus: 'Vishnu, the preserver',
    mantra: 'Aum brim brihaspataye namah', japa: '19,000 repetitions within one waxing fortnight', restDay: 'Thursday',
    goodDays: [4, 1, 3], goodDates: [3, 12, 21, 30], alsoDates: [6, 9, 15, 18, 24, 27],
    strong: [{ from: [2, 19], to: [3, 20] }, { from: [11, 21], to: [12, 20] }], weak: [month(10), month(11)],
    periodNote: 'The book marks late November as both strong and weak.',
    friends: [1, 2, 9], enemies: [5, 6], neutral: [8, 4],
    business: [3, 5, 6, 7, 9], marriage: [3, 5, 6, 7, 9], romance: [1, 3, 6, 9], harmoniousYears: [1, 3, 6, 9],
    asPsychic: 'Good as a psychic number', asDestiny: 'Demanding as a destiny number',
    psyche: {
      portrait: 'Jupiter makes you a teacher at heart: ambitious, disciplined, optimistic and never idle. You think in big projects, would rather be your own boss, and want to leave something people remember. You keep your word, love order, and help anyone who asks, even people who once opposed you. Humour wins you friends; bluntness and a habit of ruling the household make a few critics.',
      light: ['Dependability; promises kept', 'Teaching, advising, speaking', 'Many projects at once', 'Help given without bargaining'],
      shadow: ['Overcommitting by saying yes to everything', 'Pride and exaggeration', 'Extravagance', 'Temper, and a dictatorial streak at home'],
      practice: ['Say no once today', 'Save before spending', 'Let the people at home have their freedom'],
    },
    destiny: 'As destiny, Jupiter piles on work and responsibility and you carry weight few others could. Name, fame and money come late, after the years you wanted them most, but luck pulls you out of trouble again and again. You rise from ordinary beginnings through stamina and planning, and family life supports you.',
    name: 'A good name number: humour, popularity and a readiness to help. In harmony with your other numbers it gives leadership and makes you memorable.',
    year: ['Knowledge and practical wisdom grow.', 'A year to finish old projects.', 'Gain, name and honour.', 'Clearer self-expression; speak carefully in public.', 'Good for new ventures and promotion; go slowly with contracts and lawsuits.', 'Test friends before trusting them.'],
    day: 'expansion, counsel and discipline',
    prompts: ['Who did you advise today, and what did you learn back?', 'What did you agree to today that you have no room for?'],
  },
  4: {
    n: 4, planet: 'Rahu', sanskrit: 'Rahu · north node', deva: '४', glyph: '☊',
    qualities: 'rebellious, impulsive, short-tempered, secretive',
    guna: 'Rajas', aspect: 'Rajas', dosha: 'Vata (wind)',
    element: 'Fire', metal: 'Gold', role: 'King', direction: 'Southeast', hour: 'Sunrise', season: 'Winter',
    taste: 'Hot, spicy', lesson: 'Contentment', behaviour: 'Antagonistic',
    professions: 'planners, lawyers, politicians, technicians',
    colors: [{ name: 'Smoky blue', hex: '#5D6F95' }, { name: 'Grey', hex: '#8A8F9C' }, { name: 'Khaki', hex: '#A79C70' }, { name: 'Silver sheen', hex: '#C7CBD4' }],
    gem: 'Hessonite (gomed)', gemAlt: 'carnelian', deity: 'Ganesha, remover of obstacles', focus: 'Ganesha',
    mantra: 'Aum rang rahuve namah', japa: 'two rounds of a 108-bead mala when obstacles pile up, after the Ganesha verse', restDay: 'Monday',
    goodDays: [6, 0, 1], goodDates: [4, 13, 22, 31], alsoDates: [1, 3, 5, 12, 14, 19, 21], datesNote: 'The second group counts when it falls on a Monday.',
    strong: [{ from: [3, 21], to: [4, 28] }, { from: [7, 10], to: [8, 20] }], weak: [month(10), month(11), month(12)],
    friends: [5, 6, 8], enemies: [1, 2, 9], neutral: [3],
    business: [1, 4, 6], marriage: [1, 4, 6, 8], romance: [1, 4, 6, 8], harmoniousYears: [1, 3, 6, 9],
    asPsychic: 'Good as a psychic number', asDestiny: 'Difficult as a destiny number',
    psyche: {
      portrait: 'Rahu, the Moon\'s north node, has no body of its own, only influence, and you feel it as sudden change. You side with the underdog, see the hidden side of every argument, and question rules others take for granted. You are practical and systematic, good with large plans, yet life keeps rearranging them. Trust comes slowly, secrets stay locked, and recognition tends to arrive in the second half of life.',
      light: ['Reform and fairness', 'Endurance through upheaval', 'System and method in big projects', 'Lifelong loyalty to a few'],
      shadow: ['Doubt that lets good chances pass', 'Secrecy and isolation', 'Promising and not delivering', 'Spending as fast as you earn'],
      practice: ['Doubt the doubt', 'Decide one thing quickly, on your own', 'Put something aside for later'],
    },
    destiny: 'As destiny, sudden changes interrupt the master plan. You work hard, often unthanked, and may change jobs restlessly. Unconventional choices attract quiet opposition. Patience, contentment and savings turn this into strength in the second half of life.',
    name: 'Usually not a good name number: it makes you guarded and narrows trust. A spelling that reduces to 1, 3 or 6 is the book\'s suggestion.',
    year: ['Success after difficulty.', 'Calm strength through surprises.', 'New income, steadier money.', 'A new home or venture.', 'A partner or a child may arrive.', 'Good for travel and inner work; weak for romance.'],
    day: 'disruption, reform and the unexpected',
    prompts: ['What changed suddenly today, and how did you meet it?', 'What did you keep to yourself today that wanted saying?'],
  },
  5: {
    n: 5, planet: 'Mercury', sanskrit: 'Budha', deva: '५', glyph: '☿',
    qualities: 'princely, entertaining, wily, intelligent, sensitive',
    guna: 'Rajas', aspect: 'Rajas', dosha: 'Vata (wind)',
    element: 'Earth', metal: 'Gold', role: 'Prince', direction: 'North', hour: 'Dawn', season: 'Winter',
    taste: 'Hot, spicy', lesson: 'Sobriety', behaviour: 'Playful',
    professions: 'business people, investors, bankers, brokers',
    colors: [{ name: 'Green', hex: '#3FA36B' }, { name: 'Turquoise', hex: '#3BB3B0' }, { name: 'Light brown', hex: '#B08B63' }, { name: 'Smoky grey', hex: '#8C9196' }],
    gem: 'Emerald', gemAlt: '', deity: 'Mahalakshmi', focus: 'Lakshmi, or an emerald',
    mantra: 'Aum mahalakshmaye vidmahe, vishnu priyaye dhimahi, tanno lakshmi prachodayat', japa: 'as many times as you can during meditation', restDay: 'Full moon days',
    goodDays: [3, 5], goodDates: [5, 14, 23], alsoDates: [],
    strong: [{ from: [5, 21], to: [6, 20] }, { from: [8, 21], to: [9, 20] }], weak: [month(5), month(9), month(12)],
    periodNote: 'The book marks late May and early September as both strong and weak.',
    friends: [1, 4, 6], enemies: [2], neutral: [9, 3, 8],
    business: [3, 5, 9], marriage: [3, 5, 9], romance: [3, 5, 6, 8], harmoniousYears: [1, 3, 5],
    asPsychic: 'Restless as a psychic number', asDestiny: 'Strong as a destiny number',
    psyche: {
      portrait: 'Mercury keeps you young, quick and curious. You learn constantly, grasp what people mean before they finish, and adapt to anyone: a child with children, a sage among sages. You enjoy risk, travel, wit and the hunt for new ways to make money, and money tends to appear when you need it. Friendships form fast and can break fast, especially in your weak months.',
      light: ['Quick intelligence and eloquence', 'Adaptability and charm', 'A feel for business and odds', 'Humour that lifts a room'],
      shadow: ['Hurry and restlessness', 'Nervous strain', 'Sharp words when angry', 'Short-lived friendships'],
      practice: ['Do one task without hurrying', 'Listen to the end before replying', 'Spend time with children or play'],
    },
    destiny: 'As destiny, Mercury is generous: luck through business, inheritance and calculated risk, favour from people in authority, recognition for your work, and long stretches abroad. It suits writers, lawyers, entertainers and traders. It sits badly only with psychic 2 and 7.',
    name: 'A strong name number, strongest when destiny is also 5: progressive, lively and remembered. It does not suit psychic or destiny 2 or 7, or destiny 4.',
    year: ['Success and steadier money.', 'A wider circle of friends.', 'Good for business, partnerships and travel abroad.', 'Mind what you say and what you sign.', 'Good for media, writing, competition and calculated risk.', 'A year you will remember.'],
    day: 'speed, exchange and wit',
    prompts: ['What did you rush today that deserved slowness?', 'Which conversation today changed your mind?'],
  },
  6: {
    n: 6, planet: 'Venus', sanskrit: 'Shukra', deva: '६', glyph: '♀',
    qualities: 'romantic, slow, sensual, sweet-spoken, diplomatic, manipulative',
    guna: 'Tamas', aspect: 'Rajas', dosha: 'Kapha (mucus)',
    element: 'Water', metal: 'Silver', role: 'Prime minister', direction: 'Southeast', hour: 'Afternoon', season: 'Spring',
    taste: 'Sweet', lesson: 'Discipline', behaviour: 'Seductive',
    professions: 'health care, alchemy, art criticism, journalism',
    colors: [{ name: 'White', hex: '#F4F2EE' }, { name: 'Light blue', hex: '#9CC3E6' }, { name: 'Pink', hex: '#EE9BB9' }, { name: 'Chrome yellow', hex: '#E9B21E' }],
    gem: 'Diamond', gemAlt: 'white sapphire, zircon, white tourmaline', deity: 'Kartikeya (Skanda)', focus: 'a diamond or its substitute',
    mantra: 'Aum jung hang sa bhur bhuvah swah kartike namah, swah bhuvah bhur sa hang jung aum', japa: 'eleven times a day', restDay: 'Friday',
    goodDays: [3, 5], goodDates: [6, 15, 24], alsoDates: [3, 9, 12, 18, 21, 27, 30],
    strong: [{ from: [4, 20], to: [5, 18] }, { from: [9, 21], to: [10, 19] }], weak: [month(4), month(10), month(11)],
    periodNote: 'The book calls 20–30 April and 1–19 October especially strong, though those months are also listed as weak.',
    friends: [4, 5, 8], enemies: [1, 2], neutral: [3, 9],
    business: [3, 6, 9], marriage: [3, 6, 9], romance: [1, 2, 5, 6, 8, 9], harmoniousYears: [3, 6, 9],
    asPsychic: 'Good as a psychic number', asDestiny: 'Mixed as a destiny number',
    psyche: {
      portrait: 'Venus gives you charm, taste and a gift for making a space beautiful. You are gentle and diplomatic and would rather compromise than fight. You do your best work slowly and resent being rushed or interrupted. You keep other people\'s secrets, stay close to family, and attract comfort and help, often from strangers and foreigners. The book calls 6 the most fortunate of the nine.',
      light: ['Grace, taste and hospitality', 'Diplomacy', 'Discretion', 'Care for family and parents'],
      shadow: ['Indulgence and laziness', 'Avoiding conflict until it festers', 'Trusting too fast', 'Restless, uncommitted affections'],
      practice: ['Work slowly on one thing', 'Forgive one thing instead of brooding', 'Put money aside for a hard month'],
    },
    destiny: 'As destiny, Venus brings comfort by luck and plenty of help from friends, but turbulence in love, sometimes in relationships you never fully chose. Marry early or choose with care. You stay attractive and youthful for a long time; money runs through your hands.',
    name: 'Ideal for poets, artists, musicians and dancers. It makes you warm, sociable and easily liked, and suits anyone drawn to the occult.',
    year: ['Harmony at home.', 'Good for romance and for conceiving a child.', 'Strong for design, film, music, jewellery and scent.', 'Spending on beauty and pleasure.', 'Work for the unemployed; a raise or unexpected money.'],
    day: 'beauty, pleasure and harmony',
    prompts: ['What did you make more beautiful today?', 'Where did you keep the peace by avoiding something that needed saying?'],
  },
  7: {
    n: 7, planet: 'Ketu', sanskrit: 'Ketu · south node', deva: '७', glyph: '☋',
    qualities: 'mystical, dreamlike, intuitive, inventive',
    guna: 'Tamas', aspect: 'Rajas', dosha: 'Kapha (mucus)',
    element: 'Water', metal: 'White gold', role: 'Prime minister', direction: 'Northwest', hour: 'Sunset', season: 'Late winter',
    taste: 'Bitter, hot', lesson: 'Practicality', behaviour: 'Reflective, philosophical',
    professions: 'teachers, artists, journalists, film makers',
    colors: [{ name: 'Light green', hex: '#A6D9B3' }, { name: 'Light blue', hex: '#A8CFEA' }, { name: 'White', hex: '#F3F3EF' }],
    gem: "Cat's eye", gemAlt: "a white-green or yellow cat's eye", deity: 'Narasimha, the lion form of Vishnu', focus: 'a ghee flame (tratak), or a cat\'s eye',
    mantra: 'Aum nring nring nring narasimhaye namah aum', japa: '17,000 repetitions within one waxing fortnight', restDay: 'Tuesday',
    goodDays: [0, 1, 3], goodDates: [7, 16, 25], alsoDates: [1, 10, 19, 28],
    strong: [{ from: [6, 1], to: [7, 31] }], weak: [month(1), month(2)],
    friends: [8, 6, 5], enemies: [1, 2, 9], neutral: [3],
    business: [2, 3, 6, 7], marriage: [2, 3, 6, 7], romance: [2, 3, 7, 9], harmoniousYears: [1, 2, 4, 7],
    asPsychic: 'Self-absorbed as a psychic number', asDestiny: 'Good as a destiny number',
    psyche: {
      portrait: 'Ketu, the Moon\'s south node, is a body without a head, and it loosens attachment. You are intuitive, imaginative, original and philosophical, and you tend to build your own religion out of many. You read other people easily and give old truths new wording. Early life has false starts because you underestimate yourself; things settle around 34, and success comes later. You benefit from good guidance more than most.',
      light: ['Intuition and originality', 'Philosophy and teaching', 'Ease with every kind of person', 'Making art from what others discard'],
      shadow: ['Fantasy over follow-through', 'Underrating your own talent', 'Indecision and moods', 'A drift toward intoxicants'],
      practice: ['Weigh a project before taking it on', 'Be on time', 'Look at something green before you get up'],
    },
    destiny: 'As destiny, Ketu takes on the colour of your other numbers and strengthens them. People warm to you, ideas arrive in dreams, and recognition comes through art, diplomacy, mediation or spiritual work. Intuition sharpens between 30 and 45.',
    name: 'Good beside most numbers except psychic or destiny 1 and 5. When destiny is also 7 it makes pioneers. If psychic and destiny are both 7, choose a different name number.',
    year: ['Misunderstandings and tests.', 'More work, less profit.', 'Success in disputes and legal matters.', 'Test friends; avoid pointless debate.', 'Good for healing, astrology and inner work.', 'Patience and optimism solve what force cannot.'],
    day: 'intuition, detachment and dreams',
    prompts: ['What did your intuition tell you today before the facts did?', 'What could you let go of without losing anything real?'],
  },
  8: {
    n: 8, planet: 'Saturn', sanskrit: 'Shani', deva: '८', glyph: '♄',
    qualities: 'wise, malefic, servant-like, laborious, struggling, suffering',
    guna: 'Rajas', aspect: 'Tamas', dosha: 'Vata (wind)',
    element: 'Air', metal: 'Iron', role: 'Servant', direction: 'West', hour: 'Sunset', season: 'Late winter',
    taste: 'Bitter', lesson: 'Kindness and forgiveness', behaviour: 'Sober',
    professions: 'public servants, executives',
    colors: [{ name: 'Black', hex: '#1B1B22' }, { name: 'Dark blue', hex: '#22346B' }, { name: 'Grey', hex: '#6E7180' }, { name: 'Purple', hex: '#5E3C8C' }],
    gem: 'Blue sapphire', gemAlt: 'amethyst, lapis lazuli, black pearl', deity: 'Shani, Saturn', focus: 'a blue sapphire',
    mantra: 'Aum aing hring shring shung shanaishcharaye namah aum', japa: '108 times a day', restDay: 'Saturday',
    goodDays: [6], goodDates: [8, 17, 26], alsoDates: [1, 10, 19, 28, 3, 12, 21, 30, 6, 15, 24], datesNote: 'Dates reducing to 1, 3 or 6 also serve.',
    strong: [{ from: [9, 20], to: [10, 25] }, { from: [1, 20], to: [2, 20] }],
    weak: [{ from: [1, 1], to: [1, 20] }, { from: [2, 22], to: [2, 29] }, month(12), month(3), month(4)],
    friends: [4, 5, 6], enemies: [1, 2, 9], neutral: [3],
    business: [1, 2, 8], marriage: [1, 2, 4], romance: [1, 2, 4, 5, 7], harmoniousYears: [1, 3, 6],
    asPsychic: 'Good as a psychic number', asDestiny: 'Difficult as a destiny number',
    psyche: {
      portrait: 'Saturn makes you serious, deep and determined. You accept challenges and make the impossible possible, but rarely ask for help and are often misunderstood, even by people close to you. Outwardly reserved, you are tender and fiercely loyal to the few who see in. Early life brings delays and struggle; real authority, savings and achievement tend to arrive after 35. You go to extremes, in friendship and in enmity.',
      light: ['Endurance and patience', 'Seriousness of purpose', 'Quiet service to a cause', 'Wisdom from experience'],
      shadow: ['Gloom and isolation', 'Holding grudges', 'Refusing help', 'Rebellion for its own sake'],
      practice: ['Let go of one grievance', 'Accept help once', 'Smile on purpose'],
    },
    destiny: 'As destiny, Saturn brings delays, obstacles and opposition with no clear cause, and also more endurance than any other number. The harder the conditions, the more you shine; high posts and wealth come late. Steer clear of intoxicants and legal tangles.',
    name: 'Good only beside psychic or destiny 1, 3 or 6, which soften it. With 8 as psychic, destiny and name together, the book advises changing the name toward 1, 3 or 6.',
    year: ['Good for politics, social work and heavy industry; a new venture.', 'Health needs care: less stress, cleaner food.', 'Worldly success through creative use of energy.', 'Victory over opponents and in legal matters.', 'Rely on your own judgment.'],
    day: 'duty, patience and consequence',
    prompts: ['What did you carry alone today that could have been shared?', 'What delay today might be protecting you?'],
  },
  9: {
    n: 9, planet: 'Mars', sanskrit: 'Mangala', deva: '९', glyph: '♂',
    qualities: 'warlike, strong, rough, rustic, perfectionist, doubting, fighting, discriminating',
    guna: 'Sattva', aspect: 'Tamas', dosha: 'Pitta (bile)',
    element: 'Fire', metal: 'Copper', role: 'General', direction: 'South', hour: 'Noon', season: 'Summer',
    taste: 'Bitter', lesson: 'Patience', behaviour: 'Aggressive',
    professions: 'organisers, managers',
    colors: [{ name: 'Red', hex: '#D63A2F' }, { name: 'Crimson', hex: '#A3162B' }, { name: 'Pink', hex: '#EF8FA0' }, { name: 'Coral', hex: '#EE7457' }],
    gem: 'Coral', gemAlt: 'carnelian, red jasper, red agate', deity: 'Hanuman', focus: 'Hanuman, or a piece of coral',
    mantra: 'Aum namo hanumate hung aum', japa: '108 times a day', restDay: 'Tuesday',
    goodDays: [2, 5], goodDates: [9, 18, 27], alsoDates: [3, 6, 15, 21, 24, 30],
    strong: [{ from: [3, 21], to: [4, 26] }, { from: [10, 21], to: [11, 27] }],
    weak: [{ from: [3, 1], to: [3, 10] }, { from: [5, 1], to: [5, 10] }, { from: [6, 1], to: [6, 10] }, { from: [10, 1], to: [10, 21] }, { from: [11, 27], to: [12, 27] }],
    periodNote: 'The book says only "the beginning of" March, May and June; read here as the first ten days.',
    friends: [1, 2, 3], enemies: [5, 4], neutral: [6, 8],
    business: [1, 3, 6, 9], marriage: [1, 3, 6, 9], romance: [1, 3, 7, 9], harmoniousYears: [3, 6, 9],
    asPsychic: 'Uneasy as a psychic number', asDestiny: 'Good as a destiny number',
    psyche: {
      portrait: 'Mars gives you courage, drive and a fighter\'s sportsmanship. You act fast, settle a dispute the moment it starts, and enjoy a challenge. You are a born organiser who needs real authority to give your best. Hard on the outside, soft inside, you look after the people under you. Youth brings opposition; success comes after about 40. Home is where your heat costs most.',
      light: ['Courage and energy', 'Organisation and command', 'Protecting others', 'Order and discipline'],
      shadow: ['Anger and arrogance', 'Aggression', 'Doubt and restlessness', 'Risk taken for show'],
      practice: ['Pause before answering', 'Keep humour close', 'Take extra care with fire, roads and machines'],
    },
    destiny: 'As destiny, Mars matures into spiritual strength. Hardship deepens you; you become an excellent teacher who adds lived experience to what you were taught. Art and beauty come easily. The book reads 9 as the end of a long cycle, with energy best spent on work that serves everyone.',
    name: 'Very good beside psychic or destiny 2 (strength), 3 (luck) and 7 (help from everywhere); neutral for 6; poor for 4, 8 and especially 9.',
    year: ['Completion, success and good fortune.', 'Desires fulfilled; a year to organise yourself.', 'Favour from authority; mind your words with officials.', 'Success in competition; public honour.', 'Unexpected gains.', 'Let go of doubt and perfectionism.'],
    day: 'action, courage and conflict',
    prompts: ['Where did you fight today, and was it worth it?', 'What did you start with fire today that now needs patience?'],
  },
};

/** Book, p.186: the yearly forecast summary, keyed by year number. */
export const yearText = (n: N) => NUM[n].year;

/** Short readings of the compound birth dates 10–31, after the chapter on compound numbers. */
export const COMPOUND: Record<number, string> = {
  10: "The Sun with a zero. The 1's confidence meets the zero's struggle, so success comes after a hard climb. Hidden opposition, and the alertness to see it coming. Stay awake and don't lean on others.",
  11: 'The Sun doubled under the Moon. Quick, optimistic, revolutionary and authoritative; many traditions call 11 a mystic number. Sensitive to atmospheres and fond of personal rituals. Emotional highs and lows, spells apart from a partner, and respect later in life.',
  12: 'Sun and Moon pulling opposite ways: anxiety, a yes that turns into a no, many projects begun. Personally happy, healthy and generous, and successful later. This is the exalted 3.',
  13: 'The Sun pressing on Jupiter. Irritable and fast-moving, yet practical, alert and dependable. Not unlucky in this tradition; strong for research, philosophy and the inner sciences.',
  14: 'The Sun with Rahu: risk-taking, sudden change and a habit of misjudging the future. Wise, quick and helpful, lucky with chance, but careful with partners and with storms.',
  15: 'Sun and Mercury under Venus. Wit, charm, love of luxury, art and travel. Help from the opposite sex; youthful well into later life.',
  16: 'Sun and Venus at odds, under Ketu. Idealistic outside, pleasure-loving inside. Rises and falls; drawn to healing, occult study or knowledge of the self. Take care against accidents.',
  17: 'Sun and Ketu under Saturn: struggle that turns into understanding. Peaceful, courageous and respected, with wealth later in life and a lasting mark.',
  18: 'Sun and Saturn under Mars: strong opposition and inner conflict, and the toughness to survive both. Friction in the family. Discipline and non-violence turn it toward real achievement after 40.',
  19: 'Sun and Mars, two friends, ruled by the Sun. Enthusiastic, honoured and successful. Obstinacy can strain a marriage.',
  20: 'The Moon with a zero. Patient care that goes unrewarded, delays and impatience. Inner work brings peace.',
  21: 'The Moon leading the Sun, under Jupiter. Gentle, social, a natural diplomat; patience makes the climb steady.',
  22: 'The Moon doubled under Rahu. Obstinate specialists who struggle without support and may live apart from family. Strong in politics.',
  23: 'Moon and Jupiter under Mercury: called a number of success. Intelligent, well informed, popular and helped by authority. The exalted 5.',
  24: 'Moon and Rahu under Venus: a lucky 6. Frequent change, persistence and discretion; help from the opposite sex. The exalted 6.',
  25: 'Moon and Mercury under Ketu. Early struggle, then a dreamy, philosophical, artistic mind that settles later; gains through marriage. The exalted 7.',
  26: 'Moon and Venus under Saturn. Early hardship, and attraction that brings trouble; choose a partner carefully. Top positions come later. The exalted 8.',
  27: 'Moon and Ketu under Mars. Initiative and seemingly endless energy; once independent, every plan works. The exalted 9.',
  28: 'Moon and Saturn under the Sun: struggle first, then success. Gentler and better supported than other 1s; a champion of the downtrodden. The exalted 1.',
  29: 'Moon and Mars, ruled by the Moon. Success at work, insecurity at home. Choose partners consciously and marry early. The exalted 2.',
  30: 'Jupiter with a zero. A thinker who builds a philosophy of their own; projects scatter. Thrives inside institutions that use their creativity.',
  31: 'Jupiter and the Sun under Rahu. Misunderstood, secretive and rebellious, at home in the opposition; leadership after struggle. The exalted 4.',
};

/** "Summary of Interaction Between Numbers" (p.180). Row: your number. Column: theirs. */
export const INTERACTION: Record<N, Record<N, string>> = {
  1: { 1: 'Not an ideal friend', 2: 'Envious and powerless, but friendly; removes bad habits', 3: 'Friendly, helpful', 4: 'Produces obstacles', 5: 'Friendly but independent', 6: 'An expensive friend', 7: 'A friend, and lucky', 8: 'Opposition', 9: 'Friendly, supportive' },
  2: { 1: 'Critical but helpful', 2: 'Well-wisher, cooperative', 3: 'Neutral; a good adviser', 4: 'Friendly and helpful; sometimes irritating and delaying', 5: 'Problematic', 6: 'Favourable, mutually beneficial', 7: 'Resentful and partly critical; a good guide, and your exact opposite', 8: 'Good companion: friendly, serving and caring', 9: 'Good helper, friend and protector' },
  3: { 1: 'Friendly, helpful, supportive', 2: 'Not harmful but draining; consumes energy', 3: 'Calming, cooperative, mutually beneficial', 4: 'Strong opposition; not beneficial', 5: 'Creates problems and wastes energy, but teaches business', 6: 'Helpful, friendly, attractive and satisfying', 7: 'Neutral, neglectful and independent', 8: 'Little help unless a relative or student', 9: 'Full support, mutually beneficial' },
  4: { 1: 'Critical but attractive, and beneficial', 2: 'Not auspicious, but lucky in business', 3: 'Neutral but helpful; a sympathetic adviser', 4: 'Helpful and always ready to support', 5: 'Close friend and helper, a little childish', 6: 'Neglectful: no loss, no gain; harmonious but keep business apart', 7: 'Cool in friendship but harmonious in business and marriage', 8: 'Friendly, attractive, supportive', 9: 'Opposition and argument that teaches practicality' },
  5: { 1: 'Friendly; good socially and politically', 2: 'Inconvenient, attractive and funny; best kept short', 3: 'Critical but enjoyable; brings opportunity and growth', 4: 'Neglectful; an ordinary friendship', 5: 'Your closest friend', 6: 'Quieting and friendly; helps you past your shortcomings', 7: 'Neutral', 8: 'Lucky for you, but cold and neglectful', 9: 'Critical but friendly; helps you grow' },
  6: { 1: 'A good friend, but expensive; a good influence', 2: 'Friendly, not very beneficial', 3: 'Helper and friend; brings security and a good setting', 4: 'Not harmonious', 5: 'Well-wisher, friendly, supportive', 6: 'Friendly, cooperative, quieting', 7: 'Beneficial and inspiring, though not close', 8: 'Behaves like a stranger; an ordinary friend', 9: 'Hard-working, loving and caring, at times strange' },
  7: { 1: 'Ideal friend in politics, culture and letters; good in business', 2: 'Critical and opposing, but helps you grow', 3: 'A strong supporter who helps you grow', 4: 'Strong-headed; creates obstacles', 5: 'A strange relationship; ordinary friendship', 6: 'Good, friendly, beneficial and lucky', 7: 'Opposition: troublesome and argumentative', 8: 'Helpful with money, neutral in friendship', 9: 'Beneficial and inspiring, never quite satisfied' },
  8: { 1: 'Problematic and obstructive, yet brings luck', 2: 'Favourable and friendly, not much practical help', 3: 'Neutral; good as adviser or teacher, helpful in public life', 4: 'Quieting, fulfilling, sympathetic', 5: 'Friendly in public life', 6: 'Good friend: helpful, inspiring, caring', 7: 'A teacher, comfortable and lucky; a good friend', 8: 'Gives strength; cooperative but critical', 9: 'Good advice that helps you grow; grudging when opposed' },
  9: { 1: 'Long-lasting friend who shields you from enemies and criticism', 2: 'Mutual friends, beneficial when you cooperate', 3: 'Helper and friend; inspiring and centring, gives inner strength', 4: 'Strong opponent; cooperates only in social causes', 5: 'Helpful and favourable, less warm', 6: 'Excellent friend; full support, guards your interests', 7: 'Merges into you: helper, friend, lucky', 8: 'Opposition; good as a student', 9: 'Friendly but critical and argumentative' },
};

export type Relation = 'same' | 'friend' | 'enemy' | 'neutral';
export function relation(a: N, b: N): Relation {
  if (a === b) return 'same';
  if (NUM[a].friends.includes(b)) return 'friend';
  if (NUM[a].enemies.includes(b)) return 'enemy';
  return 'neutral';
}
/** Book, p.6: friendly numbers relax each other into stillness; enemy numbers make each other
 *  alert and active, so they are the real friends of growth. */
export const RELATION_LABEL: Record<Relation, { short: string; long: string }> = {
  same: { short: 'Same frequency', long: 'Easy recognition, little challenge' },
  friend: { short: 'Ease', long: 'Relaxing; can stall progress' },
  enemy: { short: 'Friction', long: 'Activating; the book calls this growth' },
  neutral: { short: 'Neutral', long: 'Neither support nor resistance' },
};

export function inPeriod(p: Period, m: number, d: number) {
  const v = m * 100 + d, a = p.from[0] * 100 + p.from[1], b = p.to[0] * 100 + p.to[1];
  return a <= b ? v >= a && v <= b : v >= a || v <= b;
}
export type PeriodState = 'strong' | 'weak' | 'mixed' | 'neutral';
export function periodState(n: N, m: number, d: number): PeriodState {
  const s = NUM[n].strong.some((p) => inPeriod(p, m, d));
  const w = NUM[n].weak.some((p) => inPeriod(p, m, d));
  return s && w ? 'mixed' : s ? 'strong' : w ? 'weak' : 'neutral';
}

export const WEEKDAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const MONTH = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const fmtPeriod = (p: Period) =>
  p.from[1] === 1 && p.to[1] === 31 && p.from[0] === p.to[0]
    ? MONTH[p.from[0] - 1]
    : `${p.from[1]} ${MONTH[p.from[0] - 1].slice(0, 3)} – ${Math.min(p.to[1], 31)} ${MONTH[p.to[0] - 1].slice(0, 3)}`;

/** Triads the book names: 3·6·9 compatible; 3·5·7 and 2·5·7 incompatible. */
export function triad(nums: N[]) {
  const s = new Set(nums);
  if ([3, 6, 9].every((x) => s.has(x as N))) return 'harmonious' as const;
  if ([3, 5, 7].every((x) => s.has(x as N)) || [2, 5, 7].every((x) => s.has(x as N))) return 'discordant' as const;
  return null;
}
