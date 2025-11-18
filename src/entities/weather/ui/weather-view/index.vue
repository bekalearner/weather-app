<script setup>
  import { MapPin } from 'lucide-vue-next'
  import { WeatherIcon, getWeatherCategory } from '@/shared'

  defineProps({
    data: {
      type: Object,
    },
    location: {
      type: Object,
    },
  })
</script>

<template>
  <div
    v-if="data && location"
    class="weather-view"
    :style="{
      background: `url('/weather/card-bg/${getWeatherCategory(data.day.condition.code)}.jpg') center center no-repeat`,
      backgroundSize: 'cover',
    }"
  >
    <div class="weather-view-content">
      <div class="weather-view-header">
        <div class="text-2xl font-bold capitalize">
          {{
            new Date(data.date).toLocaleDateString('ru-RU', { weekday: 'long' })
          }}
        </div>
        <div class="text-lg">
          {{
            new Date(data.date).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })
          }}
        </div>
        <div class="flex gap-8 items-center">
          <map-pin :size="24" />
          <span class="text-lg">{{ location.name }}</span>
        </div>
      </div>
      <div class="weather-view-main">
        <weather-icon :size="64" :code="data.day.condition.code" />
        <div class="text-4xl font-extrabold">{{ Math.round(data.day.avgtemp_c) }} °C</div>
        <div class="text-xl font-semibold">{{ data.day.condition.text }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .weather-view {
    position: relative;
    min-width: 380px;
    max-width: 380px;
    min-height: 540px;
    border-radius: 1rem 0 0 1rem;
    overflow: hidden;
  }
  
  .weather-view::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    opacity: 0.75;
    z-index: 1;
  }
  
  .weather-view-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    min-height: 540px;
    padding: 24px;
    color: white;
  }
  
  .weather-view-header {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .weather-view-main {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  @media (max-width: 1024px) {
    .weather-view {
      min-width: 100%;
      max-width: 100%;
      border-radius: 1rem 1rem 0 0;
    }
  }
</style>
