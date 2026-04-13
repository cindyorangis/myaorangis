# Mya's Short Stories — Developer Docs

## Overview

Two separate apps working together:

- **`studio-myaorangis`** — Sanity Studio (content management)
- **`nextjs-myaorangis`** — Next.js frontend (public-facing site)

Content editors write and publish in the Studio. The Next.js app fetches that content via Sanity's API and renders it.

---

## Repo Structure

```
studio-myaorangis/
  sanity.config.ts         # Sanity project config
  sanity.cli.ts            # CLI config (projectId, dataset)
  schemaTypes/
    index.ts               # Registers all schema types
    postType.ts            # Post document schema
    gameEmbed.ts           # Game embed block schema

nextjs-myaorangis/
  src/
    app/
      page.tsx             # Homepage (post listing)
      [slug]/page.tsx      # Individual post page
      layout.tsx           # Root layout, font, dark mode
      globals.css          # Tailwind + kids theme CSS variables
    components/
      GameEmbed.tsx        # Renders iframe game blocks
      QuizSection.tsx      # Comprehension questions + scoring
      DarkModeToggle.tsx   # Light/dark toggle button
    sanity/
      client.ts            # Sanity client config
```

---

## Environment Variables

### Next.js (`nextjs-myaorangis/.env.local`)

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### Vercel (Settings → Environment Variables)

Same three variables above. **Redeploy after adding them** — existing builds don't pick up new env vars.

---

## Local Development

### Studio

```bash
cd studio-myaorangis
npm install
npx sanity dev        # runs on http://localhost:3333
```

### Next.js frontend

```bash
cd nextjs-myaorangis
npm install
npm run dev           # runs on http://localhost:3000
```

Both can run simultaneously in separate terminals.

---

## Content Schema

### Post

| Field | Type | Notes |
|---|---|---|
| `title` | string | Required |
| `slug` | slug | Auto-generated from title |
| `publishedAt` | datetime | Defaults to now |
| `image` | image | Cover image |
| `body` | array | Portable Text + game embeds |
| `questions` | array | Comprehension questions (see below) |

### Body blocks (`body`)

- `block` — standard rich text (paragraphs, headings, bold, lists, blockquotes)
- `image` — inline images
- `gameEmbed` — iframe embed with `url`, `title`, and `height` fields

### Question object (inside `questions` array)

| Field | Type | Notes |
|---|---|---|
| `question` | string | The question text |
| `a` `b` `c` `d` | string | Four answer options |
| `correct` | string | One of `a`, `b`, `c`, `d` |

---

## Deployment

### Studio → Sanity hosting

```bash
cd studio-myaorangis
npx sanity deploy
```

Studio will be live at `your-project.sanity.studio`.

### Frontend → Vercel

Connect the `nextjs-myaorangis` repo to a Vercel project. Vercel auto-detects Next.js. Every push to `main` triggers a deploy.

**Required after first deploy:**
Go to [sanity.io/manage](https://sanity.io/manage) → your project → **API → CORS Origins** and add your Vercel URL:
```
https://your-app.vercel.app
```

---

## Adding a New Game

1. Host the game as a standalone HTML file (e.g. GitHub Pages)
2. In Sanity Studio, open a post → click **Add block** in the Body field → select **Game Embed**
3. Paste the game URL, add a title, and set a height (default 700px)
4. Publish the post

The game renders as a full-width iframe inside the post.

---

## Adding Comprehension Questions to a Post

1. Open a post in Sanity Studio
2. Scroll to the **Comprehension Questions** section
3. Click **Add item** and fill in the question, four options, and select the correct answer
4. Repeat for as many questions as needed
5. Publish — the quiz appears automatically below the story on the frontend

---

## Theme

The site uses a kids-friendly purple/violet theme defined entirely in CSS variables in `globals.css`. Dark mode is toggled by adding the `dark` class to `<html>`.

| Variable | Light | Dark |
|---|---|---|
| `--kids-bg` | `#fdf6ff` | `#1a1025` |
| `--kids-surface` | `#ffffff` | `#2d1b4e` |
| `--kids-accent` | `#7c3aed` | `#c084fc` |
| `--kids-text` | `#3b0764` | `#f3e8ff` |
| `--kids-muted` | `#7e22ce` | `#c4b5fd` |

To change the theme, edit the `:root` and `.dark` blocks in `globals.css` — no component changes needed.

---

## Key Dependencies

| Package | Purpose |
|---|---|
| `next-sanity` | Sanity client + PortableText for Next.js |
| `@sanity/image-url` | Builds optimized image URLs from Sanity image refs |
| `@heroicons/react` | Icon set (check, info icons) |
| `next/font` | Loads Nunito from Google Fonts |