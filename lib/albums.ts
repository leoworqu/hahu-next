import fs from 'fs'
import path from 'path'

export type Album = {
  id: string
  title: string
  slug: string
  artistId: string
  artistSlug: string
  year: number
  albumArt: string
  trackIds: string[]
}

const DATA_PATH = path.join(process.cwd(), 'data', 'albums.json')

function readData(): Album[] {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8')
  return JSON.parse(raw) as Album[]
}

export function getAllAlbums(): Album[] {
  return readData()
}

export function getAlbumBySlug(slug: string): Album | undefined {
  return readData().find(album => album.slug === slug)
}

export function getAllAlbumSlugs(): string[] {
  return readData().map(album => album.slug)
}
