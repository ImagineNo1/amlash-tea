import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { getCurrentAdmin, ensureDefaultAdmin } from "@/lib/auth";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Map([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
]);

async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) return null;
  await ensureDefaultAdmin();
  return admin;
}

function getSafeExtension(file) {
  const mimeExtension = ALLOWED_TYPES.get(file.type);
  if (mimeExtension) return mimeExtension;

  const originalExtension = path.extname(file.name || "").toLowerCase();
  return [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(originalExtension) ? originalExtension : "";
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

    const extension = getSafeExtension(file);
    const filename = `${Date.now()}-${randomUUID()}${extension}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const bytes = await file.arrayBuffer();

    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), Buffer.from(bytes));

    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    return NextResponse.json({ message: error.message || "آپلود تصویر ناموفق بود." }, { status: 400 });
  }
}
