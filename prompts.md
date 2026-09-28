## 1. Initial prompt

```
I want you to build me a 10 design for a web app.

The web app is for a Voice Agent LLM Console. It has the folowing features:

1. User maangement feature

We have two roles mainly: specialist and admin.

- admin can create users and view call logs.
- specialist can view call logs, join a call and takeover a call for escalation.

2. Call logs

Each call log shows what the call was for in a message history. Each call is a voice call with transcript added. The transcript includes Karaoke mode data as well where the LLM said one thing to speak but the specialist spoke something improvised.

The completed call audit will show both what specialist said and what LLM wrote.

Calls can be: completed, in progress, escalted, or failed.

3. Making calls

The general way is inbound and outbound calls.

- inbound is anytime a person calls the hotel number.
- outbound call can be of three types:
    - campaign calls where we call a person based on a promotion code for promotional offers.
    - Upsell: We upsell arrival pickup, breakfast and dinner on existing booking. We accept single number and confirmation from a form or a csv file with number and confirmation nubmer to make a call.
    - Make a call: This is a general scenario where we place a call based on a given purpose, name if given, and a phone number. we accept both csv file here as well or input via a form for a single call.

Follow this procedure:

Generate a long, random alphanumeric string using a shell script.

Define the creative direction (color scheme, layout, typography, etc.) based on the string. Look beyond the surface for subpatterns, special numbers, anything that inspires you.

Use your judgment to bring this direction to life and make it look great.

Don’t reveal the string in the design. It’s only for your inspiration.

Generate 6-10 designs based on images for me.
```
