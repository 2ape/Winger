"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ThumbsUpIcon, ThumbsDownIcon, Share2Icon, SaveIcon, MoreHorizontalIcon } from "lucide-react"

interface ChannelActionsProps {
  channelName: string
  subscriberCount: string
  channelAvatarSrc: string
  likes: string
  dislikes: string
}

export function ChannelActions({
  channelName,
  subscriberCount,
  channelAvatarSrc,
  likes,
  dislikes,
}: ChannelActionsProps) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-sm mt-6 border border-border">
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <Avatar className="h-12 w-12">
          <AvatarImage src={channelAvatarSrc || "/placeholder.svg"} alt={`${channelName} avatar`} />
          <AvatarFallback>{channelName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-base font-medium text-foreground">{channelName}</h3>
          <p className="text-sm text-muted-foreground">{subscriberCount} subscribers</p>
        </div>
        <Button className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-md uppercase text-sm">
          Subscribe
        </Button>
      </div>
      <div className="flex items-center justify-end gap-2 flex-wrap">
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium bg-muted hover:bg-accent"
        >
          <ThumbsUpIcon className="h-5 w-5 text-muted-foreground" />
          <span>{likes}</span>
        </Button>
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium bg-muted hover:bg-accent"
        >
          <ThumbsDownIcon className="h-5 w-5 text-muted-foreground" />
          <span>{dislikes}</span>
        </Button>
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium bg-muted hover:bg-accent"
        >
          <Share2Icon className="h-5 w-5 text-muted-foreground" />
          <span>Share</span>
        </Button>
        <Button
          variant="ghost"
          className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium bg-muted hover:bg-accent"
        >
          <SaveIcon className="h-5 w-5 text-muted-foreground" />
          <span>Save</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-md bg-muted hover:bg-accent">
          <MoreHorizontalIcon className="h-5 w-5 text-muted-foreground" />
          <span className="sr-only">More actions</span>
        </Button>
      </div>
    </div>
  )
}
