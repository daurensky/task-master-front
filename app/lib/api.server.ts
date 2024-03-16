import ky, {HTTPError} from 'ky'

export const apiInstance = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
  },
})

export const isHttpError = (e: unknown): e is HTTPError => {
  return e instanceof HTTPError
}
