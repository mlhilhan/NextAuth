import jwt from "jsonwebtoken";
import { AuthConfig, UserRole } from "@/types/auth";

export class JWTService {
  private config: AuthConfig;

  constructor() {
    this.config = {
      secret: process.env.JWT_SECRET!,
      issuer: process.env.JWT_ISSUER!,
      audience: process.env.JWT_AUDIENCE!,
    };
  }

  generateToken(payload: {
    userId: string;
    email: string;
    role: UserRole;
    permissions: string[];
  }): string {
    return jwt.sign(
      {
        sub: payload.userId,
        email: payload.email,
        role: payload.role,
        permissions: payload.permissions,
        iat: Math.floor(Date.now() / 1000),
      },
      this.config.secret,
      {
        issuer: this.config.issuer,
        audience: this.config.audience,
        expiresIn: "24h",
      }
    );
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.config.secret, {
        issuer: this.config.issuer,
        audience: this.config.audience,
      });
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

  decodeToken(token: string): any {
    return jwt.decode(token);
  }
}

export const jwtService = new JWTService();
