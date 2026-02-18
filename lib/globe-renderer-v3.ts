/**
 * V3 Globe Renderer — split into background (blurrable) and foreground (sharp)
 * passes, with a composited orchestrator for cinematic depth-of-field effect.
 */

import * as d3 from 'd3';
import { GLOBE_COUNTRIES, PATENT_COORDS, TAU, GlobeCountry } from '@/data/globe';
import { markerRadius, isInBounds, isVisible } from '@/lib/globe-utils';
import { CHART_COLORS } from '@/lib/colors';

type GlobeDot = [number, number, string | null];

/**
 * Background pass: everything that gets blurred during cinematic hover.
 * Draws atmosphere, sphere, graticule, land, all dots, back-side markers,
 * front-side markers (excluding hovered country), and edge ring.
 */
export function renderGlobeBackground(
  context: CanvasRenderingContext2D,
  projection: d3.GeoProjection,
  projectionUnclipped: d3.GeoProjection,
  graticule: d3.GeoGraticuleGenerator,
  allDots: GlobeDot[],
  landFeatures: GeoJSON.FeatureCollection | null,
  hoveredCountry: GlobeCountry | null,
  size: number,
  radius: number,
  pulsePhase: number,
  globeCenterX?: number,
  globeCenterY?: number
): void {
  const path = d3.geoPath().projection(projection).context(context);
  const cx = globeCenterX ?? size / 2;
  const cy = globeCenterY ?? size / 2;

  context.clearRect(0, 0, size, size);
  const currentScale = projection.scale();
  const sf = currentScale / radius;

  // 1. Atmospheric glow
  const atmoGrad = context.createRadialGradient(cx, cy, currentScale * 0.9, cx, cy, currentScale * 1.15);
  atmoGrad.addColorStop(0, 'transparent');
  atmoGrad.addColorStop(0.5, 'rgba(75,140,200,0.12)');
  atmoGrad.addColorStop(0.8, 'rgba(80,150,220,0.16)');
  atmoGrad.addColorStop(1, 'rgba(75,140,200,0.05)');
  context.beginPath();
  context.arc(cx, cy, currentScale * 1.15, 0, TAU);
  context.fillStyle = atmoGrad;
  context.fill();

  // 2. Globe sphere with directional lighting
  const globeGrad = context.createRadialGradient(cx * 0.85, cy * 0.85, 0, cx, cy, currentScale);
  globeGrad.addColorStop(0, '#0d1825');
  globeGrad.addColorStop(1, '#040810');
  context.beginPath();
  context.arc(cx, cy, currentScale, 0, TAU);
  context.fillStyle = globeGrad;
  context.fill();
  context.strokeStyle = 'rgba(75,140,200,0.25)';
  context.lineWidth = 1 * sf;
  context.stroke();

  if (!landFeatures) return;

  // 3. Graticule
  context.beginPath();
  path(graticule());
  context.strokeStyle = 'rgba(75,140,200,0.12)';
  context.lineWidth = 0.4 * sf;
  context.stroke();

  // 4. Land outlines
  context.beginPath();
  landFeatures.features.forEach((f) => path(f));
  context.strokeStyle = 'rgba(75,140,200,0.4)';
  context.lineWidth = 0.8 * sf;
  context.stroke();

  // 5. Dot-matrix fill (all dots, blue)
  allDots.forEach((dot) => {
    const projected = projection([dot[0], dot[1]]) as [number, number] | null;
    if (isInBounds(projected, size)) {
      context.beginPath();
      context.arc(projected![0], projected![1], 1.0 * sf, 0, TAU);
      context.fillStyle = 'rgba(75,140,200,0.85)';
      context.fill();
    }
  });

  const rot = projection.rotate() as [number, number, number];

  // 7. Back-side patent markers (dimmed, see-through)
  GLOBE_COUNTRIES.forEach((c) => {
    const coord = PATENT_COORDS[c.code];
    if (!coord || isVisible(coord.lon, coord.lat, rot)) return;
    const projected = projectionUnclipped([coord.lon, coord.lat]) as [number, number] | null;
    if (!projected || !isInBounds(projected, size)) return;
    const r = markerRadius(c.production);
    // Dimmed pulse ring (back-side)
    const bPulseR = r * (1.2 + pulsePhase * 1.2) * sf;
    const bPulseAlpha = 0.2 * (1 - pulsePhase);
    context.beginPath();
    context.arc(projected[0], projected[1], bPulseR, 0, TAU);
    context.strokeStyle = `rgba(0,204,136,${bPulseAlpha})`;
    context.lineWidth = 1 * sf;
    context.stroke();
    context.beginPath();
    context.arc(projected[0], projected[1], r * 0.8 * sf, 0, TAU);
    context.fillStyle = 'rgba(0,204,136,0.55)';
    context.fill();
    context.fillStyle = 'rgba(255,255,255,0.45)';
    context.font = `bold ${10 * sf}px 'MicroSquare', sans-serif`;
    context.textAlign = 'center';
    context.fillText(c.name, projected[0], projected[1] - r * 0.6 * sf - 5 * sf);
  });

  // 8. Front-side patent markers — SKIP hovered country (it's drawn sharp in foreground)
  GLOBE_COUNTRIES.forEach((c) => {
    if (hoveredCountry && c.code === hoveredCountry.code) return;
    const coord = PATENT_COORDS[c.code];
    if (!coord || !isVisible(coord.lon, coord.lat, rot)) return;
    const projected = projection([coord.lon, coord.lat]) as [number, number] | null;
    if (!projected) return;
    const r = markerRadius(c.production);
    // Bloom glow
    context.beginPath();
    context.arc(projected[0], projected[1], r * 2.5 * sf, 0, TAU);
    const glow = context.createRadialGradient(
      projected[0], projected[1], 0,
      projected[0], projected[1], r * 2.5 * sf
    );
    glow.addColorStop(0, 'rgba(0,204,136,0.3)');
    glow.addColorStop(1, 'rgba(0,204,136,0)');
    context.fillStyle = glow;
    context.fill();
    // Pulse ring
    const fPulseR = r * (1.5 + pulsePhase * 1.5) * sf;
    const fPulseAlpha = 0.4 * (1 - pulsePhase);
    context.beginPath();
    context.arc(projected[0], projected[1], fPulseR, 0, TAU);
    context.strokeStyle = `rgba(0,204,136,${fPulseAlpha})`;
    context.lineWidth = 1.5 * sf;
    context.stroke();
    // Core marker
    context.beginPath();
    context.arc(projected[0], projected[1], r * sf, 0, TAU);
    context.fillStyle = CHART_COLORS.green;
    context.fill();
    context.strokeStyle = 'rgba(0,204,136,0.5)';
    context.lineWidth = 1 * sf;
    context.stroke();
    // Label
    context.fillStyle = 'rgba(255,255,255,0.9)';
    context.font = `bold ${13 * sf}px 'MicroSquare', sans-serif`;
    context.textAlign = 'center';
    context.fillText(c.name, projected[0], projected[1] - r * sf - 6 * sf);
  });

  // 9. Edge ring
  context.beginPath();
  context.arc(cx, cy, currentScale, 0, TAU);
  context.strokeStyle = 'rgba(75,140,200,0.15)';
  context.lineWidth = 1.5 * sf;
  context.stroke();
}

