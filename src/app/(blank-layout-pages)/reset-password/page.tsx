// Next Imports
import type { Metadata } from 'next'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'
import ResetPassword from '@/views/Auth/ResetPassword'

export const metadata: Metadata = {
  title: `Reset Password | ${process.env.APP_NAME}`,
  description: 'Login to your account'
}

const ResetPasswordPage = () => {
  const mode = getServerMode()

  return <ResetPassword mode={mode} />
}


export default ResetPasswordPage
