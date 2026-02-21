/**
 * Server-only auth constants.
 * NEVER import this file from a client component ('use client').
 * These values stay on the server — they are not bundled into browser JS.
 */

export const AUTH_COOKIE_NAME = 'fas-auth';

/** Password for dashboard access. Override via env var in production. */
export const DASHBOARD_PASSWORD =
  process.env.DASHBOARD_PASSWORD || 'privatetest';

/**
 * Secret used as the cookie value to prove authentication.
 * In production, set AUTH_SECRET to a long random string (e.g. `openssl rand -hex 32`).
 */
export const AUTH_SECRET =
  process.env.AUTH_SECRET || 'fas-default-secret-change-in-production';