/**
 * Foreground pass: hovered country elements drawn sharp (never blurred).
 * Green highlighted dots + bloom glow + core marker + label.
 */
export function renderGlobeForeground(
  context: CanvasRenderingContext2D,
  projection: d3.GeoProjection,
  allDots: GlobeDot[],
  hoveredCountry: GlobeCountry,
  size: number,
  radius: number,
  pulsePhase: number
): void {
  const currentScale = projection.scale();
  const sf = currentScale / radius;
  const rot = projection.rotate() as [number, number, number];

  // Hovered country dot highlight (green, 1.3x)
  allDots.forEach((dot) => {
    if (dot[2] === hoveredCountry.code) {
      const projected = projection([dot[0], dot[1]]) as [number, number] | null;
      if (isInBounds(projected, size)) {
        context.beginPath();
        context.arc(projected![0], projected![1], 1.3 * sf, 0, TAU);
        context.fillStyle = 'rgba(0,204,136,0.9)';
        context.fill();
      }
    }
  });

  // Hovered country front-side marker (bloom + pulse + core + label)
  const coord = PATENT_COORDS[hoveredCountry.code];
  if (coord && isVisible(coord.lon, coord.lat, rot)) {
    const projected = projection([coord.lon, coord.lat]) as [number, number] | null;
    if (projected) {
      const r = markerRadius(hoveredCountry.production);
      // Bloom glow
      context.beginPath();
      context.arc(projected[0], projected[1], r * 2.5 * sf, 0, TAU);
      const glow = context.createRadialGradient(
        projected[0], projected[1], 0,
        projected[0], projected[1], r * 2.5 * sf
      );
      glow.addColorStop(0, 'rgba(0,204,136,0.3)');
      glow.addColorStop(1, 'rgba(0,204,136,0)');
      context.fillStyle = glow;
      context.fill();
      // Pulse ring
      const fPulseR = r * (1.5 + pulsePhase * 1.5) * sf;
      const fPulseAlpha = 0.4 * (1 - pulsePhase);
      context.beginPath();
      context.arc(projected[0], projected[1], fPulseR, 0, TAU);
      context.strokeStyle = `rgba(0,204,136,${fPulseAlpha})`;
      context.lineWidth = 1.5 * sf;
      context.stroke();
      // Core marker
      context.beginPath();
      context.arc(projected[0], projected[1], r * sf, 0, TAU);
      context.fillStyle = CHART_COLORS.green;
      context.fill();
      context.strokeStyle = 'rgba(0,204,136,0.5)';
      context.lineWidth = 1 * sf;
      context.stroke();
      // Label
      context.fillStyle = 'rgba(255,255,255,0.9)';
      context.font = `bold ${13 * sf}px 'MicroSquare', sans-serif`;
      context.textAlign = 'center';
      context.fillText(hoveredCountry.name, projected[0], projected[1] - r * sf - 6 * sf);
    }
  }
}

