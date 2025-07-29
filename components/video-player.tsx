"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import {
  PlayIcon,
  PauseIcon,
  Volume2Icon,
  Volume1Icon,
  VolumeXIcon,
  MaximizeIcon,
  MinimizeIcon,
  PictureInPicture2Icon,
  SubtitlesIcon,
  SquareStackIcon,
  RectangleHorizontalIcon,
} from "lucide-react"

interface VideoPlayerProps {
  src: string
  captionsSrc?: string
  title: string
  views: string
  uploadDate: string
  description: string // Added description prop
  thumbnailUrl: string // Changed from previewImgBaseUrl
  initialTime?: number // Added initialTime prop
}

export function VideoPlayer({
  src,
  captionsSrc,
  title,
  views,
  uploadDate,
  description,
  thumbnailUrl,
  initialTime = 0,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const timelineContainerRef = useRef<HTMLDivElement>(null)
  const previewImgRef = useRef<HTMLImageElement>(null)
  const thumbnailImgRef = useRef<HTMLImageElement>(null)

  const [paused, setPaused] = useState(true)
  const [volumeLevel, setVolumeLevel] = useState<"high" | "low" | "muted">("high")
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [captionsEnabled, setCaptionsEnabled] = useState(false)
  const [theaterMode, setTheaterMode] = useState(false)
  const [fullScreenMode, setFullScreenMode] = useState(false)
  const [miniPlayerMode, setMiniPlayerMode] = useState(false)
  const [isScrubbing, setIsScrubbing] = useState(false)
  const [wasPaused, setWasPaused] = useState(true)

  const formatDuration = useCallback((time: number) => {
    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60) % 60
    const hours = Math.floor(time / 3600)
    const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
      minimumIntegerDigits: 2,
    })

    if (hours === 0) {
      return `${minutes}:${leadingZeroFormatter.format(seconds)}`
    } else {
      return `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`
    }
  }, [])

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause()
    }
  }, [])

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
    }
  }, [])

  const changePlaybackSpeed = useCallback(() => {
    if (videoRef.current) {
      let newPlaybackRate = videoRef.current.playbackRate + 0.25
      if (newPlaybackRate > 2) newPlaybackRate = 0.25
      videoRef.current.playbackRate = newPlaybackRate
      setPlaybackRate(newPlaybackRate)
    }
  }, [])

  const toggleCaptions = useCallback(() => {
    if (videoRef.current) {
      const captionsTrack = videoRef.current.textTracks[0]
      if (captionsTrack) {
        const isHidden = captionsTrack.mode === "hidden"
        captionsTrack.mode = isHidden ? "showing" : "hidden"
        setCaptionsEnabled(isHidden)
      }
    }
  }, [])

  const toggleTheaterMode = useCallback(() => {
    setTheaterMode((prev) => !prev)
  }, [])

  const toggleFullScreenMode = useCallback(() => {
    if (document.fullscreenElement == null) {
      videoContainerRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }, [])

  const toggleMiniPlayerMode = useCallback(() => {
    if (videoContainerRef.current?.classList.contains("mini-player")) {
      document.exitPictureInPicture()
    } else {
      videoRef.current?.requestPictureInPicture()
    }
  }, [])

  const skip = useCallback((duration: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += duration
    }
  }, [])

  const handleTimelineUpdate = useCallback(
    (e: MouseEvent) => {
      if (!timelineContainerRef.current || !videoRef.current) return

      const rect = timelineContainerRef.current.getBoundingClientRect()
      const percent = Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width
      // For preview images, we'll use a generic placeholder for now.
      // In a real app, you'd generate these from the video on the server.
      const previewImgSrc = `/placeholder.svg?height=80&width=142&text=Preview+${Math.floor(percent * 100)}%`

      if (previewImgRef.current) {
        previewImgRef.current.src = previewImgSrc
      }
      timelineContainerRef.current.style.setProperty("--preview-position", percent.toString())

      if (isScrubbing) {
        e.preventDefault()
        if (thumbnailImgRef.current) {
          thumbnailImgRef.current.src = previewImgSrc
        }
        timelineContainerRef.current.style.setProperty("--progress-position", percent.toString())
      }
    },
    [isScrubbing],
  )

  const toggleScrubbing = useCallback(
    (e: MouseEvent) => {
      if (!timelineContainerRef.current || !videoRef.current) return

      const rect = timelineContainerRef.current.getBoundingClientRect()
      const percent = Math.min(Math.max(0, e.clientX - rect.x), rect.width) / rect.width
      const scrubbingActive = (e.buttons & 1) === 1

      setIsScrubbing(scrubbingActive)
      videoContainerRef.current?.classList.toggle("scrubbing", scrubbingActive)

      if (scrubbingActive) {
        setWasPaused(videoRef.current.paused)
        videoRef.current.pause()
      } else {
        videoRef.current.currentTime = percent * videoRef.current.duration
        if (!wasPaused) videoRef.current.play()
      }

      handleTimelineUpdate(e)
    },
    [wasPaused, handleTimelineUpdate],
  )

  useEffect(() => {
    const videoElement = videoRef.current
    const timelineContainerElement = timelineContainerRef.current
    const videoContainerElement = videoContainerRef.current

    if (!videoElement || !timelineContainerElement || !videoContainerElement) return

    // Set initial time if provided
    videoElement.currentTime = initialTime

    // Video Event Listeners
    const handlePlay = () => setPaused(false)
    const handlePause = () => setPaused(true)
    const handleLoadedData = () => setTotalTime(videoElement.duration)
    const handleTimeUpdate = () => setCurrentTime(videoElement.currentTime)
    const handleVolumeChange = () => {
      setVolume(videoElement.volume)
      let level: "high" | "low" | "muted"
      if (videoElement.muted || videoElement.volume === 0) {
        level = "muted"
      } else if (videoElement.volume >= 0.5) {
        level = "high"
      } else {
        level = "low"
      }
      setVolumeLevel(level)
    }
    const handleEnterPiP = () => setMiniPlayerMode(true)
    const handleLeavePiP = () => setMiniPlayerMode(false)

    videoElement.addEventListener("play", handlePlay)
    videoElement.addEventListener("pause", handlePause)
    videoElement.addEventListener("loadeddata", handleLoadedData)
    videoElement.addEventListener("timeupdate", handleTimeUpdate)
    videoElement.addEventListener("volumechange", handleVolumeChange)
    videoElement.addEventListener("enterpictureinpicture", handleEnterPiP)
    videoElement.addEventListener("leavepictureinpicture", handleLeavePiP)

    // Document Event Listeners for scrubbing and keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      const tagName = document.activeElement?.tagName.toLowerCase()
      if (tagName === "input") return

      switch (e.key.toLowerCase()) {
        case " ":
          if (tagName === "button") return
        case "k":
          togglePlay()
          break
        case "f":
          toggleFullScreenMode()
          break
        case "t":
          toggleTheaterMode()
          break
        case "i":
          toggleMiniPlayerMode()
          break
        case "m":
          toggleMute()
          break
        case "arrowleft":
        case "j":
          skip(-5)
          break
        case "arrowright":
        case "l":
          skip(5)
          break
        case "c":
          toggleCaptions()
          break
      }
    }

    const handleMouseUp = (e: MouseEvent) => {
      if (isScrubbing) toggleScrubbing(e)
    }
    const handleMouseMove = (e: MouseEvent) => {
      if (isScrubbing) handleTimelineUpdate(e)
    }
    const handleFullScreenChange = () => {
      setFullScreenMode(document.fullscreenElement != null)
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("fullscreenchange", handleFullScreenChange)

    // Timeline event listeners
    timelineContainerElement.addEventListener("mousemove", handleTimelineUpdate)
    timelineContainerElement.addEventListener("mousedown", toggleScrubbing)

    // Initial setup for captions
    const captionsTrack = videoElement.textTracks[0]
    if (captionsTrack) {
      captionsTrack.mode = "hidden"
      setCaptionsEnabled(false)
    }

    // Cleanup
    return () => {
      videoElement.removeEventListener("play", handlePlay)
      videoElement.removeEventListener("pause", handlePause)
      videoElement.removeEventListener("loadeddata", handleLoadedData)
      videoElement.removeEventListener("timeupdate", handleTimeUpdate)
      videoElement.removeEventListener("volumechange", handleVolumeChange)
      videoElement.removeEventListener("enterpictureinpicture", handleEnterPiP)
      videoElement.removeEventListener("leavepictureinpicture", handleLeavePiP)

      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("fullscreenchange", handleFullScreenChange)

      timelineContainerElement.removeEventListener("mousemove", handleTimelineUpdate)
      timelineContainerElement.removeEventListener("mousedown", toggleScrubbing)
    }
  }, [
    isScrubbing,
    toggleScrubbing,
    handleTimelineUpdate,
    togglePlay,
    toggleFullScreenMode,
    toggleTheaterMode,
    toggleMiniPlayerMode,
    toggleMute,
    skip,
    toggleCaptions,
    initialTime, // Added initialTime to dependencies
  ])

  return (
    <div className="w-full">
      <div
        ref={videoContainerRef}
        className={`video-container rounded-lg overflow-hidden ${paused ? "paused" : ""} ${theaterMode ? "theater" : ""} ${
          fullScreenMode ? "full-screen" : ""
        } ${miniPlayerMode ? "mini-player" : ""} ${
          captionsEnabled ? "captions" : ""
        } ${isScrubbing ? "scrubbing" : ""}`}
        data-volume-level={volumeLevel}
      >
        <img
          ref={thumbnailImgRef}
          className="thumbnail-img"
          src={thumbnailUrl || "/placeholder.svg"}
          alt="Video thumbnail"
        />
        <div className="video-controls-container">
          <div ref={timelineContainerRef} className="timeline-container">
            <div className="timeline">
              <img ref={previewImgRef} className="preview-img" alt="Video preview" />
              <div className="thumb-indicator"></div>
            </div>
          </div>
          <div className="controls">
            <button className="play-pause-btn" onClick={togglePlay} aria-label="Play/Pause">
              {paused ? <PlayIcon className="play-icon" /> : <PauseIcon className="pause-icon" />}
            </button>
            <div className="volume-container">
              <button className="mute-btn" onClick={toggleMute} aria-label="Mute/Unmute">
                {volumeLevel === "high" && <Volume2Icon className="volume-high-icon" />}
                {volumeLevel === "low" && <Volume1Icon className="volume-low-icon" />}
                {volumeLevel === "muted" && <VolumeXIcon className="volume-muted-icon" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="any"
                value={volume}
                onChange={(e) => {
                  if (videoRef.current) {
                    videoRef.current.volume = Number.parseFloat(e.target.value)
                    videoRef.current.muted = Number.parseFloat(e.target.value) === 0
                  }
                }}
                className="volume-slider"
                aria-label="Volume slider"
              />
            </div>
            <div className="duration-container">
              <div className="current-time">{formatDuration(currentTime)}</div>/
              <div className="total-time">{formatDuration(totalTime)}</div>
            </div>
            {captionsSrc && (
              <button className="captions-btn" onClick={toggleCaptions} aria-label="Toggle captions">
                <SubtitlesIcon />
              </button>
            )}
            <button className="speed-btn wide-btn" onClick={changePlaybackSpeed} aria-label="Playback speed">
              {playbackRate}x
            </button>
            <button className="mini-player-btn" onClick={toggleMiniPlayerMode} aria-label="Miniplayer mode">
              <PictureInPicture2Icon />
            </button>
            <button className="theater-btn" onClick={toggleTheaterMode} aria-label="Theater mode">
              {theaterMode ? <RectangleHorizontalIcon className="wide" /> : <SquareStackIcon className="tall" />}
            </button>
            <button className="full-screen-btn" onClick={toggleFullScreenMode} aria-label="Full screen mode">
              {fullScreenMode ? <MinimizeIcon className="close" /> : <MaximizeIcon className="open" />}
            </button>
          </div>
        </div>
        <video ref={videoRef} src={src}>
          {captionsSrc && <track kind="captions" srcLang="en" src={captionsSrc} />}
          Your browser does not support the video tag.
        </video>
      </div>
      {/* Segregated Video Details Section */}
      <div className="bg-card p-6 rounded-lg shadow-sm mt-6 border border-border">
        <h1 className="text-xl md:text-2xl font-semibold text-foreground mb-1 leading-tight">{title}</h1>
        <p className="text-sm text-muted-foreground mb-4">
          {views} views • {uploadDate}
        </p>
        <p className="text-sm text-foreground whitespace-pre-wrap">{description}</p>
      </div>
    </div>
  )
}
