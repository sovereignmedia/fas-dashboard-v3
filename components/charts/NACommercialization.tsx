'use client';

import { useRef } from 'react';
import { NA_MAP_SIZE, NAFacility } from '@/data/na-map';
import { useNAMapInteraction } from '@/hooks/useNAMapInteraction';
import { CHART_COLORS } from '@/lib/colors';

function FacilityTooltip({ facility, tooltipPos }: { facility: NAFacility; tooltipPos: { x: number; y: number } }) {
  const tooltipWidth = 280;
  const left = tooltipPos.x > NA_MAP_SIZE.width / 2
    ? tooltipPos.x - tooltipWidth - 20
    : tooltipPos.x + 20;

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top: tooltipPos.y - 40,
        width: tooltipWidth,
        background: 'linear-gradient(135deg, rgba(12,22,40,0.95) 0%, rgba(8,16,30,0.95) 100%)',
        border: '1px solid rgba(0,200,220,0.2)',
        borderRadius: 14,
        padding: '16px 20px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.6), 0 0 12px rgba(0,200,220,0.08)',
        zIndex: 100,
        pointerEvents: 'none' as const,
        backdropFilter: 'blur(12px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <span style={{ color: '#f0f0f0', fontSize: 18, fontWeight: 700 }}>{facility.name}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14 }}>
        <div>
          <span style={{ color: '#c0c0c0' }}>Location: </span>
          <span style={{ color: '#f0f0f0', fontWeight: 600 }}>{facility.label}</span>
        </div>
        <div>
          <span style={{ color: '#c0c0c0' }}>Type: </span>
          <span style={{ color: CHART_COLORS.green, fontWeight: 600 }}>{facility.type === 'Planned' ? 'TBD' : facility.type + '\u2122'}</span>
        </div>
        <div>
          <span style={{ color: '#c0c0c0' }}>Status: </span>
          <span style={{
            color: facility.status === 'Active' ? CHART_COLORS.green : CHART_COLORS.gold,
            fontWeight: 600,
          }}>
            {facility.status === 'Active' ? 'In Development' : 'Planned'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function NACommercialization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { hoveredFacility, tooltipPos, isLoading } = useNAMapInteraction(canvasRef);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: NA_MAP_SIZE.width, height: NA_MAP_SIZE.height }}>
        <canvas ref={canvasRef} className="block rounded-xl" />

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center text-text-tertiary text-sm">
            Loading map data...
          </div>
        )}

        {hoveredFacility && (
          <FacilityTooltip facility={hoveredFacility} tooltipPos={tooltipPos} />
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full" style={{ background: CHART_COLORS.green }} />
          <span className="text-xs text-text-tertiary uppercase tracking-widest">Active</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full border-2" style={{ borderColor: CHART_COLORS.green, background: 'transparent' }} />
          <span className="text-xs text-text-tertiary uppercase tracking-widest">Planned</span>
        </div>
      </div>
    </div>
  );
}
