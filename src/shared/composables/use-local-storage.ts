import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  const data = ref<T>(defaultValue) as Ref<T>

  // Загрузка данных из localStorage
  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem(key)
      if (stored) {
        data.value = JSON.parse(stored)
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error)
      data.value = defaultValue
    }
  }

  // Сохранение данных в localStorage
  const saveToStorage = (value: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }

  // Загружаем данные при инициализации
  loadFromStorage()

  // Автоматически сохраняем при изменении
  watch(
    data,
    (newValue) => {
      saveToStorage(newValue)
    },
    { deep: true }
  )

  return data
}

