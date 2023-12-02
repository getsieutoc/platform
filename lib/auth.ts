import { Account, NextAuthOptions, getServerSession } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/email';
import { AdapterUser } from 'next-auth/adapters';
import { UserRole } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { fetcher } from '@/lib/utils';
import { Organization } from '@/types';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  adapter: PrismaAdapter(prisma),

  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,

      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),

    EmailProvider({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      // server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM ?? 'noreply@sieutoc.website',
      // ignoreTLS: true,
    }),
  ],

  pages: {
    signIn: `/login`,
    verifyRequest: `/login`,
    error: '/login', // Error code passed in query string as ?error=
  },

  session: { strategy: 'jwt' },

  callbacks: {
    signIn: async ({ profile, account }) => {
      console.log('### profile: ', { profile });
      console.log('### account: ', { account });
      if (profile && account && account.provider === 'github') {
        const orgs = await fetcher<Organization[]>((profile as any).organizations_url);
        // Allow only people inside the organization
        return orgs.some((org) => org.login === process.env.GITHUB_ORG);
      }

      if (account && account.provider === 'email') {
        return true;
      }

      return false;
    },

    jwt: async ({ token, user, account }) => {
      if (account) {
        token.account = account;
      }

      if (user) {
        token.user = user;
      }

      return token;
    },

    session: async ({ session, token }) => {
      if (token && token.user && token.account) {
        session.account = token.account as Account;

        session.user = {
          ...session.user,
          id: token.sub as string, // we can be sure sub is inside token
          username: (token.user as AdapterUser).username ?? 'no-username',
          role: (token.user as AdapterUser).role ?? UserRole.USER,
        };
      }

      return session;
    },
  },
};

export function getSession() {
  return getServerSession(authOptions);
}
