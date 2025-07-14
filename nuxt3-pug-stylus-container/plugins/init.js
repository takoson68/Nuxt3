// plugins/init.js
import { container } from "@/containers/index.js";


export default defineNuxtPlugin(() => {
  const tokenStore = container.resolve("tokenStore");
  const languageStore = container.resolve("languageStore");
  

  // 初始化 token 狀態
  tokenStore.get()

  // 初始化語言狀態（可從 localStorage 或預設語言載入）
  languageStore.initLanguage();

  // ✅ 替換所有 DOM 上的語言內容 這個好像應該在生命週期最後才放
  // languageStore.replaceMenuLang();
})
