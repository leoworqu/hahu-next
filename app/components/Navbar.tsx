import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo}>
          <img src="/hahu-lyrics-logo.png" alt="" className={styles.navIcon} />
        </Link>

        <nav>
          <Link className={styles.linksIcon3} href="/artists">
            <ul className={styles.links}>
              <img src="/artist-black.png" alt="" className={styles.linksIcon} />
              <img src="/artist-white.png" alt="" className={styles.linksIcon2} />
              <li>Browse Artists</li>
            </ul>
          </Link>
        </nav>
      </div>
    </header>
  )
}
