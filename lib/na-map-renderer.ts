/**
 * NA Map Renderer — split into background (blurrable) and foreground (sharp)
 * passes, with composited orchestrator for cinematic depth-of-field on hover.
 */

import * as d3 from 'd3';
import { NA_FACILITIES, NAFacility, TAU } from '@/data/na-map';
import { CHART_COLORS } from '@/lib/colors';

type MapDot = [number, number];

// ── Shared helpers ──────────────────────────────────────────────────

function drawDots(ctx: CanvasRenderingContext2D, projection: d3.GeoProjection, allDots: MapDot[]) {
  allDots.forEach((dot) => {
    const projected = projection([dot[0], dot[1]]);
    if (projected) {
      ctx.beginPath();
      ctx.arc(projected[0], projected[1], 0.8, 0, TAU);
      ctx.fillStyle = 'rgba(75,140,200,0.75)';
      ctx.fill();
    }
  });
}

function drawBorders(ctx: CanvasRenderingContext2D, projection: d3.GeoProjection, features: GeoJSON.Feature[]) {
  const path = d3.geoPath().projection(projection).context(ctx);
  ctx.beginPath();
  features.forEach((f) => path(f));
  ctx.strokeStyle = 'rgba(100,170,240,0.45)';
  ctx.lineWidth = 0.8;
  ctx.stroke();
}

function drawConnectionLines(ctx: CanvasRenderingContext2D, facilityPositions: { facility: NAFacility; pos: [number, number] | null }[]) {
  if (facilityPositions.length <= 1) return;
  const wv = facilityPositions.find((fp) => fp.facility.state === 'WV');
  if (!wv || !wv.pos) return;
  facilityPositions.forEach((fp) => {
    if (fp.facility.state === 'WV' || !fp.pos) return;
    ctx.beginPath();
    ctx.moveTo(wv.pos![0], wv.pos![1]);
    ctx.lineTo(fp.pos![0], fp.pos![1]);
    ctx.strokeStyle = 'rgba(0,204,136,0.12)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 6]);
    ctx.stroke();
    ctx.setLineDash([]);
  });
}

