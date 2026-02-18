import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en" className="dark">
      <body className="font-sans antialiased bg-[#0A0A0F] text-[#F0F0F5]">
        {children}
      </body>
    </html>
  );
}
