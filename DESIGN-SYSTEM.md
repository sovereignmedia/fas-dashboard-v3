# Dark Knight HUD Design System

> A cinematic dark-mode design system for Canvas 2D data visualizations and dashboard UI.
> Built with Next.js, Tailwind CSS, D3.js, and raw Canvas 2D rendering.

---

## 1. Philosophy

The aesthetic draws from tactical HUD interfaces — think Batman's cowl display or a fighter jet heads-up display. The key principles:

- **Deep navy void backgrounds** — never pure black, always with a slight blue-navy tint
- **Layered transparency** — elements stack with careful alpha values to create depth
- **Bloom and glow** — radial gradients simulate light bleeding from bright elements
- **Pulse animation** — synchronized ring pulses on markers convey "alive" energy
- **Dot-matrix land fills** — countries/regions rendered as grids of tiny dots, not solid fills
- **Cinematic depth-of-field** — blur compositing on hover/focus for dramatic emphasis
- **Subtle noise texture** — SVG fractal noise overlay adds analog warmth

---

## 2. Color Palette

### 2.1 Background Tones (Dark Mode)

| Token             | Hex        | Usage                              |
|--------------------|------------|-------------------------------------|
| `--bg-primary`     | `#060a14`  | Page background, deepest void       |
| `--bg-secondary`   | `#111a2e`  | Card backgrounds, panels            |
| `--bg-tertiary`    | `#131d30`  | Elevated surfaces, sidebar          |
| `--bg-hover`       | `#141e32`  | Hover states on cards/rows          |

### 2.2 Canvas Rendering Backgrounds

| Color       | Usage                                      |
|-------------|---------------------------------------------|
| `#0d1825`   | Globe sphere highlight (radial gradient start) |
| `#040810`   | Globe sphere shadow (radial gradient end)    |
| `#080e18`   | NA Map background fill                       |

### 2.3 Text Hierarchy

| Token              | Hex/RGBA                   | Usage                        |
|---------------------|----------------------------|-------------------------------|
| `--text-primary`    | `#f0f0f0`                  | Headlines, primary content    |
| `--text-secondary`  | `#c0c0c0`                  | Body text, descriptions       |
| `--text-tertiary`   | `#999999`                  | Captions, metadata, labels    |
| Canvas label (front)| `rgba(255,255,255,0.9)`    | Front-side marker labels      |
| Canvas label (back) | `rgba(255,255,255,0.45)`   | Back-side marker labels       |
| Canvas label (bright)| `rgba(255,255,255,0.95)` | Hovered/focused marker labels |

### 2.4 Accent Colors

| Name     | Hex        | Usage                                         |
|----------|------------|------------------------------------------------|
| Green    | `#00cc88`  | Primary accent — markers, highlights, data     |
| Gold     | `#D4A853`  | Secondary accent — card accent lines, badges   |
| Blue     | `#4088e8`  | Data series, info elements                     |
| Orange   | `#e88a30`  | Warning, secondary data                        |
| Red      | `#e84040`  | Error, negative trend                          |
| Purple   | `#c084fc`  | Tertiary data series                           |

### 2.5 Dimmed Accent Variants

| Name       | Hex        | Usage                         |
|------------|------------|--------------------------------|
| Green dim  | `#065f46`  | Muted green backgrounds        |
| Gold dim   | `#8a7033`  | Muted gold backgrounds         |
| Blue dim   | `#1a3d7a`  | Muted blue backgrounds         |
| Gold muted | `rgba(212,168,83,0.15)` | Gold highlight overlay |

### 2.6 The Blue Spectrum (Canvas Infrastructure)

The "HUD wiring" — grid lines, borders, atmospheric effects — all use a consistent blue channel:

