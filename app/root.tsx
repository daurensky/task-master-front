import {LinksFunction} from '@remix-run/cloudflare'
import {Links, Meta, Outlet, Scripts, ScrollRestoration} from '@remix-run/react'
import styles from './tailwind.css?url'

export const links: LinksFunction = () => [{rel: 'stylesheet', href: styles}]

export function Layout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className="h-screen bg-background-main font-inter text-regular">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
