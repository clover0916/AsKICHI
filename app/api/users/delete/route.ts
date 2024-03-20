import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

// ユーザー消去API
export const POST = async (req: Request, res: NextApiResponse) => {
  try {
    const { id } = await req.json();

    const user = await prisma.user.delete({
      where: { id: id },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
