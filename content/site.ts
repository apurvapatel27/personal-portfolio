/**
 * Every word, link and list on the site lives in this file.
 * Edit text here; components never need to change.
 *
 * Anything left empty ("" or []) is hidden on the site automatically,
 * e.g. the "Book a call" button stays hidden until `calendlyUrl` is set.
 */

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

/** Crayon colours used for stickers, tape and card tints. */
export type Tone = "yellow" | "orange" | "pink" | "blue" | "green" | "mint";

export type DoodleName =
  | "crm"
  | "agent"
  | "automation"
  | "design"
  | "web"
  | "shield"
  | "payslip";

export type Sticker = {
  text: string;
  tone: Tone;
  /** Resting tilt in degrees. */
  tilt: number;
};

/** Small line icons drawn in components/ui/Icon.tsx. */
export type IconName =
  | "work"
  | "services"
  | "about"
  | "journey"
  | "contact"
  | "pencil"
  | "spark"
  | "heart"
  | "arrow";

export type Social = {
  id: "github" | "linkedin" | "x" | "email";
  label: string;
  handle: string;
  href: string;
};

export type ProjectVisual =
  | {
      kind: "image";
      src: string;
      width: number;
      height: number;
      alt: string;
      /** Handwritten caption under the polaroid. */
      caption?: string;
    }
  | { kind: "doodle"; doodle: DoodleName; label: string };

export type Project = {
  slug: string;
  title: string;
  /** Small label above the title, e.g. "Hackathon · team TechFlow". */
  kicker: string;
  summary: string;
  tags: string[];
  /** Rubber-stamp style highlights. */
  stamps?: string[];
  links: {
    /** Live demo. "View project" only shows when this is set. */
    demo?: string;
    /** Source code. "Code" only shows when this is set. */
    code?: string;
    /** Internal case study page. */
    caseStudy?: string;
  };
  visual: ProjectVisual;
  /** Optional client logo, taped onto the card as a small polaroid. */
  client?: { name: string; logo: string; width: number; height: number };
  tone: Tone;
  /** "feature" cards stack while scrolling; "small" cards sit below the stack. */
  size: "feature" | "small";
};

export type Service = {
  title: string;
  body: string;
  doodle: DoodleName;
  tone: Tone;
};

export type SkillGroup = { title: string; items: string[] };

export type JourneyEntry = {
  when: string;
  title: string;
  org: string;
  note?: string;
  kind: "work" | "study";
};

export type Option = { value: string; label: string };

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

export const person = {
  name: "Apurva Patel",
  firstName: "Apurva",
  title: "AI Product Designer & Builder",
  tagline:
    "I design and build AI-powered tools that take the busywork out of running a business.",
  location: "Anand, Gujarat, India",
  email: "apurvapatel981@gmail.com",
  /** Shown as a green dot + text in the hero and contact section. */
  status: "Open to new projects",
  currently: "Currently: open to new projects and messy workflows.",
  /** Paste your Calendly link to show the "Book a call" buttons. */
  calendlyUrl: "",
  /** Set to "/resume.pdf" once the fixed PDF is in /public. */
  resumeUrl: "",
  copyrightYear: 2026,
};

/** Intro overlay: the first line types in, then swaps to the second. */
export const splash = {
  first: "Oh, hello!",
  second: "You found me!",
};

export const nav: { label: string; href: string; icon: IconName }[] = [
  { label: "Work", href: "/#work", icon: "work" },
  { label: "Services", href: "/#services", icon: "services" },
  { label: "About", href: "/#about", icon: "about" },
  { label: "Journey", href: "/#journey", icon: "journey" },
  { label: "Contact", href: "/#contact", icon: "contact" },
];

/** The outlined button at the right of the header. */
export const header = {
  contact: { label: "Contact", href: "/#contact" },
  socialsLabel: "Social links",
  menuOpen: "Open menu",
  menuClose: "Close menu",
};

export const socials: Social[] = [
  {
    id: "github",
    label: "GitHub",
    handle: "apurvapatel27",
    href: "https://github.com/apurvapatel27",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "apurva-patel",
    href: "https://www.linkedin.com/in/apurva-patel-213a692a7",
  },
  {
    id: "x",
    label: "X",
    handle: "@AiWithApurva",
    href: "https://x.com/AiWithApurva",
  },
  {
    id: "email",
    label: "Email",
    handle: "apurvapatel981@gmail.com",
    href: "mailto:apurvapatel981@gmail.com",
  },
];

