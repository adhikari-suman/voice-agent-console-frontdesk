# Stitchline

**Pitch:** Kiku's script and the specialist's words sit side by side as two readable columns. Where the specialist kept Kiku's words, a dashed thread stitches the two columns together across a gutter.

## Palette

| Token | Hex | Role |
|---|---|---|
| Sencha paper | `#E4E9DF` | App background, with a faint 14px dot grid |
| Sheet | `#F7F9F4` | Panels, dossier column |
| Pine ink | `#1C2721` | Text, the bottom dock, Completed status |
| Matcha | `#55741E` (wash `#EEF3E2`, soft `#DCE6C6`) | Kiku: its script, its spine segments, In progress |
| Ai indigo | `#2C3C9A` (deep `#1B2566`, wash `#EDEFFA`) | A person on the line: specialist speech, primary actions, the on-air takeover screen |
| Ochre | `#A8680F` (soft `#F3E3C4`) | Escalated |
| Madder | `#A0353A` (soft `#F2D9D8`) | Failed, row errors |

The palette is mostly light. The takeover screen (06) flips the whole work area to deep indigo, so it's unmistakable that a human is live on the call.

## Type

- **Shippori Mincho B1** (serif): Kiku's written voice. It's used for every line Kiku wrote or drafted, the queued next line, guest names and big numerals.
- **Zen Kaku Gothic New** (sans): human speech and the UI.

## Layout and navigation

- **Bottom dock, not a top bar.** A 64px pine dock runs along the foot of every screen. It holds the wordmark and hotel, then the navigation as icon-over-label keys. The Outbound keys are grouped under a vertical caption. Live counts, the clock and date, and the signed-in person sit on the right.
- **The active key is a tab that hangs down from the page into the dock**, in the page's own paper colour, so it connects to the content above it.
- **Pages use the full height above the dock.** Most screens have a list or form, plus a context panel on the right.
- **The audit uses a dossier layout.** A fixed 350px sheet on the left holds the guest, facts, karaoke summary and outcome. The message history on the right runs down a vertical time spine. The spine is matcha while Kiku speaks, becomes an ochre diamond at the escalation, and turns indigo after the takeover. A compact scrubber in the history header marks 00:36 and 00:52 on the recording.
- **Other details:** Shapes are small (3–4px radius). There are no card side-tabs; selection uses a tint and an outline.

## Status without colour

- **Completed:** filled circle with a check
- **In progress:** ring with a centre dot
- **Escalated:** filled triangle with "!"
- **Failed:** filled square with an ×

## Karaoke visualisation: the stitch

- Each karaoke turn is set as two natural sentences side by side. On the left is **Kiku wrote**, in serif. On the right is **what the specialist said**, in sans. Both stay fully readable as prose.
- **same:** phrases have a dashed "stitch" underline in both columns. A dashed thread with knots at each end crosses the gutter from one to the other, curving when the kept words sit on different lines.
- **del:** Kiku's words that were not said are struck through on a matcha wash, left column only.
- **ins:** the specialist's own words are marked on an indigo wash with an indigo underline, right column only.
- A line said as written is stitched straight across and gets a "Said as written" badge. Each turn carries a "% as written" meter.
- **Audit summary:** "1 of 7" is set large, with seven numbered rings. Each ring is filled to that line's match. The fully kept line is a solid matcha knot.
- **Live takeover (06):** Margaret's last words sit above the prompter. The prompter itself is a large stitch. Kiku's 01:44 line is on the left: words Priya already skipped are struck, and words not reached yet are faded. Priya's live words are on the right, ending in a caret. Threads form wherever she kept Kiku's words. The queued next line waits below in a dashed box, above the Mute, Hand back to Kiku and End call controls. The earlier turns use a compact stacked version of the stitch.

## How the seed shaped it (abstract)

- **Pairs:** the seed contains seven doubled-letter pairs, each a matched twin sitting side by side. That became the core idea: pairs of phrases matched across a gap, the stitch.
- **Scattered digits:** almost all of its digits are lone singletons scattered through the letters, like stitch holes. They became the dot grid and the knots at each end of a thread.
- **Near-flat angle:** its one run of three digits reads as a near-flat angle. That's why the threads are shallow curves that mostly run level across the gutter.
- **A tea word:** a readable fragment evoked a Japanese tea word. That suggested the sencha and matcha greens and the Japanese type pairing, for a product whose name means "listen".
- **Grounded proportions:** lowercase outnumbers uppercase. That set the lowercase wordmark, and the grounded, bottom-anchored navigation.
