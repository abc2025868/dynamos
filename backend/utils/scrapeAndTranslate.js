const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const Scheme = require('../models/Scheme');
const axios = require('axios');
require('dotenv').config();

const BASE_URL = 'https://www.myscheme.gov.in/search/category/Agriculture,Rural%20&%20Environment?state=Tamil+Nadu';
const TRANSLATE_ENDPOINT = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=ta';
const AZURE_TRANSLATOR_KEY = process.env.AZURE_TRANSLATOR_KEY;
const AZURE_TRANSLATOR_REGION = process.env.AZURE_TRANSLATOR_REGION;

function containsKeyword(text) {
  if (!text) return false;
  const lower = text.toLowerCase();
  return [
    'agriculture', 'farmer', 'crop', 'irrigation', 'organic', 'soil', 'seed', 'farming', 'horticulture', 'dairy', 'animal', 'poultry', 'market', 'loan', 'subsidy', 'machinery', 'tractor', 'fertilizer', 'pesticide', 'insurance', 'harvest', 'yield', 'water', 'plant', 'fish', 'aquaculture', 'sericulture', 'apiculture', 'plantation', 'rural', 'kisan', 'agri', 'livestock', 'input', 'output', 'credit', 'scheme', 'support', 'technology', 'extension', 'training', 'farmland', 'land'
  ].some(k => lower.includes(k));
}

async function translateText(text) {
  if (!text) return '';
  try {
    const res = await axios.post(
      TRANSLATE_ENDPOINT,
      [{ Text: text }],
      {
        headers: {
          'Ocp-Apim-Subscription-Key': AZURE_TRANSLATOR_KEY,
          'Ocp-Apim-Subscription-Region': AZURE_TRANSLATOR_REGION,
          'Content-Type': 'application/json'
        }
      }
    );
    return res.data[0].translations[0].text;
  } catch (err) {
    console.error('Azure Translate error:', err.response?.data || err.message);
    return '';
  }
}

async function fetchAllSchemesFromHTML() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto(BASE_URL, { waitUntil: 'networkidle2', timeout: 0 });
  let allSchemes = [];
  let seenSlugs = new Set();
  let visitedPages = new Set();
  let pageNum = 1;
  let keepPaginating = true;
  while (keepPaginating) {
    if (pageNum > 5) break;
    await new Promise(r => setTimeout(r, 2000));
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise(r => setTimeout(r, 1500));
    const schemes = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('a[href^="/schemes/"]'));
      return cards.map(card => {
        const href = card.getAttribute('href');
        const slugMatch = href.match(/^\/schemes\/([a-zA-Z0-9\-]+)/);
        const slug = slugMatch ? slugMatch[1] : null;
        let name = card.querySelector('h3, .MuiTypography-h5, .MuiCardContent-root h3')?.textContent?.trim() || card.textContent?.trim() || '';
        let desc = card.querySelector('p, .MuiTypography-body2, .MuiCardContent-root p')?.textContent?.trim() || '';
        return { slug, name, desc, href };
      }).filter(s => s.slug && s.name);
    });
    let newCount = 0;
    for (const s of schemes) {
      if (!seenSlugs.has(s.slug)) {
        allSchemes.push(s);
        seenSlugs.add(s.slug);
        newCount++;
      }
    }
    console.log(`Page ${pageNum}: found ${schemes.length} schemes, ${newCount} new, total unique: ${allSchemes.length}`);
    const allPaginationElements = await page.evaluate(() => {
      const elements = Array.from(document.querySelectorAll('li'));
      return elements
        .filter(el => {
          const txt = el.textContent?.trim();
          return txt && txt.match(/^\d+$/);
        })
        .map(el => ({
          tag: el.tagName,
          text: el.textContent.trim(),
          class: el.className,
          outer: el.outerHTML.slice(0, 200)
        }));
    });
    console.log(`All pagination elements (page ${pageNum}):`, allPaginationElements);
    const currentPage = await page.evaluate(() => {
      const active = Array.from(document.querySelectorAll('li')).find(li => li.className.includes('!text-white') && li.className.includes('bg-green-700'));
      return active ? active.textContent.trim() : null;
    });
    visitedPages.add(currentPage);
    let nextPage = null;
    for (const el of allPaginationElements) {
      if (!visitedPages.has(el.text)) {
        nextPage = el.text;
        break;
      }
    }
    if (nextPage) {
      await page.evaluate((nextPage) => {
        const lis = Array.from(document.querySelectorAll('li'));
        const li = lis.find(l => l.textContent.trim() === nextPage && l.className.includes('hover:cursor-pointer'));
        if (li) li.click();
      }, nextPage);
      await page.waitForFunction(
        (prevSlugs) => {
          const links = Array.from(document.querySelectorAll('a[href^="/schemes/"]'));
          const slugs = links.map(a => {
            const match = a.getAttribute('href').match(/^\/schemes\/([a-zA-Z0-9\-]+)/);
            return match ? match[1] : null;
          }).filter(Boolean);
          return JSON.stringify(slugs) !== JSON.stringify(prevSlugs);
        },
        { timeout: 20000 },
        schemes.map(s => s.slug)
      );
      pageNum++;
    } else {
      keepPaginating = false;
    }
  }
  await browser.close();
  return allSchemes;
}

async function scrapeAndTranslate() {
  const schemes = await fetchAllSchemesFromHTML();
  let count = 0;
  for (const scheme of schemes) {
    const name = scheme.name;
    const description = scheme.desc || '';
    const category = 'Agriculture, Rural & Environment';
    const link = `https://www.myscheme.gov.in${scheme.href}`;
    if (!containsKeyword(name + ' ' + description + ' ' + category)) continue;
    const exists = await Scheme.findOne({ name_en: name });
    if (exists) continue;
    const name_ta = await translateText(name);
    await new Promise(r => setTimeout(r, 500));
    const description_ta = await translateText(description);
    await new Promise(r => setTimeout(r, 500));
    await Scheme.create({
      name_en: name,
      name_ta,
      description_en: description,
      description_ta,
      category,
      link,
      source: 'myscheme.gov.in',
      scrapedAt: new Date()
    });
    count++;
    console.log(`Stored: ${name}`);
  }
  console.log(`Scraped and stored ${count} new schemes.`);
}

if (require.main === module) {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => scrapeAndTranslate())
    .then(() => process.exit(0))
    .catch(e => { console.error(e); process.exit(1); });
}

module.exports = scrapeAndTranslate; 