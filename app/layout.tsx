import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Head from 'next/head'

export const metadata = {
  title: 'Hahu Lyrics',
  description: 'Find lyrics by song or artist, powered by Next.js',
  icons: {
    icon: [
      { url: "/hahu-lyrics-logo.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9499581176530330"
          crossOrigin="anonymous"></script>
        <style>
        </style>
      </head>
      <body style={{ fontFamily: "Menbere" }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
