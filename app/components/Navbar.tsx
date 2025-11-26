import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo}>
          HaHu
        </Link>

        <nav>
          <ul className={styles.links}>
            <li><Link href="/artists">Artists</Link></li>
          </ul>
        </nav>

        <nav>
          <ul className={styles.links}>
            <li><Link href="/search">Search</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
