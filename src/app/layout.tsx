"use client"; // Asegura que este archivo se ejecute en el cliente

import './globals.css';
import { SessionProvider } from 'next-auth/react';
import ReactQueryProvider from '@/lib/query-provider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <SessionProvider>
          <ReactQueryProvider>
            {children}
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
