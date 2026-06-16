import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const role = request.cookies.get('user_role')?.value;
  const { pathname } = request.nextUrl;

  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginRoute = pathname === '/admin/login';

  if (isAdminRoute) {
    if (!token && !isLoginRoute) {
      // Redirect unauthenticated users to admin login
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    if (token && isLoginRoute) {
      // Redirect authenticated users away from login
      const adminUrl = new URL('/admin', request.url);
      return NextResponse.redirect(adminUrl);
    }
    
    // Optional: We could strictly check role === 'ADMIN' or 'SUPER_ADMIN' here
    // if (token && !isLoginRoute && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
    //   return NextResponse.redirect(new URL('/', request.url));
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