export const hero = {
  /** Handwritten label above the name. */
  hello: "my name is",
  /** Big sentence under the name. */
  headline: "I design and build AI tools that take the busywork out of work.",
  /** Word in the headline that gets a highlighter swipe ("" for none). */
  highlight: "busywork",
  /** Little icon stickers dropped into the headline right after these words. */
  accents: [
    { after: "design", icon: "pencil", tone: "yellow" },
    { after: "AI tools", icon: "spark", tone: "blue" },
  ] satisfies { after: string; icon: IconName; tone: Tone }[],
  /** Pill stickers around the name. Drag them around; they wobble on their own. */
  stickers: [
    { text: "builds with AI", tone: "yellow", tilt: -6 },
    { text: "ships fast", tone: "pink", tilt: 5 },
    { text: "Figma → Code", tone: "mint", tilt: -3 },
  ] satisfies Sticker[],
  /** Handwritten note cards with arrows pointing at the name. */
  noteCards: [
    { text: "AI Product Designer", tone: "yellow" },
    { text: "Anand, India", tone: "blue" },
  ] satisfies { text: string; tone: Tone }[],
  contactCta: { label: "Contact me", href: "/#contact" },
  primaryCta: { label: "See my work", href: "/#work" },
  /** Sticker under the buttons that opens the scroll explainer. */
  storyLink: { label: "watch my story ↓", href: "/explained" },
};

export const work = {
  eyebrow: "01 · work",
  heading: "Things I've made",
  intro:
    "From a CRM my team opens every morning to a hackathon build and a few side projects.",
  moreLabel: "More projects",
  labels: {
    demo: "View project",
    code: "Code",
    caseStudy: "Read the case study",
  },
};

/**
 * The CRM's features: the one source for the home card, the case study and
 * /explained. Only named features are listed, and only listed ones are counted.
 */
export const crmFeatures = {
  aiLive: ["AI chat feature"],
  aiInProgress: ["AI sales script generation", "Email automation", "AI chat agent upgrades"],
  /** Built into the CRM, but not AI. */
  tools: ["Zoom calling", "Lead management"],
};

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

export const projects: Project[] = [
  {
    slug: "ai-crm",
    title: "AI-powered CRM",
    kicker: "Flagship · StarTech Career LLC",
    summary:
      "A lead-management CRM I designed and built for my team of career advisors, replacing manual Google Sheets entry and hand-sent emails. Used daily by 5 advisors.",
    tags: ["Next.js", "React", "Node / Express", "Supabase", "Zoom API", "Zapier"],
    stamps: [`${plural(crmFeatures.aiLive.length, "AI feature")} live`, `${crmFeatures.aiInProgress.length} in progress`],
    links: { caseStudy: "/work/ai-crm" },
    visual: {
      kind: "doodle",
      doodle: "crm",
      label: "Doodle: a crossed-out spreadsheet with an arrow pointing to a tidy CRM board",
    },
    client: { name: "StarTech Career LLC", logo: "/logos/startech.jpg", width: 480, height: 480 },
    tone: "yellow",
    size: "feature",
  },
  {
    slug: "dayflow",
    title: "DayFlow",
    kicker: "Hackathon · team TechFlow",
    summary:
      "An HR management system with an employee directory, attendance check-in/out, leave requests with approvals, and salary breakdowns. Built from scratch for team TechFlow at the Odoo × GCET hackathon. I designed and developed the app; a teammate hosted the repo.",
    tags: ["React", "Tailwind CSS", "JavaScript"],
    links: {
      demo: "https://day-flow-tawny.vercel.app",
      code: "https://github.com/apurvapatel27/DayFlow",
    },
    visual: {
      kind: "image",
      src: "/images/projects/dayflow-signin.jpg",
      width: 1000,
      height: 700,
      alt: "DayFlow's sign-in screen: a dark card with a green D logo, email and password fields and a green Sign In button",
      caption: "the live demo's sign-in screen",
    },
    tone: "blue",
    size: "feature",
  },
  {
    slug: "cyberpulse-sniffer",
    title: "CyberPulse-Sniffer",
    kicker: "ML prototype",
    summary:
      "An intrusion-detection prototype: a FastAPI service scores network traffic with XGBoost and Random Forest models, and a React dashboard shows alerts as they come in. Trained on synthetic data modelled on CICIDS2017.",
    tags: ["Python", "FastAPI", "XGBoost", "Random Forest", "React"],
    links: { code: "https://github.com/apurvapatel27/CyberPulse-Sniffer" },
    visual: {
      kind: "doodle",
      doodle: "shield",
      label: "Doodle: a shield scanning a stream of network packets",
    },
    tone: "mint",
    size: "feature",
  },
  {
    slug: "employee-payroll-system",
    title: "Employee Payroll System",
    kicker: "Java web app",
    summary:
      "A Java web app for managing employee payroll records, with JSP views over Servlets and JDBC on MySQL.",
    tags: ["Java", "Servlets / JSP", "JDBC", "MySQL", "Bootstrap"],
    links: { code: "https://github.com/apurvapatel27/Employee-Payroll-System" },
    visual: { kind: "doodle", doodle: "payslip", label: "Doodle: a payslip with a PAID stamp" },
    tone: "pink",
    size: "small",
  },
];

