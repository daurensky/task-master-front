import {NavLink} from '@remix-run/react'
import clsx from 'clsx'

export const SideBar = () => {
  return (
    <nav className="border-regular my-8 border-r px-8">
      <div className="mb-10">
        <span className="block h-10 w-10 rounded-full bg-white"></span>
      </div>

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
