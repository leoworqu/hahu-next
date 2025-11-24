// app/albums/[slug]/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'

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
          title: 'asc', // if you add trackNumber later, change to { trackNumber: 'asc' }
        },
      },
    },
  })

  if (!album) return notFound()

  const tracks = album.songs
  type Track = (typeof tracks)[number] // element type of album.songs

  const trackCount = tracks.length

  return (
    <main style={{ maxWidth: 900, margin: '40px auto', padding: '0 16px' }}>
      <header
        style={{
          display: 'grid',
          gridTemplateColumns: '160px 1fr',
          gap: 24,
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 160,
            height: 160,
            position: 'relative',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          <Image
            src={album.albumArt ?? '/default-cover.png'}
            alt={`${album.title} cover`}
            fill
            sizes="160px"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: '2rem' }}>{album.title}</h1>
          <p style={{ margin: '6px 0', color: '#666' }}>
            <Link
              href={`/artists/${album.artist.slug}`}
              style={{ textDecoration: 'none' }}
            >
              {album.artist.name}
            </Link>{' '}
            • {album.year}
          </p>
          <p style={{ margin: 0, color: '#888' }}>
            {trackCount} {trackCount === 1 ? 'track' : 'tracks'}
          </p>
        </div>
      </header>

      <section style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: 12 }}>Track list</h2>

        {tracks.length === 0 ? (
          <p style={{ color: '#888' }}>No tracks added to this album yet.</p>
        ) : (
          <ol
            style={{
              listStyle: 'decimal',
              paddingLeft: 20,
              display: 'grid',
              gap: 8,
            }}
          >
            {tracks.map((track: Track, idx: number) => (
              <li
                key={track.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  gap: 12,
                  alignItems: 'center',
                  padding: '10px 12px',
                  borderRadius: 10,
                  border: '1px solid #eee',
                }}
              >
                <span
                  style={{
                    color: '#999',
                    width: 20,
                    textAlign: 'right',
                  }}
                >
                  {idx + 1}
                </span>
                <div>
                  <Link
                    href={`/songs/${track.slug}`}
                    style={{
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}
                  >
                    {track.title}
                  </Link>
                  <div style={{ color: '#777', fontSize: '.9rem' }}>
                    {track.artist.name}
                  </div>
                </div>
                {/* Right-side meta – for now just show album year */}
                <div
                  style={{
                    color: '#aaa',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {album.year}
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
    </main>
  )
}