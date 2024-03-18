import {HTTPError, NormalizedOptions} from 'ky'

type ResponseBody = {
  message: string
  errors: Record<string, string[]>
}

export class UnprocessableEntity extends HTTPError {
  constructor(
    response: Response,
    request: Request,
    options: NormalizedOptions,
  ) {
    super(response, request, options)
  }

  async getErrors() {
    return this.response.json<ResponseBody>()
  }
}
