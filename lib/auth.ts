import NextAuth from 'next-auth';

const config = {
  providers: [
    // We'll add Steam provider later
  ],
  callbacks: {
    async session({ session, token }: any) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.steam_id = token.steam_id;
        session.user.avatar_url = token.avatar_url;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.sub = user.id;
        token.steam_id = user.steam_id;
        token.avatar_url = user.avatar_url;
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: '/',
    error: '/?auth=error',
  },
  session: {
    strategy: 'jwt' as const,
    maxAge: 90 * 24 * 60 * 60, // 90 days
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
