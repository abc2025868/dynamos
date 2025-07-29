// API Configuration
const API_KEY = "579b464db66ec23bdd000001b8a46c51746b49a754759f879bcf48af";
const API_URL = "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";

// Global Variables
let allRecords = [];
let filteredRecords = [];
let chartInstance = null;
let currentDateRange = 30;

// DOM Elements
let stateSelect, citySelect, commoditySelect, dateRangeSelect, fetchBtn;
let loadingDiv, errorDiv, pricesTable, pricesTbody;
let trendIndicator, priceRange, avgPrice, lastUpdated;
let priceChart, chartControls, currentPrice, priceChange;
let marketInsights, bestTime, volatility, prediction;

// Utility Functions
function show(element) {
  if(element) element.classList.remove('hidden');
}

function hide(element) {
  if(element) element.classList.add('hidden');
}

function showError(message) {
  if(!errorDiv) return;
  errorDiv.textContent = message;
  errorDiv.style.color = '#d32f2f';
  errorDiv.style.background = '#ffebee';
  errorDiv.style.border = '1px solid #ffcdd2';
  show(errorDiv);
}

function hideError() {
  if(errorDiv) hide(errorDiv);
}

function showSuccess(message) {
    if(!errorDiv) return;
    errorDiv.textContent = message;
    errorDiv.style.color = '#388e3c';
    errorDiv.style.background = '#e8f5e9';
    errorDiv.style.border = '1px solid #c8e6c9';
    show(errorDiv);
    setTimeout(() => hideError(), 3000);
}

function formatDate(dateString) {
  if (!dateString) return 'N/A';
  
  try {
    let date;
    const parts = dateString.split(/[-/]/);
    if (parts.length === 3) {
      if (parts[0].length === 4) { // YYYY-MM-DD
        date = new Date(parts[0], parts[1] - 1, parts[2]);
      } else { // DD-MM-YYYY
        date = new Date(parts[2], parts[1] - 1, parts[0]);
      }
    } else {
      date = new Date(dateString);
    }
    
    if (isNaN(date.getTime())) return 'Invalid Date';
    
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Date parsing error:', error);
    return 'Invalid Date';
  }
}

// Data Validation
function validateRecord(record) {
  return record && record.commodity && record.market && record.modal_price && record.arrival_date;
}

function hasValidData(records) {
  return records && records.length > 0 && records.some(validateRecord);
}

