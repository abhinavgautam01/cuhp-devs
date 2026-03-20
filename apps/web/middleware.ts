import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    // Define public routes that should not be accessible to logged-in users
    const isAuthRoute = pathname === '/signin' || pathname === '/signup';

    if (token && isAuthRoute) {
        // If user is logged in and trying to access signin/signup, redirect to dashboard
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

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
