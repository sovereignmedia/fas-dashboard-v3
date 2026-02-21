# Globe V2 Refactor — Claude Code Prompt

Paste everything below this line into Claude Code:

---

I need you to create a decomposed V2 of my InteractiveGlobe component. **DO NOT modify any existing files except `app/dashboard/expansion/page.tsx` and `lib/globe-utils.ts`.** The original `InteractiveGlobe.tsx` must remain completely untouched.

## What to build

You're extracting the logic from `components/charts/InteractiveGlobe.tsx` (378 lines) into smaller files, then assembling them into a new `InteractiveGlobeV2.tsx`. The V2 must render identically to V1 — same visuals, same interactions, same behavior.

Read `components/charts/InteractiveGlobe.tsx` carefully before starting. Every piece of logic must be preserved exactly.

### File 1: Add `generateDotsInPolygon` to `lib/globe-utils.ts`

Add this pure function to the existing `lib/globe-utils.ts` file (append it, don't modify existing functions). It's currently defined inside the InteractiveGlobe useEffect at lines 61-76:

```ts
export function generateDotsInPolygon(feature: GeoJSON.Feature, dotSpacing: number): [number, number][] {
  const dots: [number, number][] = [];
  const bounds = d3.geoBounds(feature);
  const [[minLng, minLat], [maxLng, maxLat]] = bounds;
  const step = dotSpacing * 0.08;
  const lngRanges: [number, number][] =
    minLng > maxLng ? [[minLng, 180], [-180, maxLng]] : [[minLng, maxLng]];
  for (const [lngStart, lngEnd] of lngRanges) {
    for (let lng = lngStart; lng <= lngEnd; lng += step) {
      for (let lat = minLat; lat <= maxLat; lat += step) {
        if (pointInFeature([lng, lat], feature)) dots.push([lng, lat]);
      }
    }
  }
  return dots;
}
```

This requires `import * as d3 from 'd3'` and uses the existing `pointInFeature` function already in that file.

### File 2: Create `lib/globe-renderer.ts`

New file. Extract the `render()` function (lines 79-209 of InteractiveGlobe.tsx) into a standalone export. It should have this signature:

```ts
import * as d3 from 'd3';
import { GLOBE_COUNTRIES, PATENT_COORDS, TAU, GlobeCountry } from '@/data/globe';
import { markerRadius, isInBounds, isVisible } from '@/lib/globe-utils';
import { CHART_COLORS } from '@/lib/colors';

type GlobeDot = [number, number, string | null];

export function renderGlobe(
  ctx: CanvasRenderingContext2D,
  projection: d3.GeoProjection,
  projectionUnclipped: d3.GeoProjection,
  graticule: d3.GeoGraticuleGenerator,
  allDots: GlobeDot[],
  landFeatures: GeoJSON.FeatureCollection | null,
  hoveredCountry: GlobeCountry | null,
  size: number,
  radius: number
): void {
  // Paste the EXACT render function body from lines 80-209
  // Replace references to globeStateRef.current with the direct parameters
  // Replace hoveredCountryRef.current with the hoveredCountry parameter
  // The path generator needs to be created inside: const path = d3.geoPath().projection(projection).context(ctx);
}
```

**Critical**: The drawing code must be identical. Same gradient stops, same colors, same arc radii, same font sizes, same order of operations. Just parameterized instead of reading from refs.

### File 3: Create `hooks/useGlobeInteraction.ts`

New file. Custom hook that owns all the interactive behavior:

```ts
import { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';
import {
  GLOBE_SIZE, TAU, PATENT_COORDS, PATENT_ISO_CODES,
  GLOBE_COUNTRIES, GEOJSON_URL, GlobeCountry,
} from '@/data/globe';
import { isVisible, pointInFeature, generateDotsInPolygon } from '@/lib/globe-utils';
import { renderGlobe } from '@/lib/globe-renderer';

type GlobeDot = [number, number, string | null];

interface GlobeState {
  projection: d3.GeoProjection | null;
  allDots: GlobeDot[];
  landFeatures: GeoJSON.FeatureCollection | null;
  patentFeatures: Record<string, GeoJSON.Feature>;
}

export function useGlobeInteraction(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const [hoveredCountry, setHoveredCountry] = useState<GlobeCountry | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const globeStateRef = useRef<GlobeState>({
    projection: null, allDots: [], landFeatures: null, patentFeatures: {},
  });
  const hoveredCountryRef = useRef<GlobeCountry | null>(null);

  useEffect(() => {
    // Paste the EXACT useEffect body from InteractiveGlobe.tsx lines 34-348
    // BUT: remove the render() function definition (it's now imported from globe-renderer)
    // BUT: remove generateDotsInPolygon (it's now imported from globe-utils)
    //
    // Replace the inline render() calls with:
    //   renderGlobe(context, projection, projectionUnclipped, graticule,
    //     globeStateRef.current.allDots, globeStateRef.current.landFeatures,
    //     hoveredCountryRef.current, size, radius);
    //
    // Everything else stays identical: HiDPI setup, projection init,
    // loadData, auto-rotation timer, drag handlers, hover hit-testing, cleanup.
  }, []);

  return { hoveredCountry, tooltipPos, isLoading };
}
```

### File 4: Create `components/charts/InteractiveGlobeV2.tsx`

New file. The lean component that composes everything:

```tsx
'use client';

import { useRef } from 'react';
import { GLOBE_SIZE } from '@/data/globe';
import { useGlobeInteraction } from '@/hooks/useGlobeInteraction';
import GlobeTooltip from '@/components/charts/GlobeTooltip';

export default function InteractiveGlobeV2() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { hoveredCountry, tooltipPos, isLoading } = useGlobeInteraction(canvasRef);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative cursor-grab active:cursor-grabbing">
        <canvas ref={canvasRef} className="block rounded-2xl" />
        {isLoading && (
          <div
            className="absolute inset-0 flex items-center justify-center text-text-tertiary text-sm"
            style={{ width: GLOBE_SIZE, height: GLOBE_SIZE }}
          >
            Loading globe data...
          </div>
        )}
        {hoveredCountry && (
          <GlobeTooltip country={hoveredCountry} tooltipPos={tooltipPos} globeSize={GLOBE_SIZE} />
        )}
      </div>
      <p className="text-base font-semibold text-text-tertiary uppercase tracking-[0.1em]">
        Click &amp; Drag to Rotate
      </p>
    </div>
  );
}
```

This should be well under 40 lines.

### File 5: Update `app/dashboard/expansion/page.tsx`

Add `InteractiveGlobeV2` right below the original globe for side-by-side testing. Add the import and a second Card block:

```tsx
import InteractiveGlobeV2 from '@/components/charts/InteractiveGlobeV2';
```

Then after the existing globe Card (line 29), add:

```tsx
<Card className="!p-8 mb-10 flex justify-center" hover={false}>
  <div className="text-center">
    <p className="text-xs text-text-tertiary mb-4 uppercase tracking-widest">V2 — Decomposed Globe</p>
    <InteractiveGlobeV2 />
  </div>
</Card>
```

## Rules

1. **DO NOT modify `components/charts/InteractiveGlobe.tsx`** — it must remain exactly as-is
2. **DO NOT modify `components/charts/GlobeTooltip.tsx`** — V2 reuses it as-is
3. The only existing files you may edit are `lib/globe-utils.ts` (appending the new function) and `app/dashboard/expansion/page.tsx` (adding the V2 import and Card)
4. Every canvas drawing operation, color value, gradient stop, font size, and animation timing must be preserved exactly from the original
5. Run `npm run build` after to verify there are no TypeScript errors
