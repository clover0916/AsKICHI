import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

// ユーザー新規登録API
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { name, email, password } = await req.json();

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser)
      return NextResponse.json(
        { message: "すでに登録されています" },
        { status: 422 }
      );

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        role: "STUDENT",
        hashedPassword,
        image: "",
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
