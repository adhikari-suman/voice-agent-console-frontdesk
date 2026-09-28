# Kiku: voice agent console design directions

Kiku is a console for a hotel's LLM voice agent. The agent answers the hotel line and places outbound calls (campaign, upsell, make a call). Staff review call logs, listen in on live calls, and take over escalated calls. During a takeover, **karaoke mode** shows the specialist the line Kiku wrote while they speak, and the audit afterwards shows both what Kiku wrote and what the specialist said.

This repo holds fifteen visual directions for that console. Each was created by a separate design agent working from its own seed string, and each renders the same ten screens from shared, fictional demo data (The Brenlow, Edinburgh).

## At a glance: the call audit screen

| | | |
|---|---|---|
| **1. Midline**<br><a href="designs/design-1/04-call-audit.png"><img src="designs/design-1/04-call-audit.png" width="280" alt="Design 1: 04-call-audit"></a> | **2. Braid**<br><a href="designs/design-2/04-call-audit.png"><img src="designs/design-2/04-call-audit.png" width="280" alt="Design 2: 04-call-audit"></a> | **3. Galley Proof**<br><a href="designs/design-3/04-call-audit.png"><img src="designs/design-3/04-call-audit.png" width="280" alt="Design 3: 04-call-audit"></a> |
| **4. Split Reel**<br><a href="designs/design-4/04-call-audit.png"><img src="designs/design-4/04-call-audit.png" width="280" alt="Design 4: 04-call-audit"></a> | **5. Duet Stave**<br><a href="designs/design-5/04-call-audit.png"><img src="designs/design-5/04-call-audit.png" width="280" alt="Design 5: 04-call-audit"></a> | **6. Proof Desk**<br><a href="designs/design-6/04-call-audit.png"><img src="designs/design-6/04-call-audit.png" width="280" alt="Design 6: 04-call-audit"></a> |
| **7. Interlinear**<br><a href="designs/design-7/04-call-audit.png"><img src="designs/design-7/04-call-audit.png" width="280" alt="Design 7: 04-call-audit"></a> | **8. Pencil & Yolk**<br><a href="designs/design-8/04-call-audit.png"><img src="designs/design-8/04-call-audit.png" width="280" alt="Design 8: 04-call-audit"></a> | **9. Twin Track**<br><a href="designs/design-9/04-call-audit.png"><img src="designs/design-9/04-call-audit.png" width="280" alt="Design 9: 04-call-audit"></a> |
| **10. Stitchline**<br><a href="designs/design-10/04-call-audit.png"><img src="designs/design-10/04-call-audit.png" width="280" alt="Design 10: 04-call-audit"></a> | **11. Crosswire**<br><a href="designs/design-11/04-call-audit.png"><img src="designs/design-11/04-call-audit.png" width="280" alt="Design 11: 04-call-audit"></a> | **12. Switchboard**<br><a href="designs/design-12/04-call-audit.png"><img src="designs/design-12/04-call-audit.png" width="280" alt="Design 12: 04-call-audit"></a> |
| **13. Anaglyph**<br><a href="designs/design-13/04-call-audit.png"><img src="designs/design-13/04-call-audit.png" width="280" alt="Design 13: 04-call-audit"></a> | **14. Shared Run**<br><a href="designs/design-14/04-call-audit.png"><img src="designs/design-14/04-call-audit.png" width="280" alt="Design 14: 04-call-audit"></a> | **15. Lime Splice**<br><a href="designs/design-15/04-call-audit.png"><img src="designs/design-15/04-call-audit.png" width="280" alt="Design 15: 04-call-audit"></a> |

## Directions

