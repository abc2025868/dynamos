// Language Initialization
const LanguageManager = {
    state: {
        currentLanguage: 'en',
        translations: {
            en: {
                // Navigation
                backToHome: 'Back to Home',
                marketPricesTitle: 'Live Crop Market Prices in Tamil Nadu',
                marketPricesSubtitle: 'Updated hourly with actual market data from across the state',
                
                // Filters
                selectDistrict: 'Select District',
                allDistricts: 'All Districts',
                chennai: 'Chennai',
                coimbatore: 'Coimbatore',
                madurai: 'Madurai',
                salem: 'Salem',
                trichy: 'Tiruchirappalli',
                
                selectCrop: 'Select Crop',
                allCrops: 'All Crops',
                rice: 'Rice (Paddy)',
                sugarcane: 'Sugarcane',
                banana: 'Banana',
                coconut: 'Coconut',
                turmeric: 'Turmeric',
                
                selectTimePeriod: 'Time Period',
                last7Days: 'Last 7 days',
                last15Days: 'Last 15 days',
                last30Days: 'Last 30 days',
                last90Days: 'Last 90 days',
                
                // Actions
                updatePrices: 'Update Prices',
                readAloud: 'Read Aloud',
                saveAsPDF: 'Save as PDF',
                
                // Table Headers
                district: 'District',
                crop: 'Crop',
                variety: 'Variety',
                minPrice: 'Min Price (₹/quintal)',
                maxPrice: 'Max Price (₹/quintal)',
                modalPrice: 'Modal Price (₹/quintal)',
                lastUpdated: 'Last Updated',
                
                // Messages
                loadingPrices: 'Loading prices...',
                noPriceData: 'No price data available for the selected filters',
                pricesUpdated: 'Prices updated successfully',
                errorUpdating: 'Error updating prices',
                noDataToRead: 'No data to read',
                pdfGenerationStarted: 'PDF generation started'
            },
            ta: {
                // Navigation
                backToHome: 'முதல் பக்கத்திற்கு',
                marketPricesTitle: 'தமிழ்நாட்டில் நேரடி பயிர் சந்தை விலைகள்',
                marketPricesSubtitle: 'மாநிலம் முழுவதிலும் உள்ள உண்மையான சந்தை தரவுகளுடன் ஒவ்வொரு மணிநேரமும் புதுப்பிக்கப்படுகிறது',
                
                // Filters
                selectDistrict: 'மாவட்டத்தைத் தேர்ந்தெடுக்கவும்',
                allDistricts: 'அனைத்து மாவட்டங்கள்',
                chennai: 'சென்னை',
                coimbatore: 'கோயம்புத்தூர்',
                madurai: 'மதுரை',
                salem: 'சேலம்',
                trichy: 'திருச்சிராப்பள்ளி',
                
                selectCrop: 'பயிரைத் தேர்ந்தெடுக்கவும்',
                allCrops: 'அனைத்து பயிர்கள்',
                rice: 'நெல் (பaddy)',
                sugarcane: 'கரும்பு',
                banana: 'வாழை',
                coconut: 'தேங்காய்',
                turmeric: 'மஞ்சள்',
                
                selectTimePeriod: 'கால அளவு',
                last7Days: 'கடந்த 7 நாட்கள்',
                last15Days: 'கடந்த 15 நாட்கள்',
                last30Days: 'கடந்த 30 நாட்கள்',
                last90Days: 'கடந்த 90 நாட்கள்',
                
                // Actions
                updatePrices: 'விலைகளை புதுப்பிக்கவும்',
                readAloud: 'குரலில் படிக்கவும்',
                saveAsPDF: 'PDF ஆக சேமிக்கவும்',
                
                // Table Headers
                district: 'மாவட்டம்',
                crop: 'பயிர்',
                variety: 'வகை',
                minPrice: 'குறைந்த விலை (₹/quintal)',
                maxPrice: 'அதிக விலை (₹/quintal)',
                modalPrice: 'மாதிரி விலை (₹/quintal)',
                lastUpdated: 'கடைசியாக புதுப்பிக்கப்பட்டது',
                
                // Messages
                loadingPrices: 'விலைகள் ஏற்றப்படுகின்றன...',
                noPriceData: 'தேர்ந்தெடுக்கப்பட்ட வடிகட்டிகளுக்கு விலை தரவு இல்லை',
                pricesUpdated: 'விலைகள் வெற்றிகரமாக புதுப்பிக்கப்பட்டன',
                errorUpdating: 'விலைகளை புதுப்பிக்கும்போது பிழை',
                noDataToRead: 'படிக்க தரவு இல்லை',
                pdfGenerationStarted: 'PDF உருவாக்கம் தொடங்கப்பட்டது'
            }
        }
    },

    init() {
        this.loadLanguagePreference();
        this.applyLanguage(this.state.currentLanguage);
        this.setupEventListeners();
    },

    loadLanguagePreference() {
        // Try to get language from localStorage
        const savedLanguage = localStorage.getItem('preferredLanguage');
        if (savedLanguage && this.state.translations[savedLanguage]) {
            this.state.currentLanguage = savedLanguage;
        } else {
            // Try to get language from browser
            const browserLang = navigator.language.split('-')[0];
            this.state.currentLanguage = this.state.translations[browserLang] ? browserLang : 'en';
        }
    },

    setupEventListeners() {
        // Listen for language change events from other pages
        document.addEventListener('languageChanged', (event) => {
            this.switchLanguage(event.detail.language);
        });
    },

    switchLanguage(language) {
        if (this.state.translations[language]) {
            this.state.currentLanguage = language;
            localStorage.setItem('preferredLanguage', language);
            this.applyLanguage(language);
            
            // Dispatch event for other components
            document.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { language }
            }));
        }
    },

    applyLanguage(language) {
        // Update HTML lang attribute
        document.documentElement.lang = language;

        // Update all elements with data-lang attribute
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (this.state.translations[language][key]) {
                element.textContent = this.state.translations[language][key];
            }
        });

        // Update select options
        document.querySelectorAll('select[data-lang]').forEach(select => {
            const key = select.getAttribute('data-lang');
            if (this.state.translations[language][key]) {
                select.querySelector('option[value=""]').textContent = this.state.translations[language][key];
            }
        });
    },

    getTranslation(key) {
        return this.state.translations[this.state.currentLanguage][key] || key;
    }
};

// Initialize language manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    LanguageManager.init();
}); 