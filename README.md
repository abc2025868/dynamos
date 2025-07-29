# SmartUzhavan (dynamos)

A modern web platform for Tamil Nadu farmers, providing real-time weather, market prices, government schemes, and more.

## Project Structure

```
dynamos/
│
├── backend/         # Node.js, Express, MongoDB, Puppeteer scraping
│   ├── .env
│   ├── package.json
│   ├── server.js
│   ├── scheduler.js
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── ...
│
├── frontend/        # Static HTML/CSS/JS, PWA, service worker
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   ├── service-worker.js
│   ├── manifest.json
│   ├── assets/
│   ├── css/
│   ├── js/
│   ├── pages/
│   └── ...
│
├── .gitignore
├── README.md
```

## Setup

### Backend
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and fill in your secrets (MongoDB URI, Azure Translator, etc.)
4. Start server: `npm start` or `npm run dev`
5. To enable scheduled scraping: `node scheduler.js` (or use pm2/Render cron job)

### Frontend
1. `cd frontend`
2. Serve with any static server (e.g. `npx serve .` or deploy to Netlify/Vercel)
3. For local dev, open `index.html` directly or use a static server

## Deployment
- **Backend:** Deploy `/backend` as a Node.js app (Render, Heroku, Azure, etc.)
- **Frontend:** Deploy `/frontend` as static files (Netlify, Vercel, or serve via Express in production)

## Notes
- All sensitive info should be in `.env` (never commit secrets)
- Service worker is set up for PWA/offline; see `service-worker.js` for dev/prod config
- Scraping is done with Puppeteer and Azure Translator at scrape time

---
For more details, see the `README.md` in each subfolder. 