// app/search/page.tsx
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import styles from './SearchPage.module.css'

type SearchPageProps = {
    searchParams: { q?: string }
}

// Shapes we actually use in the UI
type SongResult = {
    id: string
    slug: string
    title: string
    coverArt: string | null
    artist: {
        name: string
        slug: string
    }
    album: {
        title: string
        slug: string
        albumArt: string | null
    } | null
}

type ArtistResult = {
    id: string
    name: string
    slug: string
    bio: string | null
    artistImage: string | null
}

type AlbumResult = {
    id: string
    title: string
    slug: string
    year: number | null
    albumArt: string | null
    artist: {
        name: string
        slug: string
    }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const query = (searchParams.q || '').trim()

    // No query yet → simple empty state
    if (!query) {
        return (
            <main className={styles.searchPage}>
                <h1 className={styles.title}>Search</h1>
                <p className={styles.subtitle}>
                    Type a song title, artist, or album in the search box on the home
                    page to get started.
                </p>
            </main>
        )
    }

    // Parallel search across songs, artists, albums
    const [songsRaw, artistsRaw, albumsRaw] = await Promise.all([
        prisma.songs.findMany({
            where: {
                OR: [
                    { title: { contains: query } }, // no mode: 'insensitive'
                    { lyrics: { contains: query } },
                ],
            },
            include: {
                artist: { select: { name: true, slug: true } },
                album: { select: { title: true, slug: true, albumArt: true } },
            },
            take: 20,
        }),

        prisma.artist.findMany({
            where: {
                name: { contains: query }, // no mode here either
            },
            select: {
                id: true,
                name: true,
                slug: true,
                bio: true,
                artistImage: true,
            },
            take: 10,
        }),

        prisma.albums.findMany({
            where: {
                title: { contains: query },
            },
            select: {
                id: true,
                title: true,
                slug: true,
                year: true,
                albumArt: true,
                artist: { select: { name: true, slug: true } },
            },
            take: 10,
        }),
    ])

    const songs = songsRaw as SongResult[]
    const artists = artistsRaw as ArtistResult[]
    const albums = albumsRaw as AlbumResult[]

    return (
        <main className={styles.searchPage}>

            <div className={styles.heroSearch}>

                <h1 className={styles.title}>Search results for “{query}”</h1>
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

            {/* SONGS */}
            <section className={styles.section}>
                <h2 className={styles.sectionHeading}>Songs</h2>
                {songs.length === 0 ? (
                    <p className={styles.empty}>No songs found.</p>
                ) : (
                    <ul className={styles.songList}>
                        {songs.map(song => {
                            const artUrl =
                                song.album?.albumArt ?? song.coverArt ?? '/default-cover.png'

                            return (
                                <li key={song.id} className={styles.songItem}>
                                    <Link
                                        href={`/songs/${song.slug}`}
                                        className={styles.songLink}
                                    >
                                        <img
                                            src={artUrl}
                                            alt={song.title}
                                            className={styles.songThumb}
                                        />
                                        <div className={styles.songMeta}>
                                            <span className={styles.songTitle}>{song.title}</span>
                                            <span className={styles.songSub}>
                                                {song.artist.name}
                                                {song.album && ` • ${song.album.title}`}
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </section>

            {/* ARTISTS */}
            <section className={styles.section}>
                <h2 className={styles.sectionHeading}>Artists</h2>
                {artists.length === 0 ? (
                    <p className={styles.empty}>No artists found.</p>
                ) : (
                    <ul className={styles.songList}>
                        {artists.map(artist => {
                            const artUrl = artist.artistImage ?? '/default-artist.png'
                            const bioSnippet =
                                artist.bio && artist.bio.length > 80
                                    ? artist.bio.slice(0, 80) + '…'
                                    : artist.bio ?? ''

                            return (
                                <li key={artist.id} className={styles.songItem}>
                                    <Link
                                        href={`/artists/${artist.slug}`}
                                        className={styles.songLink}
                                    >
                                        <img
                                            src={artUrl}
                                            alt={artist.name}
                                            className={styles.songThumb}
                                        />
                                        <div className={styles.songMeta}>
                                            <span className={styles.songTitle}>{artist.name}</span>
                                            {bioSnippet && (
                                                <span className={styles.songSub}>{bioSnippet}</span>
                                            )}
                                        </div>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </section>

            {/* ALBUMS */}
            <section className={styles.section}>
                <h2 className={styles.sectionHeading}>Albums</h2>
                {albums.length === 0 ? (
                    <p className={styles.empty}>No albums found.</p>
                ) : (
                    <ul className={styles.songList}>
                        {albums.map(album => {
                            const artUrl = album.albumArt ?? '/default-cover.png'

                            return (
                                <li key={album.id} className={styles.songItem}>
                                    <Link
                                        href={`/albums/${album.slug}`}
                                        className={styles.songLink}
                                    >
                                        <img
                                            src={artUrl}
                                            alt={album.title}
                                            className={styles.songThumb}
                                        />
                                        <div className={styles.songMeta}>
                                            <span className={styles.songTitle}>{album.title}</span>
                                            <span className={styles.songSub}>
                                                {album.artist.name}
                                                {album.year ? ` • ${album.year}` : ''}
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </section>
        </main>
    )
}