"use server"

import { put } from "@vercel/blob"
import { addVideo, type VideoMetadata } from "@/lib/db"
import { v4 as uuidv4 } from "uuid"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function uploadVideoAndMetadata(formData: FormData) {
  const videoFile = formData.get("videoFile") as File
  const title = formData.get("title") as string
  const description = formData.get("description") as string

  if (!videoFile || !title || !description) {
    return { error: "Missing required fields: video file, title, or description." }
  }

  if (videoFile.size === 0) {
    return { error: "Uploaded video file is empty." }
  }

  try {
    // Upload video to Vercel Blob
    const blob = await put(videoFile.name, videoFile, {
      access: "public",
      addRandomSuffix: true,
    })

    const newVideo: VideoMetadata = {
      id: uuidv4(), // Generate a unique ID for the video
      title,
      description,
      src: blob.url, // URL from Vercel Blob
      // For simplicity, captions are not uploaded via form, using a default placeholder
      // In a real app, you'd upload a .vtt file similarly
      captionsSrc: undefined, // No captions for uploaded videos by default
      thumbnailUrl: `/placeholder.svg?height=360&width=640&text=${encodeURIComponent(title)}`, // Placeholder thumbnail
      views: "0", // New videos start with 0 views
      uploadDate: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      channelName: "Your Channel", // Default channel name
      subscriberCount: "0", // Default subscribers
      likes: "0",
      dislikes: "0",
    }

    await addVideo(newVideo)

    revalidatePath("/") // Revalidate the home page to show new video
    revalidatePath("/upload") // Revalidate the upload page if needed
    redirect(`/?v=${newVideo.id}`) // Redirect to the new video's page
  } catch (error) {
    console.error("Error uploading video:", error)
    return { error: "Failed to upload video. Please try again." }
  }
}
