'use client';

import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import ComplianceFooter from '@/components/ui/ComplianceFooter';
import PageTransition from '@/components/layout/PageTransition';
import DisclaimerModal from '@/components/ui/DisclaimerModal';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Authentication is enforced by middleware.ts (server-side)
  // before this layout ever renders. No client-side check needed.

  return (
    <div className="min-h-screen bg-bg-primary">
      <DisclaimerModal />
      <Sidebar />
      <div className="ml-64 lg:ml-16 xl:ml-64 min-h-screen flex flex-col">
        <Topbar />
        <main className="flex-1 p-8 relative">
          <div className="fixed inset-0 pointer-events-none z-0" style={{
            background: 'radial-gradient(ellipse at 20% 50%, rgba(0,204,136,0.06), rgba(0,204,136,0.02) 35%, transparent 70%), radial-gradient(ellipse at 80% 20%, rgba(212,168,82,0.03), transparent 60%)'
          }} />
          <div className="relative z-10">
            <PageTransition>
              {children}
            </PageTransition>
          </div>
        </main>
        <ComplianceFooter />
      </div>
    </div>
  );
}
