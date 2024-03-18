import {Link, Outlet} from '@remix-run/react'
import {AppLogoWhite} from '~/ui/asset'

const LegalLayout = () => {
  return (
    <section className="py-16">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col px-4">
        <Link to="/" className="mx-auto">
          <AppLogoWhite width={150} />
        </Link>
        <hr className="my-8 border-regular" />
        <Outlet />
        <hr className="my-8 border-regular" />
        <Link to="/" className="mx-auto">
          <AppLogoWhite width={150} />
        </Link>
      </div>
    </section>
  )
}

export default LegalLayout