/**
 * Fast-path renderer: identical to V2 renderGlobe (no blur, no compositing).
 * Used when idle / no hover — avoids OffscreenCanvas overhead.
 */
export function renderGlobeFastPath(
  context: CanvasRenderingContext2D,
  projection: d3.GeoProjection,
  projectionUnclipped: d3.GeoProjection,
  graticule: d3.GeoGraticuleGenerator,
  allDots: GlobeDot[],
  landFeatures: GeoJSON.FeatureCollection | null,
  hoveredCountry: GlobeCountry | null,
  size: number,
  radius: number,
  pulsePhase: number,
  globeCenterX?: number,
  globeCenterY?: number
): void {
  const path = d3.geoPath().projection(projection).context(context);
  const cx = globeCenterX ?? size / 2;
  const cy = globeCenterY ?? size / 2;

  context.clearRect(0, 0, size, size);
  const currentScale = projection.scale();
  const sf = currentScale / radius;

  // 1. Atmospheric glow
  const atmoGrad = context.createRadialGradient(cx, cy, currentScale * 0.9, cx, cy, currentScale * 1.15);
  atmoGrad.addColorStop(0, 'transparent');
  atmoGrad.addColorStop(0.5, 'rgba(75,140,200,0.12)');
  atmoGrad.addColorStop(0.8, 'rgba(80,150,220,0.16)');
  atmoGrad.addColorStop(1, 'rgba(75,140,200,0.05)');
  context.beginPath();
  context.arc(cx, cy, currentScale * 1.15, 0, TAU);
  context.fillStyle = atmoGrad;
  context.fill();

  // 2. Globe sphere
  const globeGrad = context.createRadialGradient(cx * 0.85, cy * 0.85, 0, cx, cy, currentScale);
  globeGrad.addColorStop(0, '#0d1825');
  globeGrad.addColorStop(1, '#040810');
  context.beginPath();
  context.arc(cx, cy, currentScale, 0, TAU);
  context.fillStyle = globeGrad;
  context.fill();
  context.strokeStyle = 'rgba(75,140,200,0.25)';
  context.lineWidth = 1 * sf;
  context.stroke();

  if (!landFeatures) return;

  // 3. Graticule
  context.beginPath();
  path(graticule());
  context.strokeStyle = 'rgba(75,140,200,0.12)';
  context.lineWidth = 0.4 * sf;
  context.stroke();

  // 4. Land outlines
  context.beginPath();
  landFeatures.features.forEach((f) => path(f));
  context.strokeStyle = 'rgba(75,140,200,0.4)';
  context.lineWidth = 0.8 * sf;
  context.stroke();

  // 5. Dot-matrix fill
  allDots.forEach((dot) => {
    const projected = projection([dot[0], dot[1]]) as [number, number] | null;
    if (isInBounds(projected, size)) {
      context.beginPath();
      context.arc(projected![0], projected![1], 1.0 * sf, 0, TAU);
      context.fillStyle = 'rgba(75,140,200,0.85)';
      context.fill();
    }
  });

  // 6. Hovered country dot highlight
  if (hoveredCountry) {
    allDots.forEach((dot) => {
      if (dot[2] === hoveredCountry.code) {
        const projected = projection([dot[0], dot[1]]) as [number, number] | null;
        if (isInBounds(projected, size)) {
          context.beginPath();
          context.arc(projected![0], projected![1], 1.3 * sf, 0, TAU);
          context.fillStyle = 'rgba(0,204,136,0.9)';
          context.fill();
        }
      }
    });
  }

  const rot = projection.rotate() as [number, number, number];

  // 7. Back-side markers
  GLOBE_COUNTRIES.forEach((c) => {
    const coord = PATENT_COORDS[c.code];
    if (!coord || isVisible(coord.lon, coord.lat, rot)) return;
    const projected = projectionUnclipped([coord.lon, coord.lat]) as [number, number] | null;
    if (!projected || !isInBounds(projected, size)) return;
    const r = markerRadius(c.production);
    // Dimmed pulse ring (back-side)
    const bPulseR = r * (1.2 + pulsePhase * 1.2) * sf;
    const bPulseAlpha = 0.2 * (1 - pulsePhase);
    context.beginPath();
    context.arc(projected[0], projected[1], bPulseR, 0, TAU);
    context.strokeStyle = `rgba(0,204,136,${bPulseAlpha})`;
    context.lineWidth = 1 * sf;
    context.stroke();
    context.beginPath();
    context.arc(projected[0], projected[1], r * 0.8 * sf, 0, TAU);
    context.fillStyle = 'rgba(0,204,136,0.55)';
    context.fill();
    context.fillStyle = 'rgba(255,255,255,0.45)';
    context.font = `bold ${10 * sf}px 'MicroSquare', sans-serif`;
    context.textAlign = 'center';
    context.fillText(c.name, projected[0], projected[1] - r * 0.6 * sf - 5 * sf);
  });

  // 8. Front-side markers
  GLOBE_COUNTRIES.forEach((c) => {
    const coord = PATENT_COORDS[c.code];
    if (!coord || !isVisible(coord.lon, coord.lat, rot)) return;
    const projected = projection([coord.lon, coord.lat]) as [number, number] | null;
    if (!projected) return;
    const r = markerRadius(c.production);
    context.beginPath();
    context.arc(projected[0], projected[1], r * 2.5 * sf, 0, TAU);
    const glow = context.createRadialGradient(
      projected[0], projected[1], 0,
      projected[0], projected[1], r * 2.5 * sf
    );
    glow.addColorStop(0, 'rgba(0,204,136,0.3)');
    glow.addColorStop(1, 'rgba(0,204,136,0)');
    context.fillStyle = glow;
    context.fill();
    // Pulse ring
    const fPulseR = r * (1.5 + pulsePhase * 1.5) * sf;
    const fPulseAlpha = 0.4 * (1 - pulsePhase);
    context.beginPath();
    context.arc(projected[0], projected[1], fPulseR, 0, TAU);
    context.strokeStyle = `rgba(0,204,136,${fPulseAlpha})`;
    context.lineWidth = 1.5 * sf;
    context.stroke();
    context.beginPath();
    context.arc(projected[0], projected[1], r * sf, 0, TAU);
    context.fillStyle = CHART_COLORS.green;
    context.fill();
    context.strokeStyle = 'rgba(0,204,136,0.5)';
    context.lineWidth = 1 * sf;
    context.stroke();
    context.fillStyle = 'rgba(255,255,255,0.9)';
    context.font = `bold ${13 * sf}px 'MicroSquare', sans-serif`;
    context.textAlign = 'center';
    context.fillText(c.name, projected[0], projected[1] - r * sf - 6 * sf);
  });

  // 9. Edge ring
  context.beginPath();
  context.arc(cx, cy, currentScale, 0, TAU);
  context.strokeStyle = 'rgba(75,140,200,0.15)';
  context.lineWidth = 1.5 * sf;
  context.stroke();
}

