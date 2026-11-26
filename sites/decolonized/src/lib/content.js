import { C } from "./tokens.js";

/**
 * CONTENT
 *
 * Add more places here — the UI scales automatically.
 * `x` / `y` are percentages on the map band (0–100).
 *
 * EDITORIAL RULES — please keep these:
 *
 *  1. Lead with what people BUILT. Every place opens with what they made,
 *     not what was done to them. Nobody here is only a victim.
 *
 *  2. Name who did what. Active voice, real names, no exceptions.
 *     "A Spanish priest burned the books" — not "the books were lost."
 *     Passive voice is how you hide a person who is still standing there.
 *
 *  3. No false "we". A sentence like "we still argue about the pyramids"
 *     quietly seats these kids next to the people who spent a century
 *     insisting Africans could not have built them. Say who argued.
 *     "We" in this house means us — this family — and nobody else.
 *
 *  4. Pair every erasure with whoever saved it, wherever that is true.
 *     The Timbuktu librarians. The families with the buried trunks.
 *     These kids need ancestors who fought back and won, not a list of
 *     losses. That is the whole point.
 *
 *  5. No atrocity content — this rule has not changed. Naming the man who
 *     burned a library is not the same as describing violence to a child.
 *     These are 6- and 8-year-olds. Hard history is for later, in person,
 *     from their dad.
 *
 *  6. If a claim is contested among historians, say so or leave it out.
 *     Accuracy beats a good story. Every card here is checkable.
 *
 *  7. Short sentences. Concrete nouns. No abstractions like "influence"
 *     or "legacy" — say what the thing actually was.
 *
 * Fields:
 *   built        — what they made. Always leads.
 *   erased       — who took it, hid it, or took credit. Name them.
 *                  Include who saved it when someone did. Optional.
 *   stillUnknown — genuine open questions. Not erasure. Optional.
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
    erased:
      "In the 1850s two British railway engineers, John and William Brunton, needed gravel for the train line from Lahore to Multan. They took the baked bricks from the city at Harappa and crushed them for the track bed. They ran their railway on a 4,000-year-old city and did not stop to find out what it was.",
    stillUnknown:
      "Nobody can read Indus writing. There are thousands of little stamped seals and no one alive knows what they say. Whoever cracks it will be reading your ancestors' own words.",
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
        thing: "The oldest writing anyone has found",
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
    erased:
      "In the 1840s and 1850s European diggers shipped tens of thousands of clay tablets and carved stone panels out of Iraq to museums in London and Paris. Much of it is still there. Iraq has been asking for it back for a long time.",
    stillUnknown:
      "The Epic of Gilgamesh is the oldest long story anyone has found. Pieces of it are still missing, and archaeologists keep finding new fragments.",
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
    erased:
      "For more than a century, European writers insisted that Africans could not have built the pyramids, and went looking for somebody else to credit. They were wrong. Egyptians built them, and left records of how the crews were organized, fed, and paid. Meanwhile the Rosetta Stone sits in London and the bust of Nefertiti sits in Berlin. Egypt has asked for both back.",
    stillUnknown:
      "Archaeologists still argue about the exact method — ramps, levers, and a very large number of very organized people. The details are not settled.",
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
      {
        thing: "Two thousand years of sky records",
        why: "Chinese astronomers wrote down exploding stars and comets, year after year, for twenty centuries. Astronomers today still open those records to check what the sky was doing.",
      },
    ],
    erased:
      "In 1860 British and French soldiers burned the Old Summer Palace in Beijing and carried off what was inside. Some of those objects sit in European museums today, on display, with small cards next to them.",
    stillUnknown:
      "Nobody is sure exactly when Chinese sailors first took a compass out to sea. The clearest early description is from around 1040 CE. It may be older.",
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
        why: "The word algebra comes from the title of al-Khwarizmi's book. The word algorithm comes from his name — the thing every computer runs on.",
      },
      {
        thing: "The number zero, carried across the world",
        why: "Zero as a real number came from India. Muslim mathematicians used it and passed it on. Europeans called the digits Arabic numerals because Arabs are who they learned them from. The numbers you write are that system.",
      },
      {
        thing: "A medical encyclopedia used for 600 years",
        why: "Ibn Sina wrote the Canon of Medicine around 1025. European universities were still teaching from it in the 1600s.",
      },
    ],
    erased:
      "European scholars renamed these men — Ibn Sina became Avicenna, al-Khwarizmi became Algoritmi — and then many later history books skipped straight from Greece to Europe as if the centuries in between were empty. Students used these men's books for hundreds of years without being told whose books they were. Look at where your own name would sit in that story.",
    stillUnknown:
      "Nobody knows how many books the House of Wisdom held, or what happened to all of them. What is certain is that some Greek books survive only because scholars in Baghdad copied them into Arabic. The Greek originals are gone.",
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
    erased:
      "French colonial officials carried manuscripts off to Paris. The families of Timbuktu hid the rest — in trunks, in cellars, buried out in the desert — and passed them down in secret for generations. Then in 2012 armed men took the city. A librarian named Abdel Kader Haidara and a crew of ordinary people moved roughly 350,000 manuscripts out in footlockers, on donkey carts, down the river in canoes, past checkpoints. Almost every one of them survived. They saved their own history themselves. Nobody rescued them.",
    stillUnknown:
      "Many of those manuscripts still have not been read. Researchers are working through them now, page by page.",
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
    erased:
      "In 1562, in the town of Maní, a Spanish priest named Diego de Landa collected the Maya books and burned them. Four survived. He wrote down that he had done it, in his own hand, and the page is still readable. Then people spent over a hundred years learning to read Maya writing again — and today it can be read. Maya people are still here, millions of them, still speaking Maya languages.",
    stillUnknown:
      "There are Maya cities still standing under the forest. Archaeologists find more of them every few years by firing lasers down from airplanes.",
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
    erased:
      "The Greeks themselves said plainly that they had studied in Egypt and Babylon. They wrote it down. Later European textbook writers dropped that part and told the story as though Greece invented thinking. That version is still sitting in a lot of schoolbooks right now. When someone tells you civilization started in Greece, they are repeating an edit, not a fact.",
    stillUnknown:
      "Historians are still working out how much Greek mathematics came from Egypt and Babylon, and how much was genuinely new.",
  },
];

export const CONNECTIONS = [
  {
    q: "You write the number 7. Where did that come from?",
    a: "India, then Baghdad, then everywhere",
    detail:
      "The digits were developed in India. Mathematicians in the Muslim world used them and carried them west. Europeans called them Arabic numerals because Arabs are who they got them from.",
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
