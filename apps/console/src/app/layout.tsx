import { Navbar } from '../layout/navbar';
import './global.css';
import { Providers } from './providers';

export const metadata = {
  title: 'JustWeb3 Console',
  description: 'Your decentralized identity toolkit',
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
