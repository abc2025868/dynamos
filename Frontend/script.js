// Language switcher functionality
const translations = {
    en: {
        home: "Home",
        services: "Services",
        about: "About",
        languages: "Languages",
        heroHeading: "Empowering Tamil Nadu Farmers with Smart Agriculture",
        heroSubheading: "Get real-time weather, crop advice, and government scheme help.",
        getStarted: "Get Started",
        login: "Login",
        logout: "Logout",
        featuresTitle: "Our Features",
        weatherDetails: "Weather Details",
        weatherDetailsDesc: "Get accurate weather forecasts specific to your location and plan your farming activities accordingly.",
        cropDisease: "Detect Crop Disease",
        cropDiseaseDesc: "Use your smartphone to scan plants and identify diseases with our AI-powered detection system.",
        marketPrices: "Latest Market Prices",
        marketPricesDesc: "Stay informed about current market prices for your crops and find the best places to sell.",
        govtSchemes: "Government Schemes",
        govtSchemesDesc: "Learn about all available government schemes and subsidies that can help your farming business.",
        youtubeRefs: "YouTube References",
        youtubeRefsDesc: "Watch educational videos about modern farming techniques and best practices in agriculture.",
        expertSuggestions: "Expert Suggestions",
        expertSuggestionsDesc: "Connect with agricultural experts who can provide personalized advice for your specific needs.",
        aboutText: "This web app empowers Tamil Nadu farmers by providing agriculture insights, weather forecasts, government schemes, and expert help in their own language. Built with care, it brings tradition and technology together for a better future.",
        footerQuote: "Ready to <span class='highlight'>elevate</span> your farming? Join our <span class='highlight'>community</span> of Tamil Nadu farmers using <span class='highlight'>technology</span> to boost yields and income.",
        weatherAlert: "Weather Alert: Moderate rainfall expected in delta regions",
        newSubsidies: "Tamil Nadu announces new subsidies for organic farming",
        pestResistant: "New pest-resistant rice variety developed at TNAU",
        mspIncrease: "Government increases minimum support price for paddy by 5%",
        solarIrrigation: "Solar-powered irrigation systems now available with 50% subsidy",
        pageTitle: "Uzhavar Oli - Empowering Tamil Nadu Farmers",
        pageDescription: "Uzhavar Oli - Smart agriculture tools and resources for Tamil Nadu farmers",
        culturalIconText: "TN",
        culturalIconAlt: "Tamil Nadu Cultural Symbol",
        privacyPolicy: "Privacy Policy",
        termsOfService: "Terms of Service",
        contactUs: "Contact Us",
        goToDashboard: "Go to Dashboard",
        welcomeMessage: "Welcome to Uzhavar Oli! 🌱 We're here to help you on your farming journey."
    },
    ta: {
        home: "முகப்பு",
        services: "சேவைகள்",
        about: "எங்களை பற்றி",
        languages: "மொழிகள்",
        heroHeading: "தமிழக விவசாயிகளை நவீன விவசாயத்துடன் மேம்படுத்துதல்",
        heroSubheading: "தற்போதைய வானிலை, பயிர் ஆலோசனை, மற்றும் அரசு திட்ட உதவி பெறுங்கள்.",
        getStarted: "தொடங்குங்கள்",
        login: "உள்நுழைய",
        logout: "வெளியேறு",
        featuresTitle: "எங்கள் அம்சங்கள்",
        weatherDetails: "வானிலை விவரங்கள்",
        weatherDetailsDesc: "உங்கள் இடத்திற்கான துல்லியமான வானிலை முன்னறிவிப்புகளை பெறுங்கள் மற்றும் உங்கள் விவசாய செயல்பாடுகளை திட்டமிடுங்கள்.",
        cropDisease: "பயிர் நோய் கண்டறிதல்",
        cropDiseaseDesc: "உங்கள் ஸ்மார்ட்போனைப் பயன்படுத்தி செடிகளை ஸ்கேன் செய்து, எங்கள் AI அமைப்பின் மூலம் நோய்களை கண்டறியவும்.",
        marketPrices: "சந்தை விலைகள்",
        marketPricesDesc: "உங்கள் பயிர்களின் தற்போதைய சந்தை விலைகளைப் பற்றி தெரிந்து கொள்ளுங்கள் மற்றும் சிறந்த விற்பனை இடங்களை கண்டறியவும்.",
        govtSchemes: "அரசு திட்டங்கள்",
        govtSchemesDesc: "உங்கள் விவசாய வணிகத்திற்கு உதவக்கூடிய அனைத்து கிடைக்கக்கூடிய அரசு திட்டங்கள் மற்றும் மானியங்களைப் பற்றி அறியவும்.",
        youtubeRefs: "யூடியூப் குறிப்புகள்",
        youtubeRefsDesc: "நவீன விவசாய நுட்பங்கள் மற்றும் சிறந்த நடைமுறைகள் பற்றி கல்வி வீடியோக்களைப் பாருங்கள்.",
        expertSuggestions: "நிபுணர் ஆலோசனைகள்",
        expertSuggestionsDesc: "உங்கள் குறிப்பிட்ட தேவைகளுக்கு தனிப்பயனாக்கப்பட்ட ஆலோசனையை வழங்கக்கூடிய விவசாய நிபுணர்களுடன் இணைக்கவும்.",
        aboutText: "இந்த வலைத்தளம் தமிழக விவசாயிகளுக்கு விவசாய தகவல்கள், வானிலை முன்னறிவிப்புகள், அரசு திட்டங்கள், மற்றும் நிபுணர் உதவிகளை அவர்களின் சொந்த மொழியில் வழங்குகிறது. கவனத்துடன் உருவாக்கப்பட்ட இது, பாரம்பரியத்தையும் தொழில்நுட்பத்தையும் இணைத்து சிறந்த எதிர்காலத்தை உருவாக்குகிறது.",
        footerQuote: "உங்கள் விவசாயத்தை <span class='highlight'>உயர்த்த</span> தயாரா? <span class='highlight'>தொழில்நுட்பத்தைப்</span> பயன்படுத்தி மகசூலையும் வருமானத்தையும் அதிகரிக்கும் தமிழக விவசாயிகளின் <span class='highlight'>சமூகத்தில்</span> இணையுங்கள்.",
        weatherAlert: "வானிலை எச்சரிக்கை: டெல்டா பகுதிகளில் மிதமான மழைக்கு வாய்ப்பு",
        newSubsidies: "தமிழக அரசு இயற்கை விவசாயத்திற்கு புதிய மானியங்களை அறிவித்துள்ளது",
        pestResistant: "தமிழ்நாடு வேளாண் பல்கலைக்கழகத்தில் புதிய பூச்சி எதிர்ப்பு நெல் ரகம் உருவாக்கப்பட்டுள்ளது",
        mspIncrease: "நெல்லுக்கான குறைந்தபட்ச ஆதார விலையை 5% அரசு உயர்த்தியுள்ளது",
        solarIrrigation: "சூரிய சக்தி பாசன அமைப்புகள் இப்போது 50% மானியத்துடன் கிடைக்கின்றன",
        privacyPolicy: "தனியுரிமைக் கொள்கை",
        termsOfService: "சேவை விதிமுறைகள்",
        contactUs: "தொடர்பு கொள்ளவும்",
        goToDashboard: "டாஷ்போர்டுக்குச் செல்லவும்",
        welcomeMessage: "வணக்கம்! உழவர் ஒளி-க்கு வரவேற்கிறோம். உங்கள் விவசாய பயணத்தில் உதவ நாங்கள் இங்கே இருக்கிறோம்.",
        pageTitle: "உழவர் ஒளி - தமிழக விவசாயிகளை மேம்படுத்துதல்",
        pageDescription: "உழவர் ஒளி - தமிழக விவசாயிகளுக்கான நவீன விவசாய கருவிகள் மற்றும் வளங்கள்",
        culturalIconText: "தமிழ்நாடு",
        culturalIconAlt: "தமிழ்நாடு பண்பாட்டு சின்னம்"
    }
};

