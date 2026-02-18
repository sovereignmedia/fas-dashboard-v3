'use client';

import { useState, useEffect } from 'react';
import { DASHBOARD_PASSWORD } from '@/lib/constants';
import { Lock } from 'lucide-react';

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
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center relative overflow-hidden">
      {/* Version label */}
      <span className="absolute top-4 left-4 text-xs text-text-tertiary font-mono">v3</span>

      {/* Atmospheric background */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(212,168,83,0.04), transparent 60%)'
      }} />

      <div className="relative w-full max-w-md px-6">
        {/* Card */}
        <div className="relative overflow-hidden rounded-2xl bg-bg-secondary border border-border-subtle backdrop-blur-sm p-8"
          style={{ boxShadow: 'var(--shadow-card)' }}>
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/40 to-transparent" />

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <img
              src="/logo-frontieras.png"
              alt="Frontieras North America"
              className="h-16 w-auto mb-4"
            />
            <p className="text-[11px] uppercase tracking-[0.25em] text-accent-gold/70 font-medium">Confidential</p>
            <p className="text-sm text-text-tertiary mt-1">Enter password to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Password"
                className={`
                  w-full bg-bg-primary border rounded-lg py-3 pl-11 pr-4
                  text-text-primary placeholder-text-tertiary
                  focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold/30
                  transition-all duration-200
                  ${error ? 'border-data-red' : 'border-border-subtle'}
                `}
                autoFocus
              />
            </div>

            {error && (
              <p className="text-sm text-data-red text-center">Invalid access code</p>
            )}

            <button
              type="submit"
              className="w-full border border-accent-green/40 text-accent-green font-semibold py-3 rounded-lg
                hover:border-accent-green/60 hover:bg-accent-green/5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              Access Dashboard
            </button>
          </form>

          <p className="text-[10px] text-text-tertiary text-center mt-6 leading-relaxed">
            This dashboard contains proprietary financial projections and is intended for authorized recipients only.
          </p>

          <button
            type="button"
            onClick={() => {
              sessionStorage.setItem('fas-authenticated', 'true');
              setAuthenticated(true);
            }}
            className="w-full mt-3 text-xs text-text-tertiary hover:text-accent-gold transition-colors duration-200 py-2"
          >
            Dev Bypass &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
