import { Lucia } from 'lucia';
import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';

const adapter = new PrismaAdapter(prisma.session, prisma.user);

// For HTTP connections (development or unprotected production), disable secure cookies
// secure: true only works with HTTPS
const allowHttpCookies = process.env.ALLOW_HTTP_COOKIES === 'true';
const isSecure = !allowHttpCookies; // If ALLOW_HTTP_COOKIES=true, secure=false

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: 'rc_session',
    attributes: {
      secure: isSecure, // false for HTTP, true for HTTPS
      sameSite: 'lax',
      path: '/',
    },
  },
  getUserAttributes: (data) => {
    return {
      email: data.email as string,
      role: data.role as string,
    };
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      email: string;
      role: string;
    };
  }
}
