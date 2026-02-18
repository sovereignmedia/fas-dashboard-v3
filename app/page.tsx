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
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-accent-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
