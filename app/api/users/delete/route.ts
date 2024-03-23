import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

// ユーザー消去API
export const POST = auth(async (req) => {
  try {
    if (!req.auth || req.auth.user?.role !== "ADMIN")
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "IDが指定されていません" },
        { status: 400 }
      );
    }

    const user = await prisma.user.delete({
      where: { id: id },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
});