/**
 * Composited renderer: orchestrates background blur + sharp foreground.
 * When blurRadius is 0, delegates to the fast-path (no OffscreenCanvas overhead).
 */
export function renderGlobeComposited(
  mainCtx: CanvasRenderingContext2D,
  offscreenCtx: CanvasRenderingContext2D,
  offscreenCanvas: HTMLCanvasElement | OffscreenCanvas,
  projection: d3.GeoProjection,
  projectionUnclipped: d3.GeoProjection,
  graticule: d3.GeoGraticuleGenerator,
  allDots: GlobeDot[],
  landFeatures: GeoJSON.FeatureCollection | null,
  hoveredCountry: GlobeCountry | null,
  size: number,
  radius: number,
  blurRadius: number,
  pulsePhase: number,
  globeCenterX?: number,
  globeCenterY?: number
): void {
  const gcx = globeCenterX ?? size / 2;
  const gcy = globeCenterY ?? size / 2;

  // Fast path: no blur needed
  if (blurRadius <= 0.1 || !hoveredCountry) {
    renderGlobeFastPath(
      mainCtx, projection, projectionUnclipped, graticule,
      allDots, landFeatures, hoveredCountry, size, radius, pulsePhase,
      gcx, gcy
    );
    return;
  }

  // 1. Draw background to offscreen buffer
  renderGlobeBackground(
    offscreenCtx, projection, projectionUnclipped, graticule,
    allDots, landFeatures, hoveredCountry, size, radius, pulsePhase,
    gcx, gcy
  );

  // 2. Blit offscreen to main canvas with blur filter
  mainCtx.clearRect(0, 0, size, size);
  mainCtx.save();
  mainCtx.filter = `blur(${blurRadius}px)`;
  mainCtx.drawImage(offscreenCanvas as CanvasImageSource, 0, 0, size, size);
  mainCtx.restore();

  // 3. Draw foreground sharp on top
  renderGlobeForeground(mainCtx, projection, allDots, hoveredCountry, size, radius, pulsePhase);
}
