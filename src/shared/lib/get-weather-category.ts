import { weatherCodes } from '@/shared'

export type WeatherCategory = 'sunny' | 'cloudy' | 'rain' | 'snow' | 'thunder' | 'mist' | 'windy'

export const getWeatherCategory = (code: number): WeatherCategory => {
  switch (code) {
    // Snow
    case weatherCodes.PATCHY_SNOW:
    case weatherCodes.LIGHT_SNOW:
    case weatherCodes.MODERATE_SNOW:
    case weatherCodes.HEAVY_SNOW:
    case weatherCodes.LIGHT_SNOW_SHOWERS:
    case weatherCodes.HEAVY_SNOW_SHOWERS:
      return 'snow'

    // Rain
    case weatherCodes.PATCHY_RAIN:
    case weatherCodes.LIGHT_DRIZZLE:
    case weatherCodes.LIGHT_RAIN:
    case weatherCodes.MODERATE_RAIN:
    case weatherCodes.HEAVY_RAIN:
    case weatherCodes.LIGHT_FREEZING_RAIN:
    case weatherCodes.HEAVY_FREEZING_RAIN:
    case weatherCodes.FREEZING_DRIZZLE:
    case weatherCodes.HEAVY_FREEZING_DRIZZLE:
    case weatherCodes.LIGHT_RAIN_SHOWER:
    case weatherCodes.HEAVY_RAIN_SHOWER:
    case weatherCodes.TORRENTIAL_RAIN:
      return 'rain'

    // Cloudy
    case weatherCodes.PARTLY_CLOUDY:
    case weatherCodes.CLOUDY:
    case weatherCodes.OVERCAST:
      return 'cloudy'

    // Mist / Fog
    case weatherCodes.MIST:
    case weatherCodes.FOG:
    case weatherCodes.FREEZING_FOG:
      return 'mist'

    // Thunder
    case weatherCodes.THUNDERY_OUTBREAKS:
    case weatherCodes.LIGHT_RAIN_THUNDER:
    case weatherCodes.HEAVY_RAIN_THUNDER:
    case weatherCodes.LIGHT_SNOW_THUNDER:
    case weatherCodes.HEAVY_SNOW_THUNDER:
      return 'thunder'

    // Windy
    case weatherCodes.BLOWING_SNOW:
    case weatherCodes.BLIZZARD:
      return 'windy'

    // Clear
    case weatherCodes.SUNNY:
      return 'sunny'

    default:
      return 'sunny'
  }
}

