// app/songs/[songSlug]/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import styles from './Song.module.css'

type SongSlug = { slug: string }

// Pre-generate all song routes
export async function generateStaticParams() {
    const songs: SongSlug[] = await prisma.songs.findMany({
        select: { slug: true },
    })

    return songs.map(song => ({ songSlug: song.slug }))
}

// SEO metadata
export async function generateMetadata({
    params,
}: {
    params: { songSlug: string }
}) {
    const song = await prisma.songs.findUnique({
        where: { slug: params.songSlug },
        include: {
            artist: { select: { name: true } },
        },
    })

    if (!song) {
        return { title: 'Song not found • Hahu lyrics' }
    }

    return {
        title: `${song.title} Lyrics - ${song.artist.name}`,
        description: `Read the full lyrics of "${song.title}" by ${song.artist.name}.`,
    }
}

export default async function SongPage({
    params,
}: {
    params: { songSlug: string }
}) {
    const song = await prisma.songs.findUnique({
        where: { slug: params.songSlug },
        include: {
            artist: {
                select: { name: true, slug: true },
            },
            album: {
                select: { title: true, year: true, slug: true, albumArt: true },
            },
        },
    })

    if (!song) {
        notFound()
    }


    const artUrl =
        song.album?.albumArt ??
        song.coverArt ??
        '/placeholder-image.png'

    // Handles lyrics using \n markers (or real line breaks as fallback)
    const lines = song.lyrics.includes('\\n')
        ? song.lyrics.split('\\n')
        : song.lyrics.split(/\r?\n/)

    return (
        <div className={styles.pageContainer}>

            <div className={styles.leftContainer}>
                <header className={styles.header}>
                    <div className={styles.coverWrapper}>
                        <Image //Cover Image // 
                            src={artUrl}
                            alt={`${song.title} cover art`}
                            width={200}
                            height={200}
                            className={styles.cover}
                        />
                    </div>

                    <div className={styles.metaBlock}>
                        <h1 className={styles.title}>{song.title}</h1>

                        <p className={styles.artist}>
                            By{' '}
                            <Link
                                href={`/artists/${song.artist.slug}`}
                                className={styles.artistLink}
                            >
                                {song.artist.name}
                            </Link>
                        </p>

                        {song.album && (
                            <p className={styles.meta}>
                                <strong>Album:</strong>{' '}
                                <Link href={`/albums/${song.album.slug}`}>
                                    {song.album.title}
                                </Link>{' '}
                                ({song.album.year})
                            </p>
                        )}
                    </div>
                </header>

                <section className={styles.lyricsContainer}>
                    <div className={styles.lyrics}>
                        {lines.map((line: string, idx: number) => (
                            <p key={idx}>{line || '\u00A0'}</p>
                        ))}
                    </div>
                </section>
            </div>

            <div className={styles.rightContainer}>

            </div>
        </div>
    )
}