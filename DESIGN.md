---
name: DetectAI-Pro Design System
colors:
  background: '#F9FAFB'
  on-background: '#111827'
  primary: '#2563EB'
  on-primary: '#FFFFFF'
  primary-container: '#DBEAFE'
  on-primary-container: '#1E40AF'
  secondary: '#4F46E5'
  on-secondary: '#FFFFFF'
  secondary-container: '#E0E7FF'
  on-secondary-container: '#3730A3'
  tertiary: '#9333EA'
  on-tertiary: '#FFFFFF'
  tertiary-container: '#F3E8FF'
  on-tertiary-container: '#6B21A8'
  surface: '#FFFFFF'
  on-surface: '#111827'
  surface-variant: '#F3F4F6'
  on-surface-variant: '#4B5563'
  outline: '#E5E7EB'
  outline-variant: '#F3F4F6'
  error: '#EF4444'
  on-error: '#FFFFFF'
  error-container: '#FEE2E2'
  on-error-container: '#991B1B'
typography:
  h1:
    fontFamily: Outfit
    fontSize: 56px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  h2:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h3:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: -0.01em
  body:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  button:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.01em
rounded:
  sm: 0.375rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  section-padding: 80px
  container-max-width: 1280px
  gutter: 24px
  internal-padding-xs: 8px
  internal-padding-sm: 12px
  internal-padding-md: 20px
---

# DetectAI-Pro Design Guidelines

## 1. Creative North Star: \"Neural Scaffold & Authenticity Radar\"
This design system establishes a high-trust, high-precision environment for AI authenticity tracking. The UI functions as a professional diagnostic instrument, combining visual clarity with sophisticated technical indicators.

The branding expresses authority, algorithmic intelligence, and engineered security. Spacing is comfortable, layouts are modular, and elements have clear visual boundaries to help enterprise auditors scan massive text sets and user metrics instantly.

---

## 2. Brand Aesthetics & Layering
We balance clean, modern minimalism with functional high-tech accents:
*   **The Crystal Border Rule:** Define blocks using ultra-light borders (`#E5E7EB` or `#F3F4F6`) instead of heavy shadows. This simulates a "visual scaffold" where layout structure is clear and lightweight.
*   **Glassmorphic Overlay:** Float global navigation menus using semi-transparent white and backdrop blurs (`backdrop-blur-md bg-white/95`) to retain depth and continuity.
*   **Tactile Accent Gradients:** Reserve primary gradients (transitioning from Blue `#2563EB` to Indigo `#4F46E5`) for main CTAs, active evaluation bars, and visual brand elements.

---

## 3. High-Tech Terminal Styling
To symbolize our advanced neural processing layers (BERT & T5 pipelines), we utilize a high-contrast monospaced log theme for active evaluations:
*   **Surface:** Matte Charcoal/Black (`#090A0F`) with deep forest-green accents (`#22C55E` or `#4ADE80`).
*   **Typography:** Technical monospace labels (`font-mono`) to denote background model finetuning streams, scanning loops, and accuracy weights.
*   **Layering:** Contain terminal streams in clear panels with rounded outer profiles (`rounded-xl` or `rounded-2xl`) to bridge the technical details with our premium aesthetic framework.

---

## 4. Responsive Spacing & Grid System
Maintain rigorous proportion on all viewport dimensions:
*   **Paddings & Gutters:** Rely on fluid padding systems (`px-4 py-6 sm:px-6 md:py-8 lg:px-8 lg:py-10`) so elements have generous margins on desktop monitors and automatically contract without crowding on small mobile viewports.
*   **Actions & Buttons:** Convert action groups to dynamic layouts (`flex-col sm:flex-row gap-3`) so tap targets remain wide and comfortable on mobile screens.
*   **Data Scroller:** Prevent tables from squishing by enclosing them in smooth horizontal overflow layers (`overflow-x-auto w-full`) with stable minimum dimensions.
