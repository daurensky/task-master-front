import {createCookieSessionStorage} from '@remix-run/cloudflare'

type SessionData = {
  accessToken: string
}

type SessionFlashData = {
  toast: {
    type: 'success' | 'warning' | 'error'
    message: string
  }
}

export const {getSession, commitSession, destroySession} =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: '__session',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'lax',
      secrets: [import.meta.env.VITE_SESSION_SECRET],
      secure: import.meta.env.PROD,
    },
  })