export const services = {
  eyebrow: "02 · services",
  heading: "What I can do for you",
  intro:
    "Design first, then the real thing. I can take a messy workflow from a whiteboard sketch to a tool your team opens every morning.",
  items: [
    {
      title: "AI-powered CRMs & internal tools",
      body: "Custom lead pipelines, dashboards and admin tools designed around how your team actually works.",
      doodle: "crm",
      tone: "yellow",
    },
    {
      title: "AI agents",
      body: "Claude-powered assistants that read, sort and draft, so people only handle the judgement calls.",
      doodle: "agent",
      tone: "mint",
    },
    {
      title: "AI automations",
      body: "Zapier, Make and n8n workflows that move data and send the follow-ups nobody has time for.",
      doodle: "automation",
      tone: "blue",
    },
    {
      title: "UX/UI design",
      body: "Research, wireframes, prototypes and design systems in Figma, ready for your developers.",
      doodle: "design",
      tone: "pink",
    },
    {
      title: "Websites & landing pages",
      body: "Fast, accessible marketing sites for small businesses.",
      doodle: "web",
      tone: "orange",
    },
  ] satisfies Service[],
  /** Extra card after the services that points to the contact form. */
  unsure: {
    title: "Not sure which one you need?",
    body: "Tell me what's slowing your team down and I'll suggest the simplest fix.",
    cta: "Describe the problem",
  },
  goodFitLabel: "Good fit for",
  goodFit: [
    "Small businesses & agencies",
    "Coaching, career & education firms",
    "Early-stage startups",
    "Sales & service teams",
  ],
  processLabel: "How I work",
  process: [
    { title: "Understand", body: "the workflow and the people in it" },
    { title: "Design", body: "the flow and screens in Figma" },
    { title: "Build", body: "the real, working product" },
    { title: "Automate", body: "the busywork with AI" },
  ],
  pricing:
    "Every project starts with a free intro call and a clear quote. Let's talk.",
};

export const about = {
  eyebrow: "03 · about",
  heading: "A designer who ships",
  paragraphs: [
    "I'm a freelance product designer and IT student from Anand, Gujarat. I start every project by understanding the people who'll use it and sketching the flow in Figma, then I build the real thing.",
    "These days that means CRMs and internal tools where AI agents and automations handle the repetitive work: no more copying data between spreadsheets or re-sending the same email by hand.",
  ],
  photo: {
    src: "/images/apurva.jpg",
    width: 900,
    height: 1125,
    alt: "Apurva Patel smiling in sunglasses and a white T-shirt, standing on a frozen lake in front of snowy mountains",
    caption: "that's me!",
  },
  skillsHeading: "Toolbox",
  skills: [
    {
      title: "Design",
      items: ["Figma", "UX research", "Wireframing", "Prototyping", "Design systems"],
    },
    {
      title: "AI",
      items: [
        "AI agents",
        "LLM integrations",
        "Workflow automation",
        "Claude API",
        "Zapier",
        "Make",
        "n8n",
      ],
    },
    {
      title: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
    },
    {
      title: "Backend",
      items: [
        "Node.js",
        "Express",
        "Supabase",
        "PostgreSQL",
        "GraphQL",
        "Redis",
        "Docker",
        "AWS",
        "Zoom API",
      ],
    },
    {
      title: "Languages & data",
      items: ["JavaScript", "Python", "Java", "C++", "MySQL"],
    },
    {
      title: "Tools",
      items: ["Git", "CI/CD", "Jest", "Linux", "Vercel"],
    },
  ] satisfies SkillGroup[],
};

