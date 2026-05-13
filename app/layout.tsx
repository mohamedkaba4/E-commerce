import { Bebas_Neue, Nunito } from 'next/font/google';
import './globals.css';

const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas' });
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="${bebas.variable} ${nunito.variable}">
      <body className="antialiased bg-[#FFFDE7]">{children}</body>
    </html>
  );
}
