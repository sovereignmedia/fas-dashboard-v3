'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FlaskConical, TrendingUp, Globe, Landmark, Users } from 'lucide-react';

const iconMap = {
  LayoutDashboard,
  FlaskConical,
  TrendingUp,
  Globe,
  Landmark,
  Users,
} as const;

const NAV_ITEMS = [
  { label: 'Overview', href: '/dashboard', icon: 'LayoutDashboard' as const },
  { label: 'Economics', href: '/dashboard/economics', icon: 'FlaskConical' as const },
  { label: 'Financials', href: '/dashboard/financials', icon: 'TrendingUp' as const },
  { label: 'Expansion', href: '/dashboard/expansion', icon: 'Globe' as const },
  { label: 'Capital', href: '/dashboard/capital', icon: 'Landmark' as const },
  { label: 'Team', href: '/dashboard/team', icon: 'Users' as const },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 xl:w-64 lg:w-16 bg-bg-primary border-r border-border-subtle z-40 flex flex-col">
      <div className="p-6 lg:p-4 xl:p-6 border-b border-border-subtle flex items-center justify-center">
        <Link href="/dashboard">
          <img
            src="/logo-frontieras.png"
            alt="Frontieras North America"
            className="h-10 w-auto lg:h-7 xl:h-10"
          />
        </Link>
      </div>

      <nav className="flex-1 py-4">
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          const isExactActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-6 lg:px-4 xl:px-6 py-3 mx-2 rounded-lg
                transition-all duration-200 group
                ${isActive || isExactActive
                  ? 'bg-white/[0.04] text-accent-gold'
                  : 'text-text-tertiary hover:text-text-secondary hover:bg-bg-tertiary'
                }
              `}
            >
              <Icon size={20} className="flex-shrink-0" />
              <span className="text-sm font-medium lg:hidden xl:block">{item.label}</span>
              {(isActive || isExactActive) && (
                <div className="absolute left-0 w-[2px] h-5 bg-accent-gold rounded-r" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 lg:p-2 xl:p-4 border-t border-border-subtle">
        <p className="text-[10px] text-text-tertiary lg:hidden xl:block">Investor Dashboard v1.0</p>
      </div>
    </aside>
  );
}
