import {
  ActionFunctionArgs,
  MetaFunction,
  json,
  redirect,
} from '@remix-run/cloudflare'
import {Form, Link, useActionData} from '@remix-run/react'
import {Button} from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import {Input} from '~/components/ui/input'
import {isHttpError} from '~/lib/api.server'
import {commitSession, getSession} from '~/lib/session.server'
import {login, validateLogin} from '~/models/auth.server'

export const meta: MetaFunction = () => {
  return [
    {title: 'Вход | Task Master'},
    {
      name: 'description',
      content: 'Удобный менеджер задач! Создайте свою kanban доску.',
    },
  ]
}

export async function action({request}: ActionFunctionArgs) {
  const validation = validateLogin(Object.fromEntries(await request.formData()))

  if (!validation.success) {
    return json({errors: validation.error.formErrors.fieldErrors})
  }

  try {
    const {token} = await login({
      email: validation.data.email,
      password: validation.data.password,
    })

    const session = await getSession(request.headers.get('Cookie'))

    session.set('accessToken', token)
    session.flash('toast', {
      description: 'Вы успешно вошли',
    })

    return redirect('/', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    })
  } catch (e) {
    if (isHttpError(e) && e.response.status === 401) {
      return json({
        errors: {
          email: [],
          password: ['Неверный логин или пароль'],
        },
      })
    }

    throw e
  }
}

export default function AuthLogin() {
  const errors = useActionData<typeof action>()?.errors || {}

  return (
    <div className="m-auto grid w-full max-w-sm gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Вход</CardTitle>
          <CardDescription>Войти в Task Master</CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="post" id="login" className="grid gap-4">
            <Input
              type="email"
              name="email"
              label="Электронная почта"
              error={errors.email}
            />
            <Input
              type="password"
              name="password"
              label="Пароль"
              error={errors.password}
            />
          </Form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" form="login">
            Войти
          </Button>
        </CardFooter>
      </Card>
      <p className="text-muted-foreground place-self-center text-sm">
        Нет аккаунта?{' '}
        <Link to="/register" className="hover:text-primary hover:underline">
          Зарегистрируйтесь
        </Link>
      </p>
    </div>
  )
}