function drawMarker(
  ctx: CanvasRenderingContext2D, pos: [number, number],
  facility: NAFacility, r: number, pulsePhase: number, bright: boolean
) {
  const isActive = facility.status === 'Active';

  // Bloom glow
  ctx.beginPath();
  ctx.arc(pos[0], pos[1], r * 3.5, 0, TAU);
  const glow = ctx.createRadialGradient(pos[0], pos[1], 0, pos[0], pos[1], r * 3.5);
  glow.addColorStop(0, isActive ? 'rgba(0,204,136,0.35)' : 'rgba(0,204,136,0.2)');
  glow.addColorStop(1, 'rgba(0,204,136,0)');
  ctx.fillStyle = glow;
  ctx.fill();

  // Pulse ring (25% boosted intensity)
  if (isActive) {
    const pulseR = r * (1.5 + pulsePhase * 1.875);
    const pulseAlpha = (bright ? 0.625 : 0.5) * (1 - pulsePhase);
    ctx.beginPath();
    ctx.arc(pos[0], pos[1], pulseR, 0, TAU);
    ctx.strokeStyle = `rgba(0,204,136,${pulseAlpha})`;
    ctx.lineWidth = bright ? 2.5 : 2;
    ctx.stroke();
  }

  // Core
  ctx.beginPath();
  ctx.arc(pos[0], pos[1], r, 0, TAU);
  ctx.fillStyle = CHART_COLORS.green;
  ctx.fill();
  if (!isActive) {
    ctx.beginPath();
    ctx.arc(pos[0], pos[1], r - 2, 0, TAU);
    ctx.fillStyle = '#080e18';
    ctx.fill();
  }
  ctx.beginPath();
  ctx.arc(pos[0], pos[1], r, 0, TAU);
  ctx.strokeStyle = bright ? 'rgba(0,204,136,0.6)' : 'rgba(0,204,136,0.5)';
  ctx.lineWidth = bright ? 1.5 : 1;
  ctx.stroke();

  // Label
  ctx.fillStyle = bright ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.8)';
  ctx.font = `bold ${isActive ? (bright ? 13 : 12) : (bright ? 12 : 11)}px 'MicroSquare', sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText(facility.label, pos[0], pos[1] - r - 8);

  // Status tag
  if (isActive) {
    ctx.fillStyle = bright ? 'rgba(0,204,136,0.85)' : 'rgba(0,204,136,0.7)';
    ctx.font = `bold ${bright ? 10 : 9}px 'MicroSquare', sans-serif`;
    ctx.fillText('FACILITY #1', pos[0], pos[1] + r + 14);
  } else {
    ctx.fillStyle = bright ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.4)';
    ctx.font = `${bright ? 'bold ' : ''}${bright ? 10 : 9}px 'MicroSquare', sans-serif`;
    ctx.fillText('PLANNED', pos[0], pos[1] + r + 14);
  }
}

function getFacilityPositions(projection: d3.GeoProjection) {
  return NA_FACILITIES.map((f) => ({
    facility: f,
    pos: projection([f.coords.lon, f.coords.lat]) as [number, number] | null,
  })).filter((fp) => fp.pos !== null);
}

// ── Background pass (gets blurred) ─────────────────────────────────

export function renderNAMapBackground(
  ctx: CanvasRenderingContext2D,
  projection: d3.GeoProjection,
  allDots: MapDot[],
  features: GeoJSON.Feature[],
  hoveredFacility: NAFacility | null,
  width: number,
  height: number,
  pulsePhase: number
): void {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#080e18';
  ctx.fillRect(0, 0, width, height);

  drawDots(ctx, projection, allDots);
  drawBorders(ctx, projection, features);

  const positions = getFacilityPositions(projection);
  drawConnectionLines(ctx, positions);

  // Non-hovered markers only
  positions.forEach(({ facility, pos }) => {
    if (!pos) return;
    if (hoveredFacility && facility.state === hoveredFacility.state) return;
    const baseR = facility.status === 'Active' ? 7 : 5;
    drawMarker(ctx, pos, facility, baseR, pulsePhase, false);
  });

  ctx.strokeStyle = 'rgba(75,140,200,0.1)';
  ctx.lineWidth = 1;
  ctx.strokeRect(0, 0, width, height);
}

// ── Foreground pass (stays sharp) ───────────────────────────────────

export function renderNAMapForeground(
  ctx: CanvasRenderingContext2D,
  projection: d3.GeoProjection,
  hoveredFacility: NAFacility,
  pulsePhase: number
): void {
  const pos = projection([hoveredFacility.coords.lon, hoveredFacility.coords.lat]) as [number, number] | null;
  if (!pos) return;

  // Extra halo
  ctx.beginPath();
  ctx.arc(pos[0], pos[1], 28, 0, TAU);
  const halo = ctx.createRadialGradient(pos[0], pos[1], 0, pos[0], pos[1], 28);
  halo.addColorStop(0, 'rgba(0,204,136,0.2)');
  halo.addColorStop(1, 'rgba(0,204,136,0)');
  ctx.fillStyle = halo;
  ctx.fill();

  const baseR = hoveredFacility.status === 'Active' ? 7 : 5;
  drawMarker(ctx, pos, hoveredFacility, baseR * 1.3, pulsePhase, true);
}

// ── Fast-path (no blur, idle state) ─────────────────────────────────

export function renderNAMapFastPath(
  ctx: CanvasRenderingContext2D,
  projection: d3.GeoProjection,
  allDots: MapDot[],
  features: GeoJSON.Feature[],
  hoveredFacility: NAFacility | null,
  width: number,
  height: number,
  pulsePhase: number
): void {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#080e18';
  ctx.fillRect(0, 0, width, height);

  drawDots(ctx, projection, allDots);
  drawBorders(ctx, projection, features);

  const positions = getFacilityPositions(projection);
  drawConnectionLines(ctx, positions);

  positions.forEach(({ facility, pos }) => {
    if (!pos) return;
    const isHovered = hoveredFacility?.state === facility.state;
    const baseR = facility.status === 'Active' ? 7 : 5;
    drawMarker(ctx, pos, facility, isHovered ? baseR * 1.3 : baseR, pulsePhase, isHovered);
  });

  if (hoveredFacility) {
    const hf = positions.find((fp) => fp.facility.state === hoveredFacility.state);
    if (hf && hf.pos) {
      ctx.beginPath();
      ctx.arc(hf.pos[0], hf.pos[1], 20, 0, TAU);
      const highlight = ctx.createRadialGradient(hf.pos[0], hf.pos[1], 0, hf.pos[0], hf.pos[1], 20);
      highlight.addColorStop(0, 'rgba(0,204,136,0.15)');
      highlight.addColorStop(1, 'rgba(0,204,136,0)');
      ctx.fillStyle = highlight;
      ctx.fill();
    }
  }

  ctx.strokeStyle = 'rgba(75,140,200,0.1)';
  ctx.lineWidth = 1;
  ctx.strokeRect(0, 0, width, height);
}

// ── Composited renderer ─────────────────────────────────────────────

export function renderNAMapComposited(
  mainCtx: CanvasRenderingContext2D,
  offscreenCtx: CanvasRenderingContext2D,
  offscreenCanvas: HTMLCanvasElement | OffscreenCanvas,
  projection: d3.GeoProjection,
  allDots: MapDot[],
  features: GeoJSON.Feature[],
  hoveredFacility: NAFacility | null,
  width: number,
  height: number,
  pulsePhase: number,
  blurRadius: number
): void {
  if (blurRadius <= 0.1 || !hoveredFacility) {
    renderNAMapFastPath(mainCtx, projection, allDots, features, hoveredFacility, width, height, pulsePhase);
    return;
  }

  // 1. Background → offscreen
  renderNAMapBackground(offscreenCtx, projection, allDots, features, hoveredFacility, width, height, pulsePhase);

  // 2. Blit with blur
  mainCtx.clearRect(0, 0, width, height);
  mainCtx.save();
  mainCtx.filter = `blur(${blurRadius}px)`;
  mainCtx.drawImage(offscreenCanvas as CanvasImageSource, 0, 0, width, height);
  mainCtx.restore();

  // 3. Sharp foreground
  renderNAMapForeground(mainCtx, projection, hoveredFacility, pulsePhase);
}
