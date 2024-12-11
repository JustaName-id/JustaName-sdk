import { Navbar } from '../layout/navbar';
import './global.css';
import { Providers } from './providers';
import { Viewport } from 'next';

export const metadata = {
  title: 'JustWeb3 Demo Console',
  description: 'Your decentralized identity toolkit',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="w-screen  flex flex-col items-center justify-start h-screen">
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
