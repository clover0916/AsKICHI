import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { auth } from "auth";
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

// ユーザー情報更新API（ユーザー側）
export const POST = auth(async (req) => {
  try {
    if (!req.auth)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { name, old_password, new_password } = await req.json();

    if (!req.auth?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: req.auth.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "ユーザーが存在しません" },
        { status: 404 }
      );
    }

    console.log("user", user);

    // nameがある場合は更新
    if (name) {
      await prisma.user.update({
        where: { email: req.auth.user.email },
        data: { name },
      });
    }

    // old_password, new_passwordがある場合はパスワード更新
    if (old_password && new_password) {
      const isPasswordValid = await bcrypt.compare(
        old_password,
        user?.hashedPassword
      );

      if (!isPasswordValid) {
        return NextResponse.json(
          { message: "パスワードが間違っています" },
          { status: 422 }
        );
      }

      const hashedPassword = await bcrypt.hash(new_password, 12);

      await prisma.user.update({
        where: { email: req.auth.user.email },
        data: { hashedPassword },
      });
    }

    return NextResponse.json({ message: "OK" }, { status: 200 });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
});
