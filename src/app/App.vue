<script setup lang="ts">
import { Container } from '@/shared'
import { WeatherContentWrapper, useWeatherStore } from '@/entities/weather'
import { WeatherWidget } from '@/widgets/weather'
import { onBeforeMount } from 'vue'

const store = useWeatherStore()

onBeforeMount(async () => {
  // Load weather for active tab only
  if (store.activeTab) {
    await store.getWeather({
      q: store.activeTab.query,
      lang: 'ru',
      days: 7,
      aqi: 'yes',
    })
  }
  store.setCurrentId(0)
})
</script>

<template>
  <weather-content-wrapper
    v-if="store.current?.day"
    :code="store.current.day.condition.code"
  >
    <container>
      <weather-widget />
    </container>
  </weather-content-wrapper>
  <div v-else class="loading-screen">
    <div class="loader"></div>
    <p>Загрузка погоды...</p>
  </div>
</template>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 18px;
  gap: 20px;
  z-index: 9999;
}

.loader {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-top: 5px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
