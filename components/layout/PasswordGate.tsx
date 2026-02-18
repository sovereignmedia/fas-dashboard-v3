'use client';

import { useState, useEffect } from 'react';
import { DASHBOARD_PASSWORD } from '@/lib/constants';
import { Lock, ArrowRight } from 'lucide-react';

interface PasswordGateProps {
  children: React.ReactNode;
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem('fas-authenticated');
    if (stored === 'true') {
      setAuthenticated(true);
    }
    setChecking(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === DASHBOARD_PASSWORD) {
      sessionStorage.setItem('fas-authenticated', 'true');
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#D4A853] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center relative overflow-hidden">
      {/* Version label */}
      <span className="absolute top-4 left-4 text-xs text-[#606075] font-mono">v3</span>

      {/* Atmospheric background */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(212,168,83,0.04), transparent 60%)'
      }} />

      <div className="relative w-full max-w-md px-6">
        {/* Card */}
        <div className="relative overflow-hidden rounded-2xl bg-[#12121A] border border-[#1F1F2E] backdrop-blur-sm p-8">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4A853]/40 to-transparent" />

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4A853] to-[#E0B86A] flex items-center justify-center mb-4">
              <span className="text-[#0A0A0F] font-bold text-xl">F</span>
            </div>
            <h1 className="text-2xl font-semibold text-[#F0F0F5] tracking-tight">FRONTIERAS</h1>
            <p className="text-xs uppercase tracking-[0.2em] text-[#606075] mt-1">Investor Dashboard</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#606075]" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Enter access code"
                className={`
                  w-full bg-[#0A0A0F] border rounded-lg py-3 pl-11 pr-4
                  text-[#F0F0F5] placeholder-[#606075]
                  focus:outline-none focus:border-[#D4A853] focus:ring-1 focus:ring-[#D4A853]/30
                  transition-all duration-200
                  ${error ? 'border-[#FF4C4C]' : 'border-[#1F1F2E]'}
                `}
                autoFocus
              />
            </div>

            {error && (
              <p className="text-sm text-[#FF4C4C] text-center">Invalid access code</p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#D4A853] to-[#E0B86A] text-[#0A0A0F] font-semibold py-3 rounded-lg
                hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2"
            >
              Access Dashboard
              <ArrowRight size={16} />
            </button>
          </form>

          <p className="text-[10px] text-[#606075] text-center mt-6 leading-relaxed">
            This is a confidential investor portal. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </div>
  );
}
