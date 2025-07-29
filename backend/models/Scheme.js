const mongoose = require('mongoose');

const SchemeSchema = new mongoose.Schema({
  name_en: String,
  name_ta: String,
  description_en: String,
  description_ta: String,
  category: String,
  link: String,
  source: { type: String, default: "myscheme.gov.in" },
  scrapedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Scheme', SchemeSchema); 