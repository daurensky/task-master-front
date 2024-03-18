import {z} from 'zod'
import {apiInstance, isHttpError} from '~/lib/api.server'

type RegisterUserParams = {
  email: string
  password: string
  name: string
}

export const registerUser = async (params: RegisterUserParams) => {
  return apiInstance.post('api/register', {json: params}).text()
}

export const validateUser = (data: unknown) => {
  const schema = z.object({
    email: z.string().email().max(255),
    password: z.string().min(8),
    name: z.string().max(255),
  })

  return schema.safeParse(data)
}

type GetUserResponse = {
  id: number
  name: string
  email: string
  email_verified_at: null | string
  created_at: null | string
  updated_at: null | string
}

export const getUser = async () => {
  return apiInstance.get('api/user').json<GetUserResponse>()
}

export const isAuthenticationValid = async () => {
  try {
    await getUser()
    return true
  } catch (e) {
    if (isHttpError(e, 401)) {
      return false
    }
    return true
  }
}
