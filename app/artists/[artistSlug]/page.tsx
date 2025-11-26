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
    return { title: 'Artist not found • Hahu Lyrics' }
  }

  return {
    title: `${artist.name} • Hahu Lyrics`,
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
            orderBy: { trackNumber: 'asc' },
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
  const imageSrc = artist.artistImage ?? '/placeholder-image.png'

  return (
    <div className={styles.artContainer}>
      <img src={imageSrc} alt="" className={styles.artistImg} />
      <h1 className={styles.name}>{artist.name}</h1>
      {artist.bio && <p className={styles.bio}>{artist.bio}</p>}

      {/* Albums & their songs */}
      {hasAlbums && (
        <>
          <h2 className={styles.sub}>Albums</h2>
          <div className={styles.albumList}>
            {artist.albums.map((album: Album) => (
              <Link key={album.id} href={`/albums/${album.slug}`} className={styles.albumLink}>
                <section className={styles.album}>
                  <div className={styles.albumHeader}>
                    {album.albumArt && (
                      <img src={album.albumArt} alt="" className={styles.albumArt} />
                    )}
                    <div className={styles.albumMeta}>
                      <h3 className={styles.albumTitle}>{album.title}</h3>
                      {album.year && (
                        <span className={styles.albumYear}>{album.year}</span>
                      )}
                    </div>
                  </div>
                </section>
              </Link>
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