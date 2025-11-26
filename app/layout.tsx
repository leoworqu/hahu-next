import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export const metadata = {
  title: 'Hahu Lyrics',
  description: 'Find lyrics by song or artist',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9499581176530330"
          crossOrigin="anonymous"></script>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Menbere:wght@100..700&display=swap');
        </style>
      </head>
      <body style={{ fontFamily: "'Menbere', sans-serif" }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
