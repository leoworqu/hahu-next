import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <p>© {new Date().getFullYear()} Hahu Lyrics • <a href="/about">About</a> • <a href="/contact">Contact</a> • <a href="/privacy-policy">Privacy Policy</a></p>
      </div>
    </footer>
  )
}