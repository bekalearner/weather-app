import {
  Cloudy,
  CloudRain,
  CloudSnow,
  CloudDrizzle,
  CloudLightning,
  Sun,
  CloudFog,
  Wind,
  type LucideIcon,
} from 'lucide-vue-next'

export const getWeatherIcon = (code: number): LucideIcon => {
  // Cloudy weather
  if ([1003, 1006, 1009].includes(code)) {
    return Cloudy
  }

  // Rain
  if (
    [
      1063, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198,
      1201, 1240, 1243, 1246,
    ].includes(code)
  ) {
    return CloudRain
  }

  // Snow
  if (
    [
      1066, 1069, 1072, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222,
      1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264,
    ].includes(code)
  ) {
    return CloudSnow
  }

  // Drizzle
  if ([1150, 1153, 1168, 1171].includes(code)) {
    return CloudDrizzle
  }

  // Thunder
  if ([1087, 1273, 1276, 1279, 1282].includes(code)) {
    return CloudLightning
  }

  // Fog / Mist
  if ([1030, 1135, 1147].includes(code)) {
    return CloudFog
  }

  // Windy / Blizzard
  if ([1114, 1117].includes(code)) {
    return Wind
  }

  // Default sunny
  return Sun
}

