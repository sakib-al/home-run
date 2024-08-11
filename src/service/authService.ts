
import { getSession } from 'next-auth/react'

import { apiService } from './apiService'

import type { RegisterFormValues } from '@/types/FormTypes'

const registerUser = async (userData: Partial<RegisterFormValues>): Promise<RegisterFormValues> => {
  return apiService.post<RegisterFormValues>('register', userData)
}

const logOutUser = async () => {
  const session = (await getSession()) as { access_token: string } | null

  if (session && session.access_token) {
    return apiService.get('logout', {}, { Authorization: `Bearer ${session.access_token}` })
  } else {
    throw new Error('Unauthorized')
  }
}

export const authService = {
  registerUser,
  logOutUser
}
