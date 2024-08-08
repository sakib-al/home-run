import * as yup from 'yup'


const LoginValidation = {
  email: yup.string().email().required('please enter your valid email'),
  password: yup.string().required('Password is required')
}

export default LoginValidation
