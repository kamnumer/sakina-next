export const band = (h) => (h < 4 ? 'Delta' : h < 8 ? 'Theta' : h < 13 ? 'Alpha' : h < 30 ? 'Beta' : 'Gamma')

// Pattern layer: t=type n=count r=radius j=skip p=points z=size v=orbit speed s=self spin b=breath amount c=colour a=alpha
export const MOODS = [
  { n: 'Crypto trading: calm & cool', feat: true, b: 10, c: 432, s: [['Al-Falaq', 'الفلق', 113], ['An-Nas', 'الناس', 114]], d: 'Settles racing thoughts and keeps you steady before decisions.', w: 'Two short surahs of seeking refuge, from envy, whispers and anxious thoughts.',
    pat: { d: '8-pointed star · one slow rotation', L: [{ t: 'ring', r: 1, b: .06 }, { t: 'poly', n: 8, j: 3, r: .85, v: .05, b: .06 }, { t: 'star', n: 8, r: .62, z: .2, p: 8, v: .05, s: -.12, c: 1, b: .1 }, { t: 'poly', n: 8, j: 2, r: .4, v: -.05, c: 1 }, { t: 'star', n: 1, r: 0, z: .16, p: 8, s: .1 }] } },
  { n: 'Mind reset', b: 10, c: 432, s: [['Ar-Rahman', 'الرحمن', 55]], d: 'Clears mental noise and brings relaxed, alert calm.', w: 'Its refrain, “Which of your Lord’s favours will you deny?”, comes 31 times.',
    pat: { d: '12-fold rosette · rings counter-rotate', L: [{ t: 'poly', n: 12, j: 5, r: .95, v: .04 }, { t: 'poly', n: 12, j: 5, r: .72, v: -.06, c: 1 }, { t: 'star', n: 12, r: .95, z: .07, p: 6, v: .04, s: .1 }, { t: 'star', n: 12, r: .72, z: .07, p: 6, v: -.06, c: 1, s: -.1 }, { t: 'ring', r: .45, b: .1 }, { t: 'star', n: 1, r: 0, z: .2, p: 12, s: .05 }] } },
  { n: 'Focus & study', b: 40, c: 432, s: [['Al-ʿAlaq', 'العلق', 96]], d: 'For deep work and learning.', w: 'Opens with “Read”, among the first verses revealed.',
    pat: { d: 'Hexagonal lattice · steady, minimal motion', L: [{ t: 'poly', n: 6, j: 1, r: .98, v: .01 }, { t: 'poly', n: 6, j: 2, r: .98, v: .01, c: 1 }, { t: 'dot', n: 6, r: .33, z: .022, v: .01 }, { t: 'dot', n: 12, r: .66, z: .022, v: .01 }, { t: 'dot', n: 18, r: .98, z: .022, v: .01 }, { t: 'ring', r: .33, a: .35 }, { t: 'ring', r: .66, a: .35 }, { t: 'star', n: 1, r: 0, z: .14, p: 6, s: .015 }] } },
  { n: 'Love & connection', b: 7.83, c: 528, s: [['Ar-Rum', 'الروم', 30]], d: 'Softens the heart before time with people.', w: 'Verse 21 speaks of love and mercy placed between spouses.',
    pat: { d: 'Petal rosette · blooms outward and back', L: [{ t: 'petal', n: 12, r: .5, z: .38, b: .3, v: .02 }, { t: 'petal', n: 8, r: .8, z: .3, b: .25, v: -.02, c: 1 }, { t: 'ring', r: .95, b: .2 }, { t: 'star', n: 1, r: 0, z: .14, p: 8, b: .4, s: .06 }] } },
  { n: 'Jealousy (hasad)', b: 6, c: 432, s: [['Al-Falaq', 'الفلق', 113]], d: 'Eases envy and resentment.', w: 'Seeks refuge from the envier.',
    pat: { d: 'Dawn rays · slow counter-turning sunburst', L: [{ t: 'rays', n: 24, r: 1, z: .3, v: .03 }, { t: 'rays', n: 24, r: .8, z: .3, v: -.04, c: 1, a: .4 }, { t: 'ring', r: .3 }, { t: 'star', n: 8, r: .3, z: .1, p: 8, v: .03, s: .05 }] } },
  { n: 'Backbiting (gheebah)', b: 10, c: 432, s: [['Al-Hujurat', 'الحجرات', 49]], d: 'A reminder to guard the tongue.', w: 'Verse 12 addresses backbiting directly.',
    pat: { d: 'Interlocking circles · guarded and balanced', L: [{ t: 'circ', n: 6, r: .4, z: .4, v: .03 }, { t: 'circ', n: 6, r: .4, z: .4, v: -.03, c: 1, a: .4 }, { t: 'ring', r: .4 }, { t: 'ring', r: .98, b: .05 }] } },
  { n: 'Anxiety & calm', b: 6, c: 432, s: [['Ash-Sharh', 'الشرح', 94]], d: 'Slows the body down when worry is loud.', w: '“With hardship comes ease”, repeated in verses 5 and 6.',
    pat: { d: 'Expanding ripples · settle with the breath', L: [{ t: 'ripple', n: 5, r: 1, v: .06 }, { t: 'ring', r: .15, b: .3, c: 1 }, { t: 'star', n: 1, r: 0, z: .1, p: 8, s: .04 }] } },
  { n: 'Deep sleep', b: 2, c: 432, s: [['Al-Mulk', 'الملك', 67]], d: 'A wind-down for the night.', w: 'Traditionally recited before sleep.',
    pat: { d: 'Slow ripples · dims as you drift off', fade: 1, L: [{ t: 'ripple', n: 4, r: 1, v: .03, c: 1 }, { t: 'ring', r: .12, b: .2 }, { t: 'dot', n: 12, r: .7, z: .014, v: .01 }] } },
  { n: 'Healing & shifa', b: 7.83, c: 432, s: [['Al-Fatiha', 'الفاتحة', 1]], d: 'A gentle, hopeful reset.', w: 'Often recited for ruqyah.',
    pat: { d: 'Star within petals · soft pulse', L: [{ t: 'petal', n: 8, r: .5, z: .3, v: .03, b: .2 }, { t: 'star', n: 8, r: .85, z: .12, p: 8, v: -.03, b: .1, c: 1, s: .08 }, { t: 'poly', n: 8, j: 3, r: .85, v: -.03, c: 1, a: .35 }, { t: 'star', n: 1, r: 0, z: .2, p: 8, b: .3, s: .05 }] } },
  { n: 'Dhikr & meditation', b: 4, c: 432, s: [['Al-Muzzammil', 'المزمل', 73]], d: 'Slow, steady remembrance.', w: 'About night worship and measured recitation.',
    pat: { d: 'Orbiting stars · each spins on its own axis', L: [{ t: 'ring', r: .8, a: .3 }, { t: 'star', n: 5, r: .8, z: .13, p: 8, v: .12, s: .3 }, { t: 'star', n: 3, r: .4, z: .1, p: 6, v: -.18, s: -.3, c: 1 }, { t: 'ring', r: .4, a: .3 }, { t: 'star', n: 1, r: 0, z: .12, p: 8, s: .1 }] } },
  { n: 'Motivation & energy', b: 18, c: 432, s: [['Ad-Duha', 'الضحى', 93]], d: 'A lift when you feel flat.', w: 'Reassurance: your Lord has not abandoned you.',
    pat: { d: 'Sunburst · faster turn, rising bloom', L: [{ t: 'rays', n: 32, r: 1, z: .25, v: .12, b: .15 }, { t: 'star', n: 16, r: .7, z: .08, p: 4, v: -.1, s: .3, c: 1, b: .2 }, { t: 'star', n: 8, r: .4, z: .1, p: 8, v: .1, b: .2 }, { t: 'star', n: 1, r: 0, z: .2, p: 16, s: .15 }] } },
]
