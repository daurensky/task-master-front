import {ArrowRightIcon} from '@heroicons/react/24/outline'
import {LoaderFunctionArgs} from '@remix-run/cloudflare'
import {Link, Outlet, redirect} from '@remix-run/react'
import {AppLogo} from '~/components/app-logo'
import {Button} from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import {getSession} from '~/lib/session.server'

export async function loader({request}: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'))

  if (session.has('accessToken')) {
    throw redirect('/')
  }

  return null
}

export function ErrorBoundary() {
  return (
    <div className="grid h-full">
      <Card className="m-auto">
        <CardHeader>
          <CardTitle>500</CardTitle>
          <CardDescription>Кажется что-то пошло не так.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm">Попробуйте сделать следующее:</p>
          <ul className="space-y-2">
            {[
              {title: 'Перейти на главную и повторить действия', link: '/'},
              {title: 'Написать мне в телеграм', link: 'http://t.me/daurensky'},
            ].map(({title, link}) => (
              <li key={title}>
                <Link to={link} className="text-primary text-sm underline">
                  <Button variant="link">
                    {title} <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AuthLayout() {
  return (
    <>
      <div className="grid h-full lg:grid-cols-2">
        <div
          className="hidden bg-cover bg-center p-8 lg:block"
          style={{backgroundImage: 'url(/assets/img/tasks.jpg)'}}
        >
          <AppLogo width={150} className="fill-white" />
        </div>
        <Outlet />
      </div>
    </>
  )
}
