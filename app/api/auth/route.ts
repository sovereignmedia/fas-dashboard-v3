import { NextResponse } from 'next/server';
import {
  AUTH_COOKIE_NAME,
  AUTH_SECRET,
  DASHBOARD_PASSWORD,
} from '@/lib/auth';

const IS_PROD = process.env.NODE_ENV === 'production';

function setAuthCookie(response: NextResponse) {
  response.cookies.set(AUTH_COOKIE_NAME, AUTH_SECRET, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { password } = body;

  if (password !== DASHBOARD_PASSWORD) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  setAuthCookie(response);
  return response;
}

/** Logout — clear the auth cookie */
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(AUTH_COOKIE_NAME, '', {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return response;
}
