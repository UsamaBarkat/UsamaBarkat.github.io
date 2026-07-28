# Project Memory — Usama Nizamani Portfolio

Single-page personal portfolio. Vanilla HTML/CSS/JS, **no build step, no `package.json`, no framework.** The files in the repo root are exactly what is served. Keep it that way — zero-build is a deliberate choice, not an oversight.

**Canonical URL:** https://usamanizamani.vercel.app

## Deployment

Vercel deploys `main` automatically on push. Preset **Other**, empty build command, repo root as output, no env vars.

`usamabarkat.github.io` redirects to the Vercel URL, preserving links in older LinkedIn posts. That redirect lives on the **orphan `gh-pages` branch** (a single `index.html`, no shared history with `main`).

> **Never put the redirect page on `main`.** Vercel serves `main`, so the site would redirect to itself.

Rollback: `git revert <sha> && git push`, or promote an earlier deployment in the Vercel dashboard.

## Hard rules

1. **The contact form is frozen.** Formspree endpoint `xpqozlzg` → usamanizamani09@gmail.com, free tier 50 submissions/month. Do not change the `action` attribute or the submit handler's request logic in `script.js`. It is the only live integration and it breaks silently — the page looks fine while mail stops arriving.
2. **Never point an automated test at the form.** It sends real email and burns quota. Verification is one manual submission, and only when something in that path actually changed.
3. **No `file://` preview.** `script.js` loads as `<script type="module">`, which browsers refuse over `file://`. Use `python -m http.server 8000`.
4. **Two colour tokens carry WCAG AA constraints** (below). Lightening either fails contrast.

## Content (matches `index.html` — update both together)

Five sections: Home, About, Skills, Projects, Contact. The About section includes an Education block linking Panaversity and PIAIC.

**Six skill cards:** Python, Prompt Engineering, Claude Code, OpenAI Agent Builder, n8n, Agentic AI. The percentage is the inline `style="width: N%"` on `.skill-progress`; the fill animation scales `transform`, so that inline value is what to edit.

**Five project cards:**

| Project | Tech | Links |
|---|---|---|
| AI Employee — Gold Tier | AI, Hackathon, Automation, HTML/CSS/JS | repo |
| Local File Transfer | Python, Networking | repo |
| Your Budget | Flutter, Dart, Mobile | repo |
| Solace by Fia | Next.js, Sanity, Vercel | live + repo |
| Mafia Wars | Web App, Social Deduction, Game | none — "In development" badge |

Card rules: omit the live-demo anchor entirely when there is no live URL (never `href="#"`); a project with no public repo uses a `.project-status` badge instead of links, so nothing focusable leads nowhere.

## Design tokens (`style.css` `:root`)

```css
--primary-color: #2c3e50;
--secondary-color: #3498db;
--hero-gradient-end: #2874a8;   /* AA: white hero text needs 4.5:1 */
--accent-color: #e74c3c;
--success-color: #2ecc71;
--text-light: #5d6d6e;          /* AA: 5.42:1 on white, 4.72:1 on --bg-light */
```

`--hero-gradient-end` exists because a hero gradient ending at `--secondary-color` gave white text only 3.15:1. It is used **only** by the hero, so `--secondary-color` remains available for buttons, links and project headers.

## Conventions

- Lowercase kebab-case classes. State classes are prefixed `is-` (`is-scrolled`, `is-visible`, `is-collapsed`, `is-leaving`).
- **All styling belongs in `style.css`**, using the tokens. Do not reintroduce `cssText` strings or injected `<style>` blocks in JS — those were removed deliberately.
- `script.js` is a module: module-scoped, deferred, nothing on `window`. Null-guard DOM lookups so one missing element cannot kill the file.
- **One scroll listener**, passive and rAF-throttled. Scroll-spy uses IntersectionObserver and needs no scroll events — don't add another listener.
- Animate `transform`/`opacity`, never layout properties like `width`.
- All `target="_blank"` links carry `rel="noopener noreferrer"`.
- Decorative Font Awesome `<i>` elements carry `aria-hidden="true"`; icon-only controls need an `aria-label`.

## Accessibility baseline (don't regress)

The mobile menu toggle is a real `<button>` with `aria-label`, `aria-expanded` and `aria-controls`; Escape closes it and returns focus to the toggle. There is a skip link, `:focus-visible` rings on every interactive element (white on the navbar and hero, dark elsewhere), and `role="status"` on the form status and toast notifications.

## Known remaining gaps

- `index.html` meta description and `<title>` still say "AI Enthusiast", while the hero and the OG tags say "Agentic AI Developer | Full-Stack Builder".
- Font Awesome loads its full CDN stylesheet for ~12 glyphs — the heaviest asset on the page. Inline SVGs would be the biggest performance win available.
- No JSON-LD structured data, no analytics, no dark mode.

## Contact

usamanizamani09@gmail.com · [LinkedIn](https://www.linkedin.com/in/usama-nizamani-2170a1395) · [GitHub](https://github.com/UsamaBarkat)
