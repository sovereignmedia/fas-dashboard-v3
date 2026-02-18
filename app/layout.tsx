import type { Metadata } from 'next';
import './globals.css';
import ThemeProvider from '@/components/providers/ThemeProvider';
import ThemeToggle from '@/components/ui/ThemeToggle';

export const metadata: Metadata = {
  title: 'Frontieras North America | Investor Dashboard',
  description: 'Institutional investor dashboard for Frontieras North America — pre-IPO clean energy technology company.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-bg-primary text-text-primary">
        <ThemeProvider>
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
