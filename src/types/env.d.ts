declare namespace NodeJS {
  interface ProcessEnv {
    AUTH0_SECRET: string;
    AUTH0_BASE_URL: string;
    AUTH0_ISSUER_BASE_URL: string;
    AUTH0_CLIENT_ID: string;
    AUTH0_CLIENT_SECRET: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    JWT_SECRET: string;
    JWT_ISSUER: string;
    JWT_AUDIENCE: string;
    NODE_ENV: "development" | "production" | "test";
  }
}
