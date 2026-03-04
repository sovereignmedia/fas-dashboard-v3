# Beta Disclaimer Modal — Design Document

**Date:** 2026-03-04
**Status:** Approved

## Purpose

Display a mandatory disclaimer modal on every dashboard visit informing users that this is a conceptual beta platform with unaudited data.

## Behavior

- Renders on **every visit** (no localStorage/session persistence)
- Dashboard is visible but **blurred and non-interactive** behind the overlay
- Placed in `app/dashboard/layout.tsx` — covers all dashboard pages
- Dismissed only by clicking "I Understand & Acknowledge" (React state)
- No close button, no click-outside-to-dismiss

## Component

- **File:** `components/ui/DisclaimerModal.tsx`
- **Integration point:** `app/dashboard/layout.tsx`

## Visual Treatment

- **Backdrop:** `bg-black/60` overlay + `backdrop-blur-sm` on dashboard content
- **Modal card:** `bg-bg-secondary` with existing border styling
- **Title:** `text-accent-gold` (Frontieras brand)
- **Body:** `text-text-secondary`, standard dashboard typography
- **Button:** Gold accent background, dark text, existing button patterns
- **Animation:** Framer Motion fade-in, consistent with dashboard animation system

## Copy

**Title:** Confidential — Pre-Release Platform

**Body:**

This investor intelligence dashboard is a conceptual beta version of Frontieras' forthcoming Institutional Investor Intelligence Suite. The projections, operational metrics, and strategic data presented herein are provided for conceptual purposes, and have not been independently audited, reviewed, or verified by any third party. This platform is still in its prototype phase, and requires significant further development.

All information is provided on an "as-is" basis and is derived from internal estimates, management assumptions, and forward-looking projections that are subject to material revision. This platform does not constitute an offer to sell or a solicitation of an offer to buy any securities.

By proceeding, you acknowledge that you understand the preliminary and unaudited nature of the information contained within this platform.

**Button:** I Understand & Acknowledge
