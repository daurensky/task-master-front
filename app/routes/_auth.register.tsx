import {
  ActionFunctionArgs,
  MetaFunction,
  json,
  redirect,
} from '@remix-run/cloudflare'
import {Form, Link, useActionData} from '@remix-run/react'
import {isHttpError} from '~/lib/api.server'
import {commitSession, getSession} from '~/lib/session.server'
import {login} from '~/models/auth.server'
import {registerUser, validateUser} from '~/models/user.server'
import {Button} from '~/ui/action'
import {TextInput} from '~/ui/form'

export const meta: MetaFunction = () => {
  return [
    {title: 'Регистрация | Task Master'},
    {
      name: 'description',
      content: 'Удобный менеджер задач! Создайте свою kanban доску.',
    },
  ]
}

export const action = async ({request}: ActionFunctionArgs) => {
  const validation = validateUser(Object.fromEntries(await request.formData()))

  if (!validation.success) {
    return json({errors: validation.error.formErrors.fieldErrors})
  }

  try {
    await registerUser({
      name: validation.data.name,
      email: validation.data.email,
      password: validation.data.password,
    })

    const {token} = await login({
      email: validation.data.email,
      password: validation.data.password,
    })

    const session = await getSession(request.headers.get('Cookie'))

    session.set('accessToken', token)
    session.flash('toast', {
      type: 'success',
      message: 'Вы успешно зарегистрировались',
    })

    return redirect('/', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    })
  } catch (e) {
    if (isHttpError(e, 422)) {
      return json(await e.getErrors())
    }

    throw e
  }
}

const AuthRegister = () => {
  const errors = useActionData<typeof action>()?.errors || {}

  return (
    <div className="relative flex">
      <Link
        to="/login"
        className="absolute right-4 top-4 text-sm hover:underline"
      >
        Вход
      </Link>

      <Form method="post" className="m-auto w-full max-w-sm space-y-8 p-8">
        <p className="text-center text-xl font-medium">
          Присоединяйтесь к Task Master
        </p>
        <div className="space-y-4">
          <TextInput
            name="name"
            label="Имя"
            error={errors.name}
            className="w-full"
          />
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
          Создать аккаунт
        </Button>
        <p className="text-center text-sm text-quiet">
          Создавая аккаунт, вы соглашаетесь с нашими «
          <Link to="/" className="hover:underline">
            Условиями обслуживания
          </Link>
          » и «
          <Link to="/terms" className="hover:underline">
            Политикой конфиденциальности
          </Link>
          ».
        </p>
      </Form>
    </div>
  )
}

export default AuthRegister
