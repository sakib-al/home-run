export type RegisterFormValues = {
  name: string | null
  email: string | null
  password: string | null
  confirm_password: string | null
  terms: boolean | null
}

export type LoginFormValues = {
  email: string | null
  password: string | null
}
