import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { createToken, ensureDefaultAdmin, getAuthDebugInfo, setSessionCookie, shouldUseSecureCookie, verifyPassword } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";

export async function POST(request) {
  const requestId = randomUUID();
  let debugInfo = null;

  try {
    const secure = shouldUseSecureCookie(request);
    debugInfo = { requestId, ...getAuthDebugInfo(request, { secure, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 }) };
    console.info("[admin-login] started", debugInfo);

    await ensureDefaultAdmin();
    const { username, password } = await request.json();
    const db = await getDb();
    const user = await db.collection("admin_users").findOne({ username });
    if (!user || !verifyPassword(password, user.passwordHash)) {
      console.warn("[admin-login] invalid credentials", { requestId, username });
      return NextResponse.json({ message: "نام کاربری یا رمز عبور اشتباه است", debug: debugInfo }, { status: 401 });
    }
    const token = createToken({ sub: String(user._id), username: user.username, role: user.role });
    await db.collection("admin_users").updateOne({ _id: user._id }, { $set: { lastLoginAt: new Date() } });

    const response = NextResponse.json({ ok: true, debug: debugInfo });
    setSessionCookie(token, response, { secure });
    console.info("[admin-login] succeeded", { requestId, username: user.username, cookieSecure: secure });
    return response;
  } catch (error) {
    console.error("[admin-login] failed", { requestId, message: error.message, stack: error.stack });
    return NextResponse.json({ message: error.message || "خطای ورود", debug: debugInfo || { requestId } }, { status: 500 });
  }
}
