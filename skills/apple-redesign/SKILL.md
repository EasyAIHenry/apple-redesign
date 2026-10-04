---
name: apple-redesign
description: Redesign a website's homepage the way Apple's design team would, using the apple-design skill's rules. Use when someone asks to redesign, clean up or "make it feel like Apple" for their homepage or store, given a project folder or a site address. Audits first and waits for an OK, keeps the real products and prices, then builds a new page next to the old one.
---

# Apple redesign

A step-by-step workflow for rebuilding one homepage with Apple's design rules. The rules themselves live in the **apple-design** skill (by Emil Kowalski, installed alongside this one). Read it before you start and follow it for every decision about layout, type and motion.

## 0. Before you start

- Read the `apple-design` skill in full. Treat it as the source of truth for the rules below.
- Find the page:
  - **A project folder with the site's code:** work on its homepage file.
  - **A site address only** (Shopify, Wix, Squarespace and so on): open the address and read the live page (text, products, prices, image URLs). Build the new page as plain files in the current folder. Never try to change the live site.
- If neither is given, ask for the site address in one short question.

## 1. Audit first, then stop

List where the current page breaks the skill's rules, with numbers wherever you can count:

- how many things compete for attention on the first screen (buttons, badges, banners, pop-ups)
- buttons and links that send people away from the page to buy
- text that is too small to read on a phone (under 15 px body text)
- hierarchy, spacing, type and motion problems
- how the page behaves on a phone

Then **stop and wait for the person's OK.** Let them push back on anything that is wrong for their business before you build.

## 2. Keep it real

- Use the real products, names, photos and prices from the current site.
- Don't invent products, features, numbers, reviews or testimonials. If something is missing, leave a clearly marked placeholder and say so.

## 3. Rebuild

Build a new page and leave the old one untouched. Save it as `redesign/index.html` with its CSS and JS beside it, unless the project has its own structure.

- **Phone first:** design for a phone screen, then let it widen.
- **One message and one main action per section.** Hero: product name, one line, one primary button (and at most one quiet secondary).
- **Main products in one row you can swipe**, with momentum, snapping and soft edges, instead of a long stack of tiles.
- **Buying starts on the page:** a sheet slides up with the options (colour, size, storage) and the price, and swipes away.
- Use plain HTML, CSS and JavaScript, unless the site already uses a framework.

## 4. Motion, from the apple-design skill

- Springs that settle with **no bounce (damping 1.0)** by default.
- Bounce **only when a flick carried momentum** (damping about 0.8).
- Press feedback on **pointer-down**: scale 0.97, no delay.
- **Rubber-band at the edges** instead of hard stops.
- Everything can be **grabbed and reversed mid-motion**.
- **Respect reduced motion:** fades instead of movement.

`spring.js` in this folder is a small, dependency-free spring helper (damping + response, interruptible, velocity-aware) you can copy into the project.

## 5. Hand it back

When you're done, reply with:

1. **Before and after:** each change, and the rule from the apple-design skill it follows.
2. **How to see it:** the file to open in a browser.
3. **Check it like a visitor:** press and hold a button, flick the product row, pull it past the end, open Buy and swipe it away, and look for anything you made up.
4. **How to put it live:** one or two plain sentences for their platform (for example, a custom page or theme section on Shopify). Don't publish anything yourself.

Write plainly. No hype words. Don't claim the result is "Apple-approved" or affiliated with Apple.
