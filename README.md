# Apurva Patel · freelance portfolio

A notebook / crayon style portfolio: lined paper, washi tape, stickers you can drag, and a giant name with a highlighter lens. Built with **Next.js 16** (App Router), **TypeScript** and **Tailwind CSS v4**. Every page is static, so it's fast and costs nothing to host on Vercel's free plan.

All artwork, styles and copy were written from scratch for this site.

---

## Run it on your computer

You need **Node.js 20.9 or newer** ([nodejs.org](https://nodejs.org)). Check with `node -v`.

```bash
npm install        # first time only
npm run dev        # start the dev server at http://localhost:3000
```

The page reloads by itself when you save a file. Stop the server with `Ctrl + C`.

Other commands:

| Command | What it does |
|---|---|
| `npm run build` | Builds the production site. Run this before pushing; if it fails, Vercel will fail too. |
| `npm run start` | Serves the production build at http://localhost:3000 (run `build` first). |
| `npm run lint` | Checks the code for common mistakes. |

---

## Editing the content

**Almost everything you'll ever change is in one file: [`content/site.ts`](content/site.ts).** Text, links, projects, skills, the journey timeline and form labels all live there. You don't need to touch the components.

Rules of thumb:

- Keep the quotes and commas intact. If `npm run dev` shows a red error after an edit, it's usually a missing comma or quote.
- **Empty means hidden.** Anything left as `""` or `[]` simply doesn't appear on the site (no placeholders).
- TypeScript checks your edits: if you mistype a field name or a tone colour, the editor underlines it.

### Common jobs

| I want to… | Do this in `content/site.ts` |
|---|---|
| Show a **"Book a call"** button | Paste your Calendly link into `person.calendlyUrl`. The buttons appear in the hero, services and contact sections. |
| Add my **resume** | Put the fixed PDF at `public/resume.pdf`, then set `person.resumeUrl: "/resume.pdf"`. A "Resume" button appears in the footer. |
| Change the **"Currently…"** line or the status pill | Edit `person.currently` / `person.status`. |
| Change the **intro splash** | Edit `splash.first` (types in letter by letter) and `splash.second`. It shows once per browser session. |
| Change the **hero headline** | Edit `hero.headline`. `hero.highlight` is the word with the yellow swipe; `hero.accents` drops a little icon sticker after a word (icons: `pencil`, `spark`, `heart`, `arrow`, …). |
| Change the hero **stickers** | Edit `hero.stickers`. `tone` is one of `yellow`, `orange`, `pink`, `blue`, `green`, `mint`; `tilt` is degrees. |
| Change the hero **note cards** | Edit `hero.noteCards` (the first sits on the left, the second on the right, each with an arrow pointing at the name). |
| Fill in the **CRM case study** | Edit `crmCaseStudy`: add design steps to `process`, more items to `features`, and the AI feature names to `ai.live` / `ai.inProgress`. Empty sections stay hidden. |
| Change **skills** | Edit the groups in `about.skills`. |
| Add a **job or course** | Add an entry at the top of `journey.entries` (newest first). `kind` is `"work"` or `"study"`. |
| Change the **email** the form sends to | Edit `person.email` (and the email entry in `socials`). |

### Adding a new project

1. If you have a screenshot, save it as a `.jpg` in `public/images/projects/` (about 1000 px wide is plenty). **Use dummy or blurred data: no real client, lead, phone or email details.**
2. Add an entry to the `projects` list in `content/site.ts`. Copy an existing one and change it:

   ```ts
   {
     slug: "my-new-project",            // lowercase, dashes, unique
     title: "My New Project",
     kicker: "Client work · 2026",      // small label above the title
     summary: "One or two honest sentences about what it does and what you did.",
     tags: ["Next.js", "Supabase"],
     links: {
       demo: "https://…",               // shows "View project" (omit if there's no live demo)
       code: "https://github.com/…",    // shows "Code" (omit if private)
     },
     visual: {
       kind: "image",
       src: "/images/projects/my-new-project.jpg",
       width: 1000,                     // the image's real size in pixels
       height: 700,
       alt: "Describe what the screenshot shows",
       caption: "a short handwritten caption",
     },
     tone: "blue",                      // card colour: yellow | orange | pink | blue | green | mint
     size: "feature",                   // "feature" = big stacked card, "small" = below the stack
   },
   ```

   No screenshot? Use a doodle instead: `visual: { kind: "doodle", doodle: "web", label: "Doodle: …" }`. Available doodles: `crm`, `agent`, `automation`, `design`, `web`, `shield`, `payslip`.
3. Projects appear in the order they're listed.

### Changing images

- **Your photo:** replace `public/images/apurva.jpg` (portrait, 4:5, about 900×1125 px) and update `about.photo` (`width`, `height`, `alt`).
- Always give `width` and `height` as the image's real pixel size; that's what stops the page jumping while images load.
- Keep originals and anything private in `_private/`. That folder is git-ignored and never deployed.

### Fonts and colours

- Colours are defined once in [`app/globals.css`](app/globals.css) under `@theme` (e.g. `--color-yellow`), and Tailwind turns them into classes like `bg-yellow`.
- Fonts are loaded in [`app/layout.tsx`](app/layout.tsx) with `next/font` (self-hosted, no Google requests at runtime): **Pixelify Sans** (your name in the hero only), **Figtree** (headings and body text), **Kalam** (handwriting) and **IBM Plex Mono** (labels and buttons).
- `assets/fonts/` holds small copies used only to draw the social-share images. All four fonts are under the SIL Open Font License (see the `OFL-*.txt` files).

---

## How the contact form works

The form validates each step, then opens the visitor's own email app with a ready-to-send message addressed to `person.email`. Nothing is stored, and there are no API keys.

The honest limitation: the message is only sent when the visitor presses **Send** in their email app. For people without one, the success screen offers **Copy message** and shows your address. If you later want in-page sending, the swap is `lib/contact.ts` plus a small route that calls an email service (e.g. Resend); that would need one secret env var.

---

## Deploying to Vercel

### First deploy

1. **Push the code to GitHub.**
   - Create an empty repository on GitHub (no README or .gitignore, since this project already has them).
   - Then, in this folder (it's already a git repository on the `main` branch):

     ```bash
     git add -A
     git commit -m "First version of my portfolio"
     git remote add origin https://github.com/<your-username>/<repo-name>.git
     git push -u origin main
     ```

     `_private/`, `.env.local`, `node_modules/` and `.next/` are git-ignored, so they never leave your computer.
2. Go to [vercel.com](https://vercel.com), **sign up with GitHub**, then **Add New… → Project**.
3. **Import** your repository. Vercel detects Next.js automatically; leave the build settings as they are.
4. **Environment variables:** none are required. (Optional: see below.)
5. Click **Deploy**. After about a minute you get a URL like `https://<repo-name>.vercel.app`.

From then on, every `git push` to `main` redeploys automatically, and pushes to other branches get their own preview URL.

### Environment variables

| Name | Required? | What it's for |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No (set it once you add a custom domain) | The site's public address, e.g. `https://apurvapatel.com`. Used for canonical links, the sitemap, robots.txt and share images. If it's not set, Vercel's production URL is used automatically. |

To set it: Vercel → your project → **Settings → Environment Variables** → add `NEXT_PUBLIC_SITE_URL` for **Production** → save → **Deployments → ⋯ → Redeploy**. (It's baked in at build time, so a redeploy is needed.)

Locally, copy `.env.example` to `.env.local` if you ever want to override it. `.env.local` is git-ignored.

### Custom domain (optional)

Vercel → project → **Settings → Domains** → add your domain and follow the DNS instructions. Then set `NEXT_PUBLIC_SITE_URL` to it and redeploy.

### After deploying

- Share a link in WhatsApp or LinkedIn to check the preview card (generated from `app/opengraph-image.tsx`).
- Check speed and accessibility at [pagespeed.web.dev](https://pagespeed.web.dev) (paste your URL, look at the Mobile tab). Scores move a few points between runs, so judge by two or three runs, not one.
- Optional: add the site to [Google Search Console](https://search.google.com/search-console) and submit `https://<your-site>/sitemap.xml`.

---

## What's where

```
content/site.ts         ← all text, links and lists (edit this)
app/
  layout.tsx            fonts, metadata, header/footer, splash
  page.tsx              home page (sections in order) + JSON-LD
  work/ai-crm/page.tsx  CRM case study
  opengraph-image.tsx   share image (plus one in work/ai-crm/)
  icon.svg, apple-icon.tsx, sitemap.ts, robots.ts, not-found.tsx
  globals.css           colours, paper background, tape/sticker styles, animations
components/             one file per section (Hero, Work, Services, About, Journey, Contact…)
  doodle/               hand-drawn bits: SketchFrame, Tape, DraggableSticker, doodles
  ui/                   Button, Icon, SectionHeading, SocialButtons, StatusPill
lib/                    form logic, site URL, share-image renderer, helpers
public/                 images served by the site
assets/fonts/           fonts for the share images only
_private/               NOT committed or deployed (resume, original photos, notes)
```

## Accessibility and motion

- Works with keyboard only (visible blue-deep focus rings, skip link, focus moves to each form step).
- Respects **Reduced motion**: no splash, no wiggles, no shrinking project cards, no smooth scrolling.
- The name lens is mouse-only; touch screens see the plain name.
- Tested down to 360 px wide.

If you add images, always write real `alt` text describing what's in them.
