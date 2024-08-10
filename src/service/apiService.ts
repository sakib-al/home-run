import axios from 'axios'
import type { AxiosResponse } from 'axios'

const API_BASE_URL = 'http://note-keeper-backend.test/api'

const get = async <T>(endpoint: string, params?: object, headers?: Record<string, string>): Promise<T> => {
  const response: AxiosResponse<T> = await axios.get(`${API_BASE_URL}/${endpoint}`, {
    params,
    headers: {
      ...headers,
      Authorization: `Bearer ${headers?.Authorization}`
    }
  })

  return response.data
}

const post = async <T>(endpoint: string, data: object): Promise<T> => {
  const response: AxiosResponse<T> = await axios.post(`${API_BASE_URL}/${endpoint}`, data)

  return response.data
}

export const apiService = {
  get,
  post
}
