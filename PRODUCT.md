# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Undecided. The current work is a design exploration: static HTML/CSS pages rendered to PNG in `designs/`. The production stack was not discussed.

## What it is

A console for a hotel's LLM voice agent. The agent answers the hotel's phone line (inbound) and places outbound calls. Hotel staff watch calls, audit them, and take over when a call is escalated.

Working product name: **Kiku**, chosen at random for the exploration (the user asked for a random name).

## Users and roles

- **Admin**: creates users and views call logs.
- **Specialist**: views call logs, joins a live call to listen, and takes over a call when it is escalated.
- Open: which role sets up outbound calls. The brief does not assign it.

## Core capabilities

1. **User management**: an admin creates users and assigns a role (Admin or Specialist).
2. **Call logs**: each call has a purpose and a message history built from the voice transcript. Statuses: completed, in progress, escalated, failed.
3. **Karaoke mode**: when a specialist takes over, the LLM keeps writing the line it would speak and the specialist speaks, often improvising. The completed-call audit shows both what the LLM wrote and what the specialist said.
4. **Calls**
   - Inbound: anyone calling the hotel number.
   - Outbound, three types:
     - **Campaign**: promotional calls tied to a promo code.
     - **Upsell**: offers arrival pickup, breakfast and dinner on an existing booking. Input is a single phone number plus confirmation number from a form, or a CSV with phone and confirmation columns.
     - **Make a call**: a general call for a given purpose, with an optional name and a phone number. Input is a single form or a CSV.

## Operating context

Hotel front-office and guest-services staff, working in shifts, often while monitoring several calls at once. Inferred, not confirmed: daytime office light for most work, plus night shifts.

## Demo content

The exploration uses a fictional property, The Brenlow in Edinburgh. All guest names, bookings and numbers are synthetic and use reserved fictional ranges (Ofcom drama numbers, US 555-01xx). Real hotel data and branding still need to be supplied.
