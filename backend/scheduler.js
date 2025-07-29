const cron = require('node-cron');
const mongoose = require('mongoose');
const scrapeAndTranslate = require('./utils/scrapeAndTranslate');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Schedule: Every Sunday at 2:00 AM
cron.schedule('0 2 * * 0', async () => {
  console.log('Starting weekly scheme scraping...');
  try {
    await scrapeAndTranslate();
    console.log('Schemes updated!');
  } catch (err) {
    console.error('Error during scheduled scraping:', err);
  }
});

console.log('Scheduler running. Will update schemes every Sunday at 2:00 AM.');
// Keep the process alive 