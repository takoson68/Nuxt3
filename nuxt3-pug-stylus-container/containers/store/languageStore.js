const languageStore = {
  language: 'zh',
  langData: {},

  async loadLanguageFile(langCode) {
    langCode = langCode || this.language;
    let parsed = null;
  
    try {
      if (process.client) {
        const res = await fetch(`./lang/lang-${langCode}.txt`);
        const text = await res.text();
        parsed = this.parseLangText(text);
        this.language = langCode;
        this.langData = parsed;
      }
  
      if (process.client && parsed) {
        localStorage.setItem("lang_code", langCode);
        localStorage.setItem(`lang_data_${langCode}`, JSON.stringify(parsed));
      }
    } catch (err) {
      console.error(`[languageStore] 無法載入語言檔: ${langCode}`, err);
    }
  },

  parseLangText(text) {
    const lines = text.split("\n");
    const map = {};
    lines.forEach(line => {
      const [key, ...rest] = line.trim().split("=");
      if (key && rest.length > 0) {
        map[key] = rest.join("=").trim();
      }
    });
    return map;
  },

  t(key) {
    return this.langData[key] || key;
  },

  async setLanguage(langCode) {
    await this.loadLanguageFile(langCode);
  },

  getLanguage() {
    return this.language;
  },

  getLangData() {
    return this.langData;
  },

  async initLanguage() {
    if (typeof window !== 'undefined') {
      const savedLangCode = localStorage.getItem("lang_code");
      const savedLangData = savedLangCode ? localStorage.getItem(`lang_data_${savedLangCode}`) : null;
  
      if (savedLangCode && savedLangData) {
        this.language = savedLangCode;
        this.langData = JSON.parse(savedLangData);
        this.replaceMenuLang();
        console.log(`[languageStore] 已從 localStorage 還原語言：${savedLangCode}`);
        return;
      }
  
      // fallback：第一次載入
      await this.loadLanguageFile(this.language);
      console.log(`[languageStore] 載入預設語言：${this.language}`);
    }
  }
  ,

  replaceMenuLang() {
    if (typeof document === 'undefined') return;

    const elements = document.querySelectorAll("[data-lang], [data-i18n-title], [data-i18n-placeholder], [data-i18n-value]");
    elements.forEach((el) => {
      if (el.hasAttribute("data-lang")) {
        const key = el.getAttribute("data-lang");
        const value = this.t(key);
        if (value) el.textContent = value;
      }

      if (el.hasAttribute("data-i18n-title")) {
        const key = el.getAttribute("data-i18n-title");
        const value = this.t(key);
        if (value) el.setAttribute("title", value);
      }

      if (el.hasAttribute("data-i18n-placeholder")) {
        const key = el.getAttribute("data-i18n-placeholder");
        const value = this.t(key);
        if (value) el.setAttribute("placeholder", value);
      }

      if (el.hasAttribute("data-i18n-value")) {
        const key = el.getAttribute("data-i18n-value");
        const value = this.t(key);
        if (value) el.setAttribute("value", value);
      }
    });
  }
};

export default languageStore;
