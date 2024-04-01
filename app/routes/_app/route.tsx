import {MagnifyingGlassIcon, UserIcon} from '@heroicons/react/24/outline'
import {LoaderFunctionArgs, json, redirect} from '@remix-run/cloudflare'
import {Outlet, useLoaderData} from '@remix-run/react'
import {useEffect} from 'react'
import {Button} from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import {Input} from '~/components/ui/input'
import {Toaster} from '~/components/ui/toaster'
import {useToast} from '~/components/ui/use-toast'
import {authenticate} from '~/lib/api.server'
import {commitSession, getSession} from '~/lib/session.server'
import {getProjectsList} from '~/models/project.server'
import {isAuthenticationValid} from '~/models/user.server'
import {SideBar} from './side-bar'
import {ModeToggle} from '~/components/mode-toggle'

export async function loader({request}: LoaderFunctionArgs) {
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

export default function AppLayout() {
  const data = useLoaderData<typeof loader>()
  const {toast} = useToast()

  useEffect(() => {
    if (data.toast) {
      toast({
        title: data.toast.title,
        description: data.toast.description,
        variant: data.toast.variant,
      })
    }
  }, [toast, data.toast])

  return (
    <>
      <div className="grid h-full grid-cols-5">
        <SideBar />
        <main className="bg-muted/40 col-span-4 flex flex-col">
          <header className="bg-background flex gap-4 border-b p-4">
            <div className="relative ml-auto flex-1 md:grow-0">
              <MagnifyingGlassIcon className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search..."
                className="bg-background w-full rounded-lg pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <UserIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Настройки</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Выйти</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <div className="p-8">
            <Outlet />
          </div>
        </main>
      </div>
      <Toaster />
    </>
  )
}
