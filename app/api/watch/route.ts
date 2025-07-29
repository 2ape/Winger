import { type NextRequest, NextResponse } from "next/server"
import { getVideoById } from "@/lib/db"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const videoId = searchParams.get("v")
  const time = searchParams.get("t") // Optional time parameter

  if (!videoId) {
    return NextResponse.json({ error: "Video ID is required" }, { status: 400 })
  }

  const video = await getVideoById(videoId)

  if (!video) {
    return NextResponse.json({ error: "Video not found" }, { status: 404 })
  }

  // In a real application, you might use the 'time' parameter to
  // serve a video segment or adjust playback on the client side.
  // For this example, we'll just pass it along if needed by the client.
  const responseData = {
    ...video,
    initialTime: time ? Number.parseFloat(time) : undefined,
  }

  return NextResponse.json(responseData)
}
