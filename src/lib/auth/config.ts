import { NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import { UserRole } from "@/types/auth";

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER_BASE_URL!,
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 saat
  },

  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.role = getUserRole(user.email);
        token.permissions = getRolePermissions(token.role as UserRole);
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as UserRole;
        session.user.permissions = token.permissions as string[];
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  debug: process.env.NODE_ENV === "development",
};

// admin/user rol sistemi
function getUserRole(email?: string | null): UserRole {
  if (!email) return UserRole.USER;

  const adminEmails = [
    "admin@example.com",
    "admin@test.com",
    //...
  ];

  return adminEmails.includes(email) ? UserRole.ADMIN : UserRole.USER;
}

// Rol bazlı yetkilendirme
function getRolePermissions(role: UserRole): string[] {
  switch (role) {
    case UserRole.ADMIN:
      return ["read", "write", "delete", "admin"];
    case UserRole.USER:
      return ["read", "write"];
    default:
      return ["read"];
  }
}
