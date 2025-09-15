# CM‑AgroTrace Marketing Site

Next.js (pages router) + Tailwind. Production‑ready, mobile‑first.

## Quick start
```bash
npm install
npm run dev
```

## Build & run
```bash
npm run build
npm start
```

## Environment
- `NEXT_PUBLIC_FORM_ENDPOINT` (optional): Form endpoint for the pilot form. Defaults to a Formspree placeholder.

## Deploy
- **Vercel**: Import the repository → set env vars → Deploy.
- **Render (Static)**: `next build` → export not required (SSR ready). Or use Node service: `npm run build && npm start`.
- **Firebase Hosting**: Use `next build` and a Node SSR or `next export` for fully static (adjust routes).

## Structure
- `pages/` pages router
- `components/` reusable UI
- `styles/` Tailwind and global styles

## Notes
- Replace contact info in `Footer.tsx`.
- Update FAQ and copy for your pilot specifics.
- Replace placeholder QR with a real image or link to your `/scan/LOT‑DEMO` page.
