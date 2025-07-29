import { YouTubeHeader } from "@/components/youtube-header"
import { VideoPlayer } from "@/components/video-player"
import { ChannelActions } from "@/components/channel-actions"
import { RecommendedVideoCard } from "@/components/recommended-video-card"
import { getVideos, type VideoMetadata } from "@/lib/db"

interface HomePageProps {
  searchParams: {
    v?: string // Video ID
    t?: string // Time in seconds
  }
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const videos = await getVideos()
  const videoId = searchParams.v
  const initialTime = searchParams.t ? Number.parseFloat(searchParams.t) : 0

  let currentVideo: VideoMetadata | undefined

  if (videoId) {
    currentVideo = videos.find((video) => video.id === videoId)
  } else if (videos.length > 0) {
    // If no video ID is provided, default to the first video
    currentVideo = videos[0]
  }

  if (!currentVideo) {
    // If no video is found or no videos exist, you might want to show a different UI
    // For now, we'll just return a message or redirect
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
        <YouTubeHeader />
        <h1 className="text-2xl font-bold mt-8">No video found.</h1>
        <p className="text-muted-foreground mt-2">Please upload a video or check the video ID.</p>
        <div className="mt-8">
          <h2 className="text-lg font-medium text-foreground mb-4 px-1">Available Videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.map((video) => (
              <RecommendedVideoCard
                key={video.id}
                id={video.id}
                thumbnailUrl={video.thumbnailUrl}
                title={video.title}
                channelName={video.channelName}
                views={video.views}
                uploadTime={video.uploadDate}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  const recommendedVideos = videos.filter((video) => video.id !== currentVideo?.id)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <YouTubeHeader />
      <main className="container mx-auto py-6 px-4 md:px-6 lg:px-8 max-w-[1700px]">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
          <div className="flex flex-col">
            <VideoPlayer
              src={currentVideo.src}
              captionsSrc={currentVideo.captionsSrc}
              title={currentVideo.title}
              views={currentVideo.views}
              uploadDate={currentVideo.uploadDate}
              description={currentVideo.description}
              thumbnailUrl={currentVideo.thumbnailUrl}
              initialTime={initialTime}
            />
            <ChannelActions
              channelName={currentVideo.channelName}
              subscriberCount={currentVideo.subscriberCount}
              channelAvatarSrc={currentVideo.channelAvatarSrc}
              likes={currentVideo.likes}
              dislikes={currentVideo.dislikes}
            />
          </div>
          <aside className="lg:col-span-1">
            <h2 className="text-lg font-medium text-foreground mb-4 px-1">Up Next</h2>
            <div className="flex flex-col gap-3">
              {recommendedVideos.map((video) => (
                <RecommendedVideoCard
                  key={video.id}
                  id={video.id}
                  thumbnailUrl={video.thumbnailUrl}
                  title={video.title}
                  channelName={video.channelName}
                  views={video.views}
                  uploadTime={video.uploadDate}
                />
              ))}
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
