import "next-auth";

// auth.ts

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name: string;
      email: string;
      image: string;
      role: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}
