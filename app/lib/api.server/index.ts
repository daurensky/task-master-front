import ky, {HTTPError} from 'ky'
import {Unauthenticated} from './errors/unauthenticated'
import {UnprocessableEntity} from './errors/unprocessable-entity'

export let apiInstance = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
  },
  hooks: {
    beforeError: [
      error => {
        if (error.response.status === 422) {
          return new UnprocessableEntity(
            error.response,
            error.request,
            error.options,
          )
        }

        if (error.response.status === 401) {
          return new Unauthenticated(
            error.response,
            error.request,
            error.options,
          )
        }

        return error
      },
    ],
  },
})

export const authenticate = (accessToken: string) => {
  apiInstance = apiInstance.extend({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
}

const errorsMap = {
  422: UnprocessableEntity,
  401: Unauthenticated,
}

export const isHttpError = <
  S extends keyof typeof errorsMap | undefined = undefined,
>(
  e: unknown,
  status?: S,
): e is S extends undefined
  ? HTTPError
  : InstanceType<(typeof errorsMap)[NonNullable<S>]> => {
  return status ? e instanceof errorsMap[status] : e instanceof HTTPError
}
