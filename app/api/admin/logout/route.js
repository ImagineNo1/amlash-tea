import { NextResponse } from "next/server";
import { clearSessionCookie, shouldUseSecureCookie } from "@/lib/auth";

export async function POST(request) {
  const response = NextResponse.json({ ok: true });
  clearSessionCookie(response, { secure: shouldUseSecureCookie(request) });
  return response;
}
