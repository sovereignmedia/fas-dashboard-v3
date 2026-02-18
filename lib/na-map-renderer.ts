import * as d3 from 'd3';
import { NA_FACILITIES, NAFacility, TAU } from '@/data/na-map';
import { CHART_COLORS } from '@/lib/colors';

type MapDot = [number, number]; // [lon, lat]

export function renderNAMap(
  ctx: CanvasRenderingContext2D,
  projection: d3.GeoProjection,
  allDots: MapDot[],
  features: GeoJSON.Feature[],
  hoveredFacility: NAFacility | null,
  width: number,
  height: number,
  pulsePhase: number
): void {
  const path = d3.geoPath().projection(projection).context(ctx);

  ctx.clearRect(0, 0, width, height);

  // 1. Background
  ctx.fillStyle = '#080e18';
  ctx.fillRect(0, 0, width, height);

  // 2. State/province borders
  ctx.beginPath();
  features.forEach((f) => path(f));
  ctx.strokeStyle = 'rgba(75,140,200,0.3)';
  ctx.lineWidth = 0.6;
  ctx.stroke();

  // 3. Dot-matrix land fill
  allDots.forEach((dot) => {
    const projected = projection([dot[0], dot[1]]);
    if (projected) {
      ctx.beginPath();
      ctx.arc(projected[0], projected[1], 1.0, 0, TAU);
      ctx.fillStyle = 'rgba(75,140,200,0.85)';
      ctx.fill();
    }
  });

  // 4. Connection lines between facilities (subtle network feel)
  const facilityPositions = NA_FACILITIES.map((f) => ({
    facility: f,
    pos: projection([f.coords.lon, f.coords.lat]),
  })).filter((fp) => fp.pos !== null);

  if (facilityPositions.length > 1) {
    // Connect WV to each planned facility
    const wv = facilityPositions.find((fp) => fp.facility.state === 'WV');
    if (wv && wv.pos) {
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
  }

  // 5. Facility markers
  facilityPositions.forEach(({ facility, pos }) => {
    if (!pos) return;
    const isActive = facility.status === 'Active';
    const isHovered = hoveredFacility?.state === facility.state;
    const baseR = isActive ? 7 : 5;
    const r = isHovered ? baseR * 1.3 : baseR;

    // Bloom glow
    ctx.beginPath();
    ctx.arc(pos[0], pos[1], r * 3.5, 0, TAU);
    const glow = ctx.createRadialGradient(pos[0], pos[1], 0, pos[0], pos[1], r * 3.5);
    glow.addColorStop(0, isActive ? 'rgba(0,204,136,0.35)' : 'rgba(0,204,136,0.2)');
    glow.addColorStop(1, 'rgba(0,204,136,0)');
    ctx.fillStyle = glow;
    ctx.fill();

    // Pulse ring for active facility
    if (isActive) {
      const pulseR = r * (1.5 + pulsePhase * 1.5);
      const pulseAlpha = 0.4 * (1 - pulsePhase);
      ctx.beginPath();
      ctx.arc(pos[0], pos[1], pulseR, 0, TAU);
      ctx.strokeStyle = `rgba(0,204,136,${pulseAlpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Core marker
    ctx.beginPath();
    ctx.arc(pos[0], pos[1], r, 0, TAU);
    ctx.fillStyle = isActive ? CHART_COLORS.green : CHART_COLORS.green;
    ctx.fill();
    if (!isActive) {
      // Planned: outlined style
      ctx.beginPath();
      ctx.arc(pos[0], pos[1], r - 2, 0, TAU);
      ctx.fillStyle = '#080e18';
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(pos[0], pos[1], r, 0, TAU);
    ctx.strokeStyle = 'rgba(0,204,136,0.5)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Label
    ctx.fillStyle = isHovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.8)';
    ctx.font = `bold ${isActive ? 12 : 11}px 'MicroSquare', sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(facility.label, pos[0], pos[1] - r - 8);

    // Status tag
    if (isActive) {
      ctx.fillStyle = 'rgba(0,204,136,0.7)';
      ctx.font = "bold 9px 'MicroSquare', sans-serif";
      ctx.fillText('FACILITY #1', pos[0], pos[1] + r + 14);
    } else {
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = "9px 'MicroSquare', sans-serif";
      ctx.fillText('PLANNED', pos[0], pos[1] + r + 14);
    }
  });

  // 6. Hovered facility tooltip highlight (extra glow)
  if (hoveredFacility) {
    const hf = facilityPositions.find((fp) => fp.facility.state === hoveredFacility.state);
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

  // 7. Subtle border around map area
  ctx.strokeStyle = 'rgba(75,140,200,0.1)';
  ctx.lineWidth = 1;
  ctx.strokeRect(0, 0, width, height);
}
