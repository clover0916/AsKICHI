import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

const VALID_ROLES = ["ADMIN", "TEACHER", "STUDENT"] as const;

type Role = (typeof VALID_ROLES)[number];

// ユーザー情報更新API（管理者側）
export const POST = auth(async (req) => {
  try {
    if (!req.auth || req.auth.user?.role !== "ADMIN")
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const {
      id,
      name,
      password,
      email,
      role,
    }: {
      id: string;
      name?: string;
      password?: string;
      email?: string;
      role?: Role;
    } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "id is required" }, { status: 400 });
    }

    const data: {
      name?: string;
      hashedPassword?: string;
      email?: string;
      role?: Role;
    } = {};

    if (name) {
      data.name = name;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      data.hashedPassword = hashedPassword;
    }

    if (email) {
      data.email = email;
    }

    if (role && VALID_ROLES.includes(role)) {
      data.role = role;
    } else if (role) {
      return NextResponse.json({ message: "Invalid role" }, { status: 400 });
    }

    await prisma.user.update({
      where: { id },
      data,
    });

    return NextResponse.json({ message: "User updated" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
});