| RGBA                        | Usage                              |
|------------------------------|------------------------------------|
| `rgba(75,140,200,0.05)`     | Atmosphere outer edge              |
| `rgba(75,140,200,0.10)`     | Border frame (NA map)              |
| `rgba(75,140,200,0.12)`     | Atmosphere mid-ring                |
| `rgba(75,140,200,0.15)`     | Edge ring (globe perimeter)        |
| `rgba(75,140,200,0.20)`     | Graticule (lat/lon grid lines)     |
| `rgba(75,140,200,0.25)`     | Globe sphere border stroke         |
| `rgba(75,140,200,0.40)`     | Land outline stroke                |
| `rgba(75,140,200,0.75)`     | NA map dot-matrix dots             |
| `rgba(75,140,200,0.85)`     | Globe dot-matrix dots              |
| `rgba(80,150,220,0.16)`     | Atmosphere secondary ring          |
| `rgba(100,170,240,0.45)`    | NA map country/state borders       |

### 2.7 The Green Spectrum (Canvas Data Points)

All marker/data elements use the green channel (`0,204,136`):

| RGBA                         | Usage                              |
|-------------------------------|------------------------------------|
| `rgba(0,204,136,0.12)`      | Connection lines (dashed)          |
| `rgba(0,204,136,0.15)`      | Hover highlight halo               |
| `rgba(0,204,136,0.20)`      | Back-side bloom glow center        |
| `rgba(0,204,136,0.30)`      | Front-side bloom glow center       |
| `rgba(0,204,136,0.35)`      | Active marker bloom (NA map)       |
| `rgba(0,204,136,0.40)`      | Pulse ring max alpha (front)       |
| `rgba(0,204,136,0.50)`      | Marker border stroke               |
| `rgba(0,204,136,0.55)`      | Back-side marker fill              |
| `rgba(0,204,136,0.60)`      | Bright marker border stroke        |
| `rgba(0,204,136,0.70)`      | Status tag (active, normal)        |
| `rgba(0,204,136,0.85)`      | Status tag (active, bright)        |
| `rgba(0,204,136,0.90)`      | Hovered country dot highlight      |
| `#00cc88` (solid)            | Core marker fill                   |

---

## 3. Border System

| Token             | Value                     | Usage                |
|--------------------|---------------------------|----------------------|
| `--border-subtle`  | `rgba(255,255,255,0.08)` | Default card borders |
| `--border-medium`  | `rgba(255,255,255,0.12)` | Hover card borders   |
| `--border-strong`  | `rgba(255,255,255,0.18)` | Active/focus borders |

---

## 4. Shadow System

```css
--shadow-card:    0 1px 2px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3), 0 12px 40px rgba(0,0,0,0.2);
--shadow-card-sm: 0 1px 2px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.2);
--shadow-card-lg: 0 4px 24px rgba(0,0,0,0.4), 0 0 80px rgba(0,204,136,0.03);
--shadow-tooltip: 0 2px 4px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.3);
--shadow-modal:   0 8px 48px rgba(0,0,0,0.6), 0 0 120px rgba(0,0,0,0.4);
```

Note: `--shadow-card-lg` has a subtle green ambient glow (`rgba(0,204,136,0.03)`) for the accent bleed effect.

---

## 5. Card Component Pattern

```
┌─────────────────────────────────────────────┐
│ ─ gold accent line (via-accent-gold/40) ──  │  ← 1px gradient line across top
│                                             │
│  background: linear-gradient(135deg,        │
│    #131d30 0%, #111a2e 50%, #0a0f1c 100%)   │
│                                             │
│  border: 1px solid rgba(255,255,255,0.08)   │
│  border-radius: 16px (rounded-2xl)          │
│  backdrop-filter: blur(sm)                  │
│  box-shadow: --shadow-card                  │
│  overflow: hidden                           │
│  padding: 24px (p-6)                        │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 6. Typography

### 6.1 Fonts

| Context         | Font Family                          | Weights    |
|-----------------|--------------------------------------|------------|
| UI (body)       | Inter, system-ui, sans-serif         | 400–700    |
| Code/data       | JetBrains Mono, Fira Code, monospace | 400–700    |
| Canvas labels   | MicroSquare, sans-serif              | 400, 700   |

**MicroSquare** is the signature canvas font — a compact, squared-off display typeface perfect for HUD-style labels.

### 6.2 Canvas Font Sizes (Globe)

All sizes scale with `sf = currentScale / baseRadius`:

| Element              | Size          | Weight | Color alpha |
|----------------------|---------------|--------|-------------|
| Front-side label     | `13 * sf`px   | bold   | 0.9         |
| Back-side label      | `10 * sf`px   | bold   | 0.45        |
| Status tag (active)  | `10`px        | bold   | 0.7–0.85    |
| Status tag (planned) | `9`px         | normal | 0.4–0.6     |

---

## 7. Canvas Rendering Layers

The draw order creates the depth effect. Every layer builds on the previous:

### 7.1 Globe Rendering Sequence

```
Layer 1: Atmospheric Glow
  └─ Radial gradient from globe center
  └─ Inner: transparent → 0.12 → 0.16 → 0.05 (blue spectrum)
  └─ Radius: currentScale × 0.9 → currentScale × 1.15

