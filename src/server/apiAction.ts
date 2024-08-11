'use server'

import { apiService } from '@/service/apiService'

export async function fetchUsers(token: string, searchParams: { [key: string]: string }) {
  'use server'

  try {
    const data = await apiService.fetchServerSide('users', {
      token,
      searchParams,
      cache: 'no-cache'

      // next: {
      //   tags: [`user-management/${searchParams.roleId}`]
      // }
    })

    return data
  } catch (err) {
    return err
  }
}
