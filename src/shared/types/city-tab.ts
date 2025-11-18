export interface CityTab {
  id: string
  name: string
  country: string
  query: string // для API запроса
  isActive: boolean
}

export interface CityTabData {
  tab: CityTab
  weatherData: any // будет содержать данные погоды
  lastUpdated: number
}

