/**
 * V3 globe utilities — cinematic hover helpers.
 */

/** Returns the rotation needed to center a lon/lat point on an orthographic projection. */
export function rotationToCenter(lon: number, lat: number): [number, number, number] {
  return [-lon, -lat, 0];
}
