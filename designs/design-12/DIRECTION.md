# Switchboard

**Pitch:** Kiku works like the hotel's old telephone exchange. The app sits above a yellow operator's desk, calls are lines with lamps, and karaoke mode is a patch bay: numbered cords join the words a specialist kept from Kiku's script.

## Palette

| Token | Hex | Role |
|---|---|---|
| Ground | `#E6E7E2` | Workspace, a cool grey paper |
| Sheet | `#FFFFFF` / `#F3F3EF` | Panels and insets |
| Ink | `#1C1C1A` (text 2 `#4A4A45`, text 3 `#6F6F69`) | Text, primary buttons, the active desk key, cords |
| Desk yellow | `#F2CD2B` (edge `#E2BC14`) | The exchange desk (navigation) and the colour of Kiku holding the line |
| Script tape | `#FBEFB5` (ink `#5E4C00`) | Anything Kiku wrote: its transcript lines, the "Kiku wrote" card, drafts, the next line, opening lines |
| Cord red | `#C8372A` (text `#A52B1F`, wash `#FBE4E0`) | A person on the line: Take over, escalation, the "said" card, improvised words, the karaoke page ground (`#F1DAD6`) |
| Completed green | `#1F7A4B` (wash `#DDEFE3`) | Completed, spoken as written, added items |
| Failed grey | `#66665F` | Failed |

The colours follow one rule: yellow means Kiku has the line and red means a person has it. In progress is shown in ink, because Kiku is simply running the call.

## Type

- **Bricolage Grotesque** (variable, `wdth` 80–88, weights 700–800): page titles, guest names, the wordmark, large timers and totals. It's set slightly condensed so it reads like the lettering on an exchange panel.
- **Familjen Grotesk**: all UI and body text, with tabular numerals.

Both typefaces are sans. Voice is shown by material, not by typeface: Kiku's words sit on yellow tape, and a person's words sit in a red-edged card.

## Layout model

- **Navigation lives in a desk at the bottom.** A 68px yellow bar holds the plug-and-cord mark, the wordmark and the hotel, then a row of desk keys, each with its own lamp. The active key is ink with a lit lamp, and Live board carries a red count of escalated calls. The right end holds the hotel line, the clock and the signed-in person. Specialists and admins get different key sets: only the admin has Users.
- There is no side rail. Each page has a large condensed title and a short caption, then the work area.
- **Live board:** five live calls stand side by side as line cards, each with lamps showing who is speaking or listening. The call that needs a person is a solid red card, larger than the rest, with its waiting time and a white Take over key. Today's totals are one sentence. Recently finished calls sit below as a ledger.
- **Audit:** a call ticket on the left, with dashed tear lines between the facts, karaoke lamps and outcome. The message history is on the right. A vertical line-holder tape runs down the history, yellow while Kiku held the call and red after Tomasz took over, with pins at the escalation and the takeover. The player and a short ruler sit in the history header.
- **Karaoke live:** the whole page tints red. A red on-air strip holds the controls: Mute, a yellow Hand back to Kiku, and a black End call. The prompter below it is a large patch bay.
- The outbound and users pages use working panels and ledgers. Inner panes scroll and the page fits 1440×900.

## Karaoke: the patch bay

Every karaoke turn is set out as a patch bay with two cards side by side, not stacked lanes:

- The left card, **Kiku wrote**, is on yellow script tape. Dropped words are struck through in olive.
- The right card, **Tomasz said** (or **You're saying** while live), is white with a red edge. Improvised words are set bold in red.
- Each phrase that was kept (a `same` segment) is boxed and numbered on both sides. A black cord crosses the gutter between them, running from a black jack on the script side to a red jack on the speech side. When several kept phrases share a line, their jacks fan out so every cord stays visible.
- You can read the result at a glance: many cords means the specialist followed the script, few cords means they improvised.
- A line spoken exactly as written gets a green "Spoken as written" badge. The ticket also shows seven karaoke lamps. Each is a pie of the share of words kept, and the one line spoken as written is a solid green lamp with a check.
- During a live takeover the speech card has a red caret. The next line waits below on dashed tape.

## Status without colour

- **Completed:** filled circle with a check
- **In progress:** half-filled ring
- **Escalated:** triangle with "!"
- **Failed:** square with a cross

Every glyph sits next to its label. User states follow the same idea: Active is a filled dot, Invited a dashed ring and Deactivated a slashed ring.

## How the seed shaped it

- The seed's length is a perfect square, which suggested a board of positions: an exchange panel. That became the desk, the lamps and the line cards.
- Digits are scarce and scattered, roughly one character in eight, like the few lit lamps on a quiet board. Lamps are used sparingly and only mean "live here".
- Three doubled letters, each a matched pair, became pairs of jacks joined by a cord. That is the patch-bay karaoke.
- Capitals and lowercase are almost evenly split, so the two voices sit side by side as equals, left and right, rather than one above the other.
- A hex-like run inside the seed leans toward a warm, saturated hue. That pushed the accent away from the cool purples toward the yellow of an operator's desk, with red for the cords that carry a human voice.
