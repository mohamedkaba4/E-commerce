import type { Metadata } from 'next'
import './globals.css'

import { Providers } from '@/app/components/Providers'
import Navbar from '@/app/components/Navbar'

export const metadata: Metadata = {
  title: {
    default: 'Mavencrest',
    template: '%s | Mavencrest',
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
      <body className="min-h-screen bg-black antialiased">
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
