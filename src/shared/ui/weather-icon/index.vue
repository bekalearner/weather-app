<script setup>
  import { computed } from 'vue'
  import { weatherCodes } from '@/shared'
  import { getWeatherIcon } from './utils/get-weather-icon.js'
  import {
    Sun,
    MoonStar,
    Cloud,
    CloudSun,
    CloudMoon,
    Cloudy,
    CloudFog,
    CloudDrizzle,
    CloudSnow,
    CloudHail,
    CloudLightning,
    CloudRain,
    CloudRainWind,
    CloudSunRain,
    CloudMoonRain,
  } from 'lucide-vue-next'

  const iconComponents = {
    sun: Sun,
    'moon-star': MoonStar,
    cloud: Cloud,
    'cloud-sun': CloudSun,
    'cloud-moon': CloudMoon,
    cloudy: Cloudy,
    'cloud-fog': CloudFog,
    'cloud-drizzle': CloudDrizzle,
    'cloud-snow': CloudSnow,
    'cloud-hail': CloudHail,
    'cloud-lightning': CloudLightning,
    'cloud-rain': CloudRain,
    'cloud-rain-wind': CloudRainWind,
    'cloud-sun-rain': CloudSunRain,
    'cloud-moon-rain': CloudMoonRain,
  }

  const iconColors = {
    sun: '#fbbf24',
    'moon-star': '#a78bfa',
    cloud: '#9ca3af',
    'cloud-sun': '#fbbf24',
    'cloud-moon': '#a78bfa',
    cloudy: '#6b7280',
    'cloud-fog': '#9ca3af',
    'cloud-drizzle': '#60a5fa',
    'cloud-snow': '#e0f2fe',
    'cloud-hail': '#bae6fd',
    'cloud-lightning': '#fde047',
    'cloud-rain': '#3b82f6',
    'cloud-rain-wind': '#2563eb',
    'cloud-sun-rain': '#60a5fa',
    'cloud-moon-rain': '#818cf8',
  }

  const props = defineProps({
    code: {
      type: Number,
      default: 1000,
    },
    size: {
      type: Number,
      default: 24,
    },
  })

  const iconName = computed(() => {
    const code = typeof props.code === 'string' ? Number(props.code) : props.code
    return getWeatherIcon(code)
  })

  const icon = computed(() => iconComponents[iconName.value])
  const iconColor = computed(() => iconColors[iconName.value] || '#ffffff')
</script>

<template>
  <div class="weather-icon">
    <component
      :is="icon"
      :size="size"
      :stroke-width="2.5"
      :color="iconColor"
      class="icon-animated"
    />
  </div>
</template>

<style scoped>
.weather-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.icon-animated {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  transition: all 0.3s ease;
}

.icon-animated:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}
</style>
