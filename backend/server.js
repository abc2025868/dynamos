const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const schemesRoutes = require('./routes/schemes');
const predictRoutes = require('./routes/predict');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/agriconnect', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../Frontend')));

// Mock data storage
let mockData = {
  crops: {
    rice: { basePrice: 2300 },
    tomato: { basePrice: 6500 },
    onion: { basePrice: 3800 },
    potato: { basePrice: 2100 },
    brinjal: { basePrice: 3000 },
    banana: { basePrice: 2800 },
    sugarcane: { basePrice: 3500 },
    coconut: { basePrice: 3200 },
    cotton: { basePrice: 8000 },
    groundnut: { basePrice: 5500 }
  },
  districts: ['chennai', 'coimbatore', 'madurai', 'trichy', 'salem', 'tirunelveli', 'vellore', 'erode', 'thanjavur', 'dindigul'],
  queries: []
};

// Generate price data for a specific crop and date range
function generatePriceData(crop, days) {
  const priceData = [];
  const today = new Date();
  const basePrice = mockData.crops[crop]?.basePrice || 2500;

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);

    // Random price fluctuation (+/- 5%)
    const fluctuation = basePrice * (0.95 + Math.random() * 0.1);

    // Add some trend for realistic data
    let trend = 0;

    // Rising trend
    if (i < days/2) {
      trend = basePrice * 0.002 * (days - i);
    }

    const price = Math.round(fluctuation + trend);

    priceData.push({
      date: date.toISOString().split('T')[0],
      price: price
    });
  }

  return priceData;
}

// Generate district prices for a crop
function generateDistrictData(crop) {
  const districtData = [];
  const basePrice = mockData.crops[crop]?.basePrice || 2500;

  mockData.districts.forEach(district => {
    // Different districts have different price ranges
    const districtFactor = 0.9 + Math.random() * 0.2;
    const districtPrice = Math.round(basePrice * districtFactor);

    districtData.push({
      district: district,
      price: districtPrice
    });
  });

  // Add all Tamil Nadu average
  const avgPrice = Math.round(districtData.reduce((sum, d) => sum + d.price, 0) / districtData.length);
  districtData.unshift({
    district: 'all',
    price: avgPrice
  });

  return districtData;
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/schemes', schemesRoutes);
app.use('/api', predictRoutes);

// API Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});

app.get('/api/prices', (req, res) => {
  const { district, crop } = req.query;

  if (!crop) {
    return res.status(400).json({ error: 'Crop parameter is required' });
  }

  const districtData = generateDistrictData(crop);

  if (district && district !== 'all') {
    const districtPrice = districtData.find(d => d.district === district);
    return res.json({ district, crop, price: districtPrice?.price || 'Not available' });
  }

  return res.json({ crop, districtData });
});

app.get('/api/trends', (req, res) => {
  const { crop, days = 7 } = req.query;

  if (!crop) {
    return res.status(400).json({ error: 'Crop parameter is required' });
  }

  const priceData = generatePriceData(crop, parseInt(days));
  res.json({ crop, priceData });
});

app.post('/api/submit-query', (req, res) => {
  const { name, crop, location, mobile, comments } = req.body;

  if (!name || !crop || !location || !mobile) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = {
    id: Date.now(),
    name,
    crop,
    location,
    mobile,
    comments: comments || '',
    timestamp: new Date().toISOString(),
    status: 'pending'
  };

  mockData.queries.push(query);

  // In a real app, you would save this to a database
  res.status(201).json({ success: true, queryId: query.id });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});