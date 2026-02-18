'use client';

import { COMPLIANCE_DISCLAIMER } from '@/lib/constants';

export default function ComplianceFooter() {
  return (
    <footer className="mt-auto pt-12 pb-6 px-6">
      <div className="border-t border-[#1F1F2E] pt-6">
        <p className="text-xs text-[#606075] leading-relaxed max-w-4xl">
          {COMPLIANCE_DISCLAIMER}
        </p>
      </div>
    </footer>
  );
}
