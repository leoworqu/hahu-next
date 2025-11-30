// app/page.tsx
import Link from 'next/link'
import styles from './Home.module.css'
import { prisma } from '@/lib/prisma'

export const metadata = {
  title: 'Hahu Lyrics',
  description: 'Browse artists and songs to find your favorite lyrics easily.',
}

// Types that match what we actually query
type FeaturedSong = {
  id: string
  slug: string
  title: string
  coverArt: string | null
  artist: {
    name: string
    slug: string
  }
  album: {
    albumArt: string | null
    title: string
    slug: string
  } | null
}

type FeaturedAlbum = {
  id: string
  slug: string
  title: string
  year: number
  albumArt: string | null
  artist: {
    name: string
    slug: string
  }
}

type Artist = {
  id: string
  slug: string
  name: string
}

export default async function HomePage() {
  const featuredSongs = await prisma.songs.findMany({
    include: {
      artist: { select: { name: true, slug: true } },
      album: { select: { albumArt: true, title: true, slug: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: 9,
  })

  const typedFeaturedSongs = featuredSongs as FeaturedSong[]

  const featuredAlbums = await prisma.albums.findMany({
    include: {
      artist: { select: { name: true, slug: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: 12,
  })

  const typedFeaturedAlbums = featuredAlbums as FeaturedAlbum[]

  const artists = (await prisma.artist.findMany({
    orderBy: { name: 'asc' },
    select: { id: true, slug: true, name: true },
  })) as Artist[]

  return (
    <main className={styles.homeContainer}>
      <div className={styles.heroSearchDiv}>
        <div className={styles.searchCon}>
          <div className={styles.heroHeaders}>
            <p className={styles.subtitle}>
              Ethiopia's Largest Lyric Database!
            </p>
          </div>

          <div className={styles.heroSearch}>
            <form className={styles.heroSearchContainer} action="/search" method="get">
              <input
                className={styles.heroSearchInput}
                type="text"
                placeholder="Search songs, artists, albums..."
                name="q"
                required
              />
              <button className={styles.heroSearchButton} type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 🎵 Featured Songs

      
      <section className={styles.artistsSection}>
        <h2 className={styles.sectionTitle}>Featured Songs</h2>
        <ul className={styles.artistList}>
          {typedFeaturedSongs.map((song) => {
            const artUrl =
              song.album?.albumArt ??
              song.coverArt ??
              '/default-cover.png' // ensure this exists in /public

            return (
              <li key={song.id} className={styles.artistItem}>
                <Link href={`/songs/${song.slug}`} className={styles.link}>
                  <div className={styles.songCard}>
                    <img
                      src={artUrl}
                      alt={`${song.title} cover`}
                      className={styles.albumArt}
                    />
                    <div className={styles.songInfo}>
                      <h3 className={styles.songTitle}>{song.title}</h3>
                      <p className={styles.artistName}>{song.artist.name}</p>
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

       */}

      {/* 💿 Featured Albums */}
      <section className={styles.artistsSection}>
        <h2 className={styles.sectionTitle}>New Arivals</h2>
        <ul className={styles.albumGrid}>
          {typedFeaturedAlbums.map((album) => {
            const artUrl = album.albumArt ?? '/default-cover.png'

            return (
              <li key={album.id} className={styles.albumCard}>
                <Link href={`/albums/${album.slug}`} className={styles.link}>
                  <img
                    src={artUrl}
                    alt={`${album.title} cover`}
                    className={styles.albumCover}
                  />
                  <div className={styles.albumMeta}>
                    <h3>{album.title}</h3>
                    <p>
                      {album.artist.name} • {album.year}
                    </p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

    </main>
  )
}