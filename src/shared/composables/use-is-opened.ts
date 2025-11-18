import { ref } from 'vue'

export const useIsOpened = () => {
  const isOpened = ref<boolean>(false)

  function open() {
    isOpened.value = true
  }

  function close() {
    isOpened.value = false
  }

  function toggle() {
    isOpened.value = !isOpened.value
  }

  return {
    isOpened,
    open,
    close,
    toggle,
  }
}

