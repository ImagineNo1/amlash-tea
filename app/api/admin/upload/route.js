import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { getCurrentAdmin, ensureDefaultAdmin } from "@/lib/auth";
import { getDb } from "@/lib/mongodb";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) return null;
  await ensureDefaultAdmin();
  return admin;
}

export async function POST(request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file || typeof file === "string") {
      return NextResponse.json({ message: "لطفاً یک فایل تصویر انتخاب کنید." }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ message: "فقط فرمت‌های JPG، PNG، WEBP و GIF مجاز هستند." }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ message: "حجم تصویر باید کمتر از ۵ مگابایت باشد." }, { status: 400 });
    }

    const id = randomUUID();
    const bytes = Buffer.from(await file.arrayBuffer());
    const db = await getDb();

    await db.collection("uploaded_images").insertOne({
      _id: id,
      filename: file.name || `${id}.image`,
      contentType: file.type,
      size: file.size,
      data: bytes,
      createdBy: admin.username || admin.sub || "admin",
      createdAt: new Date(),
    });

    return NextResponse.json({ url: `/api/uploads/${id}` });
  } catch (error) {
    return NextResponse.json({ message: error.message || "آپلود تصویر ناموفق بود." }, { status: 400 });
  }
}
