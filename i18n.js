// Simple i18n implementation for Homefield
class I18n {
  constructor() {
    this.translations = {};
    this.currentLanguage = this.getStoredLanguage() || this.getBrowserLanguage();
    this.defaultLanguage = 'cs';
  }

  // Get language from localStorage
  getStoredLanguage() {
    return localStorage.getItem('language');
  }

  // Detect browser language
  getBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    // Support 'en', 'en-US', 'en-GB', etc.
    if (browserLang.startsWith('en')) {
      return 'en';
    }
    // Default to Czech
    return 'cs';
  }

  // Load translation file
  async loadTranslations(lang) {
    try {
      const response = await fetch(`./locales/${lang}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load ${lang}.json`);
      }
      this.translations[lang] = await response.json();
    } catch (error) {
      console.error(`Error loading translations for ${lang}:`, error);
      // Fallback to default language
      if (lang !== this.defaultLanguage) {
        await this.loadTranslations(this.defaultLanguage);
        this.currentLanguage = this.defaultLanguage;
      }
    }
  }

  // Get nested translation value using dot notation (e.g., "nav.bio")
  getTranslation(key) {
    const keys = key.split('.');
    let value = this.translations[this.currentLanguage];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return value || key;
  }

  // Apply translations to all elements with data-key attribute
  applyTranslations() {
    const elements = document.querySelectorAll('[data-key]');

    elements.forEach(element => {
      const key = element.getAttribute('data-key');
      const translation = this.getTranslation(key);

      // Handle different element types
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translation;
      } else if (element.tagName === 'BUTTON' || element.tagName === 'A') {
        element.textContent = translation;
      } else {
        // For other elements, check if it contains HTML or just text
        if (translation.includes('**')) {
          // Convert markdown bold to HTML
          const htmlContent = translation.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          element.innerHTML = htmlContent;
        } else {
          element.textContent = translation;
        }
      }
    });
  }

  // Change language
  async changeLanguage(lang) {
    if (lang !== this.currentLanguage) {
      this.currentLanguage = lang;
      localStorage.setItem('language', lang);

      // Load translations if not already loaded
      if (!this.translations[lang]) {
        await this.loadTranslations(lang);
      }

      this.applyTranslations();
      this.updateLanguageSwitcher();

      // Update HTML lang attribute
      document.documentElement.lang = lang;
    }
  }

  // Update language switcher UI
  updateLanguageSwitcher() {
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === this.currentLanguage) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Initialize i18n
  async init() {
    // Load current language translations
    await this.loadTranslations(this.currentLanguage);

    // Apply translations
    this.applyTranslations();

    // Update HTML lang attribute
    document.documentElement.lang = this.currentLanguage;

    // Setup language switcher buttons
    this.setupLanguageSwitcher();
  }

  // Setup event listeners for language switcher
  setupLanguageSwitcher() {
    const buttons = document.querySelectorAll('.lang-btn');

    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = btn.getAttribute('data-lang');
        this.changeLanguage(lang);
      });
    });

    // Update initial state
    this.updateLanguageSwitcher();
  }
}

// Initialize i18n when DOM is ready
let i18n;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', async () => {
    i18n = new I18n();
    await i18n.init();
  });
} else {
  // DOM already loaded
  (async () => {
    i18n = new I18n();
    await i18n.init();
  })();
}
