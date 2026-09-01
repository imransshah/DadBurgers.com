import { C } from "./tokens.js";

/**
 * CONTENT
 *
 * Add more places here — the UI scales automatically.
 * `x` / `y` are percentages on the map band (0–100).
 *
 * EDITORIAL RULES — please keep these:
 *  1. Every civilization gets credited for what it BUILT. This is a
 *     contribution map, not a grievance leaderboard.
 *  2. No atrocity content. These are 6- and 8-year-olds. Hard history
 *     is for later, in person, from their dad.
 *  3. If a claim is contested among historians, say so or leave it out.
 *     Accuracy beats a good story. Every card here is checkable.
 *  4. Short sentences. Concrete nouns. No abstractions like
 *     "influence" or "legacy" — say what the thing actually was.
 */

export const PLACES = [
  {
    id: "indus",
    name: "The Indus Valley",
    where: "Pakistan & northwest India",
    when: "about 4,600 years ago",
    x: 63,
    y: 44,
    color: C.marigold,
    hook: "Your great-great-great (x200) grandparents' cities.",
    built: [
      {
        thing: "Toilets and drains in almost every house",
        why: "Cities like Mohenjo-daro had covered sewers running under the streets. Most cities in the world would not have that again for thousands of years.",
      },
      {
        thing: "Cities built on a grid",
        why: "The streets crossed in neat squares, like graph paper. Someone planned the whole city before anyone built a single house.",
      },
      {
        thing: "Rulers that measured the same everywhere",
        why: "Bricks from cities hundreds of miles apart are the same size. They agreed on units of measurement across a huge area.",
      },
    ],
    stillUnknown:
      "Nobody has been able to read Indus writing yet. We have thousands of little stamped seals and no one alive knows what they say.",
  },
  {
    id: "mesopotamia",
    name: "Mesopotamia",
    where: "Iraq & Syria",
    when: "about 5,200 years ago",
    x: 55,
    y: 42,
    color: C.rose,
    hook: "The people who invented writing things down.",
    built: [
      {
        thing: "The first writing we know of",
        why: "They pressed a reed into wet clay to make wedge shapes. It is called cuneiform. The first things they wrote were receipts — lists of grain and sheep.",
      },
      {
        thing: "The wheel used for carts",
        why: "Potters had spinning wheels first. Putting wheels under a heavy load was the big leap.",
      },
      {
        thing: "The 60-minute hour",
        why: "They counted in sixties. That is why an hour has 60 minutes and a circle has 360 degrees — you are using their math every single day.",
      },
    ],
    stillUnknown:
      "The Epic of Gilgamesh is the oldest long story we have. Pieces of it are still missing, and archaeologists keep finding new fragments.",
  },
  {
    id: "kemet",
    name: "Kemet (Ancient Egypt)",
    where: "Egypt",
    when: "about 5,000 years ago",
    x: 52,
    y: 48,
    color: C.jade,
    hook: "An African civilization that lasted 3,000 years.",
    built: [
      {
        thing: "Paper you could roll up",
        why: "Papyrus was made from a river reed. It was light and you could carry a whole library. Clay tablets were heavy.",
      },
      {
        thing: "A 365-day calendar",
        why: "They watched the star Sirius and the Nile flood to work out the length of a year. They were only about six hours off.",
      },
      {
        thing: "Written medicine",
        why: "The Edwin Smith Papyrus describes 48 injuries — what the wound looks like, what to do, and whether the doctor can help. It is honest about the cases they could not fix.",
      },
    ],
    stillUnknown:
      "We still argue about exactly how the pyramids were built. Ramps, levers, and a very large number of very organized people — but the details are not settled.",
  },
  {
    id: "china",
    name: "Ancient China",
    where: "China",
    when: "about 3,500 years ago",
    x: 76,
    y: 42,
    color: C.marigold,
    hook: "Paper, printing, compasses, gunpowder.",
    built: [
      {
        thing: "Paper made from pulp",
        why: "Cai Lun improved it around 105 CE using bark, rags, and old fishing nets. It reached Europe about a thousand years later.",
      },
      {
        thing: "The magnetic compass",
        why: "First used for arranging buildings, then for sailing. Suddenly ships could cross open water without watching the coast.",
      },
      {
        thing: "A plant that still cures malaria",
        why: "Sweet wormwood was used for fevers for around 1,600 years. In 2015 a scientist named Tu Youyou won a Nobel Prize for pulling the medicine out of it — after reading a 1,600-year-old Chinese text.",
      },
    ],
    stillUnknown:
      "Chinese astronomers wrote down exploding stars and comets for two thousand years. Astronomers today still use those records.",
  },
  {
    id: "baghdad",
    name: "Baghdad & the House of Wisdom",
    where: "Iraq",
    when: "about 1,200 years ago",
    x: 56,
    y: 41,
    color: C.jade,
    hook: "Where the world's books were gathered and translated.",
    built: [
      {
        thing: "Algebra",
        why: "Al-Khwarizmi wrote the book that gives us the word algebra. We also get the word algorithm from his name — the thing every computer runs on.",
      },
      {
        thing: "The number zero, carried across the world",
        why: "Zero as a real number came from India. Muslim mathematicians used it and passed it on, which is why we call them Arabic numerals. The digits you write are this system.",
      },
      {
        thing: "A medical encyclopedia used for 600 years",
        why: "Ibn Sina wrote the Canon of Medicine around 1025. European universities were still teaching from it in the 1600s.",
      },
    ],
    stillUnknown:
      "Scholars translated Greek, Persian, Indian, and Syriac books into Arabic. Some of those Greek books only survive because of those Arabic copies — the originals are gone.",
  },
  {
    id: "mali",
    name: "Mali & Timbuktu",
    where: "West Africa",
    when: "about 700 years ago",
    x: 45,
    y: 55,
    color: C.rose,
    hook: "A university city in the middle of the Sahara.",
    built: [
      {
        thing: "Libraries full of handwritten books",
        why: "Timbuktu families kept manuscripts on law, astronomy, medicine, and poetry. Tens of thousands survive today and are still being catalogued.",
      },
      {
        thing: "Mud-brick buildings that get repaired every year",
        why: "The Great Mosque of Djenné is the largest mud-brick building on earth. The whole town replasters it together each year.",
      },
      {
        thing: "Gold that changed other economies",
        why: "When Mansa Musa traveled through Cairo in 1324 he spent so much gold that historians at the time wrote about prices there dropping.",
      },
    ],
    stillUnknown:
      "Many Timbuktu manuscripts are still unread. Families hid them for generations to keep them safe, and researchers are still going through them.",
  },
  {
    id: "maya",
    name: "The Maya",
    where: "Mexico & Central America",
    when: "about 2,000 years ago",
    x: 20,
    y: 52,
    color: C.marigold,
    hook: "Astronomers who tracked Venus for centuries.",
    built: [
      {
        thing: "Their own writing system",
        why: "Full writing — not pictures, but a real script with sounds and words. Only a handful of societies in history invented writing from scratch. The Maya were one.",
      },
      {
        thing: "Zero, invented separately",
        why: "The Maya had a symbol for zero without ever meeting anyone from India or Baghdad. Two sides of the planet, same idea.",
      },
      {
        thing: "Calendars that ran for thousands of years",
        why: "They tracked the movements of Venus so carefully that their predictions stay accurate over centuries.",
      },
    ],
    stillUnknown:
      "Spanish colonizers burned most Maya books. Four survive. Almost everything else we know comes from carvings on stone.",
  },
  {
    id: "greece",
    name: "Greece",
    where: "Greece",
    when: "about 2,500 years ago",
    x: 50,
    y: 40,
    color: C.jade,
    hook: "Great thinkers — who learned from their neighbors.",
    built: [
      {
        thing: "Writing arguments down step by step",
        why: "Greek thinkers wrote out their reasoning so other people could check it and disagree. That habit is a big deal.",
      },
      {
        thing: "An alphabet with vowels",
        why: "They took the Phoenician alphabet and added vowel letters. Phoenicians were from what is now Lebanon.",
      },
      {
        thing: "Geometry organized into one book",
        why: "Euclid gathered geometry — much of it already known in Egypt and Babylon — into an order that built up piece by piece.",
      },
    ],
    stillUnknown:
      "Greek writers said openly that they studied in Egypt and Babylon. Later European textbooks quietly dropped that part. Greece was one link in a chain, not the start of it.",
  },
];

export const CONNECTIONS = [
  {
    q: "You write the number 7. Where did that come from?",
    a: "India, then Baghdad, then everywhere",
    detail:
      "The digits were developed in India. Mathematicians in the Muslim world used and spread them. Europeans called them Arabic numerals because that is who they got them from.",
  },
  {
    q: "You look at a clock. Sixty minutes. Why sixty?",
    a: "Mesopotamia, about 4,000 years ago",
    detail:
      "They counted in sixties instead of tens. Nobody has ever bothered to change it.",
  },
  {
    q: "You read a book made of paper. Who worked that out?",
    a: "China",
    detail:
      "Pulped-fiber paper was refined in China around 105 CE. It took roughly a thousand years to reach Europe.",
  },
  {
    q: "Someone takes malaria medicine today. Where is it from?",
    a: "A Chinese medical text from the 300s",
    detail:
      "Sweet wormwood. Tu Youyou found the treatment in an old text and won the Nobel Prize for medicine in 2015.",
  },
  {
    q: "A ship crosses an ocean out of sight of land. What made that possible?",
    a: "The compass, from China",
    detail:
      "Before the compass, most sailors stayed close enough to shore to see it.",
  },
];
