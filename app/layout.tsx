import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Script from 'next/script'

export const metadata = {
  title: 'LyricZone | AZLyrics Clone',
  description: 'Find lyrics by song or artist, powered by Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9499581176530330"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body style={{ backgroundColor: "white" }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