type Milestone = { when: string; title: string; org: string };
type BuildStop = Milestone & { note: string; alongside?: Milestone & { note: string } };

/** Types a list against `T` (catching typos) while keeping the wider type for readers. */
const listOf = <T,>(items: T[]) => items;

/** Dates and places: the one source for the home journey, the case study and /explained. */
export const milestones = {
  startech: { when: "Sep 2026 – present", title: "Career Advisor", org: "StarTech Career LLC" },
  mbit: {
    when: "2024 – 2028",
    title: "B.Tech, Information Technology",
    org: "Madhuben and Bhanubhai Patel Institute of Technology (MBIT), Anand",
  },
  rogers: { when: "Jan – Aug 2024", title: "Sales Associate", org: "Rogers / The Source, Calgary" },
  sait: { when: "Jan – Aug 2024", title: "Software Development", org: "SAIT, Calgary" },
  kjit: { when: "2020 – 2023", title: "Diploma in Computer Engineering", org: "K.J.I.T, Savli" },
};

export const journey = {
  eyebrow: "04 · journey",
  heading: "The journey so far",
  legend: { work: "Work", study: "Study" },
  entries: listOf<JourneyEntry>([
    {
      ...milestones.startech,
      note: "Designed and built the team's AI CRM, used daily by 5 advisors.",
      kind: "work",
    },
    { ...milestones.mbit, note: "In progress · CGPA 8.91", kind: "study" },
    { ...milestones.rogers, kind: "work" },
    { ...milestones.sait, note: "2 semesters", kind: "study" },
    { ...milestones.kjit, kind: "study" },
  ]),
};

export const logos = {
  builtForLabel: "Built for",
  builtFor: [
    {
      name: "StarTech Career LLC",
      src: "/logos/startech.jpg",
      width: 480,
      height: 480,
    },
  ],
  toolsLabel: "Tools I build with",
  tools: ["Claude", "Zapier", "Make", "n8n", "Zoom", "Supabase", "Next.js", "Figma"],
};

export const contact = {
  eyebrow: "05 · contact",
  heading: "Got busywork? Let's get rid of it.",
  body: "Tell me what's slowing your team down and I'll get back to you by email.",
  bookCallLabel: "Book a free call",
  directLabel: "Or find me here",
  form: {
    steps: ["What do you need?", "Tell me about it", "Who are you?", "Check & send"],
    labels: {
      services: "Pick everything that applies",
      message: "What's slowing your team down?",
      messageHint: "A few lines is plenty: the workflow, the tools you use now, and what you'd like to change.",
      timeline: "Timeline (optional)",
      reviewTimeline: "Timeline",
      name: "Your name",
      email: "Your email",
      company: "Company (optional)",
      back: "Back",
      next: "Next",
      send: "Open my email app",
      sendHint: "This opens your email app with everything filled in. Nothing is sent until you press Send there.",
      edit: "Edit",
    },
    success: {
      heading: "Almost there!",
      body: "Your email app should have opened with everything filled in. Just hit send.",
      fallback: "No email app? Copy the message and send it to",
      copy: "Copy message",
      copied: "Copied!",
      copyFailed: "Copying didn't work here. Open the full message below and copy it by hand.",
      showMessage: "Show the full message",
      restart: "Start over",
    },
    serviceOptions: [
      ...services.items.map((s) => ({ value: s.title, label: s.title })),
      { value: "Something else", label: "Something else" },
    ] satisfies Option[],
    timelineOptions: [
      { value: "", label: "Not sure yet" },
      { value: "As soon as possible", label: "As soon as possible" },
      { value: "In the next 1–3 months", label: "In the next 1–3 months" },
      { value: "Just exploring", label: "Just exploring" },
    ] satisfies Option[],
    minMessageLength: 20,
    maxMessageLength: 1500,
  },
};

