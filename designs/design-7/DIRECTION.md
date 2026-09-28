# Design 7: Interlinear

**Pitch:** a console that reads like an annotated script. The specialist's words are the text, and what Kiku wrote hangs above each improvised phrase like a translator's gloss.

## Palette

| Token | Hex | Use |
|---|---|---|
| Aubergine | `#2B1E27` | Nav rail, recording spine, prompter, primary buttons |
| Mauve | `#846E77` (text `#6B5760`, tint `#E4DBE0`) | Kiku: its voice, its lines, its glosses |
| Apricot | `#FF9966` (text `#B04C1C`, tint `#FFF1E9`) | A human on the line. Used only for people speaking, taking over, or improvising |
| Lilac paper | `#EEEAED` / panel `#FAF8F9` | Page ground and panels (cool, not cream) |
| Ink | `#261B22` | Body text |
| Status | Completed `#2F7358` filled circle and check · In progress `#3C62A0` half-filled circle · Escalated `#C25414` triangle and ! · Failed `#A3304A` square and × | Always shape plus label |

Colour rule: mauve means the machine and apricot means a person. Scheduling and form actions use aubergine, so apricot stays reserved for "a human is speaking".

## Type

- **Bricolage Grotesque** (display): page titles, the prompter line, totals and timers.
- **Schibsted Grotesk** (UI and body): everything else.

## Layout model

- An 84px aubergine icon rail with a caption under each icon. The active item is an apricot chip with chamfered corners. The footer shows a small grid of live-call squares: filled mauve means Kiku is alone, filled apricot means a person is on the call, and an apricot outline means a call is waiting for a person.
- Chamfered 45° corners on buttons, the play control and the active nav chip. This is the only non-round corner in the system.
- **The audit (04) runs in three vertical columns:** a dossier on the left (guest, booking, a seven-arc karaoke donut, the outcome and total), then a dark **recording spine** that draws the call's waveform from top to bottom, then the message history. The spine turns from mauve to apricot at the takeover. It carries dashed escalation and takeover markers and one diamond per karaoke line, and a white bracket shows which part of the call is on screen.
- The live pages (05, 06) put the conversation on the left and a column of call facts and controls on the right. During a takeover (06), a full-width apricot band with a hatched lower edge makes it clear that a human is live.

## Karaoke visualisation: interlinear gloss

Each karaoke turn is set as the words actually spoken:
- Words that match Kiku's line are plain ink.
- Words the specialist improvised are apricot and semibold, on a pale apricot highlight.
- When an improvised phrase replaced some of Kiku's words, those words sit **directly above it** in small struck-through mauve type. A thin bracket under them spans the phrase they were replaced by.
- Kiku's words that were dropped with no replacement stay inline, small and struck through.
- A ring shows "N% of Kiku's words kept". The turn's footer repeats Kiku's full line. A line spoken as written turns green and gets a "Spoken as written" seal.

On the live prompter (06), Kiku's line is set large so the specialist can read it. Below it, the live speech is drawn with the same interlinear gloss and a blinking caret at the end.

## How the seed shaped it

- One six-character run in the seed reads as a valid hex colour. It became the mauve (nudged slightly), and a short three-character hex run became the apricot.
- The seed switches between upper and lower case constantly, so every line in it has a tall layer and a short layer. That became the two tiers of the gloss: small glyphs riding above full-size ones.
- The seed has several doubled characters, letters and digits, set close together. They suggested one line with its twin set right above it, rather than two separate tracks.
- The digit that appears most often in the seed matches this design's number. It set the seven arcs of the karaoke donut, one for each of the seven karaoke lines in the audit.
- The seed's density of consonants, with vowels scattered thinly through it, pushed toward a compact grotesque and a tight rail with captions rather than a roomy sidebar.
