import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-next-pathname', request.nextUrl.pathname);

  const pathname = request.nextUrl.pathname;
  const method = request.method;

  // Define static file pattern and health endpoint check
  const staticFilePattern = /\.(png|jpg|jpeg|gif|ico|css|js|svg|woff|woff2|eot|ttf|otf)$/;

  if (pathname === '/api/health') {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Skip method validation for static files
  if (!staticFilePattern.test(pathname)) {
    // HTTP Method restrictions
    const isApiRoute = pathname.startsWith('/api');
    const isAuthRoute = pathname.startsWith('/api/auth');

    // Define allowed methods for different route types
    const allowedApiMethods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'];
    const allowedUiMethods = ['GET'];

    // Skip method validation for auth routes (let NextAuth handle them)
    if (!isAuthRoute) {
      if (isApiRoute) {
        // API routes: only allow GET, POST, PUT, DELETE, OPTIONS
        if (!allowedApiMethods.includes(method)) {
          return NextResponse.json(
            {
              error: `Method ${method} not allowed for API routes. Allowed methods: ${allowedApiMethods.join(', ')}`,
            },
            { status: 405, headers: { Allow: allowedApiMethods.join(', ') } }
          );
        }
      } else {
        // UI routes: only allow GET
        if (!allowedUiMethods.includes(method)) {
          return NextResponse.json(
            { error: `Method ${method} not allowed for UI routes. Only GET method is allowed.` },
            { status: 405, headers: { Allow: 'GET' } }
          );
        }
      }
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
