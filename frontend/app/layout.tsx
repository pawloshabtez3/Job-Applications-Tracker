import './globals.css';
import type { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import { ToastProvider } from '../components/ToastProvider';

export const metadata = {
  title: 'Job Application Tracker',
  description: 'Track your job applications with ease'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <ToastProvider>
          <Navbar />
          <main className="mx-auto w-full max-w-5xl px-4 py-8">{children}</main>
        </ToastProvider>
      </body>
    </html>
  );
}