// Application state management
const AgriApp = {
    state: {
        currentLanguage: localStorage.getItem('agri-lang') || 'en',
        hasVisited: localStorage.getItem('agri-visited') || false,
        isLoading: true,
        scrollY: 0,
        activeSection: 'home',
        isLoggedIn: localStorage.getItem('agri-isLoggedIn') === 'true'
    },
    
    elements: {
        preloader: null,
        navbar: null,
        navItems: null,
        languageDropdown: null,
        languageOptions: null,
        heroSection: null,
        heroHeading: null,
        heroSubheading: null,
        getStartedBtn: null,
        sectionTitle: null,
        featureCards: null,
        featureTitles: null,
        aboutText: null,
        footerQuote: null,
        newsTickerContent: null,
        accountIcon: null
    },
    
    init() {
        this.cacheElements();
        this.createPreloader();
        this.setupEventListeners();
        this.checkSavedLanguage();
        this.updateLoginStatus();
        
        // Initialize components
        this.initNewsTickerContent();
        this.detectReducedMotion();
        
        window.addEventListener('load', () => {
            this.handlePageLoaded();
        });
    },
    
    cacheElements() {
        // Cache DOM elements for better performance
        this.elements.navbar = document.querySelector('.navbar');
        this.elements.navItems = document.querySelectorAll('.navbar-menu .menu-item:not(.language-dropdown)');
        this.elements.languageDropdown = document.querySelector('.language-dropdown .menu-item');
        this.elements.languageOptions = document.querySelectorAll('.lang-option');
        this.elements.heroSection = document.querySelector('.hero-section');
        this.elements.heroHeading = document.querySelector('.hero-heading');
        this.elements.heroSubheading = document.querySelector('.hero-subheading');
        this.elements.getStartedBtn = document.querySelector('.btn-get-started');
        this.elements.sectionTitle = document.querySelector('.section-title');
        this.elements.featureCards = document.querySelectorAll('.feature-card');
        this.elements.featureTitles = document.querySelectorAll('.feature-title');
        this.elements.aboutText = document.querySelector('.about-text p');
        this.elements.footerQuote = document.querySelector('.footer-quote p');
        this.elements.newsTickerContent = document.querySelector('.ticker-content');
        this.elements.accountIcon = document.querySelector('.account-icon a');
    },
    
    createPreloader() {
        // Create preloader element
        this.elements.preloader = document.createElement('div');
        this.elements.preloader.className = 'preloader';
        this.elements.preloader.innerHTML = '<div class="preloader-spinner"></div>';
        document.body.appendChild(this.elements.preloader);
    },
    
    handlePageLoaded() {
        // Delay for smoother preloader effect
        setTimeout(() => {
            this.elements.preloader.classList.add('fade-out');
            
            setTimeout(() => {
                this.elements.preloader.style.display = 'none';
                this.state.isLoading = false;
                
                // Initialize scroll animations and first-time user experience
                this.initScrollAnimations();
                this.staggerFeatureCardAnimations();
                
                if (!this.state.hasVisited) {
                    this.showWelcomeToast();
                    localStorage.setItem('agri-visited', 'true');
                    this.state.hasVisited = true;
                }
            }, 500);
        }, 800);
    },
    
    setupEventListeners() {
        // Setup navigation scroll behavior
        this.setupSmoothScrolling();
        
        // Setup language switcher
        this.elements.languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = option.getAttribute('data-lang');
                if (lang !== this.state.currentLanguage) {
                    this.switchLanguage(lang);
                }
            });
        });
        
        // Add event listeners to feature cards
        if (this.elements.featureCards) {
            this.elements.featureCards.forEach(card => {
                card.addEventListener('click', (e) => {
                    const featureType = card.getAttribute('data-feature');
                    this.handleFeatureCardClick(featureType);
                });
            });
        }
        
        // Add scroll event for navbar and section highlighting
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
        
        // Add resize event for responsive adjustments
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
        
        // Add keyboard navigation for accessibility
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
        
        // Add parallax effect to hero section
        if (this.elements.heroSection && !this.prefersReducedMotion) {
            window.addEventListener('scroll', () => {
                this.handleHeroParallax();
            });
        }
        
        // Setup account icon behavior
        if (this.elements.accountIcon) {
            this.elements.accountIcon.addEventListener('click', (e) => {
                if (this.state.isLoggedIn) {
                    e.preventDefault();
                    this.handleLogout();
                }
            });
        }
        
        // Setup get started button
        if (this.elements.getStartedBtn) {
            // If logged in, redirect to dashboard instead of login
            if (this.state.isLoggedIn && this.elements.getStartedBtn.getAttribute('href') === 'login.html') {
                this.elements.getStartedBtn.setAttribute('href', 'dashboard.html');
                this.elements.getStartedBtn.textContent = this.state.currentLanguage === 'en' ? 'Go to Dashboard' : 'டாஷ்போர்டுக்குச் செல்லவும்';
            }
        }
        
        // Add click handlers for feature cards
        this.elements.featureCards.forEach(card => {
            card.addEventListener('click', () => {
                const featureKey = card.getAttribute('data-feature');
                if (featureKey) {
                    switch (featureKey) {
                        case 'weatherDetails':
                            window.location.href = 'weather.html';
                            break;
                        case 'cropDisease':
                            window.location.href = 'crop-disease.html';
                            break;
                        case 'marketPrices':
                            window.location.href = 'market-prices.html';
                            break;
                        case 'govtSchemes':
                            window.location.href = 'govt-schemes.html';
                            break;
                        case 'youtubeRefs':
                            window.location.href = 'youtube-refs.html';
                            break;
                        case 'expertSuggestions':
                            window.location.href = 'expert-suggestions.html';
                            break;
                    }
                }
            });
        });
    },
    
    handleScroll() {
        this.state.scrollY = window.scrollY;
        
        // Handle fixed navbar and active state
        if (this.state.scrollY > 50) {
            this.elements.navbar.classList.add('scrolled');
        } else {
            this.elements.navbar.classList.remove('scrolled');
        }
        
        // Handle active section based on scroll position
        this.updateActiveSection();
    },
    
    updateActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = this.state.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                if (this.state.activeSection !== sectionId) {
                    this.state.activeSection = sectionId;
                    this.updateActiveMenuItem(sectionId);
                }
            }
        });
        
        // Handle top of page (home section)
        if (scrollPosition < 200 && this.state.activeSection !== 'home') {
            this.state.activeSection = 'home';
            this.updateActiveMenuItem('home');
        }
    },
    
    updateActiveMenuItem(sectionId) {
        this.elements.navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href && href === `#${sectionId}`) {
                item.classList.add('active');
            }
        });
    },
    
    handleHeroParallax() {
        if (this.state.scrollY < window.innerHeight) {
            const parallaxOffset = this.state.scrollY * 0.4;
            this.elements.heroSection.style.backgroundPositionY = `-${parallaxOffset}px`;
        }
    },
    
    handleResize() {
        // Adjust any layout elements that need to be responsive beyond CSS
        // For now, just update the active section
        this.updateActiveSection();
    },
    
    handleKeyboardNavigation(e) {
        // Add keyboard navigation for accessibility
        if (e.key === 'Tab') {
            document.body.classList.add('user-is-tabbing');
        }
        
        // Escape key closes dropdowns
        if (e.key === 'Escape') {
            document.querySelectorAll('.dropdown-content').forEach(dropdown => {
                dropdown.style.display = 'none';
            });
            
            // Return focus to parent
            setTimeout(() => {
                document.querySelectorAll('.language-dropdown').forEach(dropdown => {
                    dropdown.querySelector('.menu-item').focus();
                });
            }, 10);
        }
    },
    
    checkSavedLanguage() {
        // Check for saved language preference
        const savedLang = localStorage.getItem('agri-lang');
        if (savedLang && (savedLang === 'en' || savedLang === 'ta')) {
            this.state.currentLanguage = savedLang;
            this.updateLanguage(savedLang);
        }
    },
    
    updateLoginStatus() {
        // Update account icon/login status based on localStorage
        if (this.elements.accountIcon) {
            if (this.state.isLoggedIn) {
                // Update icon to show logged in state
                this.elements.accountIcon.innerHTML = '<i class="fas fa-user-check"></i>';
                this.elements.accountIcon.setAttribute('title', this.state.currentLanguage === 'en' ? 'Logout' : 'வெளியேறு');
                this.elements.accountIcon.setAttribute('href', '#');
                this.elements.accountIcon.classList.add('logged-in');
                
                // Update Get Started button if it exists
                if (this.elements.getStartedBtn) {
                    this.elements.getStartedBtn.setAttribute('href', 'dashboard.html');
                    this.elements.getStartedBtn.textContent = this.state.currentLanguage === 'en' ? 'Go to Dashboard' : 'டாஷ்போர்டுக்குச் செல்லவும்';
                }
            } else {
                // Reset to login state
                this.elements.accountIcon.innerHTML = '<i class="fas fa-user-circle"></i>';
                this.elements.accountIcon.setAttribute('title', this.state.currentLanguage === 'en' ? 'Login' : 'உள்நுழைய');
                this.elements.accountIcon.setAttribute('href', 'login.html');
                this.elements.accountIcon.classList.remove('logged-in');
                
                // Reset Get Started button if it exists
                if (this.elements.getStartedBtn) {
                    this.elements.getStartedBtn.setAttribute('href', 'login.html');
                    this.elements.getStartedBtn.textContent = translations[this.state.currentLanguage].getStarted;
                }
            }
        }
    },
    
    handleLogout() {
        // Confirm before logout
        const confirmLogout = confirm(this.state.currentLanguage === 'en' ? 
            'Are you sure you want to logout?' : 
            'நீங்கள் வெளியேற விரும்புகிறீர்களா?');
            
        if (confirmLogout) {
            // Clear login state
            localStorage.removeItem('agri-isLoggedIn');
            this.state.isLoggedIn = false;
            this.updateLoginStatus();
            
            // Show logout notification
            this.showToast(this.state.currentLanguage === 'en' ? 
                'Logged out successfully' : 
                'வெற்றிகரமாக வெளியேறியது');
                
            // Redirect to home if needed
            setTimeout(() => {
                if (window.location.pathname.includes('dashboard')) {
                    window.location.href = 'index.html';
                }
            }, 1500);
        }
    },
    
    switchLanguage(lang) {
        // Animate the transition
        document.body.style.opacity = '0.8';
        
        setTimeout(() => {
            this.state.currentLanguage = lang;
            this.updateLanguage(lang);
            document.body.style.opacity = '1';
            
            // Update localStorage
            localStorage.setItem('agri-lang', lang);
            
            // Show user feedback
            this.showToast(lang === 'en' ? 'Language changed to English' : 'மொழி தமிழாக மாற்றப்பட்டது');
            
            // Update news ticker for new language
            this.updateNewsTickerForLanguage();
            
            // Update login status with new language
            this.updateLoginStatus();
        }, 200);
    },
    
    updateLanguage(lang) {
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Update page title and meta description
        document.title = translations[lang].pageTitle;
        document.querySelector('meta[name="description"]').setAttribute('content', translations[lang].pageDescription);
        
        // Update all elements with data-lang attribute
        document.querySelectorAll('[data-lang]').forEach(item => {
            const translationKey = item.getAttribute('data-lang');
            if (translationKey && translations[lang][translationKey]) {
                // Preserve any icons or special elements
                const icon = item.querySelector('i');
                const tooltip = item.querySelector('.tooltip');
                
                // Update the text content
                if (item.tagName === 'A' && item.classList.contains('menu-item')) {
                    // For menu items, preserve the href and icon
                    const href = item.getAttribute('href');
                    item.innerHTML = translations[lang][translationKey];
                    if (href) item.setAttribute('href', href);
                    if (icon) item.appendChild(icon);
                } else {
                    item.textContent = translations[lang][translationKey];
                    if (icon) item.appendChild(icon);
                }
                
                // Update tooltip if it exists
                if (tooltip) {
                    tooltip.textContent = translations[lang][translationKey];
                }
            }
        });
        
        // Update language dropdown
        if (this.elements.languageDropdown) {
            this.elements.languageDropdown.innerHTML = translations[lang].languages + ' <i class="fas fa-chevron-down"></i>';
        }
        
        // Update cultural icon
        const culturalIconText = document.querySelector('.icon-text');
        const culturalIconImg = document.querySelector('.cultural-icon img');
        if (culturalIconText) {
            culturalIconText.textContent = lang === 'ta' ? 'தமிழ்நாடு' : 'TN';
        }
        if (culturalIconImg) {
            culturalIconImg.setAttribute('alt', translations[lang].culturalIconAlt);
        }
        
        // Update hero section
        if (this.elements.heroHeading) {
            this.elements.heroHeading.textContent = translations[lang].heroHeading;
        }
        if (this.elements.heroSubheading) {
            this.elements.heroSubheading.textContent = translations[lang].heroSubheading;
        }
        
        // Update get started button
        if (this.elements.getStartedBtn) {
            if (this.state.isLoggedIn) {
                this.elements.getStartedBtn.textContent = translations[lang].goToDashboard;
            } else {
                this.elements.getStartedBtn.textContent = translations[lang].getStarted;
            }
        }
        
        // Update features section
        if (this.elements.sectionTitle) {
            this.elements.sectionTitle.textContent = translations[lang].featuresTitle;
        }
        
        // Update feature cards
        this.elements.featureCards.forEach(card => {
            const featureKey = card.getAttribute('data-feature');
            const title = card.querySelector('.feature-title');
            const description = card.querySelector('p');
            
            if (featureKey && title && description && translations[lang][featureKey]) {
                title.textContent = translations[lang][featureKey];
                description.textContent = translations[lang][`${featureKey}Desc`];
            }
        });
        
        // Update about section
        if (this.elements.aboutText) {
            this.elements.aboutText.textContent = translations[lang].aboutText;
        }
        
        // Update footer
        if (this.elements.footerQuote) {
            this.elements.footerQuote.innerHTML = translations[lang].footerQuote;
        }
        
        // Update footer links
        document.querySelectorAll('.footer-links a[data-lang]').forEach(link => {
            const translationKey = link.getAttribute('data-lang');
            if (translationKey && translations[lang][translationKey]) {
                link.textContent = translations[lang][translationKey];
            }
        });
        
        // Update news ticker
        this.updateNewsTickerForLanguage();
        
        // Update account icon tooltip
        const accountIcon = document.querySelector('.account-icon .tooltip');
        if (accountIcon) {
            accountIcon.textContent = this.state.isLoggedIn ? translations[lang].logout : translations[lang].login;
        }
        
        // Update account icon title and aria-label
        const accountIconLink = document.querySelector('.account-icon a');
        if (accountIconLink) {
            const loginStatus = this.state.isLoggedIn ? translations[lang].logout : translations[lang].login;
            accountIconLink.setAttribute('title', loginStatus);
            accountIconLink.setAttribute('aria-label', loginStatus);
        }
        
        // Save language preference
        localStorage.setItem('agri-lang', lang);
        this.state.currentLanguage = lang;
    },
    
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                
                // Handle home link
                if (targetId === '#') {
                    window.scrollTo({
                        top: 0,
                        behavior: this.prefersReducedMotion ? 'auto' : 'smooth'
                    });
                    return;
                }
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Account for fixed header
                    const headerOffset = this.elements.navbar.offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset - 20;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: this.prefersReducedMotion ? 'auto' : 'smooth'
                    });
                    
                    // Set focus for accessibility
                    setTimeout(() => {
                        targetElement.setAttribute('tabindex', '-1');
                        targetElement.focus();
                    }, 1000);
                }
            });
        });
    },
    
    initScrollAnimations() {
        if (this.prefersReducedMotion) return;
        
        const elementsToAnimate = [
            this.elements.sectionTitle,
            document.querySelector('.about-text'),
            document.querySelector('.about-image')
        ];
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
        );
        
        elementsToAnimate.forEach(el => {
            if (el) observer.observe(el);
        });
    },
    
    staggerFeatureCardAnimations() {
        if (this.prefersReducedMotion) {
            // Make all cards visible immediately for reduced motion preference
            this.elements.featureCards.forEach(card => {
                card.style.opacity = 1;
                card.style.transform = 'translateY(0)';
            });
            return;
        }
        
        // Setup feature card observer
        const featureObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.animation = `slide-up 0.6s ease-out forwards`;
                        }, index * 100);
                        featureObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );
        
        this.elements.featureCards.forEach(card => {
            featureObserver.observe(card);
        });
    },
    
    initNewsTickerContent() {
        this.updateNewsTickerForLanguage();
    },
    
    updateNewsTickerForLanguage() {
        if (!this.elements.newsTickerContent) return;
        
        const lang = this.state.currentLanguage;
        const newsItems = [
            translations[lang].weatherAlert,
            translations[lang].newSubsidies,
            translations[lang].pestResistant,
            translations[lang].mspIncrease,
            translations[lang].solarIrrigation
        ];
        
        this.elements.newsTickerContent.innerHTML = '';
        newsItems.forEach(item => {
            const span = document.createElement('span');
            span.textContent = item;
            this.elements.newsTickerContent.appendChild(span);
        });
    },
    
    showWelcomeToast() {
        const welcomeMsg = this.state.currentLanguage === 'en' 
            ? 'Welcome to AgriAssist! 🌱' 
            : 'அக்ரி அசிஸ்ட்க்கு வரவேற்கிறோம்! 🌱';
            
        this.showToast(welcomeMsg, 5000);
    },
    
    showToast(message, duration = 3000) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fas fa-info-circle"></i>${message}`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'polite');
        document.body.appendChild(toast);
        
        // Get existing toasts to stack them
        const existingToasts = document.querySelectorAll('.toast:not(.removing)');
        if (existingToasts.length > 0) {
            const lastToast = existingToasts[existingToasts.length - 1];
            const lastToastHeight = lastToast.offsetHeight;
            toast.style.bottom = `${parseInt(window.getComputedStyle(lastToast).bottom) + lastToastHeight + 10}px`;
        }
        
        // Show toast with slight delay for transition
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Hide toast after duration
        setTimeout(() => {
            toast.classList.add('removing');
            toast.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 500);
        }, duration);
    },
    
    detectReducedMotion() {
        // Check if user prefers reduced motion
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (this.prefersReducedMotion) {
            // Apply reduced motion styles
            document.documentElement.classList.add('reduced-motion');
        }
    },
    
    handleFeatureCardClick(featureType) {
        // Handle different feature card clicks
        switch(featureType) {
            case 'weatherDetails':
                window.location.href = 'weather.html';
                break;
            case 'marketPrices':
                window.location.href = 'market-prices.html';
                break;
            case 'cropDisease':
                window.location.href = 'crop-disease.html';
                break;
            case 'govtSchemes':
                window.location.href = 'govt-schemes.html';
                break;
            case 'youtubeRefs':
                window.location.href = 'youtube-references.html';
                break;
            case 'expertSuggestions':
                window.location.href = 'expert-suggestions.html';
                break;
            default:
                // For any undefined feature, log a message
                console.log(`Navigation for ${featureType} is not yet implemented`);
        }
    },
    
    // Utility functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    AgriApp.init();
}); 