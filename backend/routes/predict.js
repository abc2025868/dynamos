const express = require('express');
const multer = require('multer');
const axios = require('axios');
const DiseaseSuggestion = require('../models/DiseaseSuggestion');
const router = express.Router();
require('dotenv').config();

// Setup multer for in-memory uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
});

// Environment tokens
const HF_TOKEN = process.env.HF_TOKEN;
const YT_API_KEY = process.env.YOUTUBE_API_KEY;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// POST /api/predict
router.post('/predict', upload.single('image'), async (req, res) => {
  try {
    const currentLang = req.query.lang || 'en';

    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded.' });
    }

    // Step 1: Hugging Face Model Inference
    const hfResponse = await axios.post(
      'https://api-inference.huggingface.co/models/ozair23/mobilenet_v2_1.0_224-finetuned-plantdisease',
      req.file.buffer,
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          'Content-Type': req.file.mimetype || 'image/jpeg'
        }
      }
    );

    const predictions = hfResponse.data;
    if (!Array.isArray(predictions) || predictions.length === 0) {
      return res.status(400).json({ error: 'No prediction received from model.' });
    }

    const top = predictions[0];
    // Debug
console.log("TOP OBJECT DEBUG:", top);
let rawScore = parseFloat(
  top?.score ?? top?.probability ?? top?.confidence ?? "0"
);

if (isNaN(rawScore)) rawScore = 0;

// Normalize: if rawScore > 1, assume it's already a percentage (0-100), so divide by 100
if (rawScore > 1) {
  rawScore = rawScore / 100;
}

const confidence = (rawScore).toFixed(2); // Always a % between 0.00 and 100.00



if (!top || top.score < 0.3) {
  return res.status(400).json({
    error: 'Low confidence in prediction. Try a clearer image or a different angle.'
  });
}

top.label = top.label.replace(/_+/g, ' ').replace(/\s+/g, ' ').trim();

    // Step 2: Crop & Disease
    const { crop, disease } = parseLabel(top.label);
console.log('Predicted label:', top.label);
console.log('Parsed crop:', crop);
console.log('Parsed disease:', disease);
console.log('Confidence %:', confidence);

    // Step 3: MongoDB Lookup
    const suggestionDoc = await DiseaseSuggestion.findOne({ disease: new RegExp(`^${disease}$`, 'i') });
    const suggestion = suggestionDoc
      ? {
          en: suggestionDoc.suggestion_en,
          ta: suggestionDoc.suggestion_ta
        }
      : {
          en: 'No specific suggestion found. Please consult an expert.',
          ta: 'குறிப்பிட்ட பரிந்துரை எதுவும் கிடைக்கவில்லை. ஒரு நிபுணரை அணுகவும்.'
        };

    const crop_ta = suggestionDoc?.crop_ta || '';
    const disease_ta = suggestionDoc?.disease_ta || '';

    // Step 4: YouTube Search
    let videoUrl = null;
    if (YT_API_KEY) {
      const formattedDisease = disease.replace(/_/g, ' ');
      const queryBase = `${crop} ${formattedDisease}`;

      const queries = [
        `${queryBase} treatment in Tamil agriculture`,
        `${queryBase} solution Tamil`,
        `${queryBase} treatment in English`,
        `${queryBase} solution`,
        `${formattedDisease} disease solution`,
        `${crop} disease help`,
        `${formattedDisease} organic treatment`,
        `${crop} plant disease care video`
      ];

      for (const query of queries) {
        try {
          const ytRes = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
              key: YT_API_KEY,
              q: query,
              part: 'snippet',
              type: 'video',
              maxResults: 1,
              videoEmbeddable: 'true'
            }
          });

          const videoId = ytRes.data.items?.[0]?.id?.videoId;
          if (videoId) {
            videoUrl = `https://www.youtube.com/embed/${videoId}`;
            break;
          }
        } catch (err) {
          console.warn('Video search failed for query:', query, err?.response?.data || err.message);
        }
      }

      if (!videoUrl) {
        const fallbackSearch = encodeURIComponent(`${queryBase} plant disease treatment`);
        videoUrl = `https://www.youtube.com/results?search_query=${fallbackSearch}`;
      }
    }

    // Step 5: OpenRouter Prompt for Expert Advice
    const prompt = `
You are an expert agricultural advisor for Indian farmers, especially from Tamil Nadu.
A farmer has a crop suffering from the following disease: ${top.label}.

Please give the following in simple language:

A short disease description (2–3 lines)

Effective treatment suggestions – include both organic and chemical remedies (Tamil Nadu-approved if possible)

Simple preventive tips for future

A YouTube Tamil video link (or search query suggestion)

Tamil name of the disease (if known)

Respond in clear, friendly, helpful tone. Keep each section labeled clearly.
    `;

    const openrouterRes = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-4o',
        messages: [
          { role: 'system', content: 'You are an expert agricultural advisor for Indian farmers.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 600,
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const expertAdvice = openrouterRes.data.choices?.[0]?.message?.content || 'No advice generated.';
    let expertAdviceTamil = null;

if (currentLang === 'ta') {
  try {
    const translationRes = await axios.post(
      'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=ta',
      [{ Text: expertAdvice }],
      {
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.AZURE_TRANSLATOR_KEY,
          'Ocp-Apim-Subscription-Region': process.env.AZURE_TRANSLATOR_REGION,
          'Content-Type': 'application/json'
        }
      }
    );

    expertAdviceTamil = translationRes.data[0]?.translations[0]?.text;
  } catch (err) {
    console.error('Translation to Tamil failed:', err);
    expertAdviceTamil = null;
  }
}

res.json({
  crop,
  crop_ta,
  disease,
  disease_ta,
  confidence,
  suggestion,
  expertAdvice: currentLang === 'ta' && expertAdviceTamil ? expertAdviceTamil : expertAdvice,
  videoUrl
});


  } catch (err) {
    console.error('Prediction error:', err.response?.data || err.message);
    return res.status(500).json({ error: 'Prediction failed. Please try again later.' });
  }
});

module.exports = router;

function parseLabel(label) {
    let crop = 'Unknown crop';
    let disease = 'healthy';

    if (!label || typeof label !== 'string') return { crop, disease };

    label = label.replace(/_+/g, ' ').replace(/\s+/g, ' ').trim();

    if (label.toLowerCase().includes('healthy')) {
        // e.g. "Tomato healthy"
        const parts = label.split(' ');
        crop = parts.slice(0, -1).join(' ');
        disease = 'healthy';
    } else if (label.includes(' with ')) {
        const [c, d] = label.split(' with ');
        crop = c.trim();
        disease = d.trim();
    } else if (label.includes('___')) {
        const [c, d] = label.split('___');
        crop = c.trim();
        disease = d.trim();
    } else if (label.split(' ').length >= 2) {
        // Fallback: last 1–2 words as disease
        const parts = label.trim().split(' ');
        crop = parts.slice(0, -2).join(' ');
        disease = parts.slice(-2).join(' ');
    } else {
        crop = label.trim();
        disease = 'healthy';
    }

    return { crop, disease };
}
