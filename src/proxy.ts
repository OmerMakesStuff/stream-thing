import { type NextRequest, NextResponse } from 'next/server';
import { clerkMiddleware } from '@clerk/nextjs/server';

import { SIGN_IN_URL, SIGN_UP_URL, SSO_CALLBACK_URL } from '@/constants/clerk';

const publicRoutes = ['/', '/api/uploadthing', '/search'],
  authRoutes = [SIGN_IN_URL, SIGN_UP_URL, SSO_CALLBACK_URL];

const isAuthRoute = (req: NextRequest) =>
  authRoutes.includes(req.nextUrl.pathname);

const isPublicRoute = (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  return (
    publicRoutes.includes(pathname) ||
    pathname.startsWith('/api/webhooks') ||
    /^\/[^/]+$/.test(pathname)
  );
};

export default clerkMiddleware(
  async (auth, req) => {
    const { userId } = await auth();
    if (!isPublicRoute(req) && !isAuthRoute(req)) await auth.protect();
    if (isAuthRoute(req) && userId) {
      const destinationUrl =
        req.nextUrl.searchParams.get('redirect_url') ??
        process.env.NEXT_PUBLIC_APP_URL!;
      return NextResponse.redirect(new URL(destinationUrl, req.url));
    }
  },
  { signInUrl: SIGN_IN_URL, signUpUrl: SIGN_UP_URL }
);

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/__clerk/(.*)',
  ],
};
