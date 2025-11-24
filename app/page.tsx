// app/page.tsx
import Link from 'next/link'
import styles from './Home.module.css'
import { prisma } from '@/lib/prisma'

export const metadata = {
  title: 'LyricZone — Find Your Favorite Lyrics',
  description: 'Browse artists and songs to find your favorite lyrics easily.',
}

export default async function HomePage() {
  const [featuredSongs, featuredAlbums, artists] = await Promise.all([
    prisma.songs.findMany({
      include: {
        artist: { select: { name: true, slug: true } },
        album: { select: { albumArt: true, title: true, slug: true } },
      },
      orderBy: { createdAt: 'desc' }, // newest songs first
      take: 9,
    }),
    prisma.albums.findMany({
      include: {
        artist: { select: { name: true, slug: true } },
      },
      orderBy: { createdAt: 'desc' }, // newest albums first
      take: 9,
    }),
    prisma.artist.findMany({
      orderBy: { name: 'asc' },
    }),
  ])

  return (
    <main className={styles.container}>
      {/* ✅ HERO SECTION (unchanged) */}
      <div className={styles.hero}>
        <div className={styles.heroHeaders}>
          <h1 className={styles.title}>Universe of Lyrics.</h1>
          <p className={styles.subtitle}>
            Browse artists to find your favorite songs and lyrics
          </p>
        </div>

        <div className={styles.heroSearch}>
          <form className={styles.heroSearchContainer} action="#" method="get">
            <input
              className={styles.heroSearchInput}
              type="text"
              placeholder="Search..."
              name="q"
              required
            />
            <button className={styles.heroSearchButton} type="submit">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* 🎵 Featured Songs – newest added */}
      <section className={styles.artistsSection}>
        <h2 className={styles.sectionTitle}>Featured Songs</h2>
        <ul className={styles.artistList}>
          {featuredSongs.map(song => {
            const artUrl =
              song.album?.albumArt ??
              song.coverArt ??
              '/default-cover.png'

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

      {/* 💿 Featured Albums – newest added */}
      <section className={styles.artistsSection}>
        <h2 className={styles.sectionTitle}>Featured Albums</h2>
        <ul className={styles.albumGrid}>
          {featuredAlbums.map(album => {
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

      {/* 👥 All Artists (A–Z) */}
      <section className={styles.artistsSection}>
        <h2 className={styles.sectionTitle}>Browse Artists</h2>
        <ul className={styles.artistList}>
          {artists.map(artist => (
            <li key={artist.id} className={styles.artistItem}>
              <Link
                href={`/artists/${artist.slug}`}
                className={styles.link}
              >
                {artist.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}