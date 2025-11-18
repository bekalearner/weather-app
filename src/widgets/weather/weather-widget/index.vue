<script setup lang="ts">
import { computed, ref } from 'vue'
import { 
  Card, 
  Descriptions, 
  TemperatureChart, 
  HourlyForecast, 
  AirQualityComponent, 
  AstroInfo,
  LocationSearch 
} from '@/shared'
import { useWeatherStore, WeatherCard, WeatherView } from '@/entities/weather'
import { CityTabs } from '@/features/weather'
import type { SearchLocation } from '@/shared'

const store = useWeatherStore()
const showAddCitySearch = ref(false)

const description = computed(() => {
  if (store.current?.day) {
    return [
      { label: 'Влажность', value: store.current.day.avghumidity + ' %' },
      { label: 'Осадки', value: store.current.day.totalprecip_mm + ' мм' },
      { label: 'Ветер', value: store.current.day.maxwind_kph + ' км/ч' },
      { label: 'Видимость', value: store.current.day.avgvis_km + ' км' },
      { label: 'УФ индекс', value: store.current.day.uv.toString() },
    ]
  }
  return []
})

const handleSearch = (query: string) => {
  store.searchLocation(query)
}

const handleSelectLocation = async (location: SearchLocation) => {
  if (showAddCitySearch.value) {
    // Adding new city tab
    await store.addCityTab(location)
    showAddCitySearch.value = false
  } else {
    // Updating current city
    await store.getWeather({
      q: location.name,
      lang: 'ru',
      days: 7,
      aqi: 'yes',
    })
  }
  store.clearSearchResults()
}

const handleClear = () => {
  store.clearSearchResults()
}

const handleSwitchTab = async (tabId: string) => {
  store.setActiveTab(tabId)
  
  // Load weather if not loaded yet
  const cityData = store.forecastday
  if (!cityData || cityData.length === 0) {
    const tab = store.cityTabs.find(t => t.id === tabId)
    if (tab) {
      await store.getWeather({
        q: tab.query,
        lang: 'ru',
        days: 7,
        aqi: 'yes',
      })
    }
  }
}

const handleRemoveTab = (tabId: string) => {
  store.removeCityTab(tabId)
}

const handleAddCity = () => {
  showAddCitySearch.value = true
}

const currentHourlyForecast = computed(() => {
  if (store.current?.hour) {
    return store.current.hour
  }
  return []
})
</script>

<template>
  <div class="weather-widget">
    <!-- City Tabs -->
    <city-tabs
      :tabs="store.cityTabs"
      :active-tab-id="store.activeTabId"
      @switch="handleSwitchTab"
      @remove="handleRemoveTab"
      @add="handleAddCity"
    />

    <!-- Location Search (for adding cities or changing current) -->
    <div v-if="showAddCitySearch" class="search-section mb-24">
      <div class="search-header mb-16">
        <h3 class="text-lg font-bold text-white">Добавить новый город</h3>
        <button class="close-search-btn" @click="showAddCitySearch = false">
          Отмена
        </button>
      </div>
      <location-search
        :search-results="store.searchResults"
        :is-searching="store.isSearching"
        :is-loading="store.isLoading"
        @search="handleSearch"
        @select="handleSelectLocation"
        @clear="handleClear"
      />
    </div>

    <!-- Main Weather Display -->
    <div class="main-weather">
      <weather-view 
        v-if="store.current" 
        :location="store.location" 
        :data="store.current" 
      />
      <card class="weather-details">
        <descriptions :data="description" />
        <div class="forecast-cards">
          <weather-card
            v-for="(day, index) in store.forecastday"
            :key="index"
            :id="day.id"
            :class="{ 'card-active': store.currentId === day.id }"
            :code="day.day.condition.code"
            :temperature="day.day.maxtemp_c"
            :date="day.date"
            @click="(id: number) => store.setCurrentId(id)"
          />
        </div>
      </card>
    </div>

    <!-- Hourly Forecast -->
    <div v-if="currentHourlyForecast.length > 0" class="mb-24">
      <hourly-forecast :hours="currentHourlyForecast" />
    </div>

    <!-- Temperature Chart -->
    <div v-if="currentHourlyForecast.length > 0" class="mb-24">
      <temperature-chart :hourly-data="currentHourlyForecast" />
    </div>

    <!-- Two Column Grid for Air Quality and Astro Info -->
    <div class="info-grid">
      <!-- Air Quality -->
      <air-quality-component 
        v-if="store.current?.day?.air_quality" 
        :air-quality="store.current.day.air_quality" 
      />

      <!-- Astro Info -->
      <astro-info 
        v-if="store.current?.astro" 
        :astro="store.current.astro" 
      />
    </div>
  </div>
</template>

<style scoped>
.weather-widget {
  width: 100%;
  padding: 20px 0;
}

.search-section {
  max-width: 600px;
  margin: 0 auto 32px;
  padding: 20px;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%);
  border-radius: 16px;
  border: 1px solid rgba(14, 165, 233, 0.25);
}

.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-search-btn {
  padding: 8px 16px;
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  color: #ef4444;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-search-btn:hover {
  background: rgba(239, 68, 68, 0.3);
  border-color: rgba(239, 68, 68, 0.5);
}

.main-weather {
  display: flex;
  align-items: stretch;
  gap: 0;
  margin-bottom: 32px;
}

.weather-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 540px;
  border-radius: 0 1rem 1rem 0;
}

.forecast-cards {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 20px 0;
  margin-top: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1);
}

.forecast-cards::-webkit-scrollbar {
  height: 6px;
}

.forecast-cards::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.forecast-cards::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
}

@media (max-width: 1024px) {
  .main-weather {
    flex-direction: column;
  }
  
  .weather-details {
    border-radius: 0 0 1rem 1rem;
    min-height: auto;
  }
}

@media (max-width: 768px) {
  .search-section {
    margin-bottom: 24px;
  }

  .main-weather {
    margin-bottom: 24px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .forecast-cards {
    gap: 8px;
    padding: 16px 0;
  }
}
</style>
