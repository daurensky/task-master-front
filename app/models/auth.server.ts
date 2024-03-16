import ky from 'ky'
import {z} from 'zod'
import {apiInstance} from '~/lib/api.server'

export type LoginParams = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
}

export const login = async (params: LoginParams): Promise<LoginResponse> => {
  ky.create({
    prefixUrl: '',
  })
  return await apiInstance
    .post('api/login', {json: params})
    .json<LoginResponse>()
}

export const validateLogin = (data: unknown) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  return schema.safeParse(data)
}
