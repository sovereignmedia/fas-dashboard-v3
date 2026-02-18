'use client';

import { GlobeCountry, PER_PLANT_REVENUE } from '@/data/globe';
import { CHART_COLORS } from '@/lib/colors';

interface GlobeTooltipProps {
  country: GlobeCountry;
  tooltipPos: { x: number; y: number };
  globeSize: number;
}

export default function GlobeTooltip({ country, tooltipPos, globeSize }: GlobeTooltipProps) {
  const estRevenue = ((country.plants * PER_PLANT_REVENUE) / 1e9).toFixed(1);
  const tooltipWidth = 405;
  const left = tooltipPos.x > globeSize / 2
    ? tooltipPos.x - tooltipWidth - 20
    : tooltipPos.x + 20;

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top: tooltipPos.y - 54,
        width: tooltipWidth,
        background: 'linear-gradient(135deg, rgba(12,22,40,0.95) 0%, rgba(8,16,30,0.95) 100%)',
        border: '1px solid rgba(0,200,220,0.2)',
        borderRadius: 16,
        padding: '22px 24px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.6), 0 0 12px rgba(0,200,220,0.08)',
        zIndex: 100,
        pointerEvents: 'none' as const,
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Country name + patent badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <span style={{ color: '#f0f0f0', fontSize: 22, fontWeight: 700 }}>{country.name}</span>
        <span style={{
          fontSize: 13, color: CHART_COLORS.green, background: 'rgba(0,204,136,0.12)',
          padding: '3px 10px', borderRadius: 20, fontWeight: 600, letterSpacing: 0.5,
        }}>
          FASForm&trade; Patent Protected
        </span>
      </div>

      {/* Data grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 20px', fontSize: 16 }}>
        <div>
          <span style={{ color: '#c0c0c0' }}>Annual Coal Production: </span>
          <span style={{ color: '#f0f0f0', fontWeight: 600 }}>{country.production} Mt</span>
          <span style={{ color: '#999999' }}> (#{country.rank})</span>
        </div>
        <div>
          <span style={{ color: '#c0c0c0' }}>Global Share: </span>
          <span style={{ color: '#f0f0f0', fontWeight: 600 }}>{country.share}%</span>
        </div>
        <div>
          <span style={{ color: '#c0c0c0' }}>Coal Reserves: </span>
          <span style={{ color: '#f0f0f0', fontWeight: 600 }}>{country.reserves} tonnes</span>
        </div>
        <div>
          <span style={{ color: '#c0c0c0' }}>Est. Facilities: </span>
          <span style={{ color: CHART_COLORS.green, fontWeight: 600 }}>{country.plants}</span>
          <span style={{ color: '#999999' }}> (1% market pen.)</span>
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <span style={{ color: '#c0c0c0' }}>Est. Revenue at 1% Market Penetration: </span>
          <span style={{ color: CHART_COLORS.gold, fontWeight: 700 }}>${estRevenue}B</span>
        </div>
      </div>

      {/* Context narrative */}
      <div style={{
        marginTop: 14, fontSize: 15, color: '#999999', lineHeight: 1.5,
        borderTop: '1px solid rgba(0,200,220,0.1)', paddingTop: 14,
      }}>
        {country.context}
      </div>
    </div>
  );
}
