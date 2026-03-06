# ◈ SkillMap

A visual team skill mapping tool for TLs.

## What it does

SkillMap gives you a live overview of your team's skills: Who knows what, where the gaps are, and who can grow into what. No HR forms, no spreadsheets. Just a clean, interactive heatmap your team actually wants to use.

## Features

- **Skill Matrix** — interactive heatmap of every person × skill combination
- **Bus Factor Detection** — automatically flags skills with only one competent person
- **Growth Goals** — team members can mark which skills they want to develop
- **Mentoring Matching** — automatically pairs coaches with learners
- **Skill Gap Analysis** — dashboard shows coverage, risks and opportunities per category
- **Dark / Light Mode** — toggle between themes

## Skill Levels

| Level | Meaning |
|---|---|
| 🌱 Learning | Can do it with support |
| ✅ Independent | Can do it on their own |
| ⭐ Coach | Expert — can teach others |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Customizing

All data lives in `src/App.jsx`:

- **`TEAM`** — add or edit team members
- **`SKILLS`** — define your own skills and categories
- **`CATEGORIES`** — customize skill categories and colors
- **`INITIAL_RATINGS`** — set starting skill levels per person
- **`INITIAL_GROWTH`** — set starting growth goals per person

## Tech Stack

- React 18
- Vite
- Inline styles (no external CSS framework needed)

## Roadmap

- [ ] Backend with Next.js + PostgreSQL
- [ ] Auth — each person edits only their own skills
- [ ] Skill history & growth timeline
- [ ] Export to PDF / CSV
- [ ] Multi-team support

## License

MIT
