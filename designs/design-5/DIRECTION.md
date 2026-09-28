# Design 5: Duet Stave

**Pitch:** Kiku and the specialist are two voices on one line of music. Words they share sit on the line. Kiku's unspoken words rise above it. The person's own words drop below it.

## Palette
| Token | Hex | Use |
|---|---|---|
| Paper | `#E8ECF1` | App background (cool, never cream) |
| Surface | `#FFFFFF` | Panels |
| Ink | `#18203A` | Text, primary buttons, active nav pill |
| Slate | `#A5B0BF` | The stave rule, dividers, guest audio |
| Kiku | `#34508F` | Kiku's voice: struck words above the line, Kiku level bars |
| Human | `#BE2358` (deep `#9A1745`, soft `#FBE7EE`) | A person on the line: words below the line, the on-air band, Take over |
| Status | Completed `#17795E` (filled circle, check) · In progress `#0B6E8A` (half-filled ring) · Escalated `#A95300` (triangle, !) · Failed `#9C2B22` (square, x) | Each status has its own shape and label, so it reads without colour |

## Type
One family, **Recursive** (Google Fonts), used in two registers through its variable axes:
- **Linear** (CASL 0) for Kiku, UI chrome and body text.
- **Casual** (CASL 1) for people: guest lines, what the specialist said, page titles and the wordmark.
- **Mono** (MONO 1) for times, phone numbers and booking codes.

The machine and the human share one typeface but not one voice.

## Layout model
- **Bottom deck navigation.** A 60px transport strip at the foot of every screen, like a player's controls. It holds the wordmark and hotel, the nav as pills (the active item is a filled ink pill, and Outbound is a labelled group), and, for specialists, a live tray: "Owen waiting 00:38" and "5 on the line". It also shows the clock and the user. There is no top bar, so each page opens with its own content.
- **Full-width state bands** at the top of the call screens: a pale Kiku-blue "Listening" band (05) and a solid raspberry "You're on the line" band (06). Nobody can mistake who is speaking.
- **Split into equal halves** wherever there are two paths (Upsell, Make a call: single vs CSV), echoing the balance in the seed.
- **Audit (04):** a call-card column on the left holds the facts, karaoke rings, escalation reason and outcome. On the right, the message history has a **vertical waveform spine**. The recording runs down the page beside each line, coloured by speaker, with hatching for the hold between escalation and takeover. An ink playhead cuts across at the current time. There is no separate player bar and no bar chart.
- 22px baseline rhythm on 14px text. Radii vary by level: 4 for tokens, 8 for controls, 14 for panels.

## Karaoke visualisation (signature)
**The stave.** Each karaoke turn is set on a single slate rule:
- *same* words sit **on** the line in ink.
- *del* words (Kiku wrote, not said) sit **above** the line, smaller, in Kiku blue, struck through.
- *ins* words (the person said instead) hang **below** the line, in the casual cut, in raspberry, underlined.
- A substitution (del next to ins) is stacked vertically, so the replaced words sit directly over their replacement. A thin stem marks where a voice leaves the script.

The result reads like a melody contour. A line spoken as written is one flat run with a "Spoken as written" badge and an ink ring in the summary. Each turn has an "as written" meter. The summary uses seven rings, each filled to the share of its line said as written.

**Live (06):** the prompter shows Kiku's line in large type with karaoke progress. Passed words are dimmed and underlined, skipped words are struck, and the next word to say is marked in raspberry. Below it, what Priya is saying streams in the casual cut with a caret. Her improvised words are underlined, and the next line waits in a dashed "Queued next" slot.

## How the seed shaped it
- Upper and lower case were almost exactly balanced, which became the core idea: two voices of equal weight, and equal-halved layouts.
- The single digits scattered through the letters became the stave. Most words stay on the line, and a few step off it above or below.
- A cool slate hex hidden in a substring became the rule colour and the base of the whole cool palette.
- The embedded numbers set the rhythm: a 22px baseline and 14px body text.
- A few doubled letters suggested pairs, so every screen has a doubled rule: the triple-hairline motif above the deck.
