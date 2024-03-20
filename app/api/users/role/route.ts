import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { NextApiResponse } from "next";

// ユーザーロール変更API
export const POST = async (req: Request, res: NextApiResponse) => {
  try {
    const { id, role } = await req.json();

    const user = await prisma.user.update({
      where: { id: id },
      data: { role },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};
