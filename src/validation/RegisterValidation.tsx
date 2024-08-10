import * as yup from 'yup'

const RegisterValidation = {
  name: yup.string().required('Name is required'),
  email: yup.string().email().required('please enter your valid email'),
  password: yup.string().min(8).required('Password is required'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm password is required'),
  terms: yup
    .boolean()
    .oneOf([true], 'Please accept terms and conditions')
    .required('Please accept terms and conditions')
}

export default RegisterValidation
