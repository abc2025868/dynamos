const express = require('express');
const router = express.Router();
const Scheme = require('../models/Scheme');

// GET /api/schemes?lang=en|ta
router.get('/', async (req, res) => {
  const lang = req.query.lang === 'ta' ? 'ta' : 'en';
  try {
    const schemes = await Scheme.find({}).sort({ scrapedAt: -1 });
    const mapped = schemes.map(s => ({
      name: lang === 'ta' ? s.name_ta : s.name_en,
      description: lang === 'ta' ? s.description_ta : s.description_en,
      category: s.category,
      link: s.link,
      source: s.source
    }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch schemes' });
  }
});

module.exports = router; 