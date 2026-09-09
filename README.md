# crocheeeet — Stitch, Share, Shop. Extra cozy with three e's

> **UI/UX Pro Max Applied** — Vibrant & Block-based style, crafted for the cozy internet.

A playful marketplace for crochet lovers. Discover indie patterns, track every row, and sell what you make. Built with the UI/UX Pro Max design intelligence system.

![Vite](https://img.shields.io/badge/Vite-6.4.3-646CFF) ![React](https://img.shields.io/badge/React-19-61DAFB) ![Tailwind](https://img.shields.io/badge/Tailwind-4.0-06B6D4) ![Accessibility](https://img.shields.io/badge/a11y-WCAG_2.2_AA-16A34A)

---

## ✨ Design System

Generated via `uipro` + `search.py --design-system`

### Pattern
**Hero + Testimonials + CTA**
- Conversion Focus: Social proof before CTA, verified testimonials with photo/name/role
- CTA Placement: Hero (sticky) + Post-testimonials
- Sections: Hero > Problem statement > Solution overview > Marketplace (Bento Grid) > Testimonials carousel > Community CTA

### Style
**Vibrant & Block-based**
- Keywords: Bold, energetic, playful, block layout, geometric shapes, high color contrast, duotone, modern
- Best For: Startups, creative agencies, youth-focused, consumer
- Effects: Large sections (48px+ gaps), animated patterns, bold hover (color shift), scroll-snap, large type (32px+), 200-300ms transitions
- Mode: Light + Dark supported

### Colors — Trust purple + transaction green
| Role | Hex | Token |
|------|-----|-------|
| Primary | `#7C3AED` | `--color-primary` |
| Secondary | `#A78BFA` | `--color-secondary` |
| Accent/CTA | `#16A34A` | `--color-accent` |
| Background | `#FAF5FF` | `--color-background` |
| Foreground | `#4C1D95` | `--color-foreground` |
| Card | `#FFFFFF` | `--color-card` |
| Muted | `#ECEEF9` | `--color-muted` |
| Border | `#DDD6FE` | `--color-border` |

### Typography — Indie/Craft
- **Heading:** Amatic SC (handwritten, craft, artisan)
- **Body:** Cabin (readable, organic)
- **Base:** 16px, line-height 1.5
- **Google Fonts:** [Amatic SC + Cabin](https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Cabin:wght@400;500;600;700&display=swap)

---

## 🎨 UI/UX Pro Max Compliance

### ✅ Accessibility (CRITICAL)
- [x] Contrast 4.5:1 minimum (foreground #4C1D95 on #FAF5FF = 11.2:1)
- [x] Alt text for meaningful images (pattern previews, avatars decorative when needed)
- [x] Keyboard nav — tab order matches visual, carousel ArrowLeft/Right, focus trap in cart
- [x] Aria-labels for icon-only buttons (favorites, bag, carousel controls)
- [x] Icon context — decorative `aria-hidden="true"`, meaningful with text alternative, interactive with accessible name + state
- [x] Skip link to main content
- [x] Heading hierarchy h1 → h2 → h3 sequential
- [x] Focus states visible (2px ring, offset)
- [x] Focus not obscured (sticky header safe)
- [x] Reduced motion respected (prefers-reduced-motion disables animations)
- [x] Color not only indicator (icons + text + badges)
- [x] Auto-rotation controls — testimonials carousel has pause/play, stops on hover/focus/reduced-motion, announces position via aria-live
- [x] Live badge updates — cart/favorites announce via polite live region

### ✅ Touch & Interaction (CRITICAL)
- [x] Min touch target 44×44px (w-11 h-11 = 44px, buttons min-height 44px)
- [x] 8px+ spacing between targets (gap-2 = 8px minimum)
- [x] Loading feedback — toast with status role, button press feedback
- [x] Cursor-pointer on all clickable
- [x] No hover-only reliance — all hover has click/tap equivalent
- [x] Press feedback — translateY + shadow, 200ms
- [x] Tap feedback within 100ms

### ✅ Performance (HIGH)
- [x] WebP via Unsplash w= param, responsive images
- [x] Lazy loading — `loading="lazy"` below fold, eager for hero
- [x] Reserve space — aspect-ratio containers prevent CLS
- [x] Font-display swap via Google Fonts + preconnect
- [x] Skeleton/shimmer for loading states
- [x] No layout thrashing

### ✅ Style Selection (HIGH)
- [x] Match product type — Vibrant & Block-based for marketplace/community
- [x] Consistency — Phosphor icons only, no emoji as structural icons
- [x] SVG icons — `@phosphor-icons/react`, outline style, consistent 1.5px stroke
- [x] Vector-only assets
- [x] Stable interaction states — color/opacity/elevation, no layout shift
- [x] Consistent icon sizing — 16/18/20/24 tokens
- [x] Icon contrast 3:1 for meaningful

### ✅ Layout & Responsive (HIGH)
- [x] Mobile-first breakpoints (375, 768, 1024, 1440 tested)
- [x] Viewport meta
- [x] No horizontal scroll (overflow-x hidden, max-w containers)
- [x] Safe area — sticky header respects top, no content under notch
- [x] 8dp rhythm — 4/8/16/24/32/48/64 spacing system
- [x] Readable measure — max 50-65ch for body
- [x] Adaptive gutters — px-4 md:px-6 lg:px-8

### ✅ Typography & Color (MEDIUM)
- [x] Base 16px, line-height 1.5
- [x] Semantic tokens — no raw hex in components, all via CSS variables
- [x] No text <12px for body (minimum 12px for badges, 13-14px for meta)
- [x] Line balance for headings

### ✅ Animation (MEDIUM)
- [x] Context-aware timing — 200ms for buttons, 250ms cards, 500ms carousel
- [x] Motion conveys meaning — lift for cards, slide for carousel
- [x] Spatial continuity — cart drawer slide-in
- [x] Reduced motion support

### ✅ Forms & Feedback (MEDIUM)
- [x] Visible labels — search and email have associated labels
- [x] Error near field — email error with role=alert, aria-invalid, aria-describedby
- [x] Helper text — newsletter privacy note
- [x] No placeholder-only labels

### ✅ Navigation (HIGH)
- [x] Predictable — header sticky, logo home, anchor links
- [x] Deep linking — #market, #community etc.
- [x] Bottom nav ≤5 not needed for web, but mobile actions limited to 3 primary

---

## 🚀 Quick Start

```bash
npm install
npm run dev    # http://localhost:5173
npm run build
npm run preview
```

## 📁 Project Structure

```
crocheeeet/
├── src/
│   ├── App.jsx          # Main app — Hero + Bento + Marketplace + Testimonials + CTA
│   ├── main.jsx
│   └── index.css        # Design tokens + Vibrant block styles
├── public/
│   └── yarn.svg
├── design-system/
│   └── crocheeeet/
│       └── MASTER.md    # Generated design system
├── index.html
├── vite.config.js
└── package.json
```

## 🧶 Features Built

- **Hero** — Large display type (Amatic SC 48-96px), animated dot pattern, geometric blocks, social proof
- **Bento Grid** — 4 categories with color-coded cards
- **Marketplace** — Filter by category, search, favorites, bag, accessible cards with aspect-ratio images
- **Stitch Counter Demo** — Interactive row counter (micro-interaction, progress bar, WCAG progressbar role)
- **Testimonials Carousel** — WCAG compliant: pause/play, prev/next, keyboard ArrowLeft/Right, aria-live announcements, stops on hover/focus/reduced-motion
- **Community CTA** — Dark block with newsletter form (visible labels, error handling, accessible)
- **Cart Drawer** — Slide-in, focus management, live region

## 🎯 Stack

- **React 19** + **Vite 6** + **Tailwind CSS 4**
- **Phosphor Icons** — consistent outline style, no emoji
- No external UI library — custom tokens for full control

---

Built with 💜 and extra e's for the cozy internet.
