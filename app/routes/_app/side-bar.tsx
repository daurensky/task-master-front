import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/24/outline'
import {Form, Link, NavLink, useLoaderData} from '@remix-run/react'
import clsx from 'clsx'
import {ExistingSearchParams} from 'remix-utils/existing-search-params'
import {AppLogo} from '~/components/app-logo'
import {Button} from '~/components/ui/button'
import {loader} from './route'

export function SideBar() {
  const {projects} = useLoaderData<typeof loader>()

  return (
    <aside className="space-y-8 border-r px-6 py-8">
      <Link to="/" className="inline-block">
        <AppLogo width={124} height={32} />
      </Link>

      <div>
        <Link to="/project/new">
          <Button className="w-full">Новый проект</Button>
        </Link>
      </div>

      {projects.last_page > 1 && (
        <Form className="flex items-center justify-between">
          <ExistingSearchParams exclude={['projects-page']} />

          <p className="text-muted-foreground text-sm">
            {projects.current_page} из {projects.last_page}
          </p>
          <ul className="flex gap-4">
            <li>
              <Button
                size="icon"
                variant="outline"
                type="submit"
                name="projects-page"
                value={projects.current_page - 1}
                disabled={projects.current_page === 1}
              >
                <ChevronLeftIcon className="h-3 w-3" />
              </Button>
            </li>
            <li>
              <Button
                size="icon"
                variant="outline"
                type="submit"
                name="projects-page"
                value={projects.current_page + 1}
                disabled={projects.current_page === projects.last_page}
              >
                <ChevronRightIcon className="h-3 w-3" />
              </Button>
            </li>
          </ul>
        </Form>
      )}

      <ul className="space-y-4">
        {projects.data.map(({id, name, color}) => (
          <li key={id}>
            <NavLink
              to={`/project/${id}`}
              className={({isActive}) =>
                clsx(
                  'inline-flex -translate-x-1 items-center gap-4 transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary',
                )
              }
            >
              <div
                className="h-1.5 w-1.5 rounded-full"
                style={{backgroundColor: color}}
              ></div>
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  )
}
