'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';
import './globals.css'

import { QuizProvider } from '@/context/QuizContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <QuizProvider>
            {children}
          </QuizProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
