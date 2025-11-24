// app/artists/[artistSlug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import styles from './Artist.module.css'

type ArtistSlug = { slug: string }

// Pre-generate all artist slugs
export async function generateStaticParams() {
  const artists: ArtistSlug[] = await prisma.artist.findMany({
    select: { slug: true },
  })

  return artists.map(a => ({ artistSlug: a.slug }))
}

// SEO metadata per artist
export async function generateMetadata({
  params,
}: {
  params: { artistSlug: string }
}) {
  const artist = await prisma.artist.findUnique({
    where: { slug: params.artistSlug },
    select: { name: true, bio: true },
  })

  if (!artist) {
    return { title: 'Artist not found • LyricZone' }
  }

  return {
    title: `${artist.name} • LyricZone`,
    description: artist.bio ?? undefined,
  }
}

export default async function ArtistPage({
  params,
}: {
  params: { artistSlug: string }
}) {
  const artist = await prisma.artist.findUnique({
    where: { slug: params.artistSlug },
    include: {
      albums: {
        orderBy: { year: 'asc' },
        include: {
          songs: {
            orderBy: { title: 'asc' },
          },
        },
      },
      songs: {
        where: { albumId: null },
        orderBy: { title: 'asc' },
      },
    },
  })

  if (!artist) notFound()

  type Album = (typeof artist.albums)[number]
  type Song = (typeof artist.songs)[number]

  const hasAlbums = artist.albums.length > 0
  const hasSingles = artist.songs.length > 0

  return (
    <div className={styles.container}>
      <h1 className={styles.name}>{artist.name}</h1>
      {artist.bio && <p className={styles.bio}>{artist.bio}</p>}

      {/* Albums & their songs */}
      {hasAlbums && (
        <>
          <h2 className={styles.sub}>Albums</h2>
          <div className={styles.albumList}>
            {artist.albums.map((album: Album) => (
              <section key={album.id} className={styles.album}>
                <div className={styles.albumHeader}>
                  <h3 className={styles.albumTitle}>{album.title}</h3>
                  {album.year && (
                    <span className={styles.albumYear}>{album.year}</span>
                  )}
                </div>

                {album.songs.length ? (
                  <ul className={styles.songList}>
                    {album.songs.map((song: { id: string; title: string; slug: string }) => (
                      <li key={song.id}>
                        <Link
                          href={`/songs/${song.slug}`}
                          className={styles.songLink}
                        >
                          {song.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.empty}>No songs for this album yet.</p>
                )}
              </section>
            ))}
          </div>
        </>
      )}

      {/* Singles section */}
      {hasSingles && (
        <>
          <h2 className={styles.sub}>Singles</h2>
          <ul className={styles.songList}>
            {artist.songs.map((song: Song) => (
              <li key={song.id}>
                <Link
                  href={`/songs/${song.slug}`}
                  className={styles.songLink}
                >
                  {song.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {!hasAlbums && !hasSingles && (
        <p className={styles.empty}>
          No songs available for this artist yet.
        </p>
      )}
    </div>
  )
}