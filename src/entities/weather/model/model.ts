import { computed, ref, watch } from 'vue'
import { weatherService } from '@/entities/weather/api'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@/shared/composables'
import type {
  Location,
  ForecastDayWithId,
  WeatherRequestParams,
  SearchLocation,
  CurrentWeather,
  WeatherResponse,
} from '@/shared/api/weatherAPI/types'

export interface CityTab {
  id: string
  name: string
  country: string
  query: string
}

interface CityWeatherData {
  location: Location
  currentWeather: CurrentWeather
  forecastday: ForecastDayWithId[]
  lastUpdated: number
}

export const useWeatherStore = defineStore('WEATHER', () => {
  const isLoading = ref<boolean>(false)
  const isSearching = ref<boolean>(false)

  const currentId = ref<number>(0)
  const searchResults = ref<SearchLocation[]>([])

  // Tabs management
  const cityTabs = useLocalStorage<CityTab[]>('weather-city-tabs', [
    { id: '1', name: 'Бишкек', country: 'Kyrgyzstan', query: 'Бишкек' },
    { id: '2', name: 'Москва', country: 'Russia', query: 'Москва' },
    { id: '3', name: 'Лондон', country: 'United Kingdom', query: 'London' },
  ])
  
  const activeTabId = useLocalStorage<string>('weather-active-tab', '1')
  
  // Weather data for each city
  const citiesData = ref<Map<string, CityWeatherData>>(new Map())

  // Active city computed
  const activeTab = computed(() => {
    return cityTabs.value.find(tab => tab.id === activeTabId.value) || cityTabs.value[0]
  })

  const activeCity = computed(() => {
    if (!activeTab.value) return null
    return citiesData.value.get(activeTab.value.id) || null
  })

  const forecastday = computed(() => activeCity.value?.forecastday || [])
  const location = computed(() => activeCity.value?.location || null)
  const currentWeather = computed(() => activeCity.value?.currentWeather || null)

  const current = computed(() => {
    if (forecastday.value.length) {
      return forecastday.value[currentId.value]
    }
    return null
  })

  // Load weather for specific tab
  const getWeather = async (params: WeatherRequestParams, tabId?: string) => {
    const targetTabId = tabId || activeTabId.value
    isLoading.value = true
    
    try {
      const response = await weatherService.getWeather({ 
        ...params, 
        days: params.days || 7,
        aqi: 'yes',
      })
      
      const weatherData: CityWeatherData = {
        location: response.data.location,
        currentWeather: response.data.current,
        forecastday: response.data.forecast.forecastday.map(
          (day, index) => ({ id: index, ...day })
        ),
        lastUpdated: Date.now(),
      }
      
      citiesData.value.set(targetTabId, weatherData)
      
      // Update tab info
      const tab = cityTabs.value.find(t => t.id === targetTabId)
      if (tab) {
        tab.name = response.data.location.name
        tab.country = response.data.location.country
      }
    } catch (error) {
      console.error('Error fetching weather:', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  // Add new city tab
  const addCityTab = async (searchLocation: SearchLocation) => {
    const newId = Date.now().toString()
    const newTab: CityTab = {
      id: newId,
      name: searchLocation.name,
      country: searchLocation.country,
      query: searchLocation.name,
    }
    
    cityTabs.value.push(newTab)
    activeTabId.value = newId
    
    await getWeather({
      q: searchLocation.name,
      lang: 'ru',
      days: 7,
      aqi: 'yes',
    }, newId)
  }

  // Remove city tab
  const removeCityTab = (tabId: string) => {
    if (cityTabs.value.length <= 1) {
      return // Don't remove last tab
    }
    
    const index = cityTabs.value.findIndex(tab => tab.id === tabId)
    if (index === -1) return
    
    // Switch to another tab if removing active
    if (activeTabId.value === tabId) {
      const newIndex = index > 0 ? index - 1 : 1
      const newTab = cityTabs.value[newIndex]
      if (newTab) {
        activeTabId.value = newTab.id
      }
    }
    
    cityTabs.value.splice(index, 1)
    citiesData.value.delete(tabId)
  }

  // Switch active tab
  const setActiveTab = (tabId: string) => {
    activeTabId.value = tabId
    currentId.value = 0 // Reset to first day
  }

  // Load all cities weather
  const loadAllCitiesWeather = async () => {
    for (const tab of cityTabs.value) {
      await getWeather({
        q: tab.query,
        lang: 'ru',
        days: 7,
        aqi: 'yes',
      }, tab.id)
    }
  }

  const searchLocation = async (query: string) => {
    if (!query || query.length < 2) {
      searchResults.value = []
      return
    }

    isSearching.value = true
    try {
      const response = await weatherService.searchLocation({ q: query })
      searchResults.value = response.data
    } catch (error) {
      console.error('Error searching location:', error)
      searchResults.value = []
    } finally {
      isSearching.value = false
    }
  }

  const clearSearchResults = () => {
    searchResults.value = []
  }

  const setCurrentId = (id: number) => {
    currentId.value = id
  }

  return {
    // State
    isLoading,
    isSearching,
    current,
    currentId,
    forecastday,
    location,
    currentWeather,
    searchResults,
    
    // Tabs
    cityTabs,
    activeTabId,
    activeTab,
    
    // Actions
    getWeather,
    searchLocation,
    clearSearchResults,
    setCurrentId,
    
    // Tab actions
    addCityTab,
    removeCityTab,
    setActiveTab,
    loadAllCitiesWeather,
  }
})

