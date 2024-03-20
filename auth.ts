import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const config = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Email and password required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("ユーザーが存在しません");
        }

        const isCorrectPassword = bcrypt.compare(
          credentials.password as string,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("パスワードが違います");
        }

        return { ...user };
      },
    }),
  ],
  basePath: "/api/auth",
  callbacks: {
    authorized({ auth }) {
      return !!auth;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        const u = user as any;
        token.role = u.role;
      }

      return token;
    },
    session: ({ session, token }) => {
      session.user.role = token.role as string;
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/signin",
    newUser: "/signup",
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
