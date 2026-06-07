import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

function toBuffer(data) {
  if (Buffer.isBuffer(data)) return data;
  if (data?.buffer) return Buffer.from(data.buffer);
  if (typeof data?.value === "function") return Buffer.from(data.value());
  return null;
}

export async function GET(_request, { params }) {
  try {
    const db = await getDb();
    const image = await db.collection("uploaded_images").findOne({ _id: params.id });
    const buffer = toBuffer(image?.data);

    if (!image || !buffer) {
      return NextResponse.json({ message: "Image not found" }, { status: 404 });
    }

    return new Response(buffer, {
      headers: {
        "Content-Type": image.contentType || "application/octet-stream",
        "Content-Length": String(buffer.length),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    return NextResponse.json({ message: error.message || "Image not found" }, { status: 404 });
  }
}
