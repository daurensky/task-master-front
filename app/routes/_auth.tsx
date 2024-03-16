import {LoaderFunctionArgs} from '@remix-run/cloudflare'
import {Link, Outlet, redirect} from '@remix-run/react'
import {getSession} from '~/lib/session.server'
import {AppLogoWhite} from '~/ui/asset'

export const loader = async ({request}: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'))

  if (session.has('accessToken')) {
    throw redirect('/')
  }

  return null
}

export const ErrorBoundary = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="m-auto w-full max-w-md space-y-8 rounded-xl border border-regular p-8">
        <p className="text-lg font-bold">500</p>
        <div className="space-y-2">
          <p>Кажется что-то пошло не так.</p>
          <p>Попробуйте сделать следующее:</p>
          <ul className="space-y-2">
            {[
              {title: 'Перейти на главную и повторить действия', link: '/'},
              {title: 'Написать мне в телеграм', link: 'http://t.me/daurensky'},
            ].map(({title, link}) => (
              <li key={title}>
                <Link to={link} className="text-blue-500 underline">
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

const AuthLayout = () => {
  return (
    <div className="grid h-full md:grid-cols-2">
      <div className="bg-tasks hidden bg-cover bg-center p-8 md:block">
        <AppLogoWhite width={150} />
      </div>
      <Outlet />
    </div>
  )
}

export default AuthLayout