Layer 2: Globe Sphere
  └─ Radial gradient: #0d1825 (highlight) → #040810 (shadow)
  └─ Light source offset: cx × 0.85, cy × 0.85 (top-left bias)
  └─ Border: rgba(75,140,200,0.25), 1 × sf width

Layer 3: Graticule (lat/lon grid)
  └─ rgba(75,140,200,0.20), 0.5 × sf width

Layer 4: Land Outlines
  └─ rgba(75,140,200,0.4), 0.8 × sf width

Layer 5: Dot-Matrix Land Fill
  └─ Individual dots at 16px spacing (≈1.28° geographic)
  └─ Dot radius: 1.0 × sf
  └─ Color: rgba(75,140,200,0.85)
  └─ Hovered country dots: 1.3 × sf, rgba(0,204,136,0.9)

Layer 6: Back-Side Markers (through-globe, dimmed)
  └─ Uses unclipped projection (no clipAngle)
  └─ Core: r × 0.8 × sf, rgba(0,204,136,0.55)
  └─ Pulse ring: alpha 0.2, fades with phase

Layer 7: Front-Side Markers (full brightness)
  └─ Bloom glow: radial gradient, r × 2.5 radius
  └─ Pulse ring: alpha 0.4, fades with phase
  └─ Core: r × sf, solid #00cc88
  └─ Border: rgba(0,204,136,0.5), 1 × sf
  └─ Label: bold 13px MicroSquare, rgba(255,255,255,0.9)

Layer 8: Edge Ring
  └─ rgba(75,140,200,0.15), 1.5 × sf width
```

### 7.2 NA Map Rendering Sequence

```
Layer 1: Background Fill
  └─ Solid #080e18

Layer 2: Dot-Matrix Land Fill
  └─ Dot radius: 0.8px (no scaling)
  └─ Color: rgba(75,140,200,0.75)

Layer 3: Country/State Borders
  └─ rgba(100,170,240,0.45), 0.8px width

Layer 4: Connection Lines (hub-and-spoke from WV)
  └─ rgba(0,204,136,0.12), 1px, dashed [4,6]

