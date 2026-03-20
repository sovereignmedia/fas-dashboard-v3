'use client';

import { useState } from 'react';
import { Lock } from 'lucide-react';

export default function PasswordGate() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        window.location.href = '/dashboard';
      } else {
        setError(true);
        setPassword('');
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };


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
                disabled={loading}
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
              disabled={loading}
              className="w-full border border-accent-green/40 text-accent-green font-semibold py-3 rounded-lg
                hover:border-accent-green/60 hover:bg-accent-green/5 transition-all duration-200 flex items-center justify-center gap-2
                disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Access Dashboard'}
            </button>
          </form>

          <p className="text-[10px] text-text-tertiary text-center mt-6 leading-relaxed">
            This dashboard contains proprietary financial projections and is intended for authorized recipients only.
          </p>

        </div>
      </div>
    </div>
  );
}
