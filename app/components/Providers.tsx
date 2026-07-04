'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import CartDrawer from './CartDrawer';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartDrawer />
      {children}
    </SessionProvider>
  );
}
