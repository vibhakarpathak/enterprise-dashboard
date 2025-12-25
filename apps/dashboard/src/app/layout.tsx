import './global.css';
import { Providers } from './providers/Providers';

export const metadata = {
  title: 'EnterpriseOS Dashboard',
  description: 'Enterprise-grade dashboard built with Next.js and Nx',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
