import {LoaderFunctionArgs, json, redirect} from '@remix-run/cloudflare'
import {Outlet, useLoaderData} from '@remix-run/react'
import {commitSession, getSession} from '~/lib/session.server'
import {SideBar} from './side-bar'
import {Toast} from '~/ui/overlay'

export const loader = async ({request}: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'))

  if (!session.get('accessToken')) {
    throw redirect('/login')
  }

  const toast = session.get('toast')

  return json(
    {toast},
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
