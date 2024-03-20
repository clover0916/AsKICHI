import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

// 全ユーザー取得API
export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const users = await prisma.user.findMany();

    return NextResponse.json({ users }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
