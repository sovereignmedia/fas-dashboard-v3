'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Wallet } from 'lucide-react';

import { balanceSheet, cashFlow } from '@/data/financials';
import { formatCurrency } from '@/lib/formatters';
import Card from '@/components/ui/Card';

type View = 'balance' | 'cashflow';

export default function FinancialStatements() {
  const [view, setView] = useState<View>('balance');

  return (
    <Card hover={false}>
      {/* Header + toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] font-medium text-accent-gold/70 mb-1">
            Pro Forma Statements
          </p>
          <h3 className="text-xl font-light tracking-tight text-text-primary">
            {view === 'balance' ? 'Projected Balance Sheet' : 'Projected Cash Flow'}
          </h3>
        </div>
        <div className="flex rounded-xl bg-bg-primary/50 border border-border-subtle p-1">
          <ToggleButton
            active={view === 'balance'}
            onClick={() => setView('balance')}
            icon={<BarChart3 size={14} />}
            label="Balance Sheet"
          />
          <ToggleButton
            active={view === 'cashflow'}
            onClick={() => setView('cashflow')}
            icon={<Wallet size={14} />}
            label="Cash Flow"
          />
        </div>
      </div>

      {/* Table content */}
      <AnimatePresence mode="wait">
        {view === 'balance' ? (
          <motion.div
            key="balance"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <BalanceSheetTable />
          </motion.div>
        ) : (
          <motion.div
            key="cashflow"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <CashFlowTable />
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-[10px] text-text-tertiary mt-6 leading-relaxed">
        Source: Frontieras Financial Model 4.1.25. All figures are forward-looking projections and subject to change.
      </p>
    </Card>
  );
}

// ─── Balance Sheet Table ─────────────────────────────────────────────

function BalanceSheetTable() {
  return (
    <div className="overflow-x-auto -mx-2">
      <table className="w-full text-sm min-w-[640px]">
        <thead>
          <tr className="border-b border-border-subtle">
            <th className="text-left py-3 px-2 text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-medium w-[180px]">
              Line Item
            </th>
            {balanceSheet.map((row) => (
              <th key={row.year} className="text-right py-3 px-2 text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-medium">
                <span className="block">{row.year}</span>
                <span className="block text-[9px] text-text-tertiary/60 font-normal normal-case tracking-normal">{row.label}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <SectionLabel label="Assets" />
          <DataRow label="Current Assets" values={balanceSheet.map((r) => r.currentAssets)} />
          <DataRow label="Fixed Assets (Net)" values={balanceSheet.map((r) => r.fixedAssets)} />
          <TotalRow label="Total Assets" values={balanceSheet.map((r) => r.totalAssets)} />

          <SectionLabel label="Liabilities" />
          <DataRow label="Current Liabilities" values={balanceSheet.map((r) => r.currentLiabilities)} />
          <DataRow label="Long-Term Debt" values={balanceSheet.map((r) => r.longTermDebt)} />
          <TotalRow label="Total Liabilities" values={balanceSheet.map((r) => r.totalLiabilities)} />

          <SectionLabel label="Equity" />
          <TotalRow label="Total Equity" values={balanceSheet.map((r) => r.totalEquity)} highlight />
        </tbody>
      </table>
    </div>
  );
}

// ─── Cash Flow Table ─────────────────────────────────────────────────

function CashFlowTable() {
  return (
    <div className="overflow-x-auto -mx-2">
      <table className="w-full text-sm min-w-[640px]">
        <thead>
          <tr className="border-b border-border-subtle">
            <th className="text-left py-3 px-2 text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-medium w-[180px]">
              Line Item
            </th>
            {cashFlow.map((row) => (
              <th key={row.year} className="text-right py-3 px-2 text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-medium">
                <span className="block">{row.year}</span>
                <span className="block text-[9px] text-text-tertiary/60 font-normal normal-case tracking-normal">{row.label}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <SectionLabel label="Operating" />
          <DataRow label="Operating Cash Flow" values={cashFlow.map((r) => r.operatingCashFlow)} />

          <SectionLabel label="Investing" />
          <DataRow label="Capital Expenditures" values={cashFlow.map((r) => r.capitalExpenditures)} />

          <SectionLabel label="Financing" />
          <DataRow label="Debt Proceeds" values={cashFlow.map((r) => r.debtProceeds)} />
          <DataRow label="Equity Proceeds" values={cashFlow.map((r) => r.equityProceeds)} />

          <TotalRow label="Net Cash Flow" values={cashFlow.map((r) => r.netCashFlow)} />
          <TotalRow label="Ending Cash" values={cashFlow.map((r) => r.endingCash)} highlight />
        </tbody>
      </table>
    </div>
  );
}

// ─── Shared Sub-Components ───────────────────────────────────────────

function ToggleButton({ active, onClick, icon, label }: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
        active
          ? 'bg-accent-gold/15 text-accent-gold shadow-sm'
          : 'text-text-tertiary hover:text-text-secondary'
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <tr>
      <td
        colSpan={6}
        className="pt-5 pb-2 px-2 text-[10px] uppercase tracking-[0.2em] text-accent-gold/60 font-semibold"
      >
        {label}
      </td>
    </tr>
  );
}

function DataRow({ label, values }: { label: string; values: number[] }) {
  return (
    <tr className="border-b border-border-subtle/30">
      <td className="py-2.5 px-2 text-text-secondary">{label}</td>
      {values.map((v, i) => (
        <td key={i} className={`py-2.5 px-2 text-right font-mono tabular-nums ${v < 0 ? 'text-red-400/80' : 'text-text-secondary'}`}>
          {formatCurrency(v, true)}
        </td>
      ))}
    </tr>
  );
}

function TotalRow({ label, values, highlight = false }: { label: string; values: number[]; highlight?: boolean }) {
  return (
    <tr className={`border-b border-border-subtle ${highlight ? 'bg-accent-gold/[0.03]' : ''}`}>
      <td className="py-3 px-2 font-medium text-text-primary">{label}</td>
      {values.map((v, i) => (
        <td
          key={i}
          className={`py-3 px-2 text-right font-mono font-bold tabular-nums ${
            highlight ? 'text-accent-gold' : v < 0 ? 'text-red-400' : 'text-text-primary'
          }`}
        >
          {formatCurrency(v, true)}
        </td>
      ))}
    </tr>
  );
}
