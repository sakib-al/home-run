// Next Imports
import type { Metadata } from 'next'

// Component Imports
import Login from '@/views/Auth/Login'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'


export const metadata: Metadata = {
  title: `Login | ${process.env.APP_NAME}`,
  description: 'Login to your account'
}

const LoginPage = () => {
  // Vars
  const mode = getServerMode()

  return <Login mode={mode} />
}

export default LoginPage
