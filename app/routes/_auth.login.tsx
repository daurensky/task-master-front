import {
  ActionFunctionArgs,
  MetaFunction,
  json,
  redirect,
} from '@remix-run/cloudflare'
import {Form, Link, useActionData} from '@remix-run/react'
import {isHttpError} from '~/lib/api.server'
import {commitSession, getSession} from '~/lib/session.server'
import {login, validateLogin} from '~/models/auth.server'
import {Button} from '~/ui/action'
import {TextInput} from '~/ui/form'

export const meta: MetaFunction = () => {
  return [
    {title: 'Вход | Task Master'},
    {
      name: 'description',
      content: 'Удобный менеджер задач! Создайте свою kanban доску.',
    },
  ]
}

export const action = async ({request}: ActionFunctionArgs) => {
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
      type: 'success',
      message: 'Вы успешно вошли',
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

const AuthLogin = () => {
  const errors = useActionData<typeof action>()?.errors || {}

  return (
    <div className="relative flex">
      <Link
        to="/register"
        className="absolute right-4 top-4 text-sm hover:underline"
      >
        Регистрация
      </Link>

      <Form method="post" className="m-auto w-full max-w-sm space-y-8 p-8">
        <p className="text-center text-xl font-medium">Войти в Task Master</p>
        <div className="space-y-4">
          <TextInput
            type="email"
            name="email"
            label="Электронная почта"
            error={errors.email}
            className="w-full"
          />
          <TextInput
            type="password"
            name="password"
            label="Пароль"
            error={errors.password}
            className="w-full"
          />
        </div>
        <Button type="submit" className="w-full">
          Войти
        </Button>
      </Form>
    </div>
  )
}

export default AuthLogin
