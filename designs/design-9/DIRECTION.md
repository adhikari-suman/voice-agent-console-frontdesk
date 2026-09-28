# Design 9: Twin Track

**Pitch:** Every karaoke line is shown as two aligned lanes, with Kiku's script on the upper lane and the human voice on the lower one, so you can see at a glance where the specialist kept the script, skipped it or improvised.

## Palette
| Role | Hex |
|---|---|
| Fog (app background) | `#E6EAEE` |
| Paper (panels) | `#F8FAFB` |
| Ink (text, top bar, prompter) | `#15212C` |
| Kiku blue (agent voice and script) | `#2D6A8C`, deep `#1F4F6A`, tint `#DCE8EF` |
| Human amber (a person is speaking) | `#E8A43A`, ink `#8A560B`, tint `#F8E9CD` |
| Escalated crimson | `#A8324F`, tint `#F5DFE5` |
| Completed green | `#2F7A55`, tint `#DCEEE3` |
| Failed slate | `#56616C`, tint `#E2E6EA` |

Accent rule: blue always means Kiku and amber always means a human voice. Status colours never appear without their shape: a filled check circle for Completed, a ringed dot for In progress, a triangle for Escalated and a crossed square for Failed.

## Type
- **Familjen Grotesk** for UI, labels and numbers (tabular figures).
- **Spectral** for anything that is spoken: transcripts, drafts, opening lines and the prompter. Serif always means speech, and sans always means interface.

## Layout
- A dark top bar acts as the switchboard. It holds the wordmark, role-specific navigation and a row of lamps for every live call, each lamp showing a status shape. The clock and the signed-in person sit on the right.
- Content sits on the cool fog background in flat bordered panels with a 3px radius and no shadows. Panes scroll inside the viewport.
- During a live call, a full-width band sits under the top bar. It is pale blue while you are listening. It turns solid amber with a double rule once you are on the line, so it is always obvious that a human is speaking.

## Karaoke visualisation
- **Interlinear twin track.** Each diff op becomes a column holding two slots: Kiku wrote on top and the specialist said below, joined by a thin double-rule seam.
  - `same` words appear in both lanes.
  - `del` is struck through on a blue tint in the upper lane, with a dashed gap below.
  - `ins` sits on an amber tint with an amber underline in the lower lane, with a gap above.
  - A `del` followed by an `ins` is paired as one replacement column.
- Reading the top row gives the script, and reading the bottom row gives what was said.
- Each karaoke turn carries a "% as written" bar. The line spoken exactly as written gets a green "Spoken as written" badge.
- **Audit:** a two-lane recording timeline shows Kiku's voice in blue until the takeover. After that, Kiku's lane turns into a dotted "still writing" track above the specialist's amber lane. The escalation and takeover markers sit on the timeline. The summary shows the seven lines as match columns.
- **Live takeover:** a dark prompter shows what the guest just said, then Kiku's current line with the kept words underlined and the skipped words struck through. Under the seam, the live words the specialist is saying appear with a caret, in amber where they depart from the script. The queued next line sits at the bottom.

## How the seed shaped it
The seed had an almost exact balance of upper-case and lower-case letters. That became two equal voices: an upper lane for the written script and a lower lane for speech. It had a single run of a doubled capital, which became the double-rule seam between the lanes and under the on-air band. Its length is a power of two and it has a small minority of digits, so the numerals were kept quiet: tabular figures and one accent family per voice. It had one doubled digit among otherwise scattered two-digit pairs, and one of those pairs pointed to a warm hue near 39°, which became the amber of the human voice. The cool blue was chosen to sit opposite it.
