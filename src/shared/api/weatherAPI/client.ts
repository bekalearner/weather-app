import { weatherAPIInstance } from '@/shared/api/weatherAPI/base'
import type { AxiosResponse } from 'axios'

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch'

interface FetchOptions {
  [key: string]: any
}

export const fetch = <T = any>(
  path: string,
  method: HttpMethod,
  body?: FetchOptions
): Promise<AxiosResponse<T>> => {
  return weatherAPIInstance({
    method,
    url: path,
    [method === 'get' ? 'params' : 'data']: {
      key: import.meta.env.VITE_WEATHER_APP_API_KEY,
      ...body,
    },
  })
}
