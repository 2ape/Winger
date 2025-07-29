import { promises as fs } from "fs"
import path from "path"

export interface VideoMetadata {
  id: string
  title: string
  description: string
  src: string
  captionsSrc?: string
  thumbnailUrl: string
  views: string
  uploadDate: string
  channelName: string
  subscriberCount: string
  channelAvatarSrc: string
  likes: string
  dislikes: string
}

const DB_FILE_PATH = path.join(process.cwd(), "data", "videos.json")

export async function getVideos(): Promise<VideoMetadata[]> {
  try {
    const fileContents = await fs.readFile(DB_FILE_PATH, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      // File does not exist, return empty array
      return []
    }
    console.error("Error reading videos.json:", error)
    throw error
  }
}

export async function addVideo(newVideo: VideoMetadata): Promise<void> {
  const videos = await getVideos()
  videos.push(newVideo)
  await fs.writeFile(DB_FILE_PATH, JSON.stringify(videos, null, 2), "utf8")
}

export async function getVideoById(id: string): Promise<VideoMetadata | undefined> {
  const videos = await getVideos()
  return videos.find((video) => video.id === id)
}