- [1. Midline](#1-midline)
- [2. Braid](#2-braid)
- [3. Galley Proof](#3-galley-proof)
- [4. Split Reel](#4-split-reel)
- [5. Duet Stave](#5-duet-stave)
- [6. Proof Desk](#6-proof-desk)
- [7. Interlinear](#7-interlinear)
- [8. Pencil & Yolk](#8-pencil--yolk)
- [9. Twin Track](#9-twin-track)
- [10. Stitchline](#10-stitchline)
- [11. Crosswire](#11-crosswire)
- [12. Switchboard](#12-switchboard)
- [13. Anaglyph](#13-anaglyph)
- [14. Shared Run](#14-shared-run)
- [15. Lime Splice](#15-lime-splice)

## 1. Midline

one line runs through the whole console. Kiku's script sits above it, the person's words hang below it, and anything kept from the script travels along it as a bead.

[Direction notes](designs/design-1/DIRECTION.md) · [Source](designs/design-1/src)

<a href="designs/design-1/04-call-audit.png"><img src="designs/design-1/04-call-audit.png" width="880" alt="Design 1: 04-call-audit"></a>

| | | |
|---|---|---|
| Sign in<br><a href="designs/design-1/01-sign-in.png"><img src="designs/design-1/01-sign-in.png" width="280" alt="Design 1: 01-sign-in"></a> | Live board<br><a href="designs/design-1/02-live-overview.png"><img src="designs/design-1/02-live-overview.png" width="280" alt="Design 1: 02-live-overview"></a> | Call logs<br><a href="designs/design-1/03-call-logs.png"><img src="designs/design-1/03-call-logs.png" width="280" alt="Design 1: 03-call-logs"></a> |
| Live listening<br><a href="designs/design-1/05-live-call-listening.png"><img src="designs/design-1/05-live-call-listening.png" width="280" alt="Design 1: 05-live-call-listening"></a> | Takeover (karaoke)<br><a href="designs/design-1/06-takeover-karaoke.png"><img src="designs/design-1/06-takeover-karaoke.png" width="280" alt="Design 1: 06-takeover-karaoke"></a> | Campaign<br><a href="designs/design-1/07-outbound-campaign.png"><img src="designs/design-1/07-outbound-campaign.png" width="280" alt="Design 1: 07-outbound-campaign"></a> |
| Upsell<br><a href="designs/design-1/08-outbound-upsell.png"><img src="designs/design-1/08-outbound-upsell.png" width="280" alt="Design 1: 08-outbound-upsell"></a> | Make a call<br><a href="designs/design-1/09-outbound-make-a-call.png"><img src="designs/design-1/09-outbound-make-a-call.png" width="280" alt="Design 1: 09-outbound-make-a-call"></a> | Users<br><a href="designs/design-1/10-users.png"><img src="designs/design-1/10-users.png" width="280" alt="Design 1: 10-users"></a> |

## 2. Braid

Two voices, one line. Kiku is a violet rail with square corners and a specialist is a rose rail with round ones. Where they agree, the rails open into a lens that holds the shared words.

[Direction notes](designs/design-2/DIRECTION.md) · [Source](designs/design-2/src)

<a href="designs/design-2/04-call-audit.png"><img src="designs/design-2/04-call-audit.png" width="880" alt="Design 2: 04-call-audit"></a>

| | | |
|---|---|---|
| Sign in<br><a href="designs/design-2/01-sign-in.png"><img src="designs/design-2/01-sign-in.png" width="280" alt="Design 2: 01-sign-in"></a> | Live board<br><a href="designs/design-2/02-live-overview.png"><img src="designs/design-2/02-live-overview.png" width="280" alt="Design 2: 02-live-overview"></a> | Call logs<br><a href="designs/design-2/03-call-logs.png"><img src="designs/design-2/03-call-logs.png" width="280" alt="Design 2: 03-call-logs"></a> |
| Live listening<br><a href="designs/design-2/05-live-call-listening.png"><img src="designs/design-2/05-live-call-listening.png" width="280" alt="Design 2: 05-live-call-listening"></a> | Takeover (karaoke)<br><a href="designs/design-2/06-takeover-karaoke.png"><img src="designs/design-2/06-takeover-karaoke.png" width="280" alt="Design 2: 06-takeover-karaoke"></a> | Campaign<br><a href="designs/design-2/07-outbound-campaign.png"><img src="designs/design-2/07-outbound-campaign.png" width="280" alt="Design 2: 07-outbound-campaign"></a> |
| Upsell<br><a href="designs/design-2/08-outbound-upsell.png"><img src="designs/design-2/08-outbound-upsell.png" width="280" alt="Design 2: 08-outbound-upsell"></a> | Make a call<br><a href="designs/design-2/09-outbound-make-a-call.png"><img src="designs/design-2/09-outbound-make-a-call.png" width="280" alt="Design 2: 09-outbound-make-a-call"></a> | Users<br><a href="designs/design-2/10-users.png"><img src="designs/design-2/10-users.png" width="280" alt="Design 2: 10-users"></a> |

## 3. Galley Proof

Kiku sets the type and your team marks it up. Every karaoke line reads like a proof sheet: Kiku's script in black, cut words struck through in proof red, and the specialist's own words raised above the line.

[Direction notes](designs/design-3/DIRECTION.md) · [Source](designs/design-3/src)

<a href="designs/design-3/04-call-audit.png"><img src="designs/design-3/04-call-audit.png" width="880" alt="Design 3: 04-call-audit"></a>

| | | |
|---|---|---|
| Sign in<br><a href="designs/design-3/01-sign-in.png"><img src="designs/design-3/01-sign-in.png" width="280" alt="Design 3: 01-sign-in"></a> | Live board<br><a href="designs/design-3/02-live-overview.png"><img src="designs/design-3/02-live-overview.png" width="280" alt="Design 3: 02-live-overview"></a> | Call logs<br><a href="designs/design-3/03-call-logs.png"><img src="designs/design-3/03-call-logs.png" width="280" alt="Design 3: 03-call-logs"></a> |
| Live listening<br><a href="designs/design-3/05-live-call-listening.png"><img src="designs/design-3/05-live-call-listening.png" width="280" alt="Design 3: 05-live-call-listening"></a> | Takeover (karaoke)<br><a href="designs/design-3/06-takeover-karaoke.png"><img src="designs/design-3/06-takeover-karaoke.png" width="280" alt="Design 3: 06-takeover-karaoke"></a> | Campaign<br><a href="designs/design-3/07-outbound-campaign.png"><img src="designs/design-3/07-outbound-campaign.png" width="280" alt="Design 3: 07-outbound-campaign"></a> |
| Upsell<br><a href="designs/design-3/08-outbound-upsell.png"><img src="designs/design-3/08-outbound-upsell.png" width="280" alt="Design 3: 08-outbound-upsell"></a> | Make a call<br><a href="designs/design-3/09-outbound-make-a-call.png"><img src="designs/design-3/09-outbound-make-a-call.png" width="280" alt="Design 3: 09-outbound-make-a-call"></a> | Users<br><a href="designs/design-3/10-users.png"><img src="designs/design-3/10-users.png" width="280" alt="Design 3: 10-users"></a> |

## 4. Split Reel

every call is two tracks. Kiku writes on the top track, a person speaks on the bottom one, and the console shows where they run together and where they split.

[Direction notes](designs/design-4/DIRECTION.md) · [Source](designs/design-4/src)

<a href="designs/design-4/04-call-audit.png"><img src="designs/design-4/04-call-audit.png" width="880" alt="Design 4: 04-call-audit"></a>

| | | |
|---|---|---|
| Sign in<br><a href="designs/design-4/01-sign-in.png"><img src="designs/design-4/01-sign-in.png" width="280" alt="Design 4: 01-sign-in"></a> | Live board<br><a href="designs/design-4/02-live-overview.png"><img src="designs/design-4/02-live-overview.png" width="280" alt="Design 4: 02-live-overview"></a> | Call logs<br><a href="designs/design-4/03-call-logs.png"><img src="designs/design-4/03-call-logs.png" width="280" alt="Design 4: 03-call-logs"></a> |
| Live listening<br><a href="designs/design-4/05-live-call-listening.png"><img src="designs/design-4/05-live-call-listening.png" width="280" alt="Design 4: 05-live-call-listening"></a> | Takeover (karaoke)<br><a href="designs/design-4/06-takeover-karaoke.png"><img src="designs/design-4/06-takeover-karaoke.png" width="280" alt="Design 4: 06-takeover-karaoke"></a> | Campaign<br><a href="designs/design-4/07-outbound-campaign.png"><img src="designs/design-4/07-outbound-campaign.png" width="280" alt="Design 4: 07-outbound-campaign"></a> |
| Upsell<br><a href="designs/design-4/08-outbound-upsell.png"><img src="designs/design-4/08-outbound-upsell.png" width="280" alt="Design 4: 08-outbound-upsell"></a> | Make a call<br><a href="designs/design-4/09-outbound-make-a-call.png"><img src="designs/design-4/09-outbound-make-a-call.png" width="280" alt="Design 4: 09-outbound-make-a-call"></a> | Users<br><a href="designs/design-4/10-users.png"><img src="designs/design-4/10-users.png" width="280" alt="Design 4: 10-users"></a> |

## 5. Duet Stave

Kiku and the specialist are two voices on one line of music. Words they share sit on the line. Kiku's unspoken words rise above it. The person's own words drop below it.

[Direction notes](designs/design-5/DIRECTION.md) · [Source](designs/design-5/src)

<a href="designs/design-5/04-call-audit.png"><img src="designs/design-5/04-call-audit.png" width="880" alt="Design 5: 04-call-audit"></a>

| | | |
|---|---|---|
| Sign in<br><a href="designs/design-5/01-sign-in.png"><img src="designs/design-5/01-sign-in.png" width="280" alt="Design 5: 01-sign-in"></a> | Live board<br><a href="designs/design-5/02-live-overview.png"><img src="designs/design-5/02-live-overview.png" width="280" alt="Design 5: 02-live-overview"></a> | Call logs<br><a href="designs/design-5/03-call-logs.png"><img src="designs/design-5/03-call-logs.png" width="280" alt="Design 5: 03-call-logs"></a> |
| Live listening<br><a href="designs/design-5/05-live-call-listening.png"><img src="designs/design-5/05-live-call-listening.png" width="280" alt="Design 5: 05-live-call-listening"></a> | Takeover (karaoke)<br><a href="designs/design-5/06-takeover-karaoke.png"><img src="designs/design-5/06-takeover-karaoke.png" width="280" alt="Design 5: 06-takeover-karaoke"></a> | Campaign<br><a href="designs/design-5/07-outbound-campaign.png"><img src="designs/design-5/07-outbound-campaign.png" width="280" alt="Design 5: 07-outbound-campaign"></a> |
| Upsell<br><a href="designs/design-5/08-outbound-upsell.png"><img src="designs/design-5/08-outbound-upsell.png" width="280" alt="Design 5: 08-outbound-upsell"></a> | Make a call<br><a href="designs/design-5/09-outbound-make-a-call.png"><img src="designs/design-5/09-outbound-make-a-call.png" width="280" alt="Design 5: 09-outbound-make-a-call"></a> | Users<br><a href="designs/design-5/10-users.png"><img src="designs/design-5/10-users.png" width="280" alt="Design 5: 10-users"></a> |

## 6. Proof Desk

A desk for proofreading voice calls. Karaoke turns are marked up like a proof, as one line of prose where the words Kiku wrote but nobody said are struck and the words the specialist improvised are underlined. Navigation sits in a command dock at the bottom of the screen, and that dock becomes the call's control bar whenever a human is on the line.

[Direction notes](designs/design-6/DIRECTION.md) · [Source](designs/design-6/src)

<a href="designs/design-6/04-call-audit.png"><img src="designs/design-6/04-call-audit.png" width="880" alt="Design 6: 04-call-audit"></a>

| | | |
|---|---|---|
| Sign in<br><a href="designs/design-6/01-sign-in.png"><img src="designs/design-6/01-sign-in.png" width="280" alt="Design 6: 01-sign-in"></a> | Live board<br><a href="designs/design-6/02-live-overview.png"><img src="designs/design-6/02-live-overview.png" width="280" alt="Design 6: 02-live-overview"></a> | Call logs<br><a href="designs/design-6/03-call-logs.png"><img src="designs/design-6/03-call-logs.png" width="280" alt="Design 6: 03-call-logs"></a> |
| Live listening<br><a href="designs/design-6/05-live-call-listening.png"><img src="designs/design-6/05-live-call-listening.png" width="280" alt="Design 6: 05-live-call-listening"></a> | Takeover (karaoke)<br><a href="designs/design-6/06-takeover-karaoke.png"><img src="designs/design-6/06-takeover-karaoke.png" width="280" alt="Design 6: 06-takeover-karaoke"></a> | Campaign<br><a href="designs/design-6/07-outbound-campaign.png"><img src="designs/design-6/07-outbound-campaign.png" width="280" alt="Design 6: 07-outbound-campaign"></a> |
| Upsell<br><a href="designs/design-6/08-outbound-upsell.png"><img src="designs/design-6/08-outbound-upsell.png" width="280" alt="Design 6: 08-outbound-upsell"></a> | Make a call<br><a href="designs/design-6/09-outbound-make-a-call.png"><img src="designs/design-6/09-outbound-make-a-call.png" width="280" alt="Design 6: 09-outbound-make-a-call"></a> | Users<br><a href="designs/design-6/10-users.png"><img src="designs/design-6/10-users.png" width="280" alt="Design 6: 10-users"></a> |

## 7. Interlinear

a console that reads like an annotated script. The specialist's words are the text, and what Kiku wrote hangs above each improvised phrase like a translator's gloss.

[Direction notes](designs/design-7/DIRECTION.md) · [Source](designs/design-7/src)

<a href="designs/design-7/04-call-audit.png"><img src="designs/design-7/04-call-audit.png" width="880" alt="Design 7: 04-call-audit"></a>

| | | |
|---|---|---|
| Sign in<br><a href="designs/design-7/01-sign-in.png"><img src="designs/design-7/01-sign-in.png" width="280" alt="Design 7: 01-sign-in"></a> | Live board<br><a href="designs/design-7/02-live-overview.png"><img src="designs/design-7/02-live-overview.png" width="280" alt="Design 7: 02-live-overview"></a> | Call logs<br><a href="designs/design-7/03-call-logs.png"><img src="designs/design-7/03-call-logs.png" width="280" alt="Design 7: 03-call-logs"></a> |
| Live listening<br><a href="designs/design-7/05-live-call-listening.png"><img src="designs/design-7/05-live-call-listening.png" width="280" alt="Design 7: 05-live-call-listening"></a> | Takeover (karaoke)<br><a href="designs/design-7/06-takeover-karaoke.png"><img src="designs/design-7/06-takeover-karaoke.png" width="280" alt="Design 7: 06-takeover-karaoke"></a> | Campaign<br><a href="designs/design-7/07-outbound-campaign.png"><img src="designs/design-7/07-outbound-campaign.png" width="280" alt="Design 7: 07-outbound-campaign"></a> |
| Upsell<br><a href="designs/design-7/08-outbound-upsell.png"><img src="designs/design-7/08-outbound-upsell.png" width="280" alt="Design 7: 08-outbound-upsell"></a> | Make a call<br><a href="designs/design-7/09-outbound-make-a-call.png"><img src="designs/design-7/09-outbound-make-a-call.png" width="280" alt="Design 7: 09-outbound-make-a-call"></a> | Users<br><a href="designs/design-7/10-users.png"><img src="designs/design-7/10-users.png" width="280" alt="Design 7: 10-users"></a> |

## 8. Pencil & Yolk

Kiku writes in pencil and people speak in yolk. Every call reads as a duet: Kiku's lines sit on the left, the people's lines sit on the right, and the recording runs down the spine between them.

[Direction notes](designs/design-8/DIRECTION.md) · [Source](designs/design-8/src)

<a href="designs/design-8/04-call-audit.png"><img src="designs/design-8/04-call-audit.png" width="880" alt="Design 8: 04-call-audit"></a>

| | | |
|---|---|---|
| Sign in<br><a href="designs/design-8/01-sign-in.png"><img src="designs/design-8/01-sign-in.png" width="280" alt="Design 8: 01-sign-in"></a> | Live board<br><a href="designs/design-8/02-live-overview.png"><img src="designs/design-8/02-live-overview.png" width="280" alt="Design 8: 02-live-overview"></a> | Call logs<br><a href="designs/design-8/03-call-logs.png"><img src="designs/design-8/03-call-logs.png" width="280" alt="Design 8: 03-call-logs"></a> |
| Live listening<br><a href="designs/design-8/05-live-call-listening.png"><img src="designs/design-8/05-live-call-listening.png" width="280" alt="Design 8: 05-live-call-listening"></a> | Takeover (karaoke)<br><a href="designs/design-8/06-takeover-karaoke.png"><img src="designs/design-8/06-takeover-karaoke.png" width="280" alt="Design 8: 06-takeover-karaoke"></a> | Campaign<br><a href="designs/design-8/07-outbound-campaign.png"><img src="designs/design-8/07-outbound-campaign.png" width="280" alt="Design 8: 07-outbound-campaign"></a> |
| Upsell<br><a href="designs/design-8/08-outbound-upsell.png"><img src="designs/design-8/08-outbound-upsell.png" width="280" alt="Design 8: 08-outbound-upsell"></a> | Make a call<br><a href="designs/design-8/09-outbound-make-a-call.png"><img src="designs/design-8/09-outbound-make-a-call.png" width="280" alt="Design 8: 09-outbound-make-a-call"></a> | Users<br><a href="designs/design-8/10-users.png"><img src="designs/design-8/10-users.png" width="280" alt="Design 8: 10-users"></a> |

## 9. Twin Track

Every karaoke line is shown as two aligned lanes, with Kiku's script on the upper lane and the human voice on the lower one, so you can see at a glance where the specialist kept the script, skipped it or improvised.

[Direction notes](designs/design-9/DIRECTION.md) · [Source](designs/design-9/src)

<a href="designs/design-9/04-call-audit.png"><img src="designs/design-9/04-call-audit.png" width="880" alt="Design 9: 04-call-audit"></a>

| | | |
|---|---|---|
| Sign in<br><a href="designs/design-9/01-sign-in.png"><img src="designs/design-9/01-sign-in.png" width="280" alt="Design 9: 01-sign-in"></a> | Live board<br><a href="designs/design-9/02-live-overview.png"><img src="designs/design-9/02-live-overview.png" width="280" alt="Design 9: 02-live-overview"></a> | Call logs<br><a href="designs/design-9/03-call-logs.png"><img src="designs/design-9/03-call-logs.png" width="280" alt="Design 9: 03-call-logs"></a> |
| Live listening<br><a href="designs/design-9/05-live-call-listening.png"><img src="designs/design-9/05-live-call-listening.png" width="280" alt="Design 9: 05-live-call-listening"></a> | Takeover (karaoke)<br><a href="designs/design-9/06-takeover-karaoke.png"><img src="designs/design-9/06-takeover-karaoke.png" width="280" alt="Design 9: 06-takeover-karaoke"></a> | Campaign<br><a href="designs/design-9/07-outbound-campaign.png"><img src="designs/design-9/07-outbound-campaign.png" width="280" alt="Design 9: 07-outbound-campaign"></a> |
| Upsell<br><a href="designs/design-9/08-outbound-upsell.png"><img src="designs/design-9/08-outbound-upsell.png" width="280" alt="Design 9: 08-outbound-upsell"></a> | Make a call<br><a href="designs/design-9/09-outbound-make-a-call.png"><img src="designs/design-9/09-outbound-make-a-call.png" width="280" alt="Design 9: 09-outbound-make-a-call"></a> | Users<br><a href="designs/design-9/10-users.png"><img src="designs/design-9/10-users.png" width="280" alt="Design 9: 10-users"></a> |

## 10. Stitchline

Kiku's script and the specialist's words sit side by side as two readable columns. Where the specialist kept Kiku's words, a dashed thread stitches the two columns together across a gutter.

[Direction notes](designs/design-10/DIRECTION.md) · [Source](designs/design-10/src)

<a href="designs/design-10/04-call-audit.png"><img src="designs/design-10/04-call-audit.png" width="880" alt="Design 10: 04-call-audit"></a>

| | | |
|---|---|---|
| Sign in<br><a href="designs/design-10/01-sign-in.png"><img src="designs/design-10/01-sign-in.png" width="280" alt="Design 10: 01-sign-in"></a> | Live board<br><a href="designs/design-10/02-live-overview.png"><img src="designs/design-10/02-live-overview.png" width="280" alt="Design 10: 02-live-overview"></a> | Call logs<br><a href="designs/design-10/03-call-logs.png"><img src="designs/design-10/03-call-logs.png" width="280" alt="Design 10: 03-call-logs"></a> |
| Live listening<br><a href="designs/design-10/05-live-call-listening.png"><img src="designs/design-10/05-live-call-listening.png" width="280" alt="Design 10: 05-live-call-listening"></a> | Takeover (karaoke)<br><a href="designs/design-10/06-takeover-karaoke.png"><img src="designs/design-10/06-takeover-karaoke.png" width="280" alt="Design 10: 06-takeover-karaoke"></a> | Campaign<br><a href="designs/design-10/07-outbound-campaign.png"><img src="designs/design-10/07-outbound-campaign.png" width="280" alt="Design 10: 07-outbound-campaign"></a> |
| Upsell<br><a href="designs/design-10/08-outbound-upsell.png"><img src="designs/design-10/08-outbound-upsell.png" width="280" alt="Design 10: 08-outbound-upsell"></a> | Make a call<br><a href="designs/design-10/09-outbound-make-a-call.png"><img src="designs/design-10/09-outbound-make-a-call.png" width="280" alt="Design 10: 09-outbound-make-a-call"></a> | Users<br><a href="designs/design-10/10-users.png"><img src="designs/design-10/10-users.png" width="280" alt="Design 10: 10-users"></a> |

## 11. Crosswire

two voices, two colours, joined line by line. Kiku writes in orchid, the human speaks in saffron, and every screen shows which one is on the line.

[Direction notes](designs/design-11/DIRECTION.md) · [Source](designs/design-11/src)

<a href="designs/design-11/04-call-audit.png"><img src="designs/design-11/04-call-audit.png" width="880" alt="Design 11: 04-call-audit"></a>

| | | |
|---|---|---|
| Sign in<br><a href="designs/design-11/01-sign-in.png"><img src="designs/design-11/01-sign-in.png" width="280" alt="Design 11: 01-sign-in"></a> | Live board<br><a href="designs/design-11/02-live-overview.png"><img src="designs/design-11/02-live-overview.png" width="280" alt="Design 11: 02-live-overview"></a> | Call logs<br><a href="designs/design-11/03-call-logs.png"><img src="designs/design-11/03-call-logs.png" width="280" alt="Design 11: 03-call-logs"></a> |
| Live listening<br><a href="designs/design-11/05-live-call-listening.png"><img src="designs/design-11/05-live-call-listening.png" width="280" alt="Design 11: 05-live-call-listening"></a> | Takeover (karaoke)<br><a href="designs/design-11/06-takeover-karaoke.png"><img src="designs/design-11/06-takeover-karaoke.png" width="280" alt="Design 11: 06-takeover-karaoke"></a> | Campaign<br><a href="designs/design-11/07-outbound-campaign.png"><img src="designs/design-11/07-outbound-campaign.png" width="280" alt="Design 11: 07-outbound-campaign"></a> |
| Upsell<br><a href="designs/design-11/08-outbound-upsell.png"><img src="designs/design-11/08-outbound-upsell.png" width="280" alt="Design 11: 08-outbound-upsell"></a> | Make a call<br><a href="designs/design-11/09-outbound-make-a-call.png"><img src="designs/design-11/09-outbound-make-a-call.png" width="280" alt="Design 11: 09-outbound-make-a-call"></a> | Users<br><a href="designs/design-11/10-users.png"><img src="designs/design-11/10-users.png" width="280" alt="Design 11: 10-users"></a> |

## 12. Switchboard

Kiku works like the hotel's old telephone exchange. The app sits above a yellow operator's desk, calls are lines with lamps, and karaoke mode is a patch bay: numbered cords join the words a specialist kept from Kiku's script.

[Direction notes](designs/design-12/DIRECTION.md) · [Source](designs/design-12/src)

<a href="designs/design-12/04-call-audit.png"><img src="designs/design-12/04-call-audit.png" width="880" alt="Design 12: 04-call-audit"></a>

| | | |
|---|---|---|
| Sign in<br><a href="designs/design-12/01-sign-in.png"><img src="designs/design-12/01-sign-in.png" width="280" alt="Design 12: 01-sign-in"></a> | Live board<br><a href="designs/design-12/02-live-overview.png"><img src="designs/design-12/02-live-overview.png" width="280" alt="Design 12: 02-live-overview"></a> | Call logs<br><a href="designs/design-12/03-call-logs.png"><img src="designs/design-12/03-call-logs.png" width="280" alt="Design 12: 03-call-logs"></a> |
| Live listening<br><a href="designs/design-12/05-live-call-listening.png"><img src="designs/design-12/05-live-call-listening.png" width="280" alt="Design 12: 05-live-call-listening"></a> | Takeover (karaoke)<br><a href="designs/design-12/06-takeover-karaoke.png"><img src="designs/design-12/06-takeover-karaoke.png" width="280" alt="Design 12: 06-takeover-karaoke"></a> | Campaign<br><a href="designs/design-12/07-outbound-campaign.png"><img src="designs/design-12/07-outbound-campaign.png" width="280" alt="Design 12: 07-outbound-campaign"></a> |
| Upsell<br><a href="designs/design-12/08-outbound-upsell.png"><img src="designs/design-12/08-outbound-upsell.png" width="280" alt="Design 12: 08-outbound-upsell"></a> | Make a call<br><a href="designs/design-12/09-outbound-make-a-call.png"><img src="designs/design-12/09-outbound-make-a-call.png" width="280" alt="Design 12: 09-outbound-make-a-call"></a> | Users<br><a href="designs/design-12/10-users.png"><img src="designs/design-12/10-users.png" width="280" alt="Design 12: 10-users"></a> |

## 13. Anaglyph

Two inks, one call. Kiku prints in cyan, people print in magenta, and wherever the specialist says exactly what Kiku wrote, the two inks overprint into a deep blue.

[Direction notes](designs/design-13/DIRECTION.md) · [Source](designs/design-13/src)

<a href="designs/design-13/04-call-audit.png"><img src="designs/design-13/04-call-audit.png" width="880" alt="Design 13: 04-call-audit"></a>

| | | |
|---|---|---|
| Sign in<br><a href="designs/design-13/01-sign-in.png"><img src="designs/design-13/01-sign-in.png" width="280" alt="Design 13: 01-sign-in"></a> | Live board<br><a href="designs/design-13/02-live-overview.png"><img src="designs/design-13/02-live-overview.png" width="280" alt="Design 13: 02-live-overview"></a> | Call logs<br><a href="designs/design-13/03-call-logs.png"><img src="designs/design-13/03-call-logs.png" width="280" alt="Design 13: 03-call-logs"></a> |
| Live listening<br><a href="designs/design-13/05-live-call-listening.png"><img src="designs/design-13/05-live-call-listening.png" width="280" alt="Design 13: 05-live-call-listening"></a> | Takeover (karaoke)<br><a href="designs/design-13/06-takeover-karaoke.png"><img src="designs/design-13/06-takeover-karaoke.png" width="280" alt="Design 13: 06-takeover-karaoke"></a> | Campaign<br><a href="designs/design-13/07-outbound-campaign.png"><img src="designs/design-13/07-outbound-campaign.png" width="280" alt="Design 13: 07-outbound-campaign"></a> |
| Upsell<br><a href="designs/design-13/08-outbound-upsell.png"><img src="designs/design-13/08-outbound-upsell.png" width="280" alt="Design 13: 08-outbound-upsell"></a> | Make a call<br><a href="designs/design-13/09-outbound-make-a-call.png"><img src="designs/design-13/09-outbound-make-a-call.png" width="280" alt="Design 13: 09-outbound-make-a-call"></a> | Users<br><a href="designs/design-13/10-users.png"><img src="designs/design-13/10-users.png" width="280" alt="Design 13: 10-users"></a> |

## 14. Shared Run

Kiku and the human are two overlapping voices. The console reads the specialist's speech as a single line, and the words Kiku wrote that went unsaid float above it as small struck glosses.

[Direction notes](designs/design-14/DIRECTION.md) · [Source](designs/design-14/src)

<a href="designs/design-14/04-call-audit.png"><img src="designs/design-14/04-call-audit.png" width="880" alt="Design 14: 04-call-audit"></a>

| | | |
|---|---|---|
| Sign in<br><a href="designs/design-14/01-sign-in.png"><img src="designs/design-14/01-sign-in.png" width="280" alt="Design 14: 01-sign-in"></a> | Live board<br><a href="designs/design-14/02-live-overview.png"><img src="designs/design-14/02-live-overview.png" width="280" alt="Design 14: 02-live-overview"></a> | Call logs<br><a href="designs/design-14/03-call-logs.png"><img src="designs/design-14/03-call-logs.png" width="280" alt="Design 14: 03-call-logs"></a> |
| Live listening<br><a href="designs/design-14/05-live-call-listening.png"><img src="designs/design-14/05-live-call-listening.png" width="280" alt="Design 14: 05-live-call-listening"></a> | Takeover (karaoke)<br><a href="designs/design-14/06-takeover-karaoke.png"><img src="designs/design-14/06-takeover-karaoke.png" width="280" alt="Design 14: 06-takeover-karaoke"></a> | Campaign<br><a href="designs/design-14/07-outbound-campaign.png"><img src="designs/design-14/07-outbound-campaign.png" width="280" alt="Design 14: 07-outbound-campaign"></a> |
| Upsell<br><a href="designs/design-14/08-outbound-upsell.png"><img src="designs/design-14/08-outbound-upsell.png" width="280" alt="Design 14: 08-outbound-upsell"></a> | Make a call<br><a href="designs/design-14/09-outbound-make-a-call.png"><img src="designs/design-14/09-outbound-make-a-call.png" width="280" alt="Design 14: 09-outbound-make-a-call"></a> | Users<br><a href="designs/design-14/10-users.png"><img src="designs/design-14/10-users.png" width="280" alt="Design 14: 10-users"></a> |

## 15. Lime Splice

Kiku and the specialist are two strands of one call; the console shows where they run together and where they split apart.

[Direction notes](designs/design-15/DIRECTION.md) · [Source](designs/design-15/src)

<a href="designs/design-15/04-call-audit.png"><img src="designs/design-15/04-call-audit.png" width="880" alt="Design 15: 04-call-audit"></a>

| | | |
|---|---|---|
| Sign in<br><a href="designs/design-15/01-sign-in.png"><img src="designs/design-15/01-sign-in.png" width="280" alt="Design 15: 01-sign-in"></a> | Live board<br><a href="designs/design-15/02-live-overview.png"><img src="designs/design-15/02-live-overview.png" width="280" alt="Design 15: 02-live-overview"></a> | Call logs<br><a href="designs/design-15/03-call-logs.png"><img src="designs/design-15/03-call-logs.png" width="280" alt="Design 15: 03-call-logs"></a> |
| Live listening<br><a href="designs/design-15/05-live-call-listening.png"><img src="designs/design-15/05-live-call-listening.png" width="280" alt="Design 15: 05-live-call-listening"></a> | Takeover (karaoke)<br><a href="designs/design-15/06-takeover-karaoke.png"><img src="designs/design-15/06-takeover-karaoke.png" width="280" alt="Design 15: 06-takeover-karaoke"></a> | Campaign<br><a href="designs/design-15/07-outbound-campaign.png"><img src="designs/design-15/07-outbound-campaign.png" width="280" alt="Design 15: 07-outbound-campaign"></a> |
| Upsell<br><a href="designs/design-15/08-outbound-upsell.png"><img src="designs/design-15/08-outbound-upsell.png" width="280" alt="Design 15: 08-outbound-upsell"></a> | Make a call<br><a href="designs/design-15/09-outbound-make-a-call.png"><img src="designs/design-15/09-outbound-make-a-call.png" width="280" alt="Design 15: 09-outbound-make-a-call"></a> | Users<br><a href="designs/design-15/10-users.png"><img src="designs/design-15/10-users.png" width="280" alt="Design 15: 10-users"></a> |

## Layout

- `designs/design-N/*.png`: rendered screens (1440×900 at 2x)
- `designs/design-N/src/`: static HTML/CSS/JS source for each screen
- `designs/design-N/DIRECTION.md`: palette, fonts, layout and karaoke treatment
- `designs/_shared/data.js`: shared demo data; `SCREENS.md`: what each screen must show
- `designs/index.html`: local gallery of all 150 screens
- `seed.json` and `prompts.md`: the seeds and the prompt that produced these designs

## Re-rendering

Requires Google Chrome on macOS and Node.

```sh
node designs/_shared/shoot.mjs design-3        # all ten screens of one design
node designs/_shared/shoot.mjs design-3 04-    # a single screen
```
