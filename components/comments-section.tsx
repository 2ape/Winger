"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { CommentCard } from "./comment-card" // Import CommentCard component

interface Comment {
  id: string
  author: string
  time: string
  text: string
  authorAvatarSrc: string
  likes: number
  dislikes: number
}

interface CommentsSectionProps {
  commentCount: number
  comments: Comment[]
  userAvatarSrc: string
}

export function CommentsSection({ commentCount, comments, userAvatarSrc }: CommentsSectionProps) {
  return (
    <div className="mt-8 px-1">
      <h2 className="text-lg font-medium text-foreground mb-4">
        Comments <span className="text-muted-foreground font-normal">({commentCount})</span>
      </h2>
      <div className="flex items-center gap-4 mb-6">
        <Avatar className="h-10 w-10">
          <AvatarImage src={userAvatarSrc || "/placeholder.svg"} alt="User Avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <Input
          type="text"
          placeholder="Add a comment..."
          className="flex-1 border-b border-input focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-0 py-2 bg-transparent"
          aria-label="Add a comment"
        />
      </div>
      <div className="flex flex-col gap-6">
        {comments.map((comment) => (
          <CommentCard key={comment.id} {...comment} />
        ))}
      </div>
    </div>
  )
}