// Initial Data Loading
async function fetchInitialData() {
  show(loadingDiv);
  hideError();
  
  try {
    const params = new URLSearchParams({
      "api-key": API_KEY,
      format: "json",
      limit: 10000 // Fetch a large number of records to populate dropdowns accurately
    });
    
    const url = `${API_URL}?${params.toString()}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    allRecords = (data.records || []).map(apiRecord => ({
      state: apiRecord.state ? apiRecord.state.trim() : '',
      district: apiRecord.district ? apiRecord.district.trim() : '',
      market: apiRecord.market ? apiRecord.market.trim() : '',
      commodity: apiRecord.commodity ? apiRecord.commodity.trim() : '',
      variety: apiRecord.variety ? apiRecord.variety.trim() : '',
      grade: apiRecord.grade ? apiRecord.grade.trim() : '',
      arrival_date: apiRecord.arrival_date ? apiRecord.arrival_date.trim() : '',
      min_price: apiRecord.min_price ? apiRecord.min_price.trim() : '',
      max_price: apiRecord.max_price ? apiRecord.max_price.trim() : '',
      modal_price: apiRecord.modal_price ? apiRecord.modal_price.trim() : '',
    }));
    
    console.log("--- Initial Data Fetch ---");
    console.log("Full response from API:", data);
    console.log("Total records processed:", allRecords.length);
    if (allRecords.length > 0) {
      console.log("Sample record:", allRecords[0]);
    }
    console.log("allRecords after fetch:", allRecords);
    console.log("Unique states:", [...new Set(allRecords.map(r => r.state))]);
    console.log("Unique cities:", [...new Set(allRecords.map(r => r.market))]);
    
    if (allRecords.length === 0) {
      showError("No data available from the API at the moment.");
      return;
    }
    
    populateDropdowns();
    showSuccess("✅ Market data loaded successfully! Please select filters.");
    
  } catch (error) {
    console.error('❌ Error fetching initial records:', error);
    showError("Failed to load initial market data. Please check your internet connection and try again.");
  } finally {
    hide(loadingDiv);
  }
}

// Dropdown Population
function populateDropdowns() {
  const states = [...new Set(allRecords.map(record => record.state))].sort();
  stateSelect.innerHTML = '<option value="">Choose State</option>';
  states.forEach(state => {
    if(state && state.trim()) {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    }
  });

  const commodities = [...new Set(allRecords.map(record => record.commodity))].sort();
  commoditySelect.innerHTML = '<option value="">Choose Crop</option>';
  commodities.forEach(commodity => {
    if (commodity && commodity.trim()) {
      const option = document.createElement('option');
      option.value = commodity;
      option.textContent = commodity;
      commoditySelect.appendChild(option);
    }
  });
  
  citySelect.innerHTML = '<option value="">Choose City</option>';
}

function updateDependentFilters() {
  const selectedState = stateSelect.value;
  
  // Update cities
  citySelect.innerHTML = '<option value="">Choose City</option>';
  if (selectedState) {
    const cities = [...new Set(
      allRecords
        .filter(record => record.state === selectedState)
        .map(record => record.market)
    )].sort();
    
    cities.forEach(city => {
      if (city && city.trim()) {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
      }
    });
  }

  // Update commodities based on state
  const commoditiesSource = selectedState 
    ? allRecords.filter(record => record.state === selectedState) 
    : allRecords;

  const commodities = [...new Set(commoditiesSource.map(record => record.commodity))].sort();
  commoditySelect.innerHTML = '<option value="">Choose Crop</option>';
  commodities.forEach(commodity => {
    if (commodity && commodity.trim()) {
      const option = document.createElement('option');
      option.value = commodity;
      option.textContent = commodity;
      commoditySelect.appendChild(option);
    }
  });
}

// Main function to fetch and display trends
async function fetchMarketTrends() {
  if (!stateSelect.value || !commoditySelect.value) {
    showError("Please select both State and Crop to view market trends.");
    return;
  }

  show(loadingDiv);
  hideError();
  hide(pricesTable);

  try {
    let records = allRecords;
    const selectedState = stateSelect.value;
    const selectedCommodity = commoditySelect.value;
    const selectedCity = citySelect.value;

    if (selectedState) {
        records = records.filter(r => r.state === selectedState);
    }
    if (selectedCommodity) {
        records = records.filter(r => r.commodity === selectedCommodity);
    }
    if (selectedCity) {
        records = records.filter(r => r.market === selectedCity);
    }

    if (!hasValidData(records)) {
      showError("No price data found for the selected filters. Try selecting a different state or crop.");
      return;
    }
    
    filteredRecords = records;
    processAndDisplayData();
    
  } catch (error) {
    console.error('Error fetching market trends:', error);
    showError("Unable to fetch market data. Please try again later.");
  } finally {
    hide(loadingDiv);
  }
}

// Fetch data from API with filters
// This function is no longer needed as we filter locally.
/*
async function fetchDataWithFilters() {
  const params = new URLSearchParams({
    "api-key": API_KEY,
    format: "json",
    limit: 1000
  });
  
  const filters = {};
  if (stateSelect.value) filters['state'] = stateSelect.value;
  if (commoditySelect.value) filters['commodity'] = commoditySelect.value;
  if (citySelect.value) filters['market'] = citySelect.value;

  for (const key in filters) {
      params.append(`filters[${key}]`, filters[key]);
  }
  
  const url = `${API_URL}?${params.toString()}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  console.log("--- Filtered Data Fetch ---");
  console.log(`Filters - State: ${stateSelect.value}, Crop: ${commoditySelect.value}, City: ${citySelect.value}`);
  console.log("Full filtered response from API:", data);
  return data.records || [];
}
*/

// Process and Display Data
function processAndDisplayData() {
  const sortedRecords = filteredRecords
    .filter(validateRecord)
    .sort((a, b) => {
        // Correctly parse DD/MM/YYYY dates for reliable sorting
        const dateA = new Date(a.arrival_date.split('/').reverse().join('-'));
        const dateB = new Date(b.arrival_date.split('/').reverse().join('-'));
        return dateA - dateB;
    });
  
  const recentRecords = sortedRecords.slice(-currentDateRange);
  
  if (recentRecords.length === 0) {
    showError("No recent data available for the selected time period.");
    return;
  }
  
  updateCurrentPrice(recentRecords);
  updateSummaryCards(recentRecords);
  displayPricesTable(recentRecords);
  show(pricesTable);
  createPriceChart(recentRecords);
  generateMarketInsights(recentRecords);
  
  showSuccess(`✅ Found ${recentRecords.length} price records for ${commoditySelect.value}`);
}

// UI Update Functions
function updateCurrentPrice(records) {
  if (records.length === 0) return;
  
  // Find the latest record by date
  const sorted = records.slice().sort((a, b) => {
    const dateA = new Date(a.arrival_date.split('/').reverse().join('-'));
    const dateB = new Date(b.arrival_date.split('/').reverse().join('-'));
    return dateB - dateA;
  });
  const latestRecord = sorted[0];
  const currentPriceValue = parseFloat(latestRecord.modal_price) || 0;
  const latestDate = formatDate(latestRecord.arrival_date);
  
  currentPrice.innerHTML = `<span class="price-value">₹${currentPriceValue}</span> <span class="price-date">(as of ${latestDate})</span>`;
  
  if (sorted.length > 1) {
    const previousRecord = sorted[1];
    const previousPrice = parseFloat(previousRecord.modal_price) || 0;
    const change = currentPriceValue - previousPrice;
    const percentChange = previousPrice ? ((change / previousPrice) * 100).toFixed(1) : 0;
    
    let changeClass = 'change-stable';
    let changeSymbol = '→';
    
    if (change > 0) {
      changeClass = 'change-up';
      changeSymbol = '↗️';
    } else if (change < 0) {
      changeClass = 'change-down';
      changeSymbol = '↘️';
    }
    
    priceChange.innerHTML = `<span class="change-value ${changeClass}">${changeSymbol} ₹${Math.abs(change).toFixed(2)} (${percentChange}%)</span>`;
  } else {
    priceChange.innerHTML = `<span class="change-value">No previous data</span>`;
  }
}

function updateSummaryCards(records) {
  if (records.length === 0) return;
  
  const prices = records.map(r => parseFloat(r.modal_price) || 0);
  const firstPrice = prices[0];
  const lastPrice = prices[prices.length - 1];
  const priceChangeVal = lastPrice - firstPrice;
  const percentChange = firstPrice ? ((priceChangeVal / firstPrice) * 100).toFixed(1) : 0;
  
  let trendTextContent = `→ Stable`;
  let trendClass = 'trend-stable';
  if (priceChangeVal > 0) {
    trendTextContent = `↗️ +${percentChange}%`;
    trendClass = 'trend-up';
  } else if (priceChangeVal < 0) {
    trendTextContent = `↘️ ${percentChange}%`;
    trendClass = 'trend-down';
  }
  trendIndicator.querySelector('.trend-text').textContent = trendTextContent;
  trendIndicator.querySelector('.trend-text').className = `trend-text ${trendClass}`;

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  priceRange.querySelector('.min-price').textContent = `Min: ₹${minPrice}`;
  priceRange.querySelector('.max-price').textContent = `Max: ₹${maxPrice}`;
  
  const avgPriceVal = (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(0);
  avgPrice.querySelector('.price').textContent = `₹${avgPriceVal}`;
  
  const lastDate = formatDate(records[records.length - 1].arrival_date);
  lastUpdated.querySelector('.date').textContent = lastDate;
}

function displayPricesTable(records) {
  pricesTbody.innerHTML = '';
  
  records.forEach((record, index) => {
    const row = document.createElement('tr');
    const modalPrice = parseFloat(record.modal_price) || 0;
    
    let trendClass = 'trend-stable';
    let trendText = '→';
    if (index > 0) {
      const prevPrice = parseFloat(records[index - 1].modal_price) || 0;
      if (modalPrice > prevPrice) { trendClass = 'trend-up'; trendText = '↗️'; } 
      else if (modalPrice < prevPrice) { trendClass = 'trend-down'; trendText = '↘️'; }
    }
    
    row.innerHTML = `
      <td data-label="Date" class="date-cell">${formatDate(record.arrival_date)}</td>
      <td data-label="Crop">${record.commodity || 'N/A'}</td>
      <td data-label="Market">${record.market || 'N/A'}</td>
      <td data-label="Min Price (₹/Quintal)">₹${record.min_price || 'N/A'}</td>
      <td data-label="Max Price (₹/Quintal)">₹${record.max_price || 'N/A'}</td>
      <td data-label="Modal Price (₹/Quintal)">₹${record.modal_price || 'N/A'}</td>
      <td data-label="Trend" class="trend-cell ${trendClass}">${trendText}</td>
    `;
    
    pricesTbody.appendChild(row);
  });
}

function createPriceChart(records) {
  if (!priceChart) return;
  const ctx = priceChart.getContext('2d');
  
  if (chartInstance) {
    chartInstance.destroy();
  }
  
  const labels = records.map(record => formatDate(record.arrival_date));
  const prices = records.map(record => parseFloat(record.modal_price) || 0);
  
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: `${commoditySelect.value} Price Trend (₹/Quintal)`,
        data: prices,
        borderColor: '#2e7d32',
        backgroundColor: 'rgba(46, 125, 50, 0.1)',
        fill: true,
        tension: 0.4,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          title: { display: true, text: 'Price (₹/Quintal)' }
        }
      }
    }
  });
}

