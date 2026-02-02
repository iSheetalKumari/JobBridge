import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    // client should send base64 file contents or form-data — here we accept base64 JSON for simplicity
    const body = await req.json();
    const { filename, data } = body; // data is base64
    const buffer = Buffer.from(data, "base64");
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, buffer);
    const url = `/uploads/${filename}`; // serve from public
    return NextResponse.json({ url }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
