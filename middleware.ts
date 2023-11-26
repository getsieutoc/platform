import { withAuth } from 'next-auth/middleware';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};

export default withAuth({
  pages: {
    signIn: `/login`,
    verifyRequest: `/login`,
    error: '/login', // Error code passed in query string as ?error=
  },
});
