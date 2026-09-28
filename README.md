# portfolio

Personal portfolio site. Plain HTML, CSS, and JavaScript — no framework, no build step.

## Run locally

```powershell
npx serve .
```

Then open the printed URL. Any static file server works; you can also just open `index.html`, though the GitHub projects fetch is happier over `http://`.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page content and structure |
| `styles.css` | Theme tokens, layout, responsive rules |
| `main.js` | Theme toggle, mobile nav, scroll reveal, GitHub project feed |

## Customize

- Name, tagline, and about copy: `index.html`
- Email address: search for `you@example.com` in `index.html`
- Colors: the CSS custom properties under `:root` in `styles.css`
- GitHub username for the live project list: `GITHUB_USER` at the top of `main.js`

The projects section calls the public GitHub REST API from the browser, so it needs no token and stays current as you push new repos.

## Deploy to GitHub Pages

Push to `main`, then in the repository go to **Settings → Pages** and set the source to **GitHub Actions**. The workflow in `.github/workflows/pages.yml` publishes the site on every push.
