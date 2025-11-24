import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>© {new Date().getFullYear()} LyricZone • <a href="/about">About</a> • <a href="/contact">Contact</a> • <a href="/privacy-policy">Privacy Policy</a></p>
      </div>
    </footer>
  )
}