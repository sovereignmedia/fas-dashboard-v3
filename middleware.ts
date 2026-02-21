import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE_NAME = 'fas-auth';
const AUTH_SECRET =
  process.env.AUTH_SECRET || 'fas-default-secret-change-in-production';

function isAuthenticated(request: NextRequest): boolean {
  const cookie = request.cookies.get(AUTH_COOKIE_NAME);
  return cookie?.value === AUTH_SECRET;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Dashboard routes — require valid auth cookie
  if (pathname.startsWith('/dashboard')) {
    if (!isAuthenticated(request)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Home page — redirect authenticated users straight to dashboard
  if (pathname === '/') {
    if (isAuthenticated(request)) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*'],
};
