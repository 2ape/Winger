import { NextRequest, NextResponse } from "next/server";
import { insertVideo } from "@/lib/db";
import path from "path";
import { mkdir } from "fs/promises";

import nc from "next-connect";
import { upload } from "@/middleware/upload";
import type { NextApiRequest, NextApiResponse } from "next";

// Create uploads folder if not exists
await mkdir(path.join(process.cwd(), "uploads"), { recursive: true });

export const runtime = "nodejs"; // Ensure Node.js APIs are available

// Wrap multer in a Node-style handler
const handler = nc<NextApiRequest, NextApiResponse>({
    onError(err, req, res) {
        res.status(500).json({ error: `Error: ${err.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: "Method not allowed" });
    },
});

handler.use(upload.single("videoFile"));

handler.post(async (req, res) => {
    const file = req.file;
    const { title, description } = req.body;

    if (!file || !title) {
        return res.status(400).json({ error: "Missing video or title" });
    }

    await insertVideo({
        title,
        description,
        filename: file.filename,
        uploadedAt: new Date().toISOString(),
    });

    return res.status(200).json({ success: true, filename: file.filename });
});

export async function POST(req: NextRequest) {
    // Custom stream adapter
    const readable = req.body as any;

    const buffers = [];
    for await (const chunk of readable) {
        buffers.push(chunk);
    }

    const body = Buffer.concat(buffers);
    const res = new Response();

    const fakeReq = new Request(req.url, {
        method: "POST",
        headers: req.headers,
        body,
    }) as any;

    return new Promise((resolve) => {
        const fakeRes = {
            status: (code: number) => {
                res.status = code;
                return fakeRes;
            },
            json: (data: any) => {
                resolve(NextResponse.json(data, { status: res.status || 200 }));
            },
        } as any;

        handler(fakeReq, fakeRes);
    });
}
