import { auth } from "auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  if (
    !(req.auth?.user.role === "admin") &&
    req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
});

export const config = {
  // api と signin は未認証でも使いたいので弾く
  // _next は web フォントの読み込み等でも middleware が反応していたので除外してみた
  matcher: ["/((?!stream|api|signin|signup|_next|faq).*)"],
};
