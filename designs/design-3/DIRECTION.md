# Design 3: Galley Proof

**Pitch:** Kiku sets the type and your team marks it up. Every karaoke line reads like a proof sheet: Kiku's script in black, cut words struck through in proof red, and the specialist's own words raised above the line.

## Palette

| Role | Hex |
|---|---|
| Umber ink (spine, text, primary buttons, dark panels) | `#2C1F14` (steps `#3F3023`, `#5E4D3D`) |
| Concrete ground (desk the sheets sit on) | `#D9D6CF` |
| Paper sheet | `#FFFFFF`, tint `#F3F2EE` |
| Rules | `#DDD9D1`, `#B8B2A7` |
| Secondary text | `#594F45`, `#655B50` |
| Proof red: a person speaking, specialist edits, escalations | `#B8401F`, ink `#8C2C12`, tint `#F6E3DB` |
| Cobalt: Kiku, and calls in progress | `#2446C8`, tint `#E3E8FA` |
| Completed | `#2F6B3F`, tint `#E0ECE2` |
| Failed | `#8E1B3A`, tint `#F4DFE4` |

Status is always shape + label: filled circle with a tick (Completed), half-filled ring (In progress), filled triangle with ! (Escalated), filled square with × (Failed).

## Type

- **Sofia Sans Extra Condensed** (600 to 800): page titles, names, promo codes, every timestamp and number.
- **Sofia Sans**: interface text, labels, tables.
- **Newsreader** (serif, roman and italic): anything Kiku writes or says. The script is set type; guest speech stays in the sans, in quotes.

## Layout model

- **Binder spine** navigation: an 84px umber spine with vertical tabs whose labels run bottom to top. The active tab is cut from the page colour and joins the sheet with small inverse curves. Specialist tabs: Live board, Call logs, Campaign, Upsell, Make a call. Admin tabs drop Live board and add Users. A green dot and "Line open" sit at the foot.
- White sheets on a concrete desk; square corners throughout; condensed display titles sit on a hairline top bar with the date, the signed-in person and the hotel.
- Audit is a **dossier + galley** composition, not a header/player/two-column stack: the left column is the call sheet (facts, a compact recording player with escalation and takeover pins, outcome). The right is a white galley where the message history reads like a proof, with a 116px margin for time, speaker and proof notes.
- Taking over turns the whole top band proof red with a hatched lower edge, a "You're on the line" badge with a live mic meter, and the three call controls.

## Karaoke visualisation: proof marks

A single typeset line, not two lanes:
- `same` words are set in black.
- `del` words are struck through with a proof-red rule.
- `ins` words are raised half a line in red italic, with a caret mark where they were added.
- In the margin: "Tomasz, line n", an Improvised or As written verdict, and a tick gauge of how much of the line he kept.
- Under each proof, a quiet "Tomasz said" line gives the clean spoken text.
- The one line said as written is underlined in green dots and tinted green.

Live (screen 06), the same marks build up as Priya speaks: the caret blinks at the end of her newest words. The rest of Kiku's line that she hasn't reached yet is tinted cobalt, not struck. Her live transcript runs underneath in red, and Kiku's queued next line sits below that in grey type.

## How the seed shaped it

- Capitals slightly outnumber lower case, and vowels are scarce. That pointed to a compressed, consonant-heavy display face (extra-condensed).
- Tall vertical strokes and V shapes are the most frequent letterforms. They became the vertical binder tabs, tick-mark rules and caret-shaped proof marks.
- The digits bunch into a dense middle band with quiet edges. That set up the composition of a dense central sheet on a quiet ground.
- Three short hex-valid fragments gave the palette: a dark brown-black for ink, a warm mid grey lifted into concrete, and a rust-red read as proof ink.
- One embedded number, read as an angle, sets the hatch slant (73.8°) used on escalation and on-air edges.