function generateMarketInsights(records) {
  if (records.length < 2) {
      bestTime.textContent = 'Not enough data for insights.';
      volatility.textContent = 'Not enough data for insights.';
      prediction.textContent = 'Not enough data for insights.';
      return;
  };
  
  const prices = records.map(r => parseFloat(r.modal_price) || 0);
  const maxPrice = Math.max(...prices);
  const maxPriceIndex = prices.indexOf(maxPrice);
  const maxPriceDate = formatDate(records[maxPriceIndex].arrival_date);
  bestTime.textContent = `Best price was on ${maxPriceDate} (₹${maxPrice} per Quintal)`;

  const avgPriceVal = prices.reduce((a, b) => a + b, 0) / prices.length;
  const variance = prices.reduce((acc, price) => acc + Math.pow(price - avgPriceVal, 2), 0) / prices.length;
  const volatilityVal = Math.sqrt(variance);
  const volatilityPercent = avgPriceVal ? ((volatilityVal / avgPriceVal) * 100).toFixed(1) : 0;
  volatility.textContent = `Price varies by ${volatilityPercent}% (±₹${volatilityVal.toFixed(0)} per Quintal)`;
  
  const recentTrend = prices[prices.length - 1] - prices[0];
  const predictionVal = prices[prices.length-1] + (recentTrend / prices.length);
  prediction.textContent = `Next price likely around ₹${predictionVal.toFixed(0)} per Quintal based on recent trend.`;
}

