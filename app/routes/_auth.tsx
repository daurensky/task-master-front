import {LoaderFunctionArgs} from '@remix-run/cloudflare'
import {Outlet, redirect} from '@remix-run/react'
import {getSession} from '~/lib/session.server'

export const loader = async ({request}: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'))

  if (session.has('accessToken')) {
    throw redirect('/')
  }

  return null
}

const AuthLayout = () => {
  return (
    <div className="bg-background-main text-regular font-inter flex h-screen flex-col">
      <Outlet />
    </div>
  )
}

export default AuthLayout
