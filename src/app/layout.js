import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Dandi - API Key Management',
  description: 'Manage your API keys securely',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 bg-gray-50 dark:bg-gray-900">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
