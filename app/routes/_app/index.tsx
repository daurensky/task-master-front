import {Outlet} from '@remix-run/react'
import {SideBar} from './side-bar'

const AppLayout = () => {
  return (
    <div className="bg-primary text-regular font-inter grid h-screen grid-cols-5">
      <SideBar />
      <main className="col-span-4 flex p-8">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
