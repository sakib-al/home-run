// Next Imports
import type { Metadata } from 'next'



// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'
import Register from '@/views/Auth/Register'


export const metadata: Metadata = {
  title: `Register | ${process.env.APP_NAME}`,
  description: 'Register your account'
}

const RegisterPage = () => {
  const mode = getServerMode()

  return <Register mode={mode} />
}


export default RegisterPage
