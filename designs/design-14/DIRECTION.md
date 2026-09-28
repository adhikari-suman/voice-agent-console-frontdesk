# Design 14: Shared Run

**Pitch:** Kiku and the human are two overlapping voices. The console reads the specialist's speech as a single line, and the words Kiku wrote that went unsaid float above it as small struck glosses.

## Palette
| Role | Hex |
|---|---|
| Ground (app background) | `#ECEEE9` |
| Rail | `#DFE3DB` |
| Paper (panels) | `#FAFBF8` |
| Ink | `#1E2421`, secondary `#4A524D`, muted `#666E69` |
| Kiku sage (machine voice) | `#7AB86E`, deep `#386A31`, wash `#E3EFDF` |
| Human violet (a person speaking) | `#8A77CA`, deep `#5A459E`, wash `#ECE7F8` |
| Escalated amber | `#A8650F`, wash `#F5E9D4` |
| Failed red | `#AE3B2B`, wash `#F4E0DB` |

Accent rule: sage always means Kiku and violet always means a human voice. The logo shows the two as overlapping discs. Each status pairs its colour with a shape and a label: a filled check disc for Completed, a half-filled disc for In progress, a triangle for Escalated and a crossed square for Failed.

## Type
- **Schibsted Grotesk**: interface, labels and numbers.
- **Spline Sans Mono**: anything Kiku writes, including agent lines, drafts, scripts and opening lines.
- **Newsreader**: anything a human says in karaoke. Improvised words are set in italic.

The typeface tells you who is speaking: mono for the machine and serif for the person.

## Layout
- A light 88px **vertical rail** replaces a top bar. It holds the overlap mark, the role-specific navigation (the Users item appears for admins only), the hotel clock and the signed-in person. The rail turns solid violet and shows "You're on air" when the specialist has taken over. With the violet call header, it makes an L-shaped on-air frame.
- Pages are flat bordered panels on the cool ground. There are no side-tab accent borders. Selection is a full outline or a tinted fill.
- **Audit composition:** a left **dossier** reads like a receipt, with the guest, facts, escalation reason and the outcome and total anchored at the bottom. On the right, the message history runs down a **vertical spine**. The spine is sage until the takeover and violet after it, with triangle, headphone and mic nodes for escalation, join and takeover. A compact scrubber with escalation and takeover ticks sits in the panel header, next to a chain of seven overlap glyphs, one for each karaoke line.
- Live listening anchors the transcript to the bottom like a feed. Kiku's draft appears inline as the next line, with a caret.

## Karaoke visualisation: gloss flow
- Each karaoke turn is **one reading line** of what the specialist said, in serif.
  - `same` words: plain ink serif.
  - `ins` words: violet italic with a violet underline. These are the specialist's own words.
  - `del` words: small sage mono, struck through, raised above the baseline as a gloss chip. These are what Kiku wrote but nobody said.
- **Overlap glyph:** two rings, sage and violet. Their overlap is proportional to the share of Kiku's words the specialist kept. At 100% they merge into one filled disc, which marks the line "Spoken as written".
- **Live prompter:** Kiku's current line is shown large in mono, with the words already covered highlighted. Below it, the specialist's live speech appears at 30px in gloss flow with a blinking caret. Words Kiku wrote that are still ahead show as dashed ghost glosses rather than struck ones. The queued next line waits at the bottom.

## How the seed shaped it
- The seed contained a hexadecimal run that holds two colour values sharing most of their characters. They became the sage and the violet. Because the two values overlap in one run, the core idea became overlap rather than two separate lanes. That is why the logo, the kept-words glyph and the audit spine all come from overlapping circles or a shared line.
- Exactly half of the seed's letters were capitals. That became the even weighting of the two voices, which is also why the rail flips completely to violet when the human is on air.
- The seed was a power-of-two length with only a sparse scatter of digits, so numerals stay quiet and set in the interface face. Mono is reserved for the machine voice rather than for data labels.
