import {createCookieSessionStorage} from '@remix-run/cloudflare'
import {createThemeSessionResolver} from 'remix-themes'

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'theme',
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secrets: [import.meta.env.VITE_SESSION_SECRET],
    // Set domain and secure only if in production
    ...(import.meta.env.PROD
      ? {domain: import.meta.env.VITE_APP_URL, secure: true}
      : {}),
  },
})

export const themeSessionResolver = createThemeSessionResolver(sessionStorage)
