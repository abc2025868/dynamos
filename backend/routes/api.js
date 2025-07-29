
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Mock data for development
const mockMarketData = [
  {
    commodity: 'Rice',
    market: 'Chennai Market',
    price: 45,
    unit: 'kg',
    category: 'grains',
    change: 2.5,
    lastUpdated: '2024-01-15'
  },
  {
    commodity: 'Tomato',
    market: 'Coimbatore Market',
    price: 25,
    unit: 'kg',
    category: 'vegetables',
    change: -1.2,
    lastUpdated: '2024-01-15'
  },
  {
    commodity: 'Onion',
    market: 'Madurai Market',
    price: 35,
    unit: 'kg',
    category: 'vegetables',
    change: 5.8,
    lastUpdated: '2024-01-15'
  }
];

const mockWeatherData = {
  current: {
    temperature: 28,
    feelsLike: 32,
    condition: 'partly cloudy',
    humidity: 75,
    windSpeed: 12,
    rainfall: 0,
    pressure: 1013
  },
  forecast: [
    { day: 'Today', high: 32, low: 24, condition: 'sunny' },
    { day: 'Tomorrow', high: 30, low: 22, condition: 'cloudy' },
    { day: 'Wed', high: 28, low: 20, condition: 'rainy' },
    { day: 'Thu', high: 29, low: 21, condition: 'sunny' },
    { day: 'Fri', high: 31, low: 23, condition: 'partly cloudy' },
    { day: 'Sat', high: 33, low: 25, condition: 'sunny' },
    { day: 'Sun', high: 30, low: 22, condition: 'cloudy' }
  ]
};

const mockSchemes = [
  {
    title: 'Pradhan Mantri Kisan Samman Nidhi',
    description: 'Direct income support scheme for farmers providing Rs. 6000 per year',
    category: 'subsidy',
    benefit: 'Rs. 6000 per year in 3 installments',
    eligibility: 'Small and marginal farmers with landholding up to 2 hectares',
    duration: 'Ongoing',
    applicationProcess: [
      'Visit nearest CSC or bank',
      'Fill application form with required documents',
      'Submit form and get acknowledgment',
      'Check status online using registration number'
    ],
    documents: [
      'Aadhaar Card',
      'Land ownership documents',
      'Bank account details',
      'Mobile number'
    ],
    applicationUrl: 'https://pmkisan.gov.in',
    detailsUrl: 'https://pmkisan.gov.in/aboutScheme.aspx'
  }
];

const mockVideos = [
  {
    title: 'Modern Rice Farming Techniques',
    description: 'Learn advanced rice cultivation methods for better yield',
    category: 'farming-techniques',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '15:30',
    channelName: 'Agriculture Today',
    views: '125K',
    likes: '2.3K',
    tags: ['rice', 'farming', 'techniques'],
    url: 'https://youtube.com/watch?v=dQw4w9WgXcQ'
  }
];

// API Routes
router.get('/market-prices', (req, res) => {
  res.json(mockMarketData);
});

router.get('/weather', (req, res) => {
  const location = req.query.location || 'Chennai';
  res.json(mockWeatherData);
});

router.get('/schemes', (req, res) => {
  res.json(mockSchemes);
});

router.get('/youtube-videos', (req, res) => {
  res.json(mockVideos);
});

router.post('/predict', upload.single('image'), (req, res) => {
  // Mock disease prediction
  const mockPrediction = {
    disease: 'Leaf Spot',
    confidence: 85,
    description: 'Fungal disease affecting leaf tissues',
    treatment: [
      'Remove affected leaves immediately',
      'Apply fungicide spray',
      'Improve air circulation',
      'Reduce watering frequency'
    ]
  };
  
  res.json(mockPrediction);
});

module.exports = router;
