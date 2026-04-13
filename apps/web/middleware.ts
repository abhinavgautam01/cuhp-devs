import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    // Define public routes that should not be accessible to logged-in users
    const isAuthRoute = pathname === '/signin' || pathname === '/signup';

    // Let client-side handle redirection from auth routes to avoid conflicts with onboarding flow
    // if (token && isAuthRoute) {
    //     return NextResponse.redirect(new URL('/dashboard', request.url));
    // }

    // (Optional) Protect dashboard and other private routes
    // const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/community') || pathname.startsWith('/onboarding');
    // if (!token && isProtectedRoute) {
    //     return NextResponse.redirect(new URL('/signin', request.url));
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ['/signin', '/signup', '/dashboard/:path*', '/community/:path*', '/onboarding/:path*'],
};
