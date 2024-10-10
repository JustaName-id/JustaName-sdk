import { Navbar } from '../layout/navbar';
import './global.css';
import { Providers } from './providers';

export const metadata = {
  title: 'JAN Console',
  description: 'Customize ur sdk to your requirements',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers >
          <div className="w-screen  flex flex-col items-center justify-start h-screen">
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
