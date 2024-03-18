import {HTTPError, NormalizedOptions} from 'ky'

export class Unauthenticated extends HTTPError {
  constructor(
    response: Response,
    request: Request,
    options: NormalizedOptions,
  ) {
    super(response, request, options)
  }
}
