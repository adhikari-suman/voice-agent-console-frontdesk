# Design 8: Pencil & Yolk

**Pitch:** Kiku writes in pencil and people speak in yolk. Every call reads as a duet: Kiku's lines sit on the left, the people's lines sit on the right, and the recording runs down the spine between them.

## Palette
| Role | Hex |
|---|---|
| Graphite (ink, primary buttons, Kiku's marks) | `#1B1C1E` |
| Pencil (Kiku's voice, cards and eggs) | `#3D4148`, soft `#E6E7E9` |
| Paper (canvas, a neutral grey) | `#EEEFEC` |
| Surface | `#FFFFFF` |
| Yolk (a person on the line: specialist, take over, escalation) | `#FFC21A` |
| Highlighter (words a person improvised) | `#FFDC5C`, soft `#FFF2C4`, text `#6B4800` |
| Completed green | `#2B7A4B` |
| Failed red | `#B3261E` |

Kiku is deliberately colourless: it writes in pencil. The only warm colour belongs to people. Yolk marks the specialist, the Take over button, escalations and the active nav item, so wherever you see yellow, a person is involved.

## Fonts
- **Anybody** (variable width) at two extremes. Headings and the wordmark are set wide (118–145%) and heavy. Times, phone numbers, IDs and figures are set condensed (72–80%) with tabular numerals.
- **Atkinson Hyperlegible** for body text. It is built for legibility, which suits staff reading transcripts under pressure, and fits the accessibility request at the heart of the audit call.

## Layout
- **Navigation** is a slim 92px white icon rail. Each item has an icon over a label, and the active item sits inside a yolk egg. The rail holds only the wordmark, the hotel, navigation groups separated by short rules, and the signed-in person. The hotel line, live count and clock sit on the right of each page header.
- **The audit and the live screens are duets**, not stacked transcripts. A three-column grid puts Kiku on the left, a spine in the middle and people on the right. The spine is the recording's timeline, with timestamps and an egg node for each line. It is pencil grey while Kiku is handling the call and turns yolk from the moment a specialist takes over.
- On the audit, a white **dossier** column on the left holds the guest, the facts, the karaoke summary and the outcome. The duet fills the rest of the page, under a pill-shaped player whose bar marks the escalation, the takeover and each karaoke line.
- **Eggs** are the recurring shape. They mark every person and speaker, the active nav item, the match meters, the timeline ticks, the call-window day chips and the sign-in graphic.
- Statuses pair a shape with a label: a circle with a check for Completed, a half-filled ring for In progress, a yolk triangle with "!" for Escalated, and a square with an × for Failed. User statuses work the same way: a filled dot for Active, a dashed ring for Invited, and a slashed ring for Deactivated.

## Karaoke visualisation: the duet
Each karaoke turn is one row across the spine:
- **Left, "Kiku wrote":** a dashed pencil card showing the script. Words the specialist dropped are struck through in graphite. A small yolk caret marks each spot where the specialist added words of their own.
- **Right, "Tomasz said":** a yolk-outlined card showing what the guest heard. Improvised words are marked with a yellow highlighter. Words that match the script stay plain, so you can read both cards side by side.
- **Spine:** the timestamp and a match egg. The egg fills with graphite up to the share of Kiku's words that were kept, and the rest shows as yolk.
- **Spoken as written:** the one line that matched exactly has no left and right cards. It becomes a single card that crosses the spine with a solid graphite outline.

The karaoke summary in the dossier reads as a sentence ("7 lines. 1 spoken as written, 6 improvised."), followed by a row of seven match eggs. The as-written egg has a graphite outline around it.

On the live takeover screen the page becomes a split-screen duet. A grey "Kiku is muted" header sits on the left, a yolk "You're on the line with Margaret Doyle" header sits on the right, and a pulsing graphite mic egg sits on the spine between them. The current row shows Kiku's written line as a large dashed prompt, with the next line queued beneath it, facing Priya's live words at 21px with highlighter marks and a blinking caret. A graphite dock holds the call timer, Mute, Hand back to Kiku and End call.

## How the seed shaped it
- Capitals slightly outnumber lower case, so the display type is set wide and heavy, and the many digits became a separate condensed numeral voice from the same variable family.
- The seed contains a short lower-case run that reads as a word meaning "egg". That gave the ovoid mark and the yolk colour, and the yolk became the colour of a person.
- The seed has one doubled letter and otherwise almost no repeats, which pointed to a single meeting point: the spine, where the two voices face each other. Everything else is kept quiet and neutral, so the one warm colour carries the meaning.
- Two embedded three-digit numbers sit close together near the top of the 360-degree range, so they read almost as a whole turn. That suggested a vertical, top-to-bottom timeline instead of a horizontal one.
