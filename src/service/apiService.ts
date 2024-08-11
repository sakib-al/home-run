import axios from 'axios'
import type { AxiosResponse } from 'axios'

import type { FetchOptions } from '@/types/ApiServiceType'

const API_BASE_URL = 'http://note-keeper-backend.test/api'
const BACKEND_URL = `http://127.0.0.1:8001/api/`
const MOCK_URL = `localhost:3000/api`

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



// fetch data using fetch api
async function fetchServerSide(endpoint: string, reqOptions: FetchOptions) {
  const { token, searchParams, method, headers, isMockData, ...restOptions } = reqOptions
  const url = new URL((isMockData ? MOCK_URL : BACKEND_URL) + endpoint)
  const tempHeaders = headers ? headers : {}

  if (searchParams)
    Object.entries(searchParams).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })

  const options = {
    method: method ? method : 'GET',
    headers: {
      accept: 'application/json, application/xml, text/plain, text/html, */*',
      Authorization: `Bearer ${token}`,
      ...tempHeaders
    },
    ...restOptions
  }

  const response = await fetch(url.toString(), { ...options })

  const data = await response.json()

  return data
}

export const apiService = {
  get,
  post,
  fetchServerSide
}
