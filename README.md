# Usama Nizamani — Portfolio

Personal portfolio site. Single page, hand-written HTML/CSS/JS, no build step.

**Live:** https://usamanizamani.vercel.app

## Stack

Vanilla HTML5, CSS3 and JavaScript. **No framework, no bundler, no `package.json`, no build step** — the files in the repo root are exactly what gets served. That is deliberate: it keeps deploys instant and the site dependency-free.

Two external runtime dependencies:

| Dependency | Used for |
|---|---|
| [Font Awesome 6.4.0](https://cdnjs.com/libraries/font-awesome) (CDN) | All icons |
| [Formspree](https://formspree.io) | Contact form delivery |

## Files

```
index.html          markup and all content
style.css           all styling; design tokens in :root
script.js           menu, scroll-spy, animations, contact form
favicon.svg         UN monogram
apple-touch-icon.png
og-image.png        1200x630 social share card
sitemap.xml
robots.txt
```

## Running locally

`script.js` is loaded as `<script type="module">`, and browsers refuse to load modules over `file://`. **Opening `index.html` by double-clicking will not work** — the page renders but every JS feature is dead. Use a local server:

```bash
python -m http.server 8000     # then http://localhost:8000
npx serve                      # if you have Node
```

VS Code's Live Server extension works too.

> The contact form posts to the live Formspree endpoint even from localhost. Do not submit test messages — they send real email and consume the monthly quota.

## Deploying

Vercel is connected to this repo and deploys `main` automatically.

```bash
git add .
git commit -m "Describe the change"
git push
```

Live in about a minute. No build settings to configure: the project uses framework preset **Other** with an empty build command and the repo root as output.

### The old GitHub Pages URL

`usamabarkat.github.io` still works — it redirects to the Vercel URL, so links in older LinkedIn posts don't break.

That redirect is served from the **`gh-pages` branch**, which is an orphan branch containing a single `index.html`. It shares no history with `main` and must stay that way: if the redirect page ever landed on `main`, Vercel would serve it and the site would redirect to itself.

To edit it:

```bash
git checkout gh-pages
# edit index.html
git commit -am "Update redirect"
git push
git checkout main
```

### Rolling back

Revert the commit and push — Vercel redeploys the previous state in about a minute:

```bash
git revert <sha>
git push
```

Vercel's dashboard also lets you promote any earlier deployment back to production instantly.

## Contact form

Posts to Formspree endpoint `xpqozlzg`, delivering to usamanizamani09@gmail.com. Free tier allows **50 submissions per month**, resetting monthly.

**Treat the form as frozen.** It is the only live integration on the site and the easiest thing to break silently — the page would look perfectly fine while messages stopped arriving. When changing `script.js`, leave the `action` attribute and the submit handler's request logic alone, and never point an automated test at the endpoint.

## Customising

**Colours** — edit the tokens at the top of `style.css`:

```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --hero-gradient-end: #2874a8;  /* darker than secondary for AA contrast */
    --accent-color: #e74c3c;
    --success-color: #2ecc71;
    --text-light: #5d6d6e;         /* 4.5:1 on white; don't lighten */
}
```

Two of these carry accessibility constraints. `--text-light` and `--hero-gradient-end` were chosen to meet WCAG AA contrast — lightening either drops body text or hero text below 4.5:1.

**Adding a project** — copy an existing `.project-card` block in `index.html`. Cards without a live demo omit that anchor entirely rather than linking to `#`; a project with no public repo yet uses a `.project-status` badge instead of links, so nothing focusable leads nowhere.

**Skill bars** — the percentage lives in the inline `style="width: N%"` on `.skill-progress`. The fill animation scales the bar with `transform`, so that inline width is the value to edit.

## Contact

- **Email:** usamanizamani09@gmail.com
- **LinkedIn:** [usama-nizamani-2170a1395](https://www.linkedin.com/in/usama-nizamani-2170a1395)
- **GitHub:** [UsamaBarkat](https://github.com/UsamaBarkat)
