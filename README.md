# The Saturday Alibi — Mobile Forensics Training

A standalone, **static** web app that recreates the "Saturday Alibi" mobile-forensics
training case as an interactive iPhone you can explore in the browser. No backend,
no LLM, no data leaves the page.

## The case

Dana Brisco, a clerk at Hartwell Hardware in the (fictional) town of Brindle Falls,
called in sick last Saturday. Their manager suspects they faked it to attend the
sold-out Aurora Static concert. Dana handed over their phone to clear their name.

Open every app — Messages, Phone, Photos, Browser, Notes — and check each
**Recently Deleted** folder. No single app proves anything; cross-reference photo
EXIF (location), the call log, messages, notes, and browser history to decide
whether the alibi holds.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # outputs static site to ./dist
npm run preview  # preview the production build locally
```

## Publish on GitHub Pages

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that
builds the site and deploys it to GitHub Pages on every push to `main`.

1. Create a new GitHub repo named **`saturday-alibi`** and push this folder to it
   (see commands below).
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main`. The workflow builds and publishes to
   `https://<your-username>.github.io/saturday-alibi/`.

> **Repo name matters.** `vite.config.ts` sets `base: "/saturday-alibi/"` so asset
> URLs resolve under the project sub-path. If you name the repo something else,
> change `BASE` in `vite.config.ts` to `"/<your-repo-name>/"`. For a user/org page
> or a custom domain served at the root, set `BASE = "/"`.

### First push

```bash
git remote add origin https://github.com/<your-username>/saturday-alibi.git
git branch -M main
git push -u origin main
```

## Credits

Extracted from the Kaycenia Security Academy camp game's "device examiner"
mini-game. Training scenario only — all names, numbers, and data are fictional.
