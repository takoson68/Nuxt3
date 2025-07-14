// https://nuxt.com/docs/api/configuration/nuxt-
// nuxt.config.js
import { resolve } from 'path'

export default defineNuxtConfig({
  typescript: {
    strict: false,
    typeCheck: false
  },
  vite: {
    css: {
      preprocessorOptions: {
        stylus: {
          additionalData: `
            @import '../assets/stylus/_theme.styl'
            @import '../assets/stylus/_mixin.styl'
          `
          // 這裡可加入全域預處理參數，例如全域自動引入
        }
      }
    }
  },
  alias: {
    '~': resolve(__dirname, './'),
    '@': resolve(__dirname, './'),
    // '~/containers': resolve(__dirname, './containers'),
  },
  ssr: false, // ❗必須禁用 SSR
  target: 'static', // ❗已不再使用，但保留相容性
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/'
  },
  nitro: {
    compatibilityDate: '2025-07-09',
    prerender: {
      routes: ['/'],
      fallback: '404.html'
    }
  }
})
