export type RegisterResponse = {
  message: string,
  access_token: string,
  user: {
    name: string
    email: string
  }
}