export const footer = {
  note: "Thanks for flipping through my notebook!",
  navLabel: "Pages",
  socialLabel: "Elsewhere",
  resumeLabel: "Resume (PDF)",
  credit: "designed & built by me, with crayons",
  backToTop: "Back to top",
  skipLink: "Skip to content",
};

export const notFoundPage = {
  title: "Page not found",
  heading: "This page fell out of the notebook.",
  body: "The link might be old, or the page moved. Everything else is still on the home page.",
  cta: "Back to the home page",
};

/** The flagship case study at /work/ai-crm. Empty lists are hidden. */
export const crmCaseStudy = {
  slug: "ai-crm",
  title: "An AI-powered CRM for StarTech Career LLC",
  description:
    "How I designed and built a lead-management CRM, with Zoom calling and Zapier automations, that a team of 5 career advisors uses every day.",
  /** Short title for the browser tab and share cards. */
  shortTitle: "AI-powered CRM case study",
  client: { name: "StarTech Career LLC", logo: "/logos/startech.jpg", width: 480, height: 480 },
  labels: {
    eyebrow: "Case study",
    back: "Back to all work",
    problem: "The problem",
    beforeAfter: "Before → after",
    beforeAfterAlt:
      "Doodle: on the left, a spreadsheet crossed out in red; an arrow points to a tidy CRM board with coloured cards and sparkles on the right",
    process: "Design process",
    features: "What I built",
    ai: "AI features",
    live: "live",
    inProgress: "in progress",
    results: "Results so far",
    next: "Next project",
    cta: "Want something like this for your team?",
  },
  meta: [
    { label: "Role", value: "Designer & developer (while working as a Career Advisor)" },
    { label: "Timeline", value: milestones.startech.when },
    { label: "Users", value: "5 advisors, daily" },
    {
      label: "Stack",
      value: "Next.js, React, Node / Express, Supabase / PostgreSQL, Zoom API, Zapier",
    },
  ],
  problem: [
    "Every new lead was typed into Google Sheets by hand, and every email to a lead was written and sent manually.",
  ],
  /** Your design process, one step per entry. Hidden while empty. */
  process: [] as string[],
  /** Core features. Add to this list as the CRM grows. */
  features: [
    "One shared lead pipeline instead of a spreadsheet",
    "Call leads through Zoom, straight from the CRM",
    "Automations built on Zapier",
  ],
  ai: {
    live: crmFeatures.aiLive,
    inProgress: crmFeatures.aiInProgress,
  },
  results:
    "Used daily by 5 advisors. Hard numbers will come once there's enough data.",
};

/**
 * /explained: the portfolio as a scroll-through explainer, one chapter at a
 * time. Only use real facts and numbers here; empty fields are hidden.
 */
