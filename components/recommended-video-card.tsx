import Image from "next/image"
import Link from "next/link"

interface RecommendedVideoCardProps {
  id: string // Added video ID
  thumbnailUrl: string // Changed from thumbnailSrc
  title: string
  channelName: string
  views: string
  uploadTime: string
}

export function RecommendedVideoCard({
  id,
  thumbnailUrl,
  title,
  channelName,
  views,
  uploadTime,
}: RecommendedVideoCardProps) {
  return (
    <Link
      href={`/?v=${id}`}
      className="flex gap-3 group rounded-md hover:bg-accent p-2 transition-colors"
      prefetch={false}
    >
      <div className="relative w-[168px] h-[94px] flex-shrink-0 rounded-sm overflow-hidden">
        <Image
          src={thumbnailUrl || "/placeholder.svg"}
          alt={`Thumbnail for ${title}`}
          width={168}
          height={94}
          className="object-cover w-full h-full rounded-sm"
        />
      </div>
      <div className="flex flex-col">
        <h3 className="text-sm font-medium text-foreground leading-tight group-hover:text-blue-600 line-clamp-2">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">{channelName}</p>
        <p className="text-xs text-muted-foreground">
          {views} views • {uploadTime}
        </p>
      </div>
    </Link>
  )
}
