# Kiku: voice agent console design directions

Ten visual directions for **Kiku**, a console for a hotel's LLM voice agent. Kiku answers the hotel line, places outbound calls (campaign, upsell, and general "make a call"), and hands a call to a human specialist when it's escalated. When a specialist takes over, **karaoke mode** shows them the line Kiku would have said while they speak in their own words. The call audit then shows both versions side by side.

Every direction covers the same ten screens, rendered at 1440×900 (2x PNG):

`01-sign-in` · `02-live-overview` · `03-call-logs` · `04-call-audit` · `05-live-call-listening` · `06-takeover-karaoke` · `07-outbound-campaign` · `08-outbound-upsell` · `09-outbound-make-a-call` · `10-users`

All hotel, guest, booking and phone data is fictional (The Brenlow, Edinburgh). Phone numbers use ranges reserved for fiction.

## Directions

| # | Direction | World |
|---|---|---|
| 1 | [Mirror Spine](designs/design-1) | Swiss grid; the AI's script and the specialist's words face each other across a central timecode spine |
| 2 | [Overprint](designs/design-2) | Two-ink risograph; the AI prints pink, the specialist blue, and shared words overprint violet |
| 3 | [Score](designs/design-3) | Orchestral score; each voice on its own staff, the AI's script on an ossia staff above the specialist |
| 4 | [Gallery](designs/design-4) | Broadcast control room; teleprompter script, on-air captions, a TAKE key for take over |
| 5 | [Deck](designs/design-5) | 1960s audio equipment; keys, lamps, VU meters, two-track tape audit |
| 6 | [Booth](designs/design-6) | Interpretation booth; floor channel for the AI, interpretation channel for the specialist |
| 7 | [Title Strip](designs/design-7) | Jukebox 45s; A-side is what the AI wrote, B-side is what the specialist said |
| 8 | [Strip Bay](designs/design-8) | Air-traffic-control flight strips, amended by hand |
| 9 | [Night Desk](designs/design-9) | The hotel lobby after dark; lacquer, brass, guest-folio audit |
| 10 | [Phyllotaxis](designs/design-10) | Chrysanthemum florets on Fibonacci proportions; calls bloom on the live board |

### The call audit screen in each direction

| | |
|---|---|
| ![Design 1](designs/design-1/04-call-audit.png) | ![Design 2](designs/design-2/04-call-audit.png) |
| ![Design 3](designs/design-3/04-call-audit.png) | ![Design 4](designs/design-4/04-call-audit.png) |
| ![Design 5](designs/design-5/04-call-audit.png) | ![Design 6](designs/design-6/04-call-audit.png) |
| ![Design 7](designs/design-7/04-call-audit.png) | ![Design 8](designs/design-8/04-call-audit.png) |
| ![Design 9](designs/design-9/04-call-audit.png) | ![Design 10](designs/design-10/04-call-audit.png) |

## Layout

- `designs/design-N/*.png`: the rendered screens
- `designs/design-N/src/`: static HTML/CSS/JS source for each screen
- `designs/_shared/data.js`: the shared demo data every design renders from
- `designs/_shared/SCREENS.md`: what each screen must show
- `designs/index.html`: a local gallery of all 100 screens (open it in a browser)
- `PRODUCT.md`: product context

## Re-rendering

Requires Google Chrome on macOS and Node.

```sh
node designs/_shared/shoot.mjs design-3          # all ten screens of one design
node designs/_shared/shoot.mjs design-3 04-      # a single screen
```
