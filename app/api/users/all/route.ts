import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";

// 全ユーザー取得API
export const GET = async () => {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json({ users }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