Layer 5: Facility Markers
  └─ Active: 7px radius, solid core
  └─ Planned: 5px radius, hollow (2px inset #080e18)
  └─ Bloom glow: r × 3.5 radius
  └─ Pulse ring (active only): 25% boosted intensity

Layer 6: Border Frame
  └─ rgba(75,140,200,0.1), 1px stroke rect
```

---

## 8. Marker Anatomy

```
         ┌─ Label (MicroSquare bold, white 0.9α)
         │
    ╔════╧════╗
    ║ ░░░░░░░ ║ ← Bloom glow (radial gradient, r×2.5)
    ║ ░╔═══╗░ ║
    ║ ░║ ● ║░ ║ ← Core (solid #00cc88, r×sf radius)
    ║ ░╚═══╝░ ║ ← Border stroke (green 0.5α)
    ║ ░░░░░░░ ║
    ╚═════════╝
         │
    ─── ◯ ───  ← Pulse ring (expanding, fading)
         │
    STATUS TAG (9–10px, green or white)
```

### 8.1 Pulse Ring Animation

```
Phase: 0.0 → 1.0 (repeating), increment 0.008/frame ≈ 2 second cycle

Globe front-side:
  radius = r × (1.5 + phase × 1.5) × sf      // expands from 1.5r to 3r
  alpha  = 0.4 × (1 - phase)                   // fades from 0.4 to 0

Globe back-side:
  radius = r × (1.2 + phase × 1.2) × sf
  alpha  = 0.2 × (1 - phase)

NA Map (25% boosted):
  radius = r × (1.5 + phase × 1.875)
  alpha  = 0.5 × (1 - phase)                   // 0.625 when bright
```

### 8.2 Marker Sizing

Globe markers scale by production volume:
```
production > 1000Mt → r = 6
production > 400Mt  → r = 5
production ≤ 400Mt  → r = 4
```

NA map markers by status:
```
Active   → r = 7 (solid fill)
Planned  → r = 5 (hollow, 2px inset)
Hovered  → r × 1.3
```

---

## 9. Cinematic Depth-of-Field System

### 9.1 Architecture

```
┌──────────────────────────────────────────────┐
│ Main Canvas (user-visible)                    │
│                                               │
│  ┌──────────────────────────────────────┐     │
│  │ Step 1: Background → Offscreen       │     │
│  │ (atmosphere, sphere, grid, dots,     │     │
│  │  all markers EXCEPT hovered)         │     │
│  └──────────────────────────────────────┘     │
│              ↓ blur(N px)                     │
│  ┌──────────────────────────────────────┐     │
│  │ Step 2: Blit offscreen → main        │     │
│  │ with ctx.filter = 'blur(12px)'       │     │
│  └──────────────────────────────────────┘     │
│              ↓ composite                      │
│  ┌──────────────────────────────────────┐     │
│  │ Step 3: Foreground → main (sharp)    │     │
│  │ (hovered marker + hovered dots only) │     │
│  └──────────────────────────────────────┘     │
└──────────────────────────────────────────────┘
```

### 9.2 Blur Parameters

| Parameter          | Value     | Notes                             |
|--------------------|-----------|-----------------------------------|
| Max blur radius    | 12px      | Full cinematic depth-of-field     |
| Blur easing        | cubicInOut| Smooth ramp in/out                |
| Zoom-in duration   | 500ms     | Hover → focused                   |
| Zoom-out duration  | 400ms     | Leave → idle                      |
| Scale multiplier   | 1.4×      | How much the globe enlarges       |
| Canvas padding     | 80px      | Extra space for zoom overflow     |

### 9.3 Fast Path Optimization

When `blurRadius <= 0.1` or no country is hovered, skip the offscreen canvas entirely and render everything in a single pass. This avoids the overhead of:
- Drawing to offscreen buffer
- Applying CSS filter blur
- Blitting between canvases
- Two-pass marker rendering

---

## 10. Zoom-Toward-Cursor System

The globe zooms toward the mouse position so the geographic point under the cursor stays pinned:

```
newScale = baseRadius × 1.4
scaleRatio = newScale / baseRadius
toTranslateX = mouseX - (mouseX - centerX) × scaleRatio
toTranslateY = mouseY - (mouseY - centerY) × scaleRatio
```

Both `projection.scale()` and `projection.translate()` are animated simultaneously with `d3.easeCubicInOut`.

---

## 11. Dot-Matrix Generation

Land masses are filled with dots rather than solid color. This creates the digital/HUD aesthetic.

```
Input: GeoJSON Feature (country/state polygon)
Spacing: 16 (→ step = 16 × 0.08 = 1.28° geographic grid)

Algorithm:
1. Get geographic bounding box of feature
2. Handle antimeridian wrapping (split into two longitude ranges)
3. For each grid point at 1.28° intervals:
   - Point-in-polygon test (handles holes in MultiPolygon)
   - If inside → add to dot array
4. Each dot stores [longitude, latitude, isoCode|null]
```

---

## 12. Noise Texture Overlay

A subtle full-screen noise layer adds analog warmth:

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  opacity: 0.03;        /* dark mode */
  z-index: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,...");
  /* SVG fractalNoise: baseFrequency=0.9, numOctaves=4, stitchTiles */
}
```

Dark mode opacity: `0.03` | Light mode: `0.015`

---

## 13. Card Gradient System

### Dark Mode
```css
--card-gradient:     linear-gradient(135deg, #131d30 0%, #111a2e 50%, #0a0f1c 100%);
--card-gradient-alt: linear-gradient(145deg, #141e32 0%, #111a2e 100%);
```

### Gold Accent Line
Every card has a 1px gradient line across the top:
```
from-transparent → via-accent-gold/40 → to-transparent
```
This creates a subtle golden shimmer on the card edge.

---

## 14. Animation Timing

| Animation              | Duration | Easing          | Notes                        |
|------------------------|----------|-----------------|-------------------------------|
| Zoom in                | 500ms    | cubicInOut      | Hover → focused state         |
| Zoom out               | 400ms    | cubicInOut      | Leave → idle state            |
| Pulse ring cycle       | ~2s      | linear (0.008/frame) | Continuous, synchronized |
| Auto-rotation          | continuous | linear 0.08°/frame | ~75 seconds per revolution |
| Drag resume delay      | 1500ms   | —               | After drag release            |
| Theme transition       | 200ms    | ease            | Background/border color       |

---

## 15. Projection Setup

### Globe (Orthographic)
```typescript
d3.geoOrthographic()
  .scale(radius)           // radius = GLOBE_SIZE / 2.5
  .translate([cx, cy])     // center of canvas
  .clipAngle(90)           // front hemisphere only (clipped)

// Second projection for back-side markers:
d3.geoOrthographic()
  .scale(radius)
  .translate([cx, cy])
  // NO clipAngle → renders back-side points
```

### NA Map (Albers USA or Mercator)
Custom projection fitted to the continental US + Canada + Mexico bounding box.

---

## 16. File Architecture

```
lib/
  colors.ts              ← Color constants (CHART_COLORS, PRODUCT_COLORS)
  globe-renderer.ts      ← V2 globe renderer (single-pass, no blur)
  globe-renderer-v3.ts   ← V3 globe renderer (split background/foreground/composited)
  globe-utils.ts         ← Pure geometry: pointInPolygon, isVisible, generateDots
  na-map-renderer.ts     ← NA map renderer (split background/foreground/composited)

hooks/
  useGlobeInteraction.ts    ← V2 globe hook (hover + auto-rotate + pulse)
  useGlobeInteractionV3.ts  ← V3 globe hook (zoom + blur + translate animation)
  useNAMapInteraction.ts    ← NA map hook (hover + blur compositing)

data/
  globe.ts               ← Globe data: coordinates, countries, GeoJSON URL
  na-map.ts              ← NA map data: facilities, GeoJSON URLs

components/charts/
  InteractiveGlobeV2.tsx  ← V2 globe React wrapper
  InteractiveGlobeV3.tsx  ← V3 globe React wrapper
  NACommercialization.tsx ← NA map React wrapper
  GlobeTooltip.tsx        ← Shared tooltip overlay

components/ui/
  Card.tsx               ← Base card component
  SectionHeader.tsx      ← Page section headers

app/
  globals.css            ← CSS variables, font faces, noise texture, theme tokens
  layout.tsx             ← Root layout with font loading

tailwind.config.ts       ← Theme extension: colors, fonts, spacing
```

---

## 17. Dependencies

| Package | Version | Usage                                |
|---------|---------|---------------------------------------|
| d3      | ^7      | Projections, paths, graticules, easing, timers |
| next    | 15+     | Framework                             |
| tailwindcss | 3+  | Utility CSS                           |
| react   | 19+     | Component layer                       |

The Canvas 2D renderers have **zero React dependency** — they're pure functions that take a `CanvasRenderingContext2D` and data. D3 is the only rendering dependency.

---

## 18. Quick-Start Checklist

To replicate this aesthetic in a new project:

1. **Copy `lib/colors.ts`** — your color palette
2. **Copy the renderer** you need (`globe-renderer-v3.ts` or `na-map-renderer.ts`)
3. **Copy `lib/globe-utils.ts`** — pure geometry helpers
4. **Copy the corresponding hook** — interaction + animation logic
5. **Set up CSS variables** from `globals.css` (Section 2.1, 3, 4)
6. **Install MicroSquare font** in `public/fonts/` and add `@font-face` declarations
7. **Install D3** — `npm i d3 @types/d3`
8. **Set up Tailwind theme** — extend with the color tokens from Section 2
9. **Add noise texture** — the `body::before` SVG noise overlay (Section 12)
10. **Swap in your data** — replace `data/globe.ts` with your own coordinates and features
