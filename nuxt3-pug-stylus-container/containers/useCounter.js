// containers/useCounter.js
import { ref } from 'vue'

let count = ref(0) // ✅ 單例設計，只會初始化一次

export function useCounter() {
  const increment = () => count.value++
  const decrement = () => count.value--
  const getCount = () => count.value

  return {
    count,
    increment,
    decrement,
    getCount
  }
}
