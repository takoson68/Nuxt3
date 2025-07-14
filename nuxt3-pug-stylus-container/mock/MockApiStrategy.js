import { mockRoutes } from '@/mock/routes/index.js'

export class MockApiStrategy {
  request(url, options = {}) {
    const headers = options.headers || {}
    let parsedData = {}

    if (!headers.Authorization && url !== '/api/login') {
      console.log('[MockApiStrategy] 尚未登入（缺少 Authorization）')
    }

    try {
      if (typeof options.body === 'string') {
        parsedData = JSON.parse(options.body)
      }
    } catch (err) {
      console.warn('MockApiStrategy body parse error:', err)
    }

    return new Promise((resolve) => {
      const delay = Math.floor(Math.random() * 300) + 100 // 模擬延遲100~400ms
      setTimeout(() => {
        const route = Object.entries(mockRoutes).find(([key]) => 
          url === key || url.startsWith(key + '?') || url.startsWith(key + '/')
        )

        if (route) {
          const [, handler] = route
          const result = handler({
            headers,
            data: parsedData,
            method: options.method,
          })
          resolve(result)
        } else {
          resolve({ code: 404, message: `Mock 路由未定義: ${url}` })
        }
      }, delay)
    })
  }
}
