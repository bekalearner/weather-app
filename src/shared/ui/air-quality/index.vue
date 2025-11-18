<script setup lang="ts">
import { computed } from 'vue'
import type { AirQuality } from '@/shared/api/weatherAPI/types'

interface Props {
  airQuality?: AirQuality
}

const props = defineProps<Props>()

const getAQILevel = (index: number) => {
  const levels = [
    { max: 1, text: 'Отличное', color: '#22c55e' },
    { max: 2, text: 'Хорошее', color: '#84cc16' },
    { max: 3, text: 'Умеренное', color: '#eab308' },
    { max: 4, text: 'Плохое', color: '#f97316' },
    { max: 5, text: 'Очень плохое', color: '#ef4444' },
    { max: 6, text: 'Опасное', color: '#991b1b' },
  ]
  
  return levels.find(l => index <= l.max) || levels[levels.length - 1]
}

const aqiInfo = computed(() => {
  if (!props.airQuality) return null
  return getAQILevel(props.airQuality['us-epa-index'])
})

const pollutants = computed(() => {
  if (!props.airQuality) return []
  
  return [
    { name: 'CO', value: props.airQuality.co, unit: 'μg/m³', label: 'Угарный газ' },
    { name: 'NO₂', value: props.airQuality.no2, unit: 'μg/m³', label: 'Диоксид азота' },
    { name: 'O₃', value: props.airQuality.o3, unit: 'μg/m³', label: 'Озон' },
    { name: 'SO₂', value: props.airQuality.so2, unit: 'μg/m³', label: 'Диоксид серы' },
    { name: 'PM2.5', value: props.airQuality.pm2_5, unit: 'μg/m³', label: 'Мелкие частицы' },
    { name: 'PM10', value: props.airQuality.pm10, unit: 'μg/m³', label: 'Крупные частицы' },
  ]
})
</script>

<template>
  <div v-if="airQuality" class="air-quality">
    <h3 class="text-xl font-bold mb-16 text-white">Качество воздуха</h3>
    
    <div v-if="aqiInfo" class="aqi-main" :style="{ borderColor: aqiInfo.color }">
      <div class="aqi-value" :style="{ color: aqiInfo.color }">
        {{ airQuality['us-epa-index'] }}
      </div>
      <div class="aqi-text">
        <div class="aqi-level" :style="{ color: aqiInfo.color }">{{ aqiInfo.text }}</div>
        <div class="aqi-label">US EPA Index</div>
      </div>
    </div>

    <div class="pollutants-grid">
      <div 
        v-for="pollutant in pollutants" 
        :key="pollutant.name" 
        class="pollutant-item"
      >
        <div class="pollutant-name">{{ pollutant.name }}</div>
        <div class="pollutant-value">{{ pollutant.value.toFixed(1) }}</div>
        <div class="pollutant-unit">{{ pollutant.unit }}</div>
        <div class="pollutant-label">{{ pollutant.label }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.air-quality {
  width: 100%;
  padding: 24px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.15) 100%);
  border-radius: 16px;
  border: 1px solid rgba(16, 185, 129, 0.25);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.aqi-main {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.15) 100%);
  border-radius: 12px;
  border: 2px solid;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.aqi-value {
  font-size: 48px;
  font-weight: bold;
  line-height: 1;
}

.aqi-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.aqi-level {
  font-size: 24px;
  font-weight: 600;
}

.aqi-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.pollutants-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
}

.pollutant-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.2s ease;
}

.pollutant-item:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%);
  border-color: rgba(16, 185, 129, 0.3);
  transform: translateY(-2px);
}

.pollutant-name {
  font-size: 14px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
}

.pollutant-value {
  font-size: 20px;
  font-weight: bold;
  margin: 4px 0;
}

.pollutant-unit {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
}

.pollutant-label {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-top: 4px;
}
</style>

