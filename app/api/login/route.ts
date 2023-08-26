import { NextResponse } from "next/server";

const password = "123456";

export async function POST(request: Request) {
  const body = await request.json();

  const pass = body.password;

  if (pass == password) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
