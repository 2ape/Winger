"use client"

import type React from "react"

import { useState } from "react"
import { YouTubeHeader } from "@/components/youtube-header"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { uploadVideoAndMetadata } from "@/app/actions"
import { Loader2Icon } from "lucide-react"

export default function UploadPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsUploading(true)

    if (!videoFile) {
      setError("Please select a video file.")
      setIsUploading(false)
      return
    }

    const formData = new FormData()
    formData.append("videoFile", videoFile)
    formData.append("title", title)
    formData.append("description", description)

    const result = await uploadVideoAndMetadata(formData)

    if (result?.error) {
      setError(result.error)
    } else {
      setSuccess("Video uploaded successfully!")
      setTitle("")
      setDescription("")
      setVideoFile(null)
      // File input needs to be reset manually
      const fileInput = document.getElementById("videoFile") as HTMLInputElement
      if (fileInput) fileInput.value = ""
    }
    setIsUploading(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <YouTubeHeader />
      <main className="container mx-auto py-8 px-4 md:px-6 lg:px-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Upload New Video</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-lg shadow-sm border border-border">
          <div>
            <label htmlFor="videoFile" className="block text-sm font-medium text-foreground mb-2">
              Video File
            </label>
            <Input
              id="videoFile"
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files ? e.target.files[0] : null)}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              required
            />
          </div>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
              Title
            </label>
            <Input
              id="title"
              type="text"
              placeholder="Enter video title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Enter video description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              required
            />
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <Button type="submit" className="w-full" disabled={isUploading}>
            {isUploading ? (
              <>
                <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload Video"
            )}
          </Button>
        </form>
      </main>
    </div>
  )
}
