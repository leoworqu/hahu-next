// app/albums/[slug]/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import styles from './AlbumPage.module.css'

type Props = {
  params: { slug: string }
}

type AlbumSlug = { slug: string }

// Pre-generate album pages from DB
export async function generateStaticParams() {
  const albums: AlbumSlug[] = await prisma.albums.findMany({
    select: { slug: true },
  })

  return albums.map(a => ({ slug: a.slug }))
}

export default async function AlbumPage({ params }: Props) {
  const album = await prisma.albums.findUnique({
    where: { slug: params.slug },
    include: {
      artist: {
        select: { name: true, slug: true },
      },
      songs: {
        include: {
          artist: { select: { name: true } },
        },
        orderBy: {
          trackNumber: 'asc',
        },
      },
    },
  })

  if (!album) return notFound()

  const tracks = album.songs
  type Track = (typeof tracks)[number]

  const trackCount = tracks.length

  return (
    <main className={styles.albumPage}>
      <header className={styles.albumHeader}>
        <div className={styles.albumCoverWrapper}>
          <Image
            src={album.albumArt ?? '/default-cover.png'}
            alt={`${album.title} cover`}
            fill
            sizes="160px"
            className={styles.albumCoverImage}
            priority
          />
        </div>

        <div className={styles.albumMetaBlock}>
          <h1 className={styles.albumTitle}>{album.title}</h1>
          <p className={styles.albumArtistLine}>
            <Link
              href={`/artists/${album.artist.slug}`}
              className={styles.albumArtistLink}
            >
              {album.artist.name}
            </Link>{' '}
            • {album.year}
          </p>
          <p className={styles.albumTrackCount}>
            {trackCount} {trackCount === 1 ? 'track' : 'tracks'}
          </p>
        </div>
      </header>

      <section className={styles.trackListSection}>
        <h2 className={styles.trackListHeading}>Track list</h2>

        {tracks.length === 0 ? (
          <p className={styles.trackListEmpty}>
            No tracks added to this album yet.
          </p>
        ) : (
          <ol className={styles.trackList}>
            {tracks.map((track: Track) => (
              <Link href={`/songs/${track.slug}`} style={{ textDecoration: 'none', color: '#333745' }} key={track.id}>
                <li className={styles.trackListItem}>
                  <span className={styles.trackNumber}>
                    {track.trackNumber ?? '—'}
                  </span>

                  <div className={styles.trackMain}>
                    <div
                      className={styles.trackTitleLink}
                    >
                      {track.title}
                    </div>
                    <div className={styles.trackArtistName}>
                      {track.artist.name}
                    </div>
                  </div>

                  <div className={styles.trackRightMeta}>{album.year}</div>
                </li>
              </Link>
            ))}
          </ol>
        )}
      </section>
    </main>
  )
}