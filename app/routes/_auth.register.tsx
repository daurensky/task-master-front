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
import {login} from '~/models/auth.server'
import {registerUser, validateUser} from '~/models/user.server'

export const meta: MetaFunction = () => {
  return [
    {title: 'Регистрация | Task Master'},
    {
      name: 'description',
      content: 'Удобный менеджер задач! Создайте свою kanban доску.',
    },
  ]
}

export async function action({request}: ActionFunctionArgs) {
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
      description: 'Вы успешно зарегистрировались',
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

export default function AuthRegister() {
  const errors = useActionData<typeof action>()?.errors || {}

  return (
    <div className="m-auto grid w-full max-w-sm gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Регистрация</CardTitle>
          <CardDescription>Присоединяйтесь к Task Master</CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="post" id="register" className="grid gap-4">
            <Input name="name" label="Имя" error={errors.name} />
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
          <Button type="submit" form="register">
            Создать аккаунт
          </Button>
        </CardFooter>
      </Card>

      <p className="text-muted-foreground text-center text-sm">
        Создавая аккаунт, вы соглашаетесь с нашими «
        <Link to="/" className="hover:text-primary hover:underline">
          Условиями обслуживания
        </Link>
        » и «
        <Link to="/terms" className="hover:text-primary hover:underline">
          Политикой конфиденциальности
        </Link>
        ».
      </p>

      <p className="text-muted-foreground place-self-center text-sm">
        Уже есть аккаунт?{' '}
        <Link to="/login" className="hover:text-primary hover:underline">
          Войдите
        </Link>
      </p>
    </div>
  )
}
