# Design Guidelines: iClass App Management Interface

## Design Approach

**Selected Approach:** Design System-Based (Material Design 3)
**Justification:** This is a utility-focused educational app management dashboard requiring clarity, efficiency, and accessibility. Material Design 3 provides excellent information density handling, clear hierarchy, and robust component patterns ideal for data-heavy interfaces.

**Core Principles:**
- Information clarity over visual flourish
- Efficient scanning and action completion
- Consistent, predictable interaction patterns
- Accessible touch targets for tablet/mobile use

---

## Typography System

**Font Family:** Noto Sans SC (Google Fonts) for primary content with excellent Chinese character support
- Primary font for all UI elements
- Clean, highly legible for dense information displays

**Type Scale:**
- **Page Title:** 24px, weight 500, tight letter-spacing
- **App Names:** 16px, weight 500, line-height 1.4
- **Status Labels:** 14px, weight 400
- **Version Numbers:** 13px, weight 400, reduced opacity
- **Dates:** 13px, weight 400, reduced opacity
- **Button Text:** 14px, weight 500, uppercase for actions

**Hierarchy Notes:**
- App names must be prominent and scannable
- Secondary information (dates, versions) visually de-emphasized through size and opacity
- Status indicators use medium weight for clarity

---

## Layout System

**Spacing Primitives:** Use Tailwind units: 2, 4, 6, 8, 12, 16, 20, 24
- Micro spacing (within cards): p-4, gap-2, gap-3
- Card spacing: p-6 internal padding
- Grid gaps: gap-4 on mobile, gap-6 on desktop
- Section spacing: py-8, py-12 for major sections

**Container Strategy:**
- Max-width: max-w-7xl for main content area
- Horizontal padding: px-4 on mobile, px-6 on tablet, px-8 on desktop
- Content should breathe with comfortable margins

**Grid System:**
- Mobile (base): Single column, full-width cards
- Tablet (md:): 2 columns, grid-cols-2
- Desktop (lg:): 3 columns, grid-cols-3
- Large Desktop (xl:): 4 columns, grid-cols-4

**Vertical Rhythm:**
- Consistent card heights within rows
- Fixed aspect ratio for app icons (1:1, 100x100px)
- Aligned content baselines across cards

---

## Component Library

### Navigation Header
- Fixed position at top, full-width
- Height: 64px with flex centering
- Back button (arrow_back icon) positioned left with 44px touch target
- Page title centered or left-aligned after back button
- Bottom border separator for definition
- Padding: px-4 md:px-6

### App Card Component
- Container: Rounded corners (rounded-lg), shadow (shadow-md)
- Internal padding: p-6
- Flex column layout with gap-4
- Components arranged vertically:
  1. App icon (100x100px, rounded-lg, centered)
  2. App name (centered, text-center)
  3. Status badge row (centered, flex-wrap)
  4. Metadata row (date, centered, reduced size)
  5. Action button(s) (full-width or split)

**Status Badges:**
- Pill-shaped (rounded-full)
- Padding: px-3 py-1
- Small text (text-xs)
- Types: "已安裝" (Installed), "最新" (Latest), version numbers
- Multiple badges displayed inline with gap-2

**Action Buttons:**
- Primary actions: "安裝" (Install), "更新" (Update), "移除" (Remove)
- Button hierarchy:
  - Install: Primary button style
  - Update: Primary button style
  - Remove: Secondary/outlined button style
- Full-width on mobile, consider split layout on desktop for multiple actions
- Height: h-10, rounded-md
- Touch-friendly minimum 44px height

### App Icon Display
- Square container: 100x100px
- Rounded corners: rounded-lg
- Images displayed at exact size
- Centered within card
- Object-fit: cover to maintain aspect ratio
- Subtle border for definition

### Empty States
- Centered message when no apps in category
- Icon + text combination
- Padding: py-12 for vertical breathing room

---

## Responsive Behavior

**Mobile (< 768px):**
- Single column grid
- Full-width cards with stacked content
- Touch targets minimum 44px
- Generous padding for thumb-friendly interaction

**Tablet (768px - 1024px):**
- 2-column grid
- Maintain card padding
- Increase grid gap to gap-6

**Desktop (> 1024px):**
- 3-4 column grid based on screen size
- Optimal card width: 280-320px
- Hover states on interactive elements
- Consider sticky header

---

## Interaction Patterns

**Card Interactions:**
- Subtle hover elevation increase on desktop (hover:shadow-lg)
- Smooth transitions (transition-shadow duration-200)
- No click-through on card body, only on buttons

**Button States:**
- Clear hover indication (system default hover states)
- Active/pressed state feedback
- Disabled state for unavailable actions (reduced opacity)

**Loading States:**
- Skeleton screens for app grid during data fetch
- Spinner or progress indicator for button actions
- Maintain layout stability during loading

---

## Accessibility Specifications

**Touch Targets:**
- Minimum 44x44px for all interactive elements
- Adequate spacing between adjacent buttons (min gap-2)

**Contrast:**
- Text must meet WCAG AA standards against backgrounds
- Status badges must have sufficient contrast

**Keyboard Navigation:**
- Logical tab order through cards
- Focus indicators on all interactive elements
- Focus ring with offset for clarity

**Screen Readers:**
- Semantic HTML (nav, main, article for cards)
- Proper heading hierarchy (h1 for page, h2 for app names)
- ARIA labels for icon-only buttons
- Status announcements for dynamic updates

---

## Content Guidelines

**Language Support:**
- Primary: Traditional Chinese (繁體中文)
- Consistent terminology throughout interface
- Proper Chinese typography spacing and punctuation

**Data Display:**
- Dates: Format as "建立於 YYYY-MM-DD HH:MM"
- Versions: "v" prefix with semantic versioning
- Status: Clear, actionable language

---

## Images

**App Icons:**
- Source: Direct URLs from App Store (as provided in original data)
- Display size: 100x100px
- Format: JPG/PNG with proper optimization
- Fallback: Generic app icon placeholder for loading/errors
- All images use rounded corners (rounded-lg) for visual consistency

**No Hero Image:** This is a utility application - focus is on function and information density, not marketing appeal.