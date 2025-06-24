import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import Auth0Provider from "next-auth/providers/auth0";
import { ExtendedSession, ExtendedJWT, UserRole } from "@/types/auth";

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 24 * 60 * 60,
  },

  callbacks: {
    async jwt({ token, user, account }): Promise<ExtendedJWT> {
      // İlk giriş sırasında user bilgilerini token'a ekle
      if (account && user) {
        token.accessToken = account.access_token;
        // Auth0'dan gelen role bilgisini kontrol et
        token.role = getUserRole(user.email);
        token.permissions = getRolePermissions(token.role);
      }

      return token as ExtendedJWT;
    },

    async session({ session, token }): Promise<ExtendedSession> {
      const extendedSession = session as ExtendedSession;

      if (token) {
        extendedSession.user.role = token.role;
        extendedSession.user.permissions = token.permissions;
        extendedSession.accessToken = token.accessToken;
      }

      return extendedSession;
    },
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  debug: process.env.NODE_ENV === "development",
};

// Basit rol belirleme - gerçek uygulamada DB'den gelecek
function getUserRole(email?: string | null): UserRole {
  if (!email) return UserRole.USER;

  const adminEmails = ["admin@example.com"];
  return adminEmails.includes(email) ? UserRole.ADMIN : UserRole.USER;
}

// Rol bazlı yetki belirleme
function getRolePermissions(role?: UserRole): string[] {
  switch (role) {
    case UserRole.ADMIN:
      return ["read", "write", "delete", "admin"];
    case UserRole.USER:
      return ["read", "write"];
    default:
      return ["read"];
  }
}
