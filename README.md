# apple-redesign

Give any website Apple's design rules, with Claude.

One install gives Claude two skills:

| Skill | What it does | By |
|---|---|---|
| `apple-redesign` | The workflow: audit your homepage, wait for your OK, then build a new phone-first page with your real products and prices. | Henry Chua |
| `apple-design` | The rules: Apple's design and motion principles from its WWDC talks, translated for the web. | [Emil Kowalski](https://github.com/emilkowalski/skills), MIT, copied unchanged from commit `e8a175d` |

## Install

You need [Node.js](https://nodejs.org) (LTS). In Terminal (Mac) or Command Prompt (Windows):

```bash
npx skills@latest add EasyAIHenry/apple-redesign
```

If it asks, pick both skills and Claude Code.

## Use

Open the Claude desktop app, go to the **Code** tab (needs a paid Claude plan) and choose your website's folder. On Shopify, Wix or Squarespace, make an empty folder called `redesign` and choose that. Then paste:

```text
Use the apple-redesign skill on my homepage. My site is [your address].
```

Claude audits the page and waits for your OK before it builds. Your live site doesn't change: the new page is saved in the folder for you to open in a browser.

## Notes

- Made for the Designed by Claude series by Henry Chua. The Apple redesign shown in the video is an unofficial concept, not affiliated with Apple. Aerlo, the store in the demo, is a made-up brand.
- `skills/apple-design/` is Emil Kowalski's work under his MIT licence (`skills/apple-design/LICENSE`). For his latest version, install `emilkowalski/skills` directly.
- Everything else here is MIT licensed (`LICENSE`).
