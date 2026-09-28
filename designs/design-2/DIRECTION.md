# Design 2: Braid

**Pitch:** Two voices, one line. Kiku is a violet rail with square corners and a specialist is a rose rail with round ones. Where they agree, the rails open into a lens that holds the shared words.

## Palette
| Role | Hex |
|---|---|
| Ivy ink (rail, text, primary buttons) | `#12302A`, soft `#526A63`, mute `#869A94` |
| Paper (app canvas) | `#ECF0ED` |
| Sheet (panels) | `#FFFFFF`, lines `#D2DCD7` |
| Kiku violet (machine voice, script, running) | `#5B47C4`, tint `#E8E4F8` |
| Human rose (a person on the line, human actions) | `#CC3066`, deep `#A0204F`, tint `#FBE3EB` |
| Completed | `#2E7657` on `#DDEFE6`, filled square with a tick |
| In progress | violet, a half-filled ring |
| Escalated | `#A56800` on `#FCEDC4`, a triangle |
| Failed | `#8F2A1C` on `#F3DFD9`, a crossed diamond |

## Type
- **Zen Kaku Gothic New** (400/500/700/900): the interface, Kiku's words, numbers. Its angular gothic fits the square machine voice.
- **Zen Maru Gothic** (500/700): anything a person says. That covers guest lines, specialist speech and human buttons. The rounded terminals carry the "round is human" rule into the letterforms.

## Layout model
- A fixed ivy sidebar (224px) with a violet and rose double rule down its edge. The workspace is light with a thin white top bar showing the hotel line, the date and time, and a "Demo data" marker.
- Shape language: Kiku and system actions are square (the K chip, ink buttons, "Hand back to Kiku"). People and human actions are round (avatars, the rose "Take over" pill, Mute).
- The audit is a dossier and a score. A vertical dossier on the left holds guest facts, the karaoke lens summary and the outcome. On the right, the transcript is the recording: a vertical spine runs violet while Kiku has the line, dashes violet and rose through the escalation handover, and turns rose once Tomasz takes over. Every message is a node on it.
- During a takeover the whole canvas turns rose and is ringed by the human rail. The prompter is a horizontal conveyor: earlier lines on the left, the line being spoken in the centre and Kiku's queued line on the right, with round call controls docked under the current line.
- Outbound pages put the two paths side by side (one call, or a file), separated by an "or" rule.

## Karaoke visualisation
Each karaoke line is a braid read left to right:
- **Kiku's rail (violet, above)** carries the words Kiku wrote that weren't said, struck through.
- **The person's rail (rose, below)** carries the improvised words in bold rose.
- A deletion followed by an insertion becomes one substitution block, so the written and spoken phrases sit in parallel.
- **Words both said** sit inside a **lens**: the two rails curve apart and hold the shared phrase between them.
- A line spoken as written is a single lens with a violet "Spoken as written" badge.
- The live line ends in a blinking caret on the rose rail.
- The audit summary draws each of the seven lines as a small lens glyph whose width follows the share of Kiku's words kept.

## How the seed shaped it (abstract)
- The seed's length is a power of two, which set an 8px base grid and a square-first geometry.
- Upper-case and lower-case letters were almost evenly balanced. That became two near-equal voices, a rail for each, and the mixed dark/light scheme: a dark sidebar next to a light workspace.
- Digits were sparse and scattered through the string, so accent colour is kept to a small fraction of any screen.
- The seed had exactly three doubled characters, one of each kind (digit, lower case, upper case). They became the three states of a word in the braid (kept, dropped, added) and the three-part conveyor on the takeover screen.
- A readable fragment evoking stillness pointed to the "Zen" type families, which suit an agent whose name means "listen".
