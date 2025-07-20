# Omake Scraper

A Node.js + Puppeteer app that scrapes a specific table from a SpaceBattles forum post by user **ArcherM**.

## Features
- Uses Puppeteer to extract a table titled "omake bonus" from a forum post
- Serves the table as JSON via `/fetch-table` endpoint
- Simple frontend (`index.html`) to display and update the table

## Deployment (Render)
1. Push this project to GitHub
2. Visit [Render.com](https://render.com)
3. Create a new web service from your repo
4. Render will auto-deploy using `render.yaml`

## Local Dev
```bash
npm install
node server.js
```

Then open `index.html` in your browser.