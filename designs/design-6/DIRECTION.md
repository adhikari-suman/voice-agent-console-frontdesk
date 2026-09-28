# Design 6: Proof Desk

**Pitch:** A desk for proofreading voice calls. Karaoke turns are marked up like a proof, as one line of prose where the words Kiku wrote but nobody said are struck and the words the specialist improvised are underlined. Navigation sits in a command dock at the bottom of the screen, and that dock becomes the call's control bar whenever a human is on the line.

## Palette

| Role | Hex |
|---|---|
| Ground (workspace) | `#F3F4F6` |
| Sheet (documents, cards) | `#FFFFFF`, alt `#F8F9FA` |
| Ink (text, dock, primary buttons) | `#202329` |
| Line | `#DDE0E5` |
| Kiku violet: machine voice, struck script, In progress | `#5B4BC4`, soft `#ECE9FB`, deep `#43369B` |
| Human teal: a person's voice, improvised words, Take over, on-air dock | `#0B7285`, soft `#DFF1F4`, deep `#075563` |
| Completed | `#2F6B3A` |
| Escalated | `#B45309` |
| Failed | `#B42318` |

Each status pairs its colour with a shape and a label: a filled circle with a tick for Completed, a half-filled ring for In progress, a triangle with ! for Escalated and a square with × for Failed. User states follow the same rule: a solid dot for Active, a dashed ring for Invited and a slashed ring for Deactivated.

## Type

- **Geologica** for the UI, numbers, and Kiku's own words. It's a geometric sans, used here as the machine's voice.
- **Literata** for guest speech, the specialist's improvised words (in italic), offers and call purposes. It's a text serif, used here as the human voice.

## Layout and navigation

- **Command dock at the bottom.** A 60px dark bar holds the 4×4 mark and hotel on the left, and the navigation as a centred segmented control in the middle (Live, Call logs, Outbound: Campaign, Upsell, Make a call, plus Users for the admin). On the right are a "Go to a call or guest" command field, the clock and the user. There is no top bar and no side rail, so pages use the full height for their own headers.
- **The dock changes during live calls.** It turns violet while you're listening, showing Take over, Leave and Mute. It turns teal with a pulsing pip while you're on the line, showing Mute me, Hand back to Kiku and End call. The controls you need during a call always sit in the same place.
- **Page compositions:**
  - Live board: a tile board with one large amber tile for the escalated caller.
  - Call logs: a filter column on the left and a table. The selected row expands to show its outcome and a word-level heatmap of every karaoke line.
  - Audit: a dossier column (facts, recording, outcome) beside a proof document.
  - Takeover: three columns (earlier turns, prompter, facts).
  - Upsell and Make a call: two paths either side of an "or" seam.
  - Users: a roster of person cards with a create drawer on the right.

## Karaoke: redline and margin

- **Inline redline.** Each karaoke turn is one run of text:
  - Words both said and written are plain serif.
  - Words Kiku wrote but the specialist didn't say are small violet sans, struck through on a violet wash.
  - Words the specialist improvised are teal italic serif with a heavy underline.

  A view switch shows the full *Redline*, only *Kiku wrote*, or only *Tomasz said*.
- **Proof margin.** A dashed margin to the right of each karaoke turn carries its annotation: the percentage of Kiku's words kept, a word-level heatmap (one cell per word: grey for kept, violet for cut, teal for added) and the number of improvised changes. A line spoken exactly as written gets a green "Spoken as written" mark instead.
- **Live prompter.** On the takeover screen, Kiku's current line is set at 30px as a live redline, with a blinking teal caret where Priya is still speaking. The queued next line waits in violet below it.
- **Recording.** The recording bar is violet up to the escalation, hatched while the guest waits and teal from the takeover onwards.

## How the seed shaped it (a second reading)

- The seed's length is a perfect square of a power of two. That gave the square module: a 4×4 mark of sixteen cells, square word cells in the heatmaps, and a square dot for every contact in the campaign progress.
- Upper and lower case are almost evenly split and interleaved throughout, rather than grouped. That suggested one interleaved line instead of two parallel ones: the two voices share a single line of text and are told apart by case-like contrasts (small struck sans against larger italic serif).
- Digits are sparse and appear in scattered short bursts. So numbers stay out of stat walls and show up as quiet margin notes, like proof marks.
- A few repeated characters near the end read as editing marks: a doubled letter is like a word typed twice and then struck. That led to the redline itself.
