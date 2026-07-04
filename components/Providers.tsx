sdfdsv

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import CartDrawer from '@/app/layout/CartDrawer';
import Navbar from '@/app/components/Navbar';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Navbar />
      <CartDrawer />
      {children}
    </SessionProvider>
  );
}