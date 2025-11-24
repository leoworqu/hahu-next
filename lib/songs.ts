// lib/songs.ts
import fs from 'fs'
import path from 'path'

export type Song = {
  id: string
  title: string
  slug: string
  artist: string
  artistSlug: string
  lyrics: string
  album?: string
  year?: number
  albumArt: string
}

const DATA_PATH = path.join(process.cwd(), 'data', 'songs.json')

function readData(): Song[] {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8')
  return JSON.parse(raw) as Song[]
}

export function getAllSongs(): Song[] {
  return readData()
}

export function getSongBySlug(slug: string): Song | undefined {
  return readData().find(song => song.slug === slug)
}

export function getAllSongSlugs(): string[] {
  return readData().map(song => song.slug)
}