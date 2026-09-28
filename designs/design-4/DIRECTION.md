# Split Reel

**Pitch:** every call is two tracks. Kiku writes on the top track, a person speaks on the bottom one, and the console shows where they run together and where they split.

## Palette
| Token | Hex | Role |
|---|---|---|
| Ink | `#0E2C3D` | Spine, primary buttons, dark prompter surface, text |
| Paper | `#ECF1F1` | Cool page ground |
| Surface | `#FAFCFC` | Panels |
| Mist | `#B1D4E0` | Kiku's light accent on dark surfaces |
| Kiku blue | `#2A6A90` (tint `#DCEBF2`) | The machine: Kiku's words, In progress |
| Human rose | `#C83E58` / `#DE5E72` (tint `#FBE4E8`) | A person's voice: specialist speech, Escalated, "you're on the line" |
| Ledger green | `#2B7A62` | Completed, spoken as written |
| Oxblood | `#7C3838` | Failed |

Accent logic: blue means Kiku, rose means a human is needed or talking. Escalation and takeover share one colour because both mean a person. Every status also has its own shape: a filled circle with a tick for Completed, a ring with a centre dot for In progress, a triangle for Escalated and a crossed square for Failed.

## Type
- **Schibsted Grotesk**: UI, headings and Kiku's own words (upright, even, machine-set).
- **Newsreader** (italic in karaoke): anything a human says. Guest lines and specialist speech use the serif, so voice reads differently from script.
- **Sofia Sans Extra Condensed**: timecodes, counters and promo codes, like a tape-deck counter.

## Layout
An 80px ink spine on the left holds icon-and-label navigation, the twin-bar mark at the top, and a vertical wordmark at the foot. A 64px top bar shows the page title, the hotel line, the clock and the signed-in person. Pages are split into panes that scroll on their own at 1440×900. Live states get a full-width band under the top bar: ink when you're listening and rose when you're on the line. Density is medium, like an operations console, with tabular numbers throughout.

## Karaoke visualisation (signature): the split reel
The audit is a **score read down a central spine**, not a chat log. Kiku's column sits to the left of the spine, and the people on the line (the guest, then the specialist) sit to the right. The spine is the recording. It is blue while Kiku speaks and turns rose at the takeover, and a dashed blue thread runs beside the rose one because Kiku is still writing. The playhead is a horizontal ink rule across the score with a tab on the left edge. Escalation, join and takeover events are pills that cross the spine.

Each karaoke turn is one row. On the left is *Kiku wrote*, in a dashed box because it was a prompt and was never spoken. On the right is *Tomasz said*, in a solid box set in Newsreader. A **splice dial** on the spine shows how many of Kiku's words were kept. A line spoken exactly as written gets a green tick dial instead.

Word-level marks use the same diff on both sides:
- **matched** words have a double underline (the twin-rule motif) in both columns, so the eye can pair them across the spine;
- **struck** words are Kiku's words that weren't said, shown in blue on the left;
- **rose** words are improvised, set in italic serif on a rose tint on the right.

On the live takeover screen the prompter is a dark ink stage. Kiku's line is set large with the same struck and matched marks, and the specialist's words appear under it in large rose-marked italic with a live caret, so she can see where she has drifted from the script as she speaks. The next queued line waits below in a dashed box. The call sheet summarises the karaoke as a sentence and a strip of seven kept-percentages with a double rule on each.

## How the seed shaped it
The seed has one doubled capital pair and one doubled lowercase pair. That gave the core idea of twin tracks, paired rules, and a mark made of two offset bars. It opens with a dense run of capitals, which became the heavy ink spine that anchors every page. Four-character hex-like fragments suggested the deep navy base, a pale mist blue, a rose-coral and an oxblood. Two small embedded numbers turned into the 35° hatch angle and the tight counter numerals. An embedded number close to a three-quarter turn set the wordmark on its side up the spine. The seed has more capitals and lowercase than digits, and a mostly letter-driven rhythm, so the design keeps its numbers sparse and set in a separate face.
