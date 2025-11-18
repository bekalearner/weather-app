<script setup lang="ts">
import { WeatherIcon } from '@/shared'
import { Wind, Droplets, CloudRain } from 'lucide-vue-next'
import type { HourWeather } from '@/shared/api/weatherAPI/types'

interface Props {
  hours: HourWeather[]
}

defineProps<Props>()

function formatTime(timeString: string): string {
  const date = new Date(timeString)
  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
}
</script>

<template>
  <div class="hourly-forecast">
    <h3 class="text-xl font-bold mb-16 text-white">Почасовой прогноз</h3>
    <div class="hourly-scroll">
      <div 
        v-for="hour in hours" 
        :key="hour.time_epoch" 
        class="hour-item"
      >
        <div class="time">{{ formatTime(hour.time) }}</div>
        <weather-icon :code="hour.condition.code" :size="32" />
        <div class="temp">{{ Math.round(hour.temp_c) }}°</div>
        <div class="details">
          <div class="detail-item">
            <Wind :size="14" :stroke-width="2" class="detail-icon" />
            <span class="value">{{ Math.round(hour.wind_kph) }} км/ч</span>
          </div>
          <div class="detail-item">
            <Droplets :size="14" :stroke-width="2" class="detail-icon" />
            <span class="value">{{ hour.humidity }}%</span>
          </div>
          <div v-if="hour.chance_of_rain > 0" class="detail-item">
            <CloudRain :size="14" :stroke-width="2" class="detail-icon" />
            <span class="value">{{ hour.chance_of_rain }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hourly-forecast {
  width: 100%;
  padding: 24px;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(34, 211, 238, 0.15) 100%);
  border-radius: 16px;
  border: 1px solid rgba(14, 165, 233, 0.25);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.hourly-scroll {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 10px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1);
}

.hourly-scroll::-webkit-scrollbar {
  height: 8px;
}

.hourly-scroll::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.hourly-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

.hourly-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

.hour-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 100px;
  padding: 14px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: white;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.hour-item:hover {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.3) 0%, rgba(34, 211, 238, 0.3) 100%);
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(14, 165, 233, 0.4);
  border-color: rgba(14, 165, 233, 0.4);
}

.time {
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
}

.temp {
  font-size: 18px;
  font-weight: bold;
}

.details {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
}

.detail-icon {
  color: rgba(255, 255, 255, 0.7);
  flex-shrink: 0;
}

.value {
  font-weight: 600;
  font-size: 12px;
}
</style>

