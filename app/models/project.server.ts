import {Paginated, apiInstance} from '~/lib/api.server'

type ProjectParams = {
  page?: number
}

type ProjectResponse = Paginated<{
  id: number
  name: string
  color: string
}>

export function getProjectsList(params?: ProjectParams) {
  return apiInstance
    .get('api/project', {searchParams: params})
    .json<ProjectResponse>()
}
