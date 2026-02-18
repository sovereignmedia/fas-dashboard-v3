'use client';

import { useRouter } from 'next/navigation';
import PasswordGate from '@/components/layout/PasswordGate';
import { useEffect } from 'react';

export default function Home() {
  return (
    <PasswordGate>
      <RedirectToDashboard />
    </PasswordGate>
  );
}

function RedirectToDashboard() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#D4A853] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
