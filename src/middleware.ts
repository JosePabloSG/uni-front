import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

async function authMiddleware(req: NextRequest) {
  try {
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (session) {
      return null;
    }

    return NextResponse.redirect(new URL('/auth/login', req.url));
  } catch (error) {
    console.error('Error al obtener el token:', error);
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow access to static files
  if (pathname.startsWith('/_next') || pathname.startsWith('/static')) {
    return NextResponse.next();
  }

  // Allow access to public auth routes
  if (pathname.startsWith('/auth')) {
    return NextResponse.next();
  }

  // Protect all private routes
  const response = await authMiddleware(req);
  if (response) {
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
  ],
};
