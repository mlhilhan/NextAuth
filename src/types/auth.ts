import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface ExtendedUser extends DefaultUser {
  role?: UserRole;
  permissions?: string[];
}

export interface ExtendedSession extends DefaultSession {
  user: ExtendedUser;
  accessToken?: string;
}

export interface ExtendedJWT extends JWT {
  role?: UserRole;
  permissions?: string[];
  accessToken?: string;
}

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export interface AuthConfig {
  secret: string;
  issuer: string;
  audience: string;
}

export interface RouteProtection {
  path: string;
  roles: UserRole[];
  public?: boolean;
}
