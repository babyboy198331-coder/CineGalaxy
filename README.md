# CineGalaxy — Movie Catalog

A movie catalog web app inspired by IMDb. Browse popular movies, search the full TMDB catalog with debounced live search, sort by rating, and view detailed pages with synopsis, rating, and cast.

Built with **Next.js (App Router)**, **React**, and **TypeScript**.

## Features

- **Live TMDB data** — popular movies load from the TMDB API on page load, with a built-in local dataset as an offline fallback
- **Debounced search** — results update as you type (300ms debounce), with Enter for instant search
- **Sort by rating** — high to low or low to high
- **Movie detail pages** — server-rendered route (`/[id]`) with poster, release year, rating, synopsis, and top-billed cast
- **Responsive UI** — dark theme with gold accents, CSS grid movie cards with hover effects

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| UI | React, custom CSS + Tailwind CSS |
| Data | TMDB API with local fallback dataset |

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure the TMDB API key** (optional but recommended)

   Copy `.env.example` to `.env.local` and add your key from
   [themoviedb.org](https://www.themoviedb.org/settings/api):

   ```bash
   cp .env.example .env.local
   ```

   Without a key, the app falls back to the bundled local movie dataset.

3. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  layout.tsx        # Root layout with nav
  page.tsx          # Home: hero, highlights, browse, featured, explore
  [id]/page.tsx     # Movie details (server component)
components/
  Landing.tsx       # Hero section
  Features.tsx      # Search + sort + movie grid (client component)
  Featured.tsx      # Featured movies row
  Explore.tsx       # Explore picks
  Highlights.tsx    # Feature highlights
  MovieGrid.tsx     # Grid of MovieCards
  MovieCard.tsx     # Poster card with year + rating
  NavBar.tsx, Footer.tsx
lib/
  movies.ts         # Movie type + local fallback dataset
  poster.ts         # Poster URL resolver (local / TMDB / fallback)
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | Lint |
