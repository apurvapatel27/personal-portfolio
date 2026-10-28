<a href="https://apurva-patel.vercel.app">
  <img src="https://apurva-patel.vercel.app/opengraph-image" alt="Apurva Patel: AI Product Designer & Builder. I design and build AI-powered tools that take the busywork out of running a business." width="100%">
</a>

# Hi, I'm Apurva 👋

**AI Product Designer & Builder** · Anand, Gujarat, India · 🟢 open to new projects

I design and build AI-powered tools that take the busywork out of running a business.

**🌐 Portfolio: [apurva-patel.vercel.app](https://apurva-patel.vercel.app)** &nbsp;·&nbsp; 📖 [My story, explained](https://apurva-patel.vercel.app/explained) (a scroll-through version)

This repository is the source code of that site.

---

## About me

I'm a freelance product designer and IT student. I start every project by understanding the people who'll use it and sketching the flow in Figma. Then I build the real thing.

These days that means CRMs and internal tools where AI agents and automations handle the repetitive work. Nobody should have to copy data between spreadsheets or re-send the same email by hand.

## Things I've built

**[AI-powered CRM](https://apurva-patel.vercel.app/work/ai-crm)** · Next.js, React, Node / Express, Supabase, Zoom API, Zapier<br>
A lead-management CRM I designed and built for my team of career advisors at StarTech Career LLC. It replaced manual Google Sheets entry and hand-sent emails, and 5 advisors use it every day. [Read the case study →](https://apurva-patel.vercel.app/work/ai-crm)

**[DayFlow](https://day-flow-tawny.vercel.app)** · React, Tailwind CSS, JavaScript<br>
An HR system built with team TechFlow at the Odoo × GCET hackathon. It has an employee directory, attendance check-in/out, leave requests with approvals, and salary breakdowns. I designed and developed the app; a teammate hosted the repo. [Live demo](https://day-flow-tawny.vercel.app) · [code](https://github.com/apurvapatel27/DayFlow)

**[CyberPulse-Sniffer](https://github.com/apurvapatel27/CyberPulse-Sniffer)** · Python, FastAPI, XGBoost, Random Forest, React<br>
An intrusion-detection prototype. A FastAPI service scores network traffic with XGBoost and Random Forest models, and a React dashboard shows the alerts as they arrive. Trained on synthetic data modelled on CICIDS2017.

**[Employee Payroll System](https://github.com/apurvapatel27/Employee-Payroll-System)** · Java, Servlets / JSP, JDBC, MySQL, Bootstrap<br>
A Java web app for managing employee payroll records, with JSP views over Servlets and JDBC on MySQL.

## What I can help with

- **AI-powered CRMs & internal tools:** lead pipelines, dashboards and admin tools designed around how your team actually works.
- **AI agents:** Claude-powered assistants that read, sort and draft, so people only handle the judgement calls.
- **AI automations:** Zapier, Make and n8n workflows that move data and send the follow-ups nobody has time for.
- **UX/UI design:** research, wireframes, prototypes and design systems in Figma, ready for your developers.
- **Websites & landing pages:** fast, accessible marketing sites for small businesses.

## Journey

- **Sep 2026 – present:** Career Advisor at StarTech Career LLC. I designed and built the team's AI CRM.
- **2024 – 2028:** B.Tech in Information Technology at MBIT, Anand (in progress, CGPA 8.91)
- **Jan – Aug 2024:** Sales Associate at Rogers / The Source, Calgary
- **Jan – Aug 2024:** Software Development at SAIT, Calgary (2 semesters)
- **2020 – 2023:** Diploma in Computer Engineering at K.J.I.T, Savli

## Toolbox

- **Design:** Figma, UX research, wireframing, prototyping, design systems
- **AI:** AI agents, LLM integrations, workflow automation, Claude API, Zapier, Make, n8n
- **Frontend:** React, Next.js, TypeScript, Tailwind CSS, Framer Motion, Three.js
- **Backend:** Node.js, Express, Supabase, PostgreSQL, GraphQL, Redis, Docker, AWS, Zoom API
- **Languages & data:** JavaScript, Python, Java, C++, MySQL
- **Tools:** Git, CI/CD, Jest, Linux, Vercel

## Let's talk

Got a messy workflow? Tell me what's slowing your team down and I'll suggest the simplest fix.

- 📧 [apurvapatel981@gmail.com](mailto:apurvapatel981@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/apurva-patel-213a692a7)
- 𝕏 [@AiWithApurva](https://x.com/AiWithApurva)
- 🌐 [apurva-patel.vercel.app](https://apurva-patel.vercel.app)

<br>

---

# Developer notes

Everything below is about the code. You only need it to run or change the site.

A notebook-style portfolio with lined paper, washi tape, stickers you can drag and a giant name under a highlighter lens. It also has a scroll-driven story at `/explained`. Built with **Next.js 16** (App Router), **React 19**, **TypeScript** and **Tailwind CSS v4**. Every page is static, so it's fast and costs nothing to host on Vercel's free plan.

## Run it locally

You need **Node.js 20.9 or newer**.

```bash
npm install     # first time only
npm run dev     # http://localhost:3000, reloads when you save
```

| Command | What it does |
|---|---|
| `npm run build` | Builds the production site. Run it before pushing: if it fails here, Vercel fails too. |
| `npm run start` | Serves the production build (run `build` first). |
| `npm run lint` | Checks the code for common mistakes. |

## Editing the content

**Almost everything lives in one file: [`content/site.ts`](content/site.ts).** That includes text, links, projects, skills, the journey, the case study, the `/explained` story and the form labels. You rarely need to touch the components.

- **Empty means hidden.** Anything left as `""` or `[]` doesn't appear on the site, so there are no placeholders.
- TypeScript checks your edits. A mistyped field name or tone colour gets underlined.
- Dates and places live once in `milestones`. The home journey, the case study and `/explained` all read from it.

| I want to… | Do this in `content/site.ts` |
|---|---|
| Show a **"Book a call"** button | Paste a Calendly link into `person.calendlyUrl`. |
| Add my **resume** | Put the PDF at `public/resume.pdf` and set `person.resumeUrl: "/resume.pdf"`. A footer button appears. |
| Change the status line | Edit `person.status` / `person.currently`. |
| Change the hero | Edit `hero.headline`, `hero.highlight` (the word with the yellow swipe), `hero.stickers` and `hero.noteCards`. |
| Fill in the CRM case study | Edit `crmCaseStudy` and `crmFeatures`. Empty sections stay hidden. |
| Change skills or the journey | Edit `about.skills` or `journey.entries` (newest first). |

### Adding a project

1. Optional screenshot: save a `.jpg` of about 1000 px wide in `public/images/projects/`. **Use dummy or blurred data, with no real client, lead, phone or email details.**
2. Copy an existing entry in the `projects` list and change it. If there's no screenshot, use a doodle (`visual: { kind: "doodle", doodle: "web", label: "…" }`). The available doodles are `crm`, `agent`, `automation`, `design`, `web`, `shield` and `payslip`.
3. Projects appear in the order they're listed. `size: "feature"` gives a big stacked card; `size: "small"` places the card below the stack.

### Images and fonts

- Always give `width` and `height` as the image's real pixel size. That stops the page jumping while it loads.
- Colours are defined once in [`app/globals.css`](app/globals.css) under `@theme`. Fonts are self-hosted with `next/font` in [`app/layout.tsx`](app/layout.tsx): Pixelify Sans, Figtree, Kalam and IBM Plex Mono, all under the SIL Open Font License.
- The `/explained` art in `public/vox/` is generated by `node scripts/prep-vox.mjs`. It reads raw PNGs from `_assets-raw/`, which isn't in git. The script writes phone-sized copies and records the sizes in `content/vox-assets.json`.

## How the contact form works

The form validates each step, then opens the visitor's email app with a ready-to-send message to `person.email`. Nothing is stored and no API keys are needed. Visitors without an email app get a **Copy message** button.

## Deploying

The site is hosted on **Vercel**, connected to this repository:

- Every push to `main` deploys to production at [apurva-patel.vercel.app](https://apurva-patel.vercel.app).
- Pushes to other branches get their own preview URL.

| Env variable | Required? | What it's for |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No | Set it if you add a custom domain. It's used for canonical links, the sitemap, robots.txt and share images. Without it, Vercel's production URL is used. It's baked in at build time, so redeploy after changing it. |

## What's where

```
content/site.ts         all text, links and lists (edit this)
app/
  page.tsx              home page
  work/ai-crm/          CRM case study
  explained/            the scroll story (page, styles, share image)
  layout.tsx            fonts, metadata, header and footer
  globals.css           colours, paper, tape and sticker styles
components/             one file per home section (Hero, Work, Services, About, Journey, Contact…)
  explained/            /explained chapters and the scroll engine (Explainer.tsx)
  doodle/               hand-drawn bits: frames, tape, draggable stickers, doodles
  ui/                   buttons, icons, headings
lib/                    form logic, site URL, share-image renderer
public/                 images served by the site
scripts/prep-vox.mjs    builds the /explained art from _assets-raw/
```

## Accessibility and performance

- Works with the keyboard alone: visible focus rings, a skip link, and focus that moves to each form step.
- Respects **Reduced motion**. That turns off the splash, the wiggles, the shrinking cards, the scroll animations and smooth scrolling.
- Tested on screens down to 360 px wide. Phones get smaller copies of the photos and tape.
- Lighthouse on mobile scores 100 for Accessibility, Best Practices and SEO, with no layout shift.
