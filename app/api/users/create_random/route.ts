import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

// ユーザーランダム生成API
export const POST = auth(async (req) => {
  try {
    if (!req.auth || req.auth.user?.role !== "ADMIN")
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { amount } = await req.json();

    for (let i = 0; i < amount; i++) {
      const email = `${Math.random().toString(36).slice(2)}@metro.ed.jp`;
      const name = `test-user-${Math.random().toString(36).slice(2)}`;
      const password = "password";
      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.create({
        data: {
          email,
          name,
          role: "STUDENT",
          hashedPassword,
          image: "",
        },
      });
    }

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
});
