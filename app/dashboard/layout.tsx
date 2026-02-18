'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import ComplianceFooter from '@/components/ui/ComplianceFooter';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem('fas-authenticated');
    if (auth !== 'true') {
      router.push('/');
    } else {
      setChecked(true);
    }
  }, [router]);

  if (!checked) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#D4A853] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <Sidebar />
      <div className="ml-64 lg:ml-16 xl:ml-64 min-h-screen flex flex-col">
        <Topbar />
        <main className="flex-1 p-8 relative">
          <div className="fixed inset-0 pointer-events-none z-0" style={{
            background: 'radial-gradient(ellipse at 20% 50%, rgba(74,158,255,0.03), transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(212,168,83,0.02), transparent 50%)'
          }} />
          <div className="relative z-10">
            {children}
          </div>
        </main>
        <ComplianceFooter />
      </div>
    </div>
  );
}
