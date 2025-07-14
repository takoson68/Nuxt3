import { faker } from '@faker-js/faker'

// 自定義生成指定範圍內隨機日期的函式，保留原有格式（YYYY-MM-DD）
export const generateRandomDate = (start, end) => {
  const startTime = start.getTime()
  const endTime = end.getTime()
  const randomTime = faker.number.int({ min: startTime, max: endTime })
  const date = new Date(randomTime)
  return date.toISOString().split('T')[0]
}

// 計算今天的前後三個月的日期範圍
export const getThreeMonthRangeFromToday = () => {
  const today = new Date()
  const start = new Date(today)
  start.setMonth(start.getMonth() - 3)
  const end = new Date(today)
  end.setMonth(end.getMonth() + 3)
  return { start, end }
}

// ----------Users------------------------------------------
// 隨機生成數據數量（33到50之間）
export const generateUsers = () => {
  const userCount = faker.number.int({ min: 33, max: 50 })
  const { start, end } = getThreeMonthRangeFromToday()

  return Array.from({ length: userCount }).map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    age: faker.number.int({ min: 18, max: 60 }),
    email: faker.internet.email(),
    date: generateRandomDate(start, end), // 當日前後三個月的隨機日期
  }))
}

// --------------list------------------------------------------
export const generateList = () => {
  const listCount = faker.number.int({ min: 23, max: 60 })

  return Array.from({ length: listCount }).map((_, index) => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(faker.number.int({ min: 6, max: 9 })),
    ip: faker.internet.ip(),
    date: faker.lorem.paragraph(), // 用段落模擬日期說明欄
    nb: index + 1,
    rating: faker.number.int({ min: 0, max: 5 }),
    imageUrl: `https://picsum.photos/100/100?random=${index}`,
  }))
}
