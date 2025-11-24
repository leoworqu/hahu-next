// lib/artists.ts
import fs from 'fs'
import path from 'path'

export type Song = { id: string; title: string; slug: string }
export type Artist = { id: string; name: string; slug: string; bio?: string; songs: Song[] }

const DATA_PATH = path.join(process.cwd(), 'data', 'artists.json')

function readData(): Artist[] {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8')
  return JSON.parse(raw) as Artist[]
}

export function getAllArtists(): Artist[] {
  return readData()
}

export function getArtistBySlug(slug: string): Artist | undefined {
  return readData().find(a => a.slug === slug)
}

export function getAllArtistSlugs(): string[] {
  return readData().map(a => a.slug)
}