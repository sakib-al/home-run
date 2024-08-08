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
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import { FormControl } from '@mui/material'

// Type Imports
import type { Mode } from '@core/types'

// Component Imports
import Logo from '@components/layout/shared/Logo'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Hook Imports
import { useImageVariant } from '@core/hooks/useImageVariant'
import type { LoginFormValues } from '@/types/FormTypes'
import LoginValidation from '@/validation/LoginValidation'

import FormErrors from '@/validation/FromError'

const Login = ({ mode }: { mode: Mode }) => {
  // States
  const [isPasswordShown, setIsPasswordShown] = useState(false)

  // Vars
  const darkImg = '/images/pages/auth-v1-mask-1-dark.png'
  const lightImg = '/images/pages/auth-v1-mask-1-light.png'

  // Hooks

  const authBackground = useImageVariant(mode, lightImg, darkImg)
  const router = useRouter()

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: null,
      password: null
    },
    mode: 'onBlur',
    resolver: yupResolver<LoginFormValues>(yup.object().shape(LoginValidation))
  })

  const handleLogin = (data: LoginFormValues) => {
    console.log(data)
    reset()
    router.push('/home')
  }

  return (
    <div className='flex justify-center items-center min-bs-[100dvh] is-full relative p-6'>
      <Card className='flex flex-col sm:is-[460px]'>
        <CardContent className='p-6 sm:!p-12'>
          <Link href={'/'} className='flex justify-center items-center mbe-6'>
            <Logo />
          </Link>
          <div className='flex flex-col gap-5'>
            <div>
              <Typography variant='h4'>{`Welcome to ${themeConfig.templateName}! 👋🏻`}</Typography>
              <Typography className='mbs-1'>Please sign-in to your account and start the adventure</Typography>
            </div>
            <form noValidate autoComplete='off' onSubmit={handleSubmit(handleLogin)} className='flex flex-col gap-5'>
              <FormControl>
                <TextField autoFocus fullWidth label='Email' {...register('email')} error={Boolean(errors?.email)} />
                <FormErrors error={errors?.email} sx={{ marginLeft: '0px' }} />
              </FormControl>
              <FormControl>
                <TextField
                  fullWidth
                  label='Password'
                  id='outlined-adornment-password'
                  type={isPasswordShown ? 'text' : 'password'}
                  error={Boolean(errors?.password)}
                  {...register('password')}
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

              <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
                <FormControlLabel control={<Checkbox />} label='Remember me' />
                <Typography className='text-end' color='primary' component={Link} href={'/reset-password'}>
                  Forgot password?
                </Typography>
              </div>
              <Button fullWidth variant='contained' type='submit'>
                Log In
              </Button>
              <div className='flex justify-center items-center flex-wrap gap-2'>
                <Typography>New on our platform?</Typography>
                <Typography component={Link} href={'/register'} color='primary'>
                  Create an account
                </Typography>
              </div>
              <Divider className='gap-3 text-textPrimary'>or</Divider>
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

export default Login
