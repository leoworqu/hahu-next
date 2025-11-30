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
                select: { name: true, slug: true, artistImage: true },
            },
            album: {
                select: {
                    title: true,
                    year: true,
                    slug: true,
                    albumArt: true,
                    songs: {
                        orderBy: { trackNumber: 'asc' },
                        select: {
                            id: true,
                            title: true,
                            slug: true,
                            trackNumber: true,
                        },
                    },
                },
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

    const artistPictureUrl =
        song.artist?.artistImage ??
        song.coverArt ??
        '/placeholder-image.png'

    // Handles lyrics using \n markers (or real line breaks as fallback)
    const lines = song.lyrics.includes('\\n')
        ? song.lyrics.split('\\n')
        : song.lyrics.split(/\r?\n/)

    // Other tracks on the same album (excluding current song)
    const otherTracks =
        song.album?.songs.filter(track => track.id !== song.id) ?? []

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
                        <p style={{ fontSize: "1.5rem", fontWeight: "700" }}>{song.trackNumber}</p>
                        <h1 className={styles.title}>{song.title}</h1>

                        <p className={styles.artist}>
                            <Link
                                href={`/artists/${song.artist.slug}`}
                                className={styles.artistLink}
                            >

                                <img src={artistPictureUrl} alt="" className={styles.artistImage} />
                                {song.artist.name}
                            </Link>
                        </p>


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
                {song.album && otherTracks.length > 0 && (
                    <section className={styles.albumSection}>
                        <h2 className={styles.albumSectionHeading}>
                            More from this album
                        </h2>

                        <ol className={styles.albumTrackList}>
                            {otherTracks.map(track => (
                                <li key={track.id} className={styles.albumTrackItem}>

                                    <Link
                                        href={`/songs/${track.slug}`}
                                        className={styles.albumTrackLink}
                                    >
                                        <span className={styles.albumTrackNumber}>
                                            {track.trackNumber ?? '–'}
                                        </span>
                                        {track.title}
                                    </Link>
                                </li>
                            ))}
                        </ol>
                    </section>
                )}
            </div>
        </div>
    )
}