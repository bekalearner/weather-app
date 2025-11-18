<script setup lang="ts">
import { Sun, Moon, Sunrise, Sunset, MoonStar, Eye, EyeOff } from 'lucide-vue-next'
import type { Astro } from '@/shared/api/weatherAPI/types'

interface Props {
  astro: Astro
}

defineProps<Props>()

const getMoonPhaseRu = (phase: string): string => {
  const phases: Record<string, string> = {
    'New Moon': 'Новолуние',
    'Waxing Crescent': 'Молодая луна',
    'First Quarter': 'Первая четверть',
    'Waxing Gibbous': 'Растущая луна',
    'Full Moon': 'Полнолуние',
    'Waning Gibbous': 'Убывающая луна',
    'Last Quarter': 'Последняя четверть',
    'Waning Crescent': 'Старая луна',
  }
  return phases[phase] || phase
}
</script>

<template>
  <div class="astro-info">
    <h3 class="text-xl font-bold mb-16 text-white">Астрономическая информация</h3>
    
    <div class="astro-grid">
      <div class="astro-section sun-section">
        <div class="section-header">
          <Sun :size="40" :stroke-width="2" class="section-icon" />
          <div class="section-title">Солнце</div>
        </div>
        <div class="astro-items">
          <div class="astro-item">
            <div class="item-icon">
              <Sunrise :size="20" :stroke-width="2" />
            </div>
            <div class="item-content">
              <span class="label">Восход</span>
              <span class="value">{{ astro.sunrise }}</span>
            </div>
          </div>
          <div class="astro-item">
            <div class="item-icon">
              <Sunset :size="20" :stroke-width="2" />
            </div>
            <div class="item-content">
              <span class="label">Закат</span>
              <span class="value">{{ astro.sunset }}</span>
            </div>
          </div>
          <div class="astro-item">
            <div class="item-icon">
              <component :is="astro.is_sun_up ? Eye : EyeOff" :size="20" :stroke-width="2" />
            </div>
            <div class="item-content">
              <span class="label">Видимость</span>
              <span class="value">{{ astro.is_sun_up ? 'Видно' : 'Не видно' }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="astro-section moon-section">
        <div class="section-header">
          <MoonStar :size="40" :stroke-width="2" class="section-icon" />
          <div class="section-title">Луна</div>
        </div>
        <div class="astro-items">
          <div class="astro-item">
            <div class="item-icon">
              <Sunrise :size="20" :stroke-width="2" />
            </div>
            <div class="item-content">
              <span class="label">Восход</span>
              <span class="value">{{ astro.moonrise }}</span>
            </div>
          </div>
          <div class="astro-item">
            <div class="item-icon">
              <Sunset :size="20" :stroke-width="2" />
            </div>
            <div class="item-content">
              <span class="label">Закат</span>
              <span class="value">{{ astro.moonset }}</span>
            </div>
          </div>
          <div class="astro-item">
            <div class="item-icon">
              <component :is="astro.is_moon_up ? Eye : EyeOff" :size="20" :stroke-width="2" />
            </div>
            <div class="item-content">
              <span class="label">Видимость</span>
              <span class="value">{{ astro.is_moon_up ? 'Видна' : 'Не видна' }}</span>
            </div>
          </div>
          <div class="astro-item">
            <div class="item-icon">
              <Moon :size="20" :stroke-width="2" />
            </div>
            <div class="item-content">
              <span class="label">Фаза</span>
              <span class="value">{{ getMoonPhaseRu(astro.moon_phase) }}</span>
            </div>
          </div>
          <div class="astro-item">
            <div class="item-icon">
              <Sun :size="20" :stroke-width="2" />
            </div>
            <div class="item-content">
              <span class="label">Освещенность</span>
              <span class="value">{{ astro.moon_illumination }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.astro-info {
  width: 100%;
  padding: 24px;
  background: linear-gradient(135deg, rgba(251, 146, 60, 0.15) 0%, rgba(249, 115, 22, 0.15) 100%);
  border-radius: 16px;
  border: 1px solid rgba(251, 146, 60, 0.25);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.astro-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.astro-section {
  padding: 20px;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.15) 100%);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: white;
}

.sun-section .section-icon {
  color: #fbbf24;
}

.moon-section .section-icon {
  color: #a78bfa;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
}

.astro-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.astro-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.03) 100%);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.2s ease;
}

.astro-item:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%);
  border-color: rgba(251, 146, 60, 0.3);
  transform: translateX(4px);
}

.item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 100%);
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  flex-shrink: 0;
}

.item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}

.label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
}

.value {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
}
</style>

