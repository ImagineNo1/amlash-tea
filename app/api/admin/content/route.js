import { NextResponse } from "next/server";
import { getCurrentAdmin, ensureDefaultAdmin } from "@/lib/auth";
import { getSiteContent, saveSiteContent } from "@/lib/content";

async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) return null;
  await ensureDefaultAdmin();
  return admin;
}

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const content = await getSiteContent();
  return NextResponse.json({ content });
}

export async function PUT(request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  try {
    const { content } = await request.json();
    const saved = await saveSiteContent(content);
    return NextResponse.json({ content: saved });
  } catch (error) {
    return NextResponse.json({ message: error.message || "خطای ذخیره‌سازی" }, { status: 400 });
  }
}
