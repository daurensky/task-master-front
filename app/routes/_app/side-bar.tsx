import {Link, NavLink} from '@remix-run/react'
import clsx from 'clsx'
import {AppLogoWhite} from '~/ui/asset'

export const SideBar = () => {
  return (
    <nav className="my-8 space-y-8 border-r border-regular px-8">
      <Link to="/" className="inline-block">
        <AppLogoWhite width={100} />
      </Link>

      <ul className="space-y-4">
        {[
          {
            name: 'Все доски',
            link: '/',
          },
        ].map(({name, link}) => (
          <li key={name}>
            <NavLink
              to={link}
              className={({isActive}) =>
                clsx(
                  'text-lg transition-colors',
                  isActive ? 'text-regular' : 'text-quiet hover:text-regular',
                )
              }
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
