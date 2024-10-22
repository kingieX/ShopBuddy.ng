// lib/auth.ts
import cookie from 'cookie';

export const setLoginSession = (res: any, session: any) => {
  const cookieOptions: cookie.CookieSerializeOptions = {
    httpOnly: true, // Can't be accessed from JavaScript
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    maxAge: 60 * 60 * 24, // 1 day
    sameSite: 'lax' as const, // CSRF protection
    path: '/',
  };

  const cookieValue = cookie.serialize(
    'admin_session',
    JSON.stringify(session),
    cookieOptions
  );
  res.setHeader('Set-Cookie', cookieValue);
};
