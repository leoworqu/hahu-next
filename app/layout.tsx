import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export const metadata = {
  title: 'LyricZone | AZLyrics Clone',
  description: 'Find lyrics by song or artist, powered by Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{backgroundColor: "white"}}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
