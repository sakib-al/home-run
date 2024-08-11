export type RegisterResponse = {
  message: string
  access_token: string
  user: {
    name: string
    email: string
  }
}

export type FetchOptions = {
  token?: string
  body?: string
  searchParams?: { [key: string]: string }
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: {
    'Content-Type': 'application/json'
  }
  cache?: 'no-cache'
  next?: { revalidate: number; tags: string[] }
  isMockData?: boolean
}
