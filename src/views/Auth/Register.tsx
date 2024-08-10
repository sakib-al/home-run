'use client'

// React Imports
import { useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import { LoadingButton } from '@mui/lab'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'

// Third party imports

import { toast } from 'react-toastify'

// Form Validation Import
import { FormControl } from '@mui/material'

// Type Imports
import type { Mode } from '@core/types'
import type { RegisterFormValues } from '@/types/FormTypes'

// Component Imports
import Logo from '@components/layout/shared/Logo'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'

import RegisterValidation from '@/validation/RegisterValidation'

import FormErrors from '@/validation/FromError'
import { authService } from '@/service/authService'

const Register = ({ mode }: { mode: Mode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [isConfirmPasswordShown, setConfirmPasswordShown] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const router = useRouter()

  // Vars
  const darkImg = '/images/pages/auth-v1-mask-2-dark.png'
  const lightImg = '/images/pages/auth-v1-mask-2-light.png'

  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<RegisterFormValues>({
    defaultValues: {
      name: null,
      email: null,
      password: null,
      confirm_password: null,
      terms: false
    },
    mode: 'onBlur',
    resolver: yupResolver<RegisterFormValues>(yup.object().shape(RegisterValidation))
  })

  const RegisterUser = async (data: RegisterFormValues) => {
    try {
      setLoading(true)
      const res: any = await authService.registerUser(data)

      toast.success(res?.message)
      router.push('/login')
    } catch (error: any) {
      setLoading(false)
      const { response } = error

      if (response.status === 422) {
        Object.entries(response.data).forEach(([key, value]: any) => {
          setError(key as keyof RegisterFormValues, {
            type: 'manual',
            message: value[0]
          })
        })
      } else if (response.status === 500) {
        toast.error(response.data.message)
      }
    }
  }

  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] is-full relative p-6'>
      <Card className='flex flex-col sm:is-[460px]'>
        <CardContent className='p-6 sm:!p-12'>
          <Link href={'/'} className='flex justify-center items-start mbe-6'>
            <Logo />
          </Link>
          <Typography variant='h4'>Adventure starts here 🚀</Typography>
          <div className='flex flex-col gap-5'>
            <Typography className='mbs-1'>Make your app management easy and fun!</Typography>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(RegisterUser)} className='flex flex-col gap-5'>
              <FormControl>
                <TextField autoFocus fullWidth label='Full Name' {...register('name')} error={Boolean(errors?.name)} />
                <FormErrors error={errors?.name} sx={{ marginLeft: '0px' }} />
              </FormControl>
              <FormControl>
                <TextField fullWidth label='Email' {...register('email')} error={Boolean(errors?.email)} />
                <FormErrors error={errors?.email} sx={{ marginLeft: '0px' }} />
              </FormControl>
              <FormControl>
                <TextField
                  fullWidth
                  label='Password'
                  type={isPasswordShown ? 'text' : 'password'}
                  {...register('password')}
                  error={Boolean(errors?.password)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          size='small'
                          edge='end'
                          onClick={handleClickShowPassword}
                          onMouseDown={e => e.preventDefault()}
                        >
                          <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <FormErrors error={errors?.password} sx={{ marginLeft: '0px' }} />
              </FormControl>
              <FormControl>
                <TextField
                  fullWidth
                  label='Confirm Password'
                  type={isConfirmPasswordShown ? 'text' : 'password'}
                  {...register('confirm_password')}
                  error={Boolean(errors?.confirm_password)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          size='small'
                          edge='end'
                          onClick={() => setConfirmPasswordShown(show => !show)}
                          onMouseDown={e => e.preventDefault()}
                        >
                          <i className={isConfirmPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <FormErrors error={errors?.confirm_password} sx={{ marginLeft: '0px' }} />
              </FormControl>

              <FormControlLabel
                control={<Checkbox {...register('terms')} />}
                label={
                  <>
                    <span>I agree to </span>
                    <Link className='text-primary' href='/' onClick={e => e.preventDefault()}>
                      privacy policy & terms
                    </Link>
                    <FormErrors error={errors?.terms} sx={{ marginLeft: '0px' }} />
                  </>
                }
              />

              <LoadingButton loading={isLoading} fullWidth variant='contained' type='submit'>
                Sign Up
              </LoadingButton>
              <div className='flex justify-center items-center flex-wrap gap-2'>
                <Typography>Already have an account?</Typography>
                <Typography component={Link} href={'/login'} color='primary'>
                  Sign in instead
                </Typography>
              </div>
              <Divider className='gap-3 text-textPrimary'>Or</Divider>
              <div className='flex justify-center items-center gap-2'>
                <IconButton size='small' className='text-facebook'>
                  <i className='ri-facebook-fill' />
                </IconButton>
                <IconButton size='small' className='text-twitter'>
                  <i className='ri-twitter-fill' />
                </IconButton>
                <IconButton size='small' className='text-textPrimary'>
                  <i className='ri-github-fill' />
                </IconButton>
                <IconButton size='small' className='text-googlePlus'>
                  <i className='ri-google-fill' />
                </IconButton>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
      <img src={authBackground} className='absolute bottom-[5%] z-[-1] is-full max-md:hidden' />
    </div>
  )
}

export default Register
