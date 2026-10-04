import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { Providers } from '@/app/components/Providers'
import Navbar from '@/app/components/Navbar'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'MAVENCREST',
    template: '%s | MAVENCREST',
  },
  description:
    'Performance gear for training, running and everyday movement.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-black antialiased`}
      >
        <Providers>
          <Navbar />

          <main className="min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
