// File: app/api/videos/route.ts
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
    const videosDirectory = path.join(process.cwd(), 'public', 'videos')


    try {
        const fileNames = fs.readdirSync(videosDirectory)
        const videoFiles = fileNames.filter(fileName => {
            const extension = path.extname(fileName).toLowerCase()
            return ['.mp4', '.webm', '.ogg', '.mkv'].includes(extension)
        })
        const videoMetaData = videoFiles.map(fileName => {
            const filePath = path.join(videosDirectory, fileName)
            const fileStats = fs.statSync(filePath)
            return {
                name: fileName,
                size: fileStats.size,
                lastModified: fileStats.mtime

            }
        })
        return NextResponse.json({ videos: videoFiles, metaData: videoMetaData })
    } catch (error) {
        console.error('Error reading video directory:', error)
        return NextResponse.json({ error: 'Unable to read video directory' }, { status: 500 })
    }
}