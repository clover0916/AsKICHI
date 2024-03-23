import "next-auth";

// auth.ts

declare module "next-auth" {
  interface User {
    id: number;
    name: string;
    email: string;
    image: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    name: string;
    email: string;
    image: string;
    role: string;
  }
}
