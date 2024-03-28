import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

// ユーザー一括削除API
export const POST = auth(async (req) => {
  try {
    if (!req.auth || req.auth.user?.role !== "ADMIN")
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { ids } = await req.json();

    if (!ids) {
      return NextResponse.json(
        { message: "IDが指定されていません" },
        { status: 400 }
      );
    }

    const users = await prisma.user.deleteMany({
      where: { id: { in: ids } },
    });

    return NextResponse.json({ users });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
});
