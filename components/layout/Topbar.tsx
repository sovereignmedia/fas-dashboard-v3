'use client';

import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Executive Overview',
  '/dashboard/economics': 'Product Economics',
  '/dashboard/financials': 'Financial Projections & Valuation',
  '/dashboard/expansion': 'Global Expansion',
  '/dashboard/capital': 'Capital Structure',
  '/dashboard/team': 'Genesis & Management',
  '/dashboard/process': 'FASForm™ Process',
  '/dashboard/risk-analysis': 'Risk Mitigation',
  '/dashboard/due-diligence': 'Due Diligence',
  '/dashboard/roadmap': 'Roadmap',
};

export default function Topbar() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || 'Dashboard';

  const handleLogout = () => {
    sessionStorage.removeItem('fas-authenticated');
    window.location.href = '/';
  };

  return (
    <header className="h-20 bg-bg-primary/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-30 shadow-[0_1px_0_rgba(255,255,255,0.04)]">
      <div>
        <h2 className="text-xl font-light tracking-tight text-text-primary">{title}</h2>
      </div>
      <div className="flex items-center gap-5">
        <span className="text-[10px] uppercase tracking-[0.2em] text-text-tertiary font-medium rounded-full px-3 py-1 bg-white/[0.04]">
          Confidential
        </span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-text-tertiary hover:text-text-secondary transition-colors text-sm"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Exit</span>
        </button>
      </div>
    </header>
  );
}
