export class PageDataBridge {
  constructor(storageKey = "pageData") {
    this.key = storageKey;
  }

  send(data, nextPageUrl, options = { useUrl: false }) {
    if (typeof window === 'undefined') return; // ✅ 確保僅在瀏覽器中執行

    if (options.useUrl && nextPageUrl) {
      const url = new URL(nextPageUrl, window.location.origin);
      Object.entries(data).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
      window.location.href = url.toString();
    } else {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.key, JSON.stringify(data));
      }
      if (nextPageUrl) window.location.href = nextPageUrl;
    }
  }

  receive(autoClear = true) {
    if (typeof window === 'undefined') return {};

    const fromUrl = this._getUrlData();
    const fromLocal = this._getLocal();

    if (autoClear) this.clear();

    return {
      ...(fromLocal || {}),
      ...(fromUrl || {}),
    };
  }

  get() {
    if (typeof window === 'undefined') return {};
    return {
      ...(this._getLocal() || {}),
      ...(this._getUrlData() || {}),
    };
  }

  clear() {
    if (typeof window === 'undefined') return;

    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.key);
    }

    const url = new URL(window.location.href);
    const keys = Array.from(url.searchParams.entries()).map(([key]) => key);
    keys.forEach((key) => url.searchParams.delete(key));
    window.history.replaceState({}, "", url.toString());
  }

  _getLocal() {
    if (typeof localStorage === 'undefined') return null;

    const raw = localStorage.getItem(this.key);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  _getUrlData() {
    if (typeof window === 'undefined') return null;

    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params.entries()) {
      result[key] = value;
    }
    return Object.keys(result).length ? result : null;
  }
}
