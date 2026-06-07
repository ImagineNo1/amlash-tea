import { NextResponse } from "next/server";
import { createToken, ensureDefaultAdmin, setSessionCookie, verifyPassword } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";

export async function POST(request) {
  try {
    await ensureDefaultAdmin();
    const { username, password } = await request.json();
    const db = await getDb();
    const user = await db.collection("admin_users").findOne({ username });
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json({ message: "نام کاربری یا رمز عبور اشتباه است" }, { status: 401 });
    }
    const token = createToken({ sub: String(user._id), username: user.username, role: user.role });
    await db.collection("admin_users").updateOne({ _id: user._id }, { $set: { lastLoginAt: new Date() } });

    const response = NextResponse.json({ ok: true });
    setSessionCookie(token, response);
    return response;
  } catch (error) {
    return NextResponse.json({ message: error.message || "خطای ورود" }, { status: 500 });
  }
}
