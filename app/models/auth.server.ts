import {z} from 'zod'

export type LoginParams = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
}

export const login = async (params: LoginParams): Promise<LoginResponse> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
    method: 'post',
    body: JSON.stringify(params),
    headers: {
      Accept: 'application/json',
    },
  })

  return await res.json()
}

export const validateLogin = (data: unknown) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  return schema.safeParse(data)
}
