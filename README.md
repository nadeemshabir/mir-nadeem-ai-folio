# Nadeem Shabir Mir

Personal portfolio for hiring conversations. It covers internships in document intelligence, real-time voice, and speech-data engineering, plus two public projects: Autonomous SWE Agent and ResearchGPT.

The page is meant to be sent with a résumé. A recruiter can scan the opening and the three roles. An engineer can read the project write-ups, including scope limits.

## Run it locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:3847](http://127.0.0.1:3847).

## Portrait

The hero uses `public/portrait.jpg`. To replace it, save a new 4:5 photo at that path. `portraitSrc` in `src/lib/content.ts` points at it.

## Edit the copy

All names, dates, role descriptions, and project text live in `src/lib/content.ts`.

Deep links:

- `/#work` for experience
- `/#projects` for projects
- `/work/alimento`, `/work/bharatrix`, `/work/quansys`
- `/projects/researchgpt`, `/projects/swe-agent`
- `/#contact`

## Production

```bash
npm run build
npm start
```

Set `NEXT_PUBLIC_SITE_URL` only if you later add a canonical URL. The site does not require API keys.
