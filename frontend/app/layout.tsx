import './globals.css';
import type { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import { ToastProvider } from '../components/ToastProvider';

export const metadata = {
  title: 'HireTrack',
  description: 'Track your job applications with ease'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <ToastProvider>
          <Navbar />
          <main className="shell py-10">{children}</main>
        </ToastProvider>
      </body>
    </html>
  );
}
