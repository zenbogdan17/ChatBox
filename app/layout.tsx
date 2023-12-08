import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ToasterContext from './context/ToasterContext';
import AuthContext from './context/AuthContext';
import ActiveStatus from './components/ActiveStatus';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChatBox',
  description:
    'Interactive conversations for everyone: our chat project invites everyone who wants to communicate, learn and share experiences.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
