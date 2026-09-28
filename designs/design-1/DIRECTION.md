# Design 1: Midline

**Pitch:** one line runs through the whole console. Kiku's script sits above it, the person's words hang below it, and anything kept from the script travels along it as a bead.

## Palette
| Role | Hex |
|---|---|
| Ink violet (Kiku, primary actions, the line itself) | `#2F0BA6`, soft `#7F6BD6`, wash `#ECE8FB` |
| Night (live takeover canvas, chips) | `#150A3D`, takeover canvas `#120838`, panels `#1B0F4D` |
| Paper (cool lilac white canvas) | `#F4F3F9`, surface `#FFFFFF`, sunk `#EDEBF5` |
| Ink / muted text | `#1C1830` / `#6B6785` |
| Human vermilion (a person on the line, "said", escalations, Take over) | `#FF6B3D`, highlight `#FFD9CB`, wash `#FFEEE7`, text `#A8330C` |
| Completed green | `#0E7A5C` |
| Failed graphite | `#4A4560` (upload errors use crimson `#B3261E`) |

Violet always means Kiku and vermilion always means a person. Escalated calls use vermilion because they are waiting for a person.

## Fonts
- **Newsreader** (optical sizes, roman and italic) for everything that is *spoken or written as speech*: transcripts, karaoke lines, guest names, purposes, the day-summary sentence, the wordmark. What a person says is set in italic; what Kiku wrote is set roman.
- **Schibsted Grotesk** for the interface: labels, tables, buttons, numbers.

## Layout model
- **The wire:** there is no sidebar. A single violet line runs across the top of every screen, and navigation is threaded on it as pill beads (Live board, Call logs, then an open-ring marker for Outbound with Campaign / Upsell / Make a call, and for admins a Team marker with Users). The active bead is filled violet. The brand glyph (a ring cut by the line) starts the wire; the line state and the signed-in person end it.
- Below the wire: a slim title row (crumb, title, clock), then full-width content on paper with white panels (16px radius, hairlines, no drop shadows).
- Headers are written as prose where it helps. The live board states today's totals as one sentence. The audit introduces the call in a paragraph instead of a key/value strip.
- Status is shape plus label, with colour last: filled disc with a check (Completed), half-filled disc (In progress), diamond with "!" (Escalated), slashed ring (Failed).
- Transcripts hang off a vertical spine of dots: filled violet for Kiku, a hollow ring for the guest, vermilion for the specialist, diamonds for system events.

## Karaoke visualisation
- **Midline diff:** each karaoke turn is drawn on one horizontal line. Words Kiku wrote but nobody said sit *above* the line, struck through in soft violet. Words the specialist improvised sit *below* it, in vermilion-highlighted italic. Words that were kept are **beads threaded on the line**, outlined pills that belong to both lanes. A line spoken exactly as written is one solid violet bead with a "Spoken as written" badge. The first row carries the "Kiku wrote" and "… said" lane labels on either side of the line.
- **Audit ring player (04):** the recording is a ring that runs clockwise from the top, with its midline passing through the play button. The arc is violet while Kiku spoke and vermilion after the takeover. A diamond marks the escalation at 00:36 and a ringed dot marks the takeover at 00:52. The seven karaoke lines are beads on the ring: a filled one for the line said as written, hollow ones for improvised lines. It sits beside a "1 of 7" summary and the outcome (£209.00, room note).
- **Live prompter (06):** the whole page turns night, with a vermilion "You're on the line" band holding the mic level, the timer and the Mute, Hand back to Kiku and End call controls. The current line is drawn as a large midline diff with a caret after the live words, "Up next" is queued underneath, and earlier turns stay below as small midline diffs.

## How the seed shaped it
- One run of characters could be read as a six-digit hex colour. It gave the deep ink violet, which I shifted slightly so it is not a verbatim copy.
- Upper-case and lower-case letters were almost exactly balanced. That became two voices of equal weight, with one line between them: roman above, italic below, violet and vermilion, light screens and one fully dark screen.
- Round capitals appeared in runs and in doubled pairs. They became the ring glyph, the ring player, the bead pills and the round status marks.
- The total length is a power of two. That led to a strict 8px rhythm and a 16px panel radius.
- One two-digit number suggested an angle. It sets the 71° hatching on the "Needs a specialist" band.
