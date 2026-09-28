# Design 13: Anaglyph

**Pitch:** Two inks, one call. Kiku prints in cyan, people print in magenta, and wherever the specialist says exactly what Kiku wrote, the two inks overprint into a deep blue.

## Palette
| Role | Hex |
|---|---|
| Paper (app ground, cool grey) | `#EEF0F5` |
| Sheet (panels, rail) | `#FFFFFF`, soft `#F7F8FB` |
| Ink (text, primary buttons, active nav) | `#1C1633` |
| Kiku cyan (machine voice, Kiku-only words, In progress) | `#12A5C6`, text `#0A6E86`, tint `#DDF3F8` |
| Human magenta (a person on the line, their own words, Escalated, Take over) | `#FB6BD5`, text `#A61E88`, tint `#FDE3F6` |
| Overprint blue (words that were written and said, the multiply of cyan × magenta) | `#1F44A6`, tint `#E3E8F7` |
| Completed | `#2B7650` |
| Failed | `#B0352C` |

## Type
- **Young Serif** for the wordmark, page titles, guest names and big figures (waiting time, totals).
- **Schibsted Grotesk** (variable, 400–800) for everything else: UI, transcripts, tables.
- The wordmark has an anaglyph offset: cyan shadow to the left, magenta to the right.

## Layout model
- A light left rail (216px) with text-and-icon nav, grouped as Live / Call logs, Outbound calls, and Team (admin only). The user and the demo-data note sit at the foot of the rail.
- Serif page title on the paper ground, with context on the right (hotel line and clock, or call status and actions).
- The panels are white sheets with 6px corners. Double rules (3px double) separate sections instead of heavy card chrome.
- Who is on a call is shown with overlapping discs: a cyan disc for Kiku alone, cyan plus magenta for Kiku and a person.
- Status is always shape, label and colour together: a filled circle with a check for Completed, a half-filled ring for In progress, a triangle for Escalated, a square with a cross for Failed.
- The audit page is a **dossier column** (call facts, the karaoke Venn, outcome) beside the message history, with a **vertical recording spine**. The spine is a mirrored waveform running top to bottom, coloured by speaker, with dashed escalation and takeover markers and a playhead arrow pointing into the transcript.
- Takeover mode frames the whole viewport in magenta and turns the header magenta ("You're on the line with…"), so nobody can miss that a human is live.

## Karaoke visualisation: the overprint line
Karaoke turns are not drawn as two lanes. Each turn is one reading line, with every diff segment in order:
- **same**: printed in overprint blue, the words written and said.
- **del**: Kiku wrote it but it wasn't said. Printed smaller in cyan, raised above the baseline and struck through, like a mis-registered plate.
- **ins**: the specialist said it but Kiku didn't write it. Printed in magenta, dropped slightly below the baseline and underlined.
Position and decoration carry the meaning, so the line still reads without colour. Each turn has a two-circle Venn whose overlap matches the `match` %. The one line spoken as written is a single solid blue disc with a "Spoken as written" badge. The audit summary is a large Venn with "Kiku wrote" and "Tomasz said" circles overlapping by the average share, plus 1 as written and 6 improvised, and a row of seven small Venns.
In the live prompter the same overprint becomes true karaoke. The parts of Kiku's line already said turn blue, Priya's own words appear inline in magenta, a magenta caret marks where she is, and the rest of Kiku's line waits ahead in faded cyan. Below it are the clean "Kiku wrote" and "You, so far" texts, and "Kiku's next line" is queued underneath.

## How the seed shaped it (abstract)
- Upper-case and lower-case letters were almost exactly balanced, with digits as a small minority. That read as two equal voices with a small shared middle, which became two inks of equal weight and a narrow overprint.
- A hex-valid six-character run decoded to a vivid pink-magenta. That became the human ink, and its subtractive partner cyan became Kiku.
- The seed has several doubled characters, in both letters and digits. These became the double-rule motif and the paired, overlapping discs.
- The seed ended in a numeric palindrome. That suggested mirror symmetry, used in the mirrored recording spine and the split sign-in composition.
