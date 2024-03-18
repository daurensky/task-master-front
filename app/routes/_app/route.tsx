import {LoaderFunctionArgs, json, redirect} from '@remix-run/cloudflare'
import {Outlet, useLoaderData} from '@remix-run/react'
import {authenticate} from '~/lib/api.server'
import {commitSession, getSession} from '~/lib/session.server'
import {isAuthenticationValid} from '~/models/user.server'
import {Toast} from '~/ui/overlay'
import {SideBar} from './side-bar'
import {getProjectsList} from '~/models/project.server'

export const loader = async ({request}: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'))

  const accessToken = session.get('accessToken')

  if (!accessToken) {
    throw redirect('/login')
  }

  authenticate(accessToken)

  if (!(await isAuthenticationValid())) {
    session.unset('accessToken')
    return redirect('/login', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    })
  }

  const {searchParams} = new URL(request.url)
  const projectsPage = +(searchParams.get('projects-page') || 1)
  const projects = await getProjectsList({page: projectsPage})

  const toast = session.get('toast')
  return json(
    {
      projects,
      toast,
    },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    },
  )
}

const AppLayout = () => {
  const {toast} = useLoaderData<typeof loader>()

  return (
    <>
      <div className="grid h-full grid-cols-5">
        <SideBar />
        <main className="col-span-4 flex p-8">
          <Outlet />
        </main>
      </div>
      {toast && <Toast type={toast.type} message={toast.message} />}
    </>
  )
}

export default AppLayout
