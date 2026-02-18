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
};

export default function Topbar() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || 'Dashboard';

  const handleLogout = () => {
    sessionStorage.removeItem('fas-authenticated');
    window.location.href = '/';
  };

  return (
    <header className="h-16 border-b border-[#1F1F2E] bg-[#0A0A0F]/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-30">
      <div>
        <h2 className="text-lg font-semibold text-[#F0F0F5]">{title}</h2>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs uppercase tracking-[0.15em] text-[#606075] font-medium">
          Confidential
        </span>
        <div className="w-px h-6 bg-[#1F1F2E]" />
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-[#606075] hover:text-[#A0A0B0] transition-colors text-sm"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Exit</span>
        </button>
      </div>
    </header>
  );
}
