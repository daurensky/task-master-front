import {LoaderFunctionArgs, redirect} from '@remix-run/cloudflare'
import {Outlet} from '@remix-run/react'
import {getSession} from '~/lib/session.server'
import {SideBar} from './side-bar'

export const loader = async ({request}: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'))

  if (!session.has('accessToken')) {
    throw redirect('/login')
  }

  return null
}

const AppLayout = () => {
  return (
    <div className="bg-background-main text-regular font-inter grid h-screen grid-cols-5">
      <SideBar />
      <main className="col-span-4 flex p-8">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
