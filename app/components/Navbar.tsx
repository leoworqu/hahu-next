import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          HaHu
        </Link>

        <nav>
          <ul className={styles.links}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/artists">Artists</Link></li>
            <li><Link href="/search">Search</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
