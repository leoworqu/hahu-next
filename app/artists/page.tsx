// app/artists/page.tsx
import Link from 'next/link'
import styles from './Artists.module.css'
import { prisma } from '@/lib/prisma'

// Infer the Artist type from Prisma
type Artist = Awaited<ReturnType<typeof prisma.artist.findMany>>[number]


// Group artists by first letter of their name
function groupByLetter(artists: Artist[]) {
  return artists.reduce<Record<string, Artist[]>>((acc, artist) => {
    const letter = artist.name.charAt(0).toUpperCase()
    acc[letter] = acc[letter] || []
    acc[letter].push(artist)
    return acc
  }, {})
}

export default async function ArtistsPage() {
  // Fetch artists from the database, sorted alphabetically
  const artists: Artist[] = await prisma.artist.findMany({
    orderBy: { name: 'asc' },
  })

  const grouped = groupByLetter(artists)
  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  )

  return (
    <div className={styles.artistContainer}>
      <h1 className={styles.title}>Artists</h1>

      <div className={styles.grid}>
        {alphabet.map((letter: string) => {
          const artistsForLetter = grouped[letter] || []
          if (!artistsForLetter.length) return null // skip empty letters

          return (
            <section key={letter} className={styles.group}>
              <h2 className={styles.letter}>{letter}</h2>
              <ul className={styles.list}>
                {artistsForLetter.map((artist: Artist) => (
                  <li key={artist.id}>
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
          )
        })}
      </div>
    </div>
  )
}