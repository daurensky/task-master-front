import {Link, Outlet} from '@remix-run/react'
import {AppLogo} from '~/components/app-logo'

export default function LegalLayout() {
  return (
    <section className="py-16">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col px-4">
        <Link to="/" className="mx-auto">
          <AppLogo width={150} />
        </Link>
        <hr className="my-8" />
        <Outlet />
        <hr className="my-8" />
        <Link to="/" className="mx-auto">
          <AppLogo width={150} />
        </Link>
      </div>
    </section>
  )
}
