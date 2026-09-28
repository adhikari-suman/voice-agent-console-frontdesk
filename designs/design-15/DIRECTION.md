# Design 15: Lime Splice

**Pitch:** Kiku and the specialist are two strands of one call; the console shows where they run together and where they split apart.

## Palette
| Role | Hex |
|---|---|
| Rail (deep teal-green) | `#12332D` |
| Paper | `#F1F4F1` |
| Card | `#FFFFFF` |
| Ink | `#13211E` |
| Kiku strand, teal | `#1D6F61` (soft `#E2EEE9`) |
| Human strand, chartreuse | `#AEDB00` (highlight `#C9EC3F`, soft `#EEF8C4`) |
| Escalated | `#B25309` |
| In progress | `#2B5A9E` |
| Failed | `#A3213B` |

Colour follows one rule: **teal means Kiku, chartreuse means a person.** "Take over", the "on the line" banner and anything a person improvised are chartreuse. Nothing else uses it.

## Type
- **Schibsted Grotesk** (400–800): UI, and everything a person *says*.
- **Newsreader** (serif): everything Kiku *writes*. Kiku's transcript lines, drafts, queued lines, opening lines and struck script words are all set in the serif, so you can tell written words from spoken ones by the typeface alone.

## Layout
- A fixed dark rail on the left (216px) holding the wordmark glyph, role-aware nav (the specialist gets a Live board, the admin gets Users, and both get the Outbound group) and hotel line state. The rest of the screen is a light work surface with a slim top bar showing the breadcrumb and hotel clock.
- Medium density. Inner panes scroll, and a soft mask fades them out at the fold.
- The audit is built as a **dossier and a score**. On the left, a column holds the facts (guest, stay, reason) and the outcome, laid out as a receipt. On the right is the message history. Its playback is a **vertical tape** running down the left edge: the waveform is coloured by speaker, and the escalation and takeover are marked where they happen in time.
- The live board opens with the day's totals written as a sentence, followed by the one call that needs a person and then a list of the calls on the line now. Each call carries a two-bar presence glyph: the upper bar is Kiku, the lower bar is a person, solid means speaking and dashed means listening.
- Takeover mode puts a solid chartreuse "Margaret Doyle can hear you" banner, with the call controls, above a dark prompter stage.

## Karaoke: the braid
Every karaoke line is drawn as two strands that share one row:
- **Upper strand (teal):** what Kiku wrote. Words that were cut stay on this strand, in the serif, struck through.
- **Lower strand (chartreuse):** what the specialist said. Improvised words sit only on this strand, highlighted.
- **Where they meet:** words that were both written and said appear once, in the middle, inside a band edged teal above and chartreuse below. That band is the knot where the two strands close.

The rows wrap word by word, so either line reads through in order: follow the top and the knots for "Kiku wrote", or the bottom and the knots for "Tomasz said". A small **braid meter** shows how much of each line the two strands shared. The one line spoken as written shows as a fully closed braid with a "Spoken as written" mark. On the live prompter the braid is set large on a dark stage, with a blinking caret at the end of the partial speech and Kiku's next line queued underneath in the serif.

Status never relies on colour. Each one has its own shape plus a label: a filled circle with a tick for Completed, a half-filled ring for In progress, a triangle for Escalated and a square with a cross for Failed.

## How the seed shaped it (abstract)
- The seed has almost as many capitals as lowercase letters, and the two cases weave through each other. That became two voices of equal weight in one line: the braid, and a pairing of a serif for writing with a sans for speech.
- It contains exactly one run of characters that reads as a hex colour. Padded out, that run gives the chartreuse used for the human strand.
- A three-digit number in it reads as a hue angle in the teal range, which gave the Kiku colour and the rail.
- A two-digit number close to a right angle became the 8° lean of the wordmark glyph, the speaker markers and the presence bars.
- Digits are sparse, which pushed the design towards set type and sentences, such as the live-board totals, rather than a wall of stat tiles.
