import { fetch } from '@/shared'
import type { 
  WeatherResponse, 
  WeatherRequestParams, 
  SearchLocation, 
  SearchRequestParams 
} from '@/shared/api/weatherAPI/types'
import type { AxiosResponse } from 'axios'

const forecastPath = '/forecast.json'
const searchPath = '/search.json'

class WeatherService {
  async getWeather(
    params: WeatherRequestParams
  ): Promise<AxiosResponse<WeatherResponse>> {
    return fetch<WeatherResponse>(forecastPath, 'get', {
      ...params,
      aqi: 'yes', // Always get air quality data
    })
  }

  async searchLocation(
    params: SearchRequestParams
  ): Promise<AxiosResponse<SearchLocation[]>> {
    return fetch<SearchLocation[]>(searchPath, 'get', params)
  }
}

export const weatherService = new WeatherService()

