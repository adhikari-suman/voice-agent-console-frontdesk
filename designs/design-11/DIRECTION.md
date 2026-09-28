# Crosswire

**Pitch:** two voices, two colours, joined line by line. Kiku writes in orchid, the human speaks in saffron, and every screen shows which one is on the line.

## Palette

| Role | Hex |
|---|---|
| Rail / ink plum (nav, primary buttons, prompter) | `#221832` |
| Text ink | `#1E1729` |
| Workspace paper (cool lavender grey) | `#F2F0F7` |
| Surface | `#FFFFFF` |
| Orchid: Kiku, the machine voice (fills) / text | `#BD55E6` / `#8A2DB5` |
| Saffron: a human on the line, escalation (fills) / text | `#F4A92A` / `#8A5400` |
| Completed green | `#2B8756` |
| Failed brick | `#C13A31` |
| Hairlines | `#E3DEEC`, `#CCC4DA` |

Colour is split by **who is speaking**, not by decoration. Orchid always means Kiku, saffron always means a person, including the "Escalated" state (a call that needs a person). The "Take over" button, the on-air band and the human side of every diff are all saffron.

Statuses always pair a shape and a label: Completed is a filled circle with a tick, In progress is a ring with a centre dot, Escalated is a triangle with "!", Failed is a square with an X.

## Type

- **Anybody** (Google Fonts, variable width) for headings, numerals, promo codes and the prompter. It is set slightly expanded (110–130% width) for titles and the wordmark, and at normal width for the prompter script.
- **Instrument Sans** for UI and body text, with tabular numerals throughout.

## Layout

- A fixed 216px plum rail with the wordmark, then role-aware navigation (the specialist sees a Live board with a waiting-count badge; the admin sees Team / Users). Outbound sits in both. The user chip and the demo-data note sit at the foot of the rail.
- Fonts and icons are self-hosted copies (Google Fonts woff2, lucide from jsDelivr) in `src/vendor/`, so screenshots render reliably.
- A white 52px top bar holds breadcrumbs, the hotel line with a live dot, the date and the time.
- The workspace is lavender paper with white panels on a main + side-column grid (`minmax(0,1fr)` plus a 340–390px aside). Panels scroll internally so every page fits 1440×900.
- Section dividers use a doubled hairline (the "twin rule"), for example on system events in transcripts.
- Motion is limited to live signals: a pulsing on-air ring, a blinking speech caret and Kiku's drafting dots. All three respect reduced motion.

## Karaoke: the crossing view

The diff is drawn as **parallel text joined by crossing curves**, not as stacked lanes. Kiku's line sits on the left in small type. What the specialist said sits on the right at reading size. The two are split by a 64px gutter:

- **same** runs appear as light outlined chips on both sides. Each pair is joined by a curve drawn across the gutter. Because the two sides wrap differently, the curves bend and cross, which makes the drift between script and speech visible at a glance.
- **del** words stay on the left only, struck through in orchid, with no curve.
- **ins** words appear on the right only, with a saffron highlight and underline and no curve.
- Each karaoke turn has a small ring dial showing its match %. A line spoken as written collapses into a single green "Spoken as written" block. The panel header summarises all seven lines as a row of ring dials.

**Audit composition (04):** there is no header strip and no horizontal player. A left "call file" column holds the guest, a compact dark player, the facts, and the outcome with its £ total. The message history on the right has a **vertical recording spine**: the waveform runs top to bottom, is coloured by who was speaking, marks 00:36 and 00:52 with tags and a playhead, and shows a bracket for the part of the call currently on screen.

**Live (06):** the prompter is a dark plum teleprompter. Kiku's current line is set large. Words the specialist has already matched light up white with an orchid underline, words she skipped are struck, and the part she hasn't reached yet is dashed. Below it, her live speech streams in with improvised words in saffron and a blinking caret. The queued next line waits beneath a dashed rule. A full-width saffron on-air band ("You're on the line with Margaret Doyle"), with a pulsing mic, the call clock and Mute / Hand back to Kiku / End call, makes it unmistakable that a human is speaking.

## How the seed shaped it

- The seed held exactly one six-character hexadecimal run. Read as a colour, it gave the orchid accent, so the whole palette grew out of that single embedded value, with a complementary warm saffron as its counter-voice.
- Capitals slightly outnumbered lowercase, and digits were sparse (about one character in seven). That suggested a confident, mostly-letter display voice with numbers used as rare, heavy accents. Hence the wide Anybody headings and the bold numerals set inline in sentences instead of stat tiles.
- The most frequent character was a cross-shaped letter. It became the crossing curves and strike-throughs of the karaoke diff, and the X-in-a-square Failed mark.
- Several doubled characters appeared at scattered points. They became the recurring *pairing* motif: script and speech side by side, the twin hairline rule, and a brand mark made of two offset bars.
