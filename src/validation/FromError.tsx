import { FormHelperText } from '@mui/material'

import type { FormError } from '@/types'

const FormErrors = ({ error, sx = {} }: FormError) => {
  return (
    <>
      {error ? (
        <FormHelperText sx={{ color: 'error.main', fontWeight: 600, ...sx }}>{error?.message}</FormHelperText>
      ) : null}
    </>
  )
}

export default FormErrors
