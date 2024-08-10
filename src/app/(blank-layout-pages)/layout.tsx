// Third party components

import { ToastContainer } from 'react-toastify'

// Type Imports
import type { ChildrenType } from '@core/types'

// Component Imports
import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'

// Util Imports
import { getSystemMode } from '@core/utils/serverHelpers'

import 'react-toastify/dist/ReactToastify.css'
import GuestGuard from '@/hocs/GuestGuard'

type Props = ChildrenType

const Layout = ({ children }: Props) => {
  // Vars
  const direction = 'ltr'
  const systemMode = getSystemMode()

  return (
    <Providers direction={direction}>
      <GuestGuard>
        <ToastContainer />
        <BlankLayout systemMode={systemMode}>{children}</BlankLayout>
      </GuestGuard>
    </Providers>
  )
}

export default Layout
