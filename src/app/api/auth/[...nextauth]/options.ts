import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        idUsuario: {
          label: 'Identificacion',
          type: 'text',
          placeholder: '5-5555-5555',
        },
        contraseña: { label: 'Contraseña', type: 'password' },
      },

      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          {
            method: 'POST',
            body: JSON.stringify({
              idUsuario: credentials?.idUsuario,
              contraseña: credentials?.contraseña,
            }),
            headers: { 'Content-Type': 'application/json' },
          },
        );
        const user = await res.json();
        if (res.ok && user) {
          return user;
        }
        if (user.message) {
          throw new Error(user.message);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user) return true;
      return false;
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },

  secret: process.env.AUTH_SECRET,

  pages: {
    signIn: '/auth/login',
  },
};
