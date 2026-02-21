'use client';

import { useRef } from 'react';
import { GLOBE_SIZE } from '@/data/globe';
import { useGlobeInteractionV3 } from '@/hooks/useGlobeInteractionV3';
import GlobeTooltip from '@/components/charts/GlobeTooltip';

export default function InteractiveGlobeV3() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { hoveredCountry, tooltipPos, isLoading } = useGlobeInteractionV3(canvasRef);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative cursor-grab active:cursor-grabbing">
        <canvas ref={canvasRef} className="block rounded-2xl" />

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center text-text-tertiary text-sm">
            Loading globe data...
          </div>
        )}

        {hoveredCountry && (
          <GlobeTooltip
            country={hoveredCountry}
            tooltipPos={tooltipPos}
            globeSize={GLOBE_SIZE}
          />
        )}
      </div>

      <p className="text-base font-semibold text-text-tertiary uppercase tracking-[0.1em]">
        Click &amp; Drag to Rotate
      </p>
    </div>
  );
}