export const explained = {
  path: "/explained",
  meta: {
    title: "My story, explained",
    description:
      "A scroll-through explainer: how an IT student from Anand ended up designing and building an AI-powered CRM for a team of career advisors.",
  },
  titleCard: {
    kicker: "Apurva Patel, explained",
    heading: "An IT student, a messy spreadsheet and an AI-powered CRM",
    /** Part of the heading that gets the highlighter ("" for none). */
    highlight: "AI-powered CRM",
    photo: {
      avif: "/vox/me-cutout.avif",
      webp: "/vox/me-cutout.webp",
      width: 900,
      height: 1125,
      /** Narrower copy for phones (same art, prepared by scripts/prep-vox.mjs). */
      small: { avif: "/vox/me-cutout-560.avif", webp: "/vox/me-cutout-560.webp", width: 560 },
      alt: "Cut-out photo of Apurva Patel in sunglasses and a Brooklyn T-shirt, arms crossed",
    },
    photoNote: "that's me!",
    scrollHint: "Scroll to play ↓",
  },
  crm: {
    number: "01",
    title: "The CRM",
    tone: "yellow" as Tone,
    doc: {
      label: "Project brief",
      ref: "No. 01",
      fields: [
        { label: "Client", value: "StarTech Career LLC" },
        { label: "Role", value: "Designer & developer" },
        { label: "Stack", value: "Next.js · Supabase · Zoom API · Zapier" },
      ],
      briefLabel: "The brief",
      /** 2–3 sentences: the problem at StarTech and what you built. */
      brief:
        "Every new lead at StarTech Career LLC was typed into Google Sheets by hand, and every email was written and sent one at a time. Sound familiar? So I designed and built a CRM that keeps every lead in one place, with Zoom calling and Zapier automations built in, and now 5 advisors open it every morning.",
      /** Phrases in the brief that get the highlighter, in order. */
      highlights: ["typed into Google Sheets by hand", "every lead in one place"],
      /** A real number + label from the brief to circle. Leave "" to circle `circleFallback` instead. */
      circle: "5 advisors",
      circleFallback: "written and sent one at a time",
    },
    sticker: { label: "Read the case study", href: "/work/ai-crm" },
  },
  build: {
    number: "02",
    title: "Build",
    tone: "blue" as Tone,
    /** Timeline panels, oldest first. The camera pans across them. */
    stops: listOf<BuildStop>([
      { ...milestones.kjit, note: "" },
      { ...milestones.sait, note: "2 semesters in Canada" },
      {
        ...milestones.mbit,
        org: "MBIT, Anand",
        note: "in progress · CGPA 8.91",
        /** Shown on the same panel as the degree. */
        alongside: { ...milestones.startech, note: "designed and built the team's AI CRM" },
      },
    ]),
    projectsHeading: "Built along the way",
    /** Screenshot slots. Leave `shot` empty to show a labelled placeholder. */
    projects: [
      { slug: "ai-crm", name: "AI-powered CRM", caption: "Used daily by 5 advisors at StarTech.", shot: "" },
      { slug: "dayflow", name: "DayFlow", caption: "HR app built with team TechFlow at a hackathon.", shot: "" },
      {
        slug: "cyberpulse-sniffer",
        name: "CyberPulse-Sniffer",
        caption: "Intrusion-detection prototype that scores network traffic.",
        shot: "",
      },
      {
        slug: "employee-payroll-system",
        name: "Employee Payroll System",
        caption: "Java web app for payroll records.",
        shot: "",
      },
    ],
    placeholder: "Screenshot coming soon",
    sticker: { label: "See all my work", href: "/#work" },
  },
  agents: {
    number: "03",
    title: "AI agents",
    tone: "mint" as Tone,
    lead: { title: "New lead", note: "lands in the CRM" },
    agent: { title: "AI agent", note: "built into the CRM" },
    tasksLabel: "What it handles",
    liveLabel: "AI · live",
    live: crmFeatures.aiLive,
    inProgressLabel: "AI · in progress",
    inProgress: crmFeatures.aiInProgress,
    stamp: "In progress",
    toolsLabel: "Built-in tools (not AI)",
    tools: crmFeatures.tools,
    sticker: { label: "AI agents for your team", href: "/#services" },
  },
  journey: {
    number: "04",
    title: "Journey",
    tone: "pink" as Tone,
    map: {
      src: "/vox/map.webp",
      width: 1200,
      height: 675,
      alt: "World map with pins in Anand, India and Calgary, Canada, joined by a red string",
    },
    /** Pin positions as % of the map image (placed by eye on the drawing). */
    places: [
      { id: "anand", label: "Anand, India", x: 65.2, y: 48.3 },
      { id: "calgary", label: "Calgary, Canada", x: 14.6, y: 27.4 },
    ],
    caption: "Now: designing and building AI tools from Anand.",
    sticker: { label: "The full journey", href: "/#journey" },
  },
  end: {
    heading: "Where to next?",
    doors: [
      { label: "Projects", note: "what I've built", href: "/#work", tone: "yellow" as Tone },
      { label: "Services", note: "what I can build for you", href: "/#services", tone: "mint" as Tone },
      { label: "Contact", note: "say hello", href: "/#contact", tone: "pink" as Tone },
    ],
  },
};

export const site = {
  description: `Freelance AI product designer & builder in ${person.location
    .split(",")
    .slice(0, 2)
    .join(",")}. I design and build AI-powered CRMs, internal tools and automations that take the busywork out of running a business.`,
};
