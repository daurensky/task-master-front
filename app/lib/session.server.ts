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
      domain: import.meta.env.VITE_SESSION_DOMAIN,
      httpOnly: true,
      maxAge: 60,
      path: '/',
      sameSite: 'lax',
      secrets: [import.meta.env.VITE_SESSION_SECRET],
      secure: true,
    },
  })
