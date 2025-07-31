import { NextResponse } from 'next/server';
import { upload } from '@/lib/multer-config';
import { openDb } from '@/lib/db';
import crypto from 'crypto';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(request: Request) {
    try {
        // Use multer middleware
        const formData = await request.formData();
        const file = formData.get('videoFile') as File;
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;

        if (!file || !title) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const filename = `${crypto.randomUUID()}${file.name}`;
        const videoId = crypto.randomUUID();
        const uploadedAt = new Date().toISOString();

        // Save to database
        const db = await openDb();
        try {
            await db.run(
                `INSERT INTO videos (
          id, title, description, filename, uploadedAt, 
          channelName, subscriberCount, channelAvatarSrc, 
          views, likes, dislikes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    videoId,
                    title,
                    description,
                    filename,
                    uploadedAt,
                    'Anonymous',
                    '0',
                    '/placeholder.svg?height=48&width=48',
                    '0',
                    '0',
                    '0'
                ]
            );

            // Save file to disk
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const filePath = `public/uploads/${filename}`;
            await Bun.write(filePath, buffer);

            return NextResponse.json({
                success: true,
                videoId,
                filename,
            });
        } finally {
            await db.close();
        }
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Failed to upload video' },
            { status: 500 }
        );
    }
}