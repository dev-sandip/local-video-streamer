"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react"
import { formatDistanceToNow } from 'date-fns'

interface VideoMetadata {
  name: string
  size: number
  lastModified: string
}

export function Video() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null)
  const [videoName, setVideoName] = useState<string>("")
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(false)
  const [videoList, setVideoList] = useState<string[]>([])
  const [videoMetadata, setVideoMetadata] = useState<VideoMetadata[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch('/api/videos')
        if (!response.ok) {
          throw new Error('Failed to fetch videos')
        }
        const data: { videos: string[], metaData: VideoMetadata[] } = await response.json()
        setVideoList(data.videos)
        setVideoMetadata(data.metaData)
      } catch (error) {
        console.error('Error fetching videos:', error)
      }
    }

    fetchVideos()
  }, [])

  const handleVideoSelect = (video: string) => {
    setVideoSrc(`/videos/${video}`)
    setVideoName(video)
    setIsPlaying(false)
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const formatFileSize = (bytes: number) => {
    const units = ['B', 'KB', 'MB', 'GB']
    let size = bytes
    let unitIndex = 0
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024
      unitIndex++
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Video Player</CardTitle>
          </CardHeader>
          <CardContent>
            {videoSrc ? (
              <>
                <div className="aspect-video mb-4">
                  <video
                    ref={videoRef}
                    src={videoSrc}
                    className="w-full h-full rounded-lg"
                    controls={false}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold truncate">{videoName}</h2>
                  <div className="flex space-x-2">
                    <Button size="icon" variant="outline" onClick={togglePlay}>
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button size="icon" variant="outline" onClick={restartVideo}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" onClick={toggleMute}>
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-center text-muted-foreground">
                Select a video from the list to play
              </p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Video List</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              {videoMetadata.map((video) => (
                <Button
                  key={video.name}
                  variant="ghost"
                  className="w-full justify-start mb-2 flex flex-col items-start"
                  onClick={() => handleVideoSelect(video.name)}
                >
                  <span className="font-medium">{video.name}</span>
                  <span className="text-xs text-muted-foreground">
                    Size: {formatFileSize(video.size)} |
                    Last modified: {formatDistanceToNow(new Date(video.lastModified), { addSuffix: true })}
                  </span>
                </Button>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}