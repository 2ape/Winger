import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { insertVideo } from "@/lib/db"; // You must implement this function

export const runtime = "nodejs"; // Enable Node.js APIs for file system access

export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get("videoFile") as File | null;
    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;

    if (!file || !title) {
        return NextResponse.json({ error: "Missing file or title" }, { status: 400 });
    }

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), "uploads");
    await mkdir(uploadsDir, { recursive: true });

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
    const filepath = path.join(uploadsDir, filename);
    await writeFile(filepath, buffer);

    // Save metadata to DB
    await insertVideo({
        title,
        description,
        filename,
        uploadedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, filename });
}