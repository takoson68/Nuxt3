import myMenu from '../data/menuData.js'
import * as mackSet from './mackSet.js'
import { faker } from '@faker-js/faker'

const { start, end } = mackSet.getThreeMonthRangeFromToday()

// listCount 每次請求重新計算，製造更真實感
function getListCount() {
  return faker.number.int({ min: 23, max: 60 })
}

export const mockRoutes = {
  '/api/login': (options) => {
    const bodyText = options.data || '{}'
    let body = {}

    try {
      body = typeof bodyText === 'string' ? JSON.parse(bodyText) : bodyText
    } catch (e) {
      return { code: 400, message: '無效的 JSON 格式' }
    }

    const { username, password } = body

    // 模擬帳號密碼檢查
    if (username === 'admin' && password === '123456') {
      return {
        code: 200,
        token: faker.string.uuid(),
        user: { id: 'u1', name: 'Mock User' },
        permissions: ['post:edit', 'user:view'],
      }
    } else {
      return {
        code: 401,
        message: '帳號或密碼錯誤',
      }
    }
  },

  '/api/users': () => ({
    code: 999,
    data: Array.from({ length: 3 }).map((_, i) => ({
      id: i + 1,
      name: faker.person.fullName(),
      email: faker.internet.email(),
    })),
  }),

  '/api/menu': () => ({
    code: 200,
    data: myMenu,
  }),

  '/api/list': () => {
    const listCount = getListCount()
    return {
      code: 200,
      data: Array.from({ length: listCount }).map((_, index) => ({
        id: faker.string.uuid(),
        title: faker.lorem.sentence(faker.number.int({ min: 6, max: 9 })),
        ip: faker.internet.ip(),
        date: faker.lorem.paragraph(),
        nb: index + 1,
        rating: faker.number.int({ min: 0, max: 5 }),
        imageUrl: `https://picsum.photos/100/100?random=${index}`,
      })),
    }
  },

  '/api/data': () => {
    const count = faker.number.int({ min: 33, max: 50 })
    return {
      code: 200,
      data: Array.from({ length: count }).map(() => ({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        age: faker.number.int({ min: 18, max: 60 }),
        star: faker.number.int({ min: 0, max: 5 }),
        email: faker.internet.email(),
        date: mackSet.generateRandomDate(start, end),
      })),
    }
  },

  // 你可以在這裡繼續擴充其他 API
}
