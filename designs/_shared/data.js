/* Kiku design exploration: shared synthetic demo data. Every name, number and booking is fictional. */
window.KIKU = {
 "product": {
  "name": "Kiku",
  "tagline": "Voice agent console"
 },
 "hotel": {
  "name": "The Brenlow",
  "city": "Edinburgh",
  "line": "+44 131 496 0400",
  "tz": "BST",
  "today": "Sunday 27 September 2026",
  "now": "14:32",
  "restaurant": "The Ledger Room",
  "currency": "GBP"
 },
 "synthetic": "Demo data. All names, numbers and bookings are fictional.",
 "people": {
  "admin": {
   "name": "Isla Ferguson",
   "initials": "IF",
   "role": "Admin",
   "title": "Guest Experience Manager",
   "email": "isla.ferguson@brenlow.example"
  },
  "specialist": {
   "name": "Priya Raman",
   "initials": "PR",
   "role": "Specialist",
   "title": "Guest Services",
   "email": "priya.raman@brenlow.example"
  }
 },
 "roles": {
  "Admin": [
   "Create and manage users",
   "View call logs and audits",
   "Set up outbound calls"
  ],
  "Specialist": [
   "View call logs and audits",
   "Join live calls to listen",
   "Take over escalated calls (karaoke mode)"
  ]
 },
 "users": [
  {
   "name": "Isla Ferguson",
   "initials": "IF",
   "email": "isla.ferguson@brenlow.example",
   "role": "Admin",
   "status": "Active",
   "lastActive": "Now",
   "takeovers30d": 0
  },
  {
   "name": "Priya Raman",
   "initials": "PR",
   "email": "priya.raman@brenlow.example",
   "role": "Specialist",
   "status": "Active",
   "lastActive": "On a call (KK-24030)",
   "takeovers30d": 41
  },
  {
   "name": "Tomasz Nowak",
   "initials": "TN",
   "email": "tomasz.nowak@brenlow.example",
   "role": "Specialist",
   "status": "Active",
   "lastActive": "12 min ago",
   "takeovers30d": 37
  },
  {
   "name": "Callum Reid",
   "initials": "CR",
   "email": "callum.reid@brenlow.example",
   "role": "Specialist",
   "status": "Active",
   "lastActive": "1 h ago",
   "takeovers30d": 22
  },
  {
   "name": "Aiko Tanaka",
   "initials": "AT",
   "email": "aiko.tanaka@brenlow.example",
   "role": "Specialist",
   "status": "Active",
   "lastActive": "Yesterday, 21:40",
   "takeovers30d": 18
  },
  {
   "name": "Ruth Achterberg",
   "initials": "RA",
   "email": "ruth.achterberg@brenlow.example",
   "role": "Specialist",
   "status": "Invited",
   "lastActive": "Invite sent 25 Sep",
   "takeovers30d": 0
  },
  {
   "name": "Mateo Silva",
   "initials": "MS",
   "email": "mateo.silva@brenlow.example",
   "role": "Specialist",
   "status": "Deactivated",
   "lastActive": "3 Aug",
   "takeovers30d": 0
  }
 ],
 "newUserDraft": {
  "name": "Grace Mbeki",
  "email": "grace.mbeki@brenlow.example",
  "role": "Specialist"
 },
 "stats": {
  "callsToday": 146,
  "inbound": 88,
  "outbound": 58,
  "completed": 128,
  "inProgress": 3,
  "escalated": 2,
  "failed": 13,
  "takeoversToday": 9,
  "avgHandle": "3:12",
  "upsellValueToday": "£1,386"
 },
 "calls": [
  {
   "id": "KK-24032",
   "direction": "inbound",
   "type": "Inbound",
   "guest": "Owen Pritchard",
   "phone": "+44 7700 900634",
   "purpose": "Wants to extend his stay by two nights; card on file was declined",
   "status": "escalated",
   "started": "14:31",
   "duration": "01:48",
   "specialist": null,
   "waiting": "00:38",
   "escalationReason": "Payment issue. Payments are specialist-only."
  },
  {
   "id": "KK-24031",
   "direction": "inbound",
   "type": "Inbound",
   "guest": "Rashid Karimi",
   "phone": "+44 7700 900412",
   "booking": "BRN-60552",
   "purpose": "Late check-in on Friday and parking for Saturday",
   "status": "in_progress",
   "started": "14:29",
   "duration": "03:18",
   "specialist": "Priya Raman (listening)"
  },
  {
   "id": "KK-24030",
   "direction": "inbound",
   "type": "Inbound",
   "guest": "Margaret Doyle",
   "phone": "+44 7700 900187",
   "booking": "BRN-60418",
   "purpose": "Deposit charged twice on her booking",
   "status": "escalated",
   "started": "14:24",
   "duration": "01:52",
   "specialist": "Priya Raman",
   "escalationReason": "Guest asked for a person. Billing disputes are specialist-only."
  },
  {
   "id": "KK-24029",
   "direction": "outbound",
   "type": "Campaign",
   "promo": "AUTUMN26",
   "guest": "Henrik Lund",
   "phone": "+1 (312) 555-0147",
   "purpose": "AUTUMN26: 20% off stays of three nights or more",
   "status": "in_progress",
   "started": "14:30",
   "duration": "02:05",
   "specialist": null
  },
  {
   "id": "KK-24028",
   "direction": "outbound",
   "type": "Make a call",
   "guest": "Joel Ashworth",
   "phone": "+44 20 7946 0318",
   "purpose": "Laptop charger left in room 207: post it or hold at reception?",
   "status": "in_progress",
   "started": "14:31",
   "duration": "01:12",
   "specialist": null
  },
  {
   "id": "KK-24027",
   "direction": "outbound",
   "type": "Upsell",
   "guest": "Eleanor Vance",
   "phone": "+44 7700 900356",
   "booking": "BRN-58213",
   "purpose": "Upsell on BRN-58213: arrival pickup, breakfast, dinner",
   "status": "completed",
   "started": "13:52",
   "duration": "02:41",
   "specialist": "Tomasz Nowak",
   "outcome": "Accessible airport car + breakfast for 2 × 3 mornings. £209 added."
  },
  {
   "id": "KK-24026",
   "direction": "outbound",
   "type": "Campaign",
   "promo": "HOGMANAY26",
   "guest": "Chloe Barnard",
   "phone": "+44 7700 900823",
   "purpose": "HOGMANAY26: early access to New Year rooms",
   "status": "failed",
   "started": "13:40",
   "duration": "00:00",
   "specialist": null,
   "outcome": "Number unreachable after 3 attempts"
  },
  {
   "id": "KK-24025",
   "direction": "inbound",
   "type": "Inbound",
   "guest": "Ahmed Siddiqui",
   "phone": "+44 131 496 0772",
   "purpose": "Availability for two rooms, 10–12 October",
   "status": "completed",
   "started": "13:31",
   "duration": "04:12",
   "specialist": null,
   "outcome": "Rates quoted. Guest will book online."
  },
  {
   "id": "KK-24024",
   "direction": "outbound",
   "type": "Upsell",
   "guest": "Sofia Marchetti",
   "phone": "+1 (415) 555-0119",
   "booking": "BRN-58190",
   "purpose": "Upsell on BRN-58190: arrival pickup, breakfast, dinner",
   "status": "completed",
   "started": "13:18",
   "duration": "02:57",
   "specialist": null,
   "outcome": "Breakfast for 2 × 2 mornings. £96 added."
  },
  {
   "id": "KK-24023",
   "direction": "inbound",
   "type": "Inbound",
   "guest": "Unknown caller",
   "phone": "+1 (646) 555-0133",
   "purpose": "No purpose captured",
   "status": "failed",
   "started": "13:05",
   "duration": "00:09",
   "specialist": null,
   "outcome": "Caller hung up during the greeting"
  },
  {
   "id": "KK-24022",
   "direction": "inbound",
   "type": "Inbound",
   "guest": "Walter Jennings",
   "phone": "+44 7700 900905",
   "purpose": "Lost property: reading glasses left in room 412",
   "status": "completed",
   "started": "12:47",
   "duration": "05:30",
   "specialist": "Callum Reid",
   "outcome": "Glasses found. Posting Monday."
  },
  {
   "id": "KK-24021",
   "direction": "outbound",
   "type": "Campaign",
   "promo": "AUTUMN26",
   "guest": "Aisha Bello",
   "phone": "+44 20 7946 0584",
   "purpose": "AUTUMN26: 20% off stays of three nights or more",
   "status": "completed",
   "started": "12:30",
   "duration": "03:48",
   "specialist": null,
   "outcome": "Booked 6–9 Nov with AUTUMN26"
  },
  {
   "id": "KK-24020",
   "direction": "outbound",
   "type": "Make a call",
   "guest": "Daniel Kerr",
   "phone": "+44 7700 900277",
   "purpose": "Confirm arrival time for tonight",
   "status": "failed",
   "started": "12:12",
   "duration": "00:31",
   "specialist": null,
   "outcome": "Voicemail full"
  },
  {
   "id": "KK-24019",
   "direction": "inbound",
   "type": "Inbound",
   "guest": "Fiona MacLeod",
   "phone": "+44 131 496 0318",
   "purpose": "Spa hours and a dinner table for two at 19:30",
   "status": "completed",
   "started": "11:58",
   "duration": "02:40",
   "specialist": null,
   "outcome": "Table booked 19:30 in The Ledger Room"
  },
  {
   "id": "KK-24018",
   "direction": "outbound",
   "type": "Upsell",
   "guest": "Kenji Watanabe",
   "phone": "+1 (202) 555-0164",
   "booking": "BRN-58177",
   "purpose": "Upsell on BRN-58177: arrival pickup, breakfast, dinner",
   "status": "completed",
   "started": "11:40",
   "duration": "03:02",
   "specialist": null,
   "outcome": "Pickup declined. Dinner Sat 19:00 for 2. £96 added."
  }
 ],
 "audit": {
  "id": "KK-24027",
  "direction": "outbound",
  "type": "Upsell",
  "status": "completed",
  "guest": "Eleanor Vance",
  "phone": "+44 7700 900356",
  "booking": "BRN-58213",
  "stay": "Thu 1 Oct – Sun 4 Oct · 3 nights · Deluxe Twin · 2 adults",
  "purpose": "Upsell on existing booking: arrival pickup, breakfast, dinner",
  "started": "Sun 27 Sep, 13:52",
  "duration": "02:41",
  "agent": "Kiku",
  "specialist": "Tomasz Nowak",
  "takeoverAt": "00:52",
  "escalationReason": "Accessibility request. Policy routes these to a specialist.",
  "outcome": [
   {
    "item": "Accessible airport car (rear ramp), Thu 1 Oct 16:10",
    "amount": "£65.00",
    "result": "added"
   },
   {
    "item": "Breakfast, 2 guests × 3 mornings",
    "amount": "£144.00",
    "result": "added"
   },
   {
    "item": "Three-course dinner",
    "amount": "—",
    "result": "declined"
   }
  ],
  "total": "£209.00",
  "note": "Room note added: step-free room near the lift.",
  "karaokeSummary": {
   "lines": 7,
   "asWritten": 1,
   "improvised": 6
  },
  "transcript": [
   {
    "t": "00:00",
    "speaker": "agent",
    "text": "Hello, is that Eleanor Vance? This is Kiku, calling from The Brenlow in Edinburgh about your stay from Thursday."
   },
   {
    "t": "00:07",
    "speaker": "guest",
    "text": "Yes, speaking."
   },
   {
    "t": "00:09",
    "speaker": "agent",
    "text": "Lovely. I wanted to check whether we could arrange anything for your arrival. We offer a private car from Edinburgh Airport for £55, and breakfast for £24 per person per night."
   },
   {
    "t": "00:21",
    "speaker": "guest",
    "text": "The car might be useful, actually. My husband uses a wheelchair. Would the car take a folding chair, or do you have an accessible vehicle?"
   },
   {
    "t": "00:31",
    "speaker": "agent",
    "text": "Thank you for telling me. I want to be sure you get the right vehicle, so I'm bringing in a colleague who can confirm the details."
   },
   {
    "t": "00:36",
    "speaker": "system",
    "kind": "escalation",
    "text": "Escalated: accessibility request. Policy routes accessibility requests to a specialist."
   },
   {
    "t": "00:44",
    "speaker": "system",
    "kind": "join",
    "text": "Tomasz Nowak joined and is listening"
   },
   {
    "t": "00:52",
    "speaker": "system",
    "kind": "takeover",
    "text": "Tomasz Nowak took over. Karaoke mode on."
   },
   {
    "t": "00:54",
    "speaker": "specialist",
    "karaoke": true,
    "wrote": "Hello Mrs Vance, this is Tomasz from The Brenlow. I understand you need an accessible vehicle for your arrival.",
    "said": "Hello Mrs Vance, Tomasz here from the front desk. So you'll want a car that takes a wheelchair, happy to sort that.",
    "diff": [
     {
      "op": "same",
      "text": "Hello Mrs Vance,"
     },
     {
      "op": "del",
      "text": "this is"
     },
     {
      "op": "same",
      "text": "Tomasz"
     },
     {
      "op": "ins",
      "text": "here"
     },
     {
      "op": "same",
      "text": "from the"
     },
     {
      "op": "del",
      "text": "Brenlow. I understand you need an accessible vehicle for your arrival."
     },
     {
      "op": "ins",
      "text": "front desk. So you'll want a car that takes a wheelchair, happy to sort that."
     }
    ],
    "match": 32,
    "asWritten": false
   },
   {
    "t": "01:05",
    "speaker": "guest",
    "text": "Yes. He can transfer into a seat, but the chair doesn't fold very small."
   },
   {
    "t": "01:12",
    "speaker": "specialist",
    "karaoke": true,
    "wrote": "Our transfer partner offers a wheelchair-accessible vehicle with a rear ramp for £65. Would you like me to book it for your arrival on Thursday?",
    "said": "Then I'd go for the ramp van. He can stay in his chair or transfer, whichever's easier. It's £65 rather than £55. Shall I book it for Thursday?",
    "diff": [
     {
      "op": "del",
      "text": "Our"
     },
     {
      "op": "ins",
      "text": "Then I'd go for the ramp van. He can stay in his chair or"
     },
     {
      "op": "same",
      "text": "transfer,"
     },
     {
      "op": "del",
      "text": "partner offers a wheelchair-accessible vehicle with a rear ramp for"
     },
     {
      "op": "ins",
      "text": "whichever's easier. It's"
     },
     {
      "op": "same",
      "text": "£65"
     },
     {
      "op": "del",
      "text": "Would you like me to"
     },
     {
      "op": "ins",
      "text": "rather than £55. Shall I"
     },
     {
      "op": "same",
      "text": "book it for"
     },
     {
      "op": "del",
      "text": "your arrival on"
     },
     {
      "op": "same",
      "text": "Thursday?"
     }
    ],
    "match": 24,
    "asWritten": false
   },
   {
    "t": "01:26",
    "speaker": "guest",
    "text": "Yes please. We land at ten past four."
   },
   {
    "t": "01:31",
    "speaker": "specialist",
    "karaoke": true,
    "wrote": "Thank you. I've booked the accessible vehicle for 16:10 on Thursday 1 October. The driver will meet you in the arrivals hall.",
    "said": "Perfect. Ten past four Thursday, the driver will be in arrivals with your name on a sign. And I'll put a note on the room: step-free, and near the lift.",
    "diff": [
     {
      "op": "del",
      "text": "Thank you. I've booked the accessible vehicle for 16:10 on"
     },
     {
      "op": "ins",
      "text": "Perfect. Ten past four"
     },
     {
      "op": "same",
      "text": "Thursday,"
     },
     {
      "op": "del",
      "text": "1 October."
     },
     {
      "op": "same",
      "text": "the driver will"
     },
     {
      "op": "del",
      "text": "meet you"
     },
     {
      "op": "ins",
      "text": "be"
     },
     {
      "op": "same",
      "text": "in"
     },
     {
      "op": "ins",
      "text": "arrivals with your name on a sign. And I'll put a note on"
     },
     {
      "op": "same",
      "text": "the"
     },
     {
      "op": "del",
      "text": "arrivals hall."
     },
     {
      "op": "ins",
      "text": "room: step-free, and near the lift."
     }
    ],
    "match": 27,
    "asWritten": false
   },
   {
    "t": "01:45",
    "speaker": "guest",
    "text": "That's so kind. What was the breakfast again?"
   },
   {
    "t": "01:49",
    "speaker": "specialist",
    "karaoke": true,
    "wrote": "Breakfast is £24 per person per night, served from 7:00 to 10:30 in the Ledger Room. Would you like to add it for both of you?",
    "said": "£24 each per morning, seven till half ten in the Ledger Room downstairs. For both of you, all three mornings?",
    "diff": [
     {
      "op": "del",
      "text": "Breakfast is"
     },
     {
      "op": "same",
      "text": "£24"
     },
     {
      "op": "ins",
      "text": "each"
     },
     {
      "op": "same",
      "text": "per"
     },
     {
      "op": "del",
      "text": "person per night, served from 7:00 to 10:30"
     },
     {
      "op": "ins",
      "text": "morning, seven till half ten"
     },
     {
      "op": "same",
      "text": "in the Ledger Room"
     },
     {
      "op": "del",
      "text": "Would you like to add it"
     },
     {
      "op": "ins",
      "text": "downstairs."
     },
     {
      "op": "same",
      "text": "For both of you,"
     },
     {
      "op": "ins",
      "text": "all three mornings?"
     }
    ],
    "match": 38,
    "asWritten": false
   },
   {
    "t": "01:58",
    "speaker": "guest",
    "text": "Go on then, yes."
   },
   {
    "t": "02:02",
    "speaker": "specialist",
    "karaoke": true,
    "wrote": "We also offer a three-course dinner for £48 per person. Would you like to reserve a table on one of your evenings?",
    "said": "We also offer a three-course dinner for £48 per person. Would you like to reserve a table on one of your evenings?",
    "diff": [
     {
      "op": "same",
      "text": "We also offer a three-course dinner for £48 per person. Would you like to reserve a table on one of your evenings?"
     }
    ],
    "match": 100,
    "asWritten": true
   },
   {
    "t": "02:10",
    "speaker": "guest",
    "text": "Not this time, we've got plans with family."
   },
   {
    "t": "02:14",
    "speaker": "specialist",
    "karaoke": true,
    "wrote": "No problem. To confirm: an accessible airport transfer on Thursday at 16:10 for £65, and breakfast for two for three mornings, £144. Is there anything else?",
    "said": "No bother at all. So that's the accessible car Thursday at ten past four, £65, and breakfast for two, three mornings, £144. Anything else I can do?",
    "diff": [
     {
      "op": "same",
      "text": "No"
     },
     {
      "op": "del",
      "text": "problem. To confirm: an"
     },
     {
      "op": "ins",
      "text": "bother at all. So that's the"
     },
     {
      "op": "same",
      "text": "accessible"
     },
     {
      "op": "del",
      "text": "airport transfer on"
     },
     {
      "op": "ins",
      "text": "car"
     },
     {
      "op": "same",
      "text": "Thursday at"
     },
     {
      "op": "del",
      "text": "16:10 for"
     },
     {
      "op": "ins",
      "text": "ten past four,"
     },
     {
      "op": "same",
      "text": "£65, and breakfast for two,"
     },
     {
      "op": "del",
      "text": "for"
     },
     {
      "op": "same",
      "text": "three mornings, £144."
     },
     {
      "op": "del",
      "text": "Is there"
     },
     {
      "op": "same",
      "text": "Anything else"
     },
     {
      "op": "ins",
      "text": "I can do?"
     }
    ],
    "match": 54,
    "asWritten": false
   },
   {
    "t": "02:30",
    "speaker": "guest",
    "text": "No, that's everything. Thank you, Tomasz."
   },
   {
    "t": "02:33",
    "speaker": "specialist",
    "karaoke": true,
    "wrote": "Thank you, Mrs Vance. We look forward to welcoming you on Thursday.",
    "said": "Our pleasure. Safe travels, and see you Thursday.",
    "diff": [
     {
      "op": "del",
      "text": "Thank"
     },
     {
      "op": "ins",
      "text": "Our pleasure. Safe travels, and see"
     },
     {
      "op": "same",
      "text": "you"
     },
     {
      "op": "del",
      "text": "Mrs Vance. We look forward to welcoming you on"
     },
     {
      "op": "same",
      "text": "Thursday."
     }
    ],
    "match": 17,
    "asWritten": false
   },
   {
    "t": "02:41",
    "speaker": "system",
    "kind": "end",
    "text": "Call ended by guest"
   }
  ]
 },
 "liveCall": {
  "id": "KK-24031",
  "direction": "inbound",
  "status": "in_progress",
  "guest": "Rashid Karimi",
  "phone": "+44 7700 900412",
  "booking": "BRN-60552",
  "stay": "Fri 2 Oct – Sun 4 Oct · 2 nights · Deluxe King",
  "purpose": "Late check-in on Friday and parking for Saturday",
  "started": "14:29",
  "duration": "03:18",
  "listening": [
   "Priya Raman"
  ],
  "agentState": "Drafting a reply",
  "agentDraft": "Let me check the height limit at the Queen Street car park for you.",
  "actionsTaken": [
   "Arrival note added: around 23:30 Friday",
   "Parking reserved: Queen Street, Sat 3 Oct from 12:00 (£28)"
  ],
  "transcript": [
   {
    "t": "00:00",
    "speaker": "agent",
    "text": "Good afternoon, The Brenlow, Edinburgh. This is Kiku, the hotel's virtual assistant. How can I help?"
   },
   {
    "t": "00:06",
    "speaker": "guest",
    "text": "Hi, I'm arriving Friday but my train doesn't get in until about half eleven at night. Is that a problem?"
   },
   {
    "t": "00:14",
    "speaker": "agent",
    "text": "Not at all. Reception is staffed around the clock, so you can check in whenever you arrive. Could I take your confirmation number so I can add a note?"
   },
   {
    "t": "00:22",
    "speaker": "guest",
    "text": "It's BRN-60552."
   },
   {
    "t": "00:27",
    "speaker": "agent",
    "text": "Thanks, Mr Karimi. I can see two nights from Friday 2 October in a Deluxe King. I've noted an arrival around 23:30."
   },
   {
    "t": "00:38",
    "speaker": "guest",
    "text": "Brilliant. My partner's driving up on Saturday for the second night. Do you have parking?"
   },
   {
    "t": "00:47",
    "speaker": "agent",
    "text": "We have a partner car park on Queen Street, about four minutes' walk. It's £28 for 24 hours and we can reserve a space. Would you like one for Saturday?"
   },
   {
    "t": "01:02",
    "speaker": "guest",
    "text": "Yes please, Saturday afternoon."
   },
   {
    "t": "01:06",
    "speaker": "agent",
    "text": "Done. A space is reserved from 12:00 on Saturday 3 October. The confirmation will be on your booking."
   },
   {
    "t": "02:51",
    "speaker": "guest",
    "text": "Oh, one thing. Can it take a van? It's a bit taller than a normal car."
   }
  ]
 },
 "takeover": {
  "id": "KK-24030",
  "direction": "inbound",
  "status": "escalated",
  "guest": "Margaret Doyle",
  "phone": "+44 7700 900187",
  "booking": "BRN-60418",
  "stay": "Fri 9 Oct – Mon 12 Oct · 3 nights · Classic Double",
  "purpose": "Deposit charged twice on her booking",
  "started": "14:24",
  "duration": "01:52",
  "specialist": "Priya Raman",
  "takeoverAt": "01:10",
  "escalationReason": "Guest asked for a person. Billing disputes are specialist-only.",
  "facts": [
   "Deposit £150 taken 24 Sep",
   "Pre-authorisation £150 on 25 Sep (releases in 5–7 working days)",
   "Card ending 4417"
  ],
  "nextLine": "I can email you written confirmation today, so you have it in writing for your bank.",
  "transcript": [
   {
    "t": "00:00",
    "speaker": "agent",
    "text": "Good afternoon, The Brenlow, Edinburgh. This is Kiku, the hotel's virtual assistant. How can I help?"
   },
   {
    "t": "00:05",
    "speaker": "guest",
    "text": "Hello. I've been charged the deposit twice for my booking and I'd like it sorted today."
   },
   {
    "t": "00:13",
    "speaker": "agent",
    "text": "I'm sorry about that, Mrs Doyle. Could you give me your confirmation number?"
   },
   {
    "t": "00:19",
    "speaker": "guest",
    "text": "It's BRN-60418."
   },
   {
    "t": "00:24",
    "speaker": "agent",
    "text": "Thank you. I can see a £150 deposit taken on the 24th of September. I can't see card transactions from here, so I'd like to bring in a colleague from our guest team who can check them."
   },
   {
    "t": "00:39",
    "speaker": "guest",
    "text": "I've already waited on hold with my bank for forty minutes. I want a person."
   },
   {
    "t": "00:44",
    "speaker": "system",
    "kind": "escalation",
    "text": "Escalated: guest asked for a person. Billing disputes are specialist-only."
   },
   {
    "t": "00:44",
    "speaker": "agent",
    "text": "Of course. I'm connecting you with a member of the team now. They'll have everything we've discussed."
   },
   {
    "t": "01:02",
    "speaker": "system",
    "kind": "join",
    "text": "Priya Raman joined and is listening"
   },
   {
    "t": "01:10",
    "speaker": "system",
    "kind": "takeover",
    "text": "Priya Raman took over. Karaoke mode on."
   },
   {
    "t": "01:12",
    "speaker": "specialist",
    "karaoke": true,
    "wrote": "Hello Mrs Doyle, this is Priya from The Brenlow's guest team. I can see the £150 deposit on booking BRN-60418.",
    "said": "Hi Mrs Doyle, it's Priya on the guest team. I've got your booking open, and I'm so sorry you've had to chase this.",
    "diff": [
     {
      "op": "del",
      "text": "Hello"
     },
     {
      "op": "ins",
      "text": "Hi"
     },
     {
      "op": "same",
      "text": "Mrs Doyle,"
     },
     {
      "op": "del",
      "text": "this is"
     },
     {
      "op": "ins",
      "text": "it's"
     },
     {
      "op": "same",
      "text": "Priya"
     },
     {
      "op": "del",
      "text": "from"
     },
     {
      "op": "ins",
      "text": "on"
     },
     {
      "op": "same",
      "text": "the"
     },
     {
      "op": "del",
      "text": "Brenlow's"
     },
     {
      "op": "same",
      "text": "guest team."
     },
     {
      "op": "del",
      "text": "I can see the £150 deposit on"
     },
     {
      "op": "ins",
      "text": "I've got your"
     },
     {
      "op": "same",
      "text": "booking"
     },
     {
      "op": "del",
      "text": "BRN-60418."
     },
     {
      "op": "ins",
      "text": "open, and I'm so sorry you've had to chase this."
     }
    ],
    "match": 35,
    "asWritten": false
   },
   {
    "t": "01:24",
    "speaker": "guest",
    "text": "Thank you. There are two charges of a hundred and fifty on my statement."
   },
   {
    "t": "01:31",
    "speaker": "specialist",
    "karaoke": true,
    "wrote": "I understand. Could you tell me the dates of both charges as they appear on your statement?",
    "said": "Right, let's get to the bottom of it. Can you read me the dates on both of those charges?",
    "diff": [
     {
      "op": "del",
      "text": "I understand. Could"
     },
     {
      "op": "ins",
      "text": "Right, let's get to the bottom of it. Can"
     },
     {
      "op": "same",
      "text": "you"
     },
     {
      "op": "del",
      "text": "tell"
     },
     {
      "op": "ins",
      "text": "read"
     },
     {
      "op": "same",
      "text": "me the dates"
     },
     {
      "op": "ins",
      "text": "on both"
     },
     {
      "op": "same",
      "text": "of"
     },
     {
      "op": "del",
      "text": "both"
     },
     {
      "op": "ins",
      "text": "those"
     },
     {
      "op": "same",
      "text": "charges?"
     },
     {
      "op": "del",
      "text": "as they appear on your statement?"
     }
    ],
    "match": 35,
    "asWritten": false
   },
   {
    "t": "01:38",
    "speaker": "guest",
    "text": "The twenty-fourth and the twenty-fifth."
   },
   {
    "t": "01:44",
    "speaker": "specialist",
    "karaoke": true,
    "wrote": "Thank you. The charge on the 25th is a pre-authorisation hold, which your bank should release within 5 to 7 working days.",
    "said": "Okay, so the one on the twenty-fifth is a pre-authorisation, not a second payment, so it'll drop off",
    "diff": [
     {
      "op": "del",
      "text": "Thank you."
     },
     {
      "op": "ins",
      "text": "Okay, so"
     },
     {
      "op": "same",
      "text": "the"
     },
     {
      "op": "del",
      "text": "charge"
     },
     {
      "op": "ins",
      "text": "one"
     },
     {
      "op": "same",
      "text": "on the"
     },
     {
      "op": "del",
      "text": "25th"
     },
     {
      "op": "ins",
      "text": "twenty-fifth"
     },
     {
      "op": "same",
      "text": "is a pre-authorisation,"
     },
     {
      "op": "del",
      "text": "hold, which your bank should release within 5 to 7 working days."
     },
     {
      "op": "ins",
      "text": "not a second payment, so it'll drop off"
     }
    ],
    "match": 27,
    "asWritten": false,
    "live": true
   }
  ]
 },
 "offers": [
  {
   "id": "pickup",
   "name": "Arrival pickup",
   "detail": "Private car from Edinburgh Airport",
   "price": "£55 per car",
   "alt": "Accessible vehicle £65"
  },
  {
   "id": "breakfast",
   "name": "Breakfast",
   "detail": "The Ledger Room, 7:00–10:30",
   "price": "£24 per guest per morning"
  },
  {
   "id": "dinner",
   "name": "Dinner",
   "detail": "Three courses in The Ledger Room",
   "price": "£48 per guest"
  }
 ],
 "campaigns": [
  {
   "code": "AUTUMN26",
   "name": "Autumn long stays",
   "offer": "20% off stays of three nights or more, 1 Oct – 30 Nov 2026",
   "status": "Paused until Mon 10:00",
   "audience": "autumn-optins.csv",
   "contacts": 412,
   "called": 186,
   "answered": 121,
   "booked": 23,
   "failed": 18,
   "window": "Mon–Fri, 10:00–18:00"
  },
  {
   "code": "HOGMANAY26",
   "name": "Hogmanay early access",
   "offer": "First pick of New Year's Eve rooms before public release",
   "status": "Scheduled, starts 1 Nov",
   "audience": "past-hogmanay-guests.csv",
   "contacts": 96,
   "called": 0,
   "answered": 0,
   "booked": 0,
   "failed": 0,
   "window": "Mon–Sat, 11:00–19:00"
  },
  {
   "code": "BURNS27",
   "name": "Burns Night supper",
   "offer": "Supper, whisky flight and a room on 25 Jan 2027",
   "status": "Draft",
   "audience": "No list yet",
   "contacts": 0,
   "called": 0,
   "answered": 0,
   "booked": 0,
   "failed": 0,
   "window": "Not set"
  }
 ],
 "campaignDraft": {
  "code": "BURNS27",
  "opening": "Hello, is that {first_name}? This is Kiku from The Brenlow in Edinburgh. You stayed with us last winter, so I wanted to tell you about our Burns Night supper on the 25th of January.",
  "maxAttempts": 3,
  "window": "Mon–Fri, 10:00–18:00",
  "file": "burns-optins.csv",
  "rows": 148,
  "ready": 145,
  "errors": 3
 },
 "upsellSingle": {
  "phone": "+1 (415) 555-0162",
  "confirmation": "BRN-58240",
  "match": "Marcus Hale · Deluxe King · arrives Thu 1 Oct · 2 nights · 1 adult",
  "offers": [
   "pickup",
   "breakfast",
   "dinner"
  ]
 },
 "upsellCsv": {
  "file": "arrivals-2026-10-01.csv",
  "size": "3 KB",
  "rows": 38,
  "ready": 36,
  "errors": 2,
  "columns": [
   "phone",
   "confirmation"
  ],
  "preview": [
   {
    "row": 1,
    "phone": "+44 7700 900356",
    "confirmation": "BRN-58213",
    "guest": "Eleanor Vance",
    "ok": true
   },
   {
    "row": 2,
    "phone": "+1 (415) 555-0162",
    "confirmation": "BRN-58240",
    "guest": "Marcus Hale",
    "ok": true
   },
   {
    "row": 3,
    "phone": "+44 20 7946 0733",
    "confirmation": "BRN-58251",
    "guest": "Oliver Grant",
    "ok": true
   },
   {
    "row": 4,
    "phone": "+44 7700 900518",
    "confirmation": "BRN-58262",
    "guest": "Nadia Rahman",
    "ok": true
   },
   {
    "row": 14,
    "phone": "07700 9004",
    "confirmation": "BRN-58309",
    "guest": "",
    "ok": false,
    "error": "Phone number too short"
   },
   {
    "row": 27,
    "phone": "+44 7700 900961",
    "confirmation": "",
    "guest": "",
    "ok": false,
    "error": "Confirmation number missing"
   }
  ]
 },
 "makeCallSingle": {
  "purpose": "Let the guest know the laptop charger they left in room 207 is at reception, and ask whether they'd like it posted or held.",
  "name": "Joel Ashworth",
  "phone": "+44 20 7946 0318"
 },
 "makeCallCsv": {
  "file": "callbacks-27-sep.csv",
  "size": "2 KB",
  "rows": 12,
  "ready": 11,
  "errors": 1,
  "columns": [
   "phone",
   "name (optional)",
   "purpose"
  ],
  "preview": [
   {
    "row": 1,
    "phone": "+44 7700 900241",
    "name": "Hannah Price",
    "purpose": "Confirm she still needs the cot in room 118 for Tuesday.",
    "ok": true
   },
   {
    "row": 2,
    "phone": "+44 20 7946 0921",
    "name": "",
    "purpose": "Return a missed call from this number to reception at 09:14.",
    "ok": true
   },
   {
    "row": 3,
    "phone": "+1 (202) 555-0178",
    "name": "Luis Ortega",
    "purpose": "Tell him the kitchen can do gluten-free on Friday and ask for his table time.",
    "ok": true
   },
   {
    "row": 4,
    "phone": "+44 131 496 0213",
    "name": "Brodie Main",
    "purpose": "Let him know his dry cleaning is ready at reception.",
    "ok": true
   },
   {
    "row": 6,
    "phone": "",
    "name": "Nadia Cole",
    "purpose": "Confirm her spa booking moved to 11:00.",
    "ok": false,
    "error": "Phone number missing"
   }
  ]
 }
};
