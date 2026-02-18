/**
 * Globe utility functions — pure geometry helpers.
 * Source: V2 globe lines 333–341, 356–440.
 */

export function markerRadius(production: number): number {
  if (production > 1000) return 6;
  if (production > 400) return 5;
  return 4;
}

export function isInBounds(projected: [number, number] | null, size: number): boolean {
  return (
    projected !== null &&
    projected[0] >= 0 &&
    projected[0] <= size &&
    projected[1] >= 0 &&
    projected[1] <= size
  );
}

export function pointInPolygon(point: [number, number], polygon: number[][]): boolean {
  const [x, y] = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

export function pointInFeature(point: [number, number], feature: GeoJSON.Feature): boolean {
  const geom = feature.geometry;
  if (geom.type === 'Polygon') {
    const coords = (geom as GeoJSON.Polygon).coordinates;
    if (!pointInPolygon(point, coords[0])) return false;
    for (let i = 1; i < coords.length; i++) {
      if (pointInPolygon(point, coords[i])) return false;
    }
    return true;
  } else if (geom.type === 'MultiPolygon') {
    const coords = (geom as GeoJSON.MultiPolygon).coordinates;
    for (const poly of coords) {
      if (pointInPolygon(point, poly[0])) {
        let inHole = false;
        for (let i = 1; i < poly.length; i++) {
          if (pointInPolygon(point, poly[i])) {
            inHole = true;
            break;
          }
        }
        if (!inHole) return true;
      }
    }
  }
  return false;
}

export function isVisible(lon: number, lat: number, rotate: [number, number, number]): boolean {
  const lam = ((lon + rotate[0]) * Math.PI) / 180;
  const phi = (lat * Math.PI) / 180;
  const phi0 = ((-rotate[1]) * Math.PI) / 180;
  return (
    Math.sin(phi0) * Math.sin(phi) +
    Math.cos(phi0) * Math.cos(phi) * Math.cos(lam) > 0
  );
}
