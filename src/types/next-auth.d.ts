import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { UserRole } from "./auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role?: UserRole;
      permissions?: string[];
    };
    accessToken?: string;
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
    role?: UserRole;
    permissions?: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name?: string | null;
    role?: UserRole;
    permissions?: string[];
    accessToken?: string;
  }
}