function updateChartByDateRange(days) {
  currentDateRange = days;
  
  document.querySelectorAll('.chart-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`trend${days}`).classList.add('active');
  
  if (filteredRecords.length > 0) {
    const sortedRecords = filteredRecords
      .filter(validateRecord)
      .sort((a, b) => new Date(a.arrival_date) - new Date(b.arrival_date));
    
    const recentRecords = sortedRecords.slice(-days);
    if (recentRecords.length > 0) {
      createPriceChart(recentRecords);
    } else {
      showError("No data available for the selected time period.");
    }
  }
}

// Initializer
document.addEventListener('DOMContentLoaded', () => {
  // Cache DOM elements
  stateSelect = document.getElementById('stateSelect');
  citySelect = document.getElementById('citySelect');
  commoditySelect = document.getElementById('commoditySelect');
  dateRangeSelect = document.getElementById('dateRange');
  fetchBtn = document.getElementById('fetchBtn');
  loadingDiv = document.getElementById('loading');
  errorDiv = document.getElementById('error');
  pricesTable = document.getElementById('pricesTable');
  pricesTbody = pricesTable.querySelector('tbody');
  trendIndicator = document.getElementById('trendIndicator');
  priceRange = document.getElementById('priceRange');
  avgPrice = document.getElementById('avgPrice');
  lastUpdated = document.getElementById('lastUpdated');
  priceChart = document.getElementById('priceChart');
  chartControls = document.querySelector('.chart-controls');
  currentPrice = document.getElementById('currentPrice');
  priceChange = document.getElementById('priceChange');
  marketInsights = document.getElementById('marketInsights');
  bestTime = document.getElementById('bestTime');
  volatility = document.getElementById('volatility');
  prediction = document.getElementById('prediction');

  // Add event listeners
  stateSelect.addEventListener('change', updateDependentFilters);
  fetchBtn.addEventListener('click', fetchMarketTrends);
  
  document.getElementById('trend7').addEventListener('click', () => updateChartByDateRange(7));
  document.getElementById('trend15').addEventListener('click', () => updateChartByDateRange(15));
  document.getElementById('trend30').addEventListener('click', () => updateChartByDateRange(30));
  document.getElementById('trend90').addEventListener('click', () => updateChartByDateRange(90));
  
  dateRangeSelect.addEventListener('change', (e) => {
      currentDateRange = parseInt(e.target.value, 10);
      if (filteredRecords.length > 0) {
          processAndDisplayData();
      }
  });

  // Start the application
  fetchInitialData();
});