import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/24/outline'
import {Form, Link, NavLink, useLoaderData} from '@remix-run/react'
import clsx from 'clsx'
import {ExistingSearchParams} from 'remix-utils/existing-search-params'
import {IconButton} from '~/ui/action'
import {AppLogoWhite} from '~/ui/asset'
import {loader} from './route'

export const SideBar = () => {
  const {projects} = useLoaderData<typeof loader>()

  return (
    <nav className="my-8 space-y-8 border-r border-regular px-8">
      <Link to="/" className="inline-block">
        <AppLogoWhite width={100} />
      </Link>

      <ul className="space-y-4">
        {[
          {
            name: 'Главная',
            link: '/',
          },
        ].map(({name, link}) => (
          <li key={name}>
            <NavLink
              to={link}
              className={({isActive}) =>
                clsx(
                  'transition-colors',
                  isActive ? 'text-regular' : 'text-quiet hover:text-regular',
                )
              }
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>

      {projects.last_page > 1 && (
        <Form className="flex items-center justify-between">
          <ExistingSearchParams exclude={['projects-page']} />

          <p className="text-sm text-quiet">
            {projects.current_page} из {projects.last_page}
          </p>
          <ul className="flex gap-4">
            <li>
              <IconButton
                type="submit"
                name="projects-page"
                value={projects.current_page - 1}
                disabled={projects.current_page === 1}
              >
                <ChevronLeftIcon className="h-3 w-3 text-quiet" />
              </IconButton>
            </li>
            <li>
              <IconButton
                type="submit"
                name="projects-page"
                value={projects.current_page + 1}
                disabled={projects.current_page === projects.last_page}
              >
                <ChevronRightIcon className="h-3 w-3 text-quiet" />
              </IconButton>
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
                  isActive ? 'text-regular' : 'text-quiet hover:text-regular',
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
    </nav>
  )
}
