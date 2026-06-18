
# IntakeFlow Landing Page — Final Plan

A single-page, conversion-focused B2B SaaS landing site on the existing TanStack Start + Tailwind v4 stack. All content lives on `/` with smooth in-page scroll to the lead form.

## Design Direction

- **Palette**: Deep navy dark mode / slate-50 light mode; primary = electric blue; accent = emerald for CTAs and success states.
- **Typography**: Inter (body) + Space Grotesk (display) loaded via `<link>` in `__root.tsx`; IBM Plex Sans Arabic auto-applied when `dir="rtl"`.
- **Visuals**: Subtle grid background + radial brand glow in hero, glassmorphic dashboard mockup (CSS/SVG only, no external image), animated chart bars.
- Tokens defined in `src/styles.css` `@theme`. Dark mode via `.dark` class on `<html>`.

## Page Structure (single route `/`)

1. **Sticky Header** — logo, nav (Features, Analytics, Cloud Infrastructure, Contact), theme toggle, EN/AR toggle, "Request Demo" CTA, mobile menu.
2. **Hero** (`#top`) — headline + sub, two CTAs ("Get Started Now" / "Watch Demo"), animated dashboard mockup, 3-stat strip.
3. **Lead Journey** (`#features`) — 4 numbered stage cards with icons and connecting arrows; vertical stack on mobile.
4. **Analytics Dashboard** (`#analytics`) — 3 highlight cards beside the live mockup (conversion bars, drop-off funnel, CSAT).
5. **Cloud Infrastructure** (`#cloud`) — two large feature cards (High Availability, Enterprise Security) with bullets.
6. **Lead Capture Form** (`#contact`) — framed card, validated form, async submit, success overlay, sales email below.
7. **Footer** — brand, tagline, copyright.

## Internationalization (EN / AR)

- In-app i18n: `src/lib/i18n.tsx` (`LanguageProvider`, `useI18n`) + `src/lib/translations.ts` dictionaries covering every visible string.
- On toggle: set `document.documentElement.lang` + `dir`, persist in `localStorage`.
- Layout uses Tailwind logical properties (`ps-*`, `start-*`, `end-*`, `rtl:` modifiers) so layout mirrors automatically.
- Arabic font stack applied via CSS selector when `dir="rtl"`.

## Theme Toggle

- `src/lib/theme.tsx` toggles `.dark` on `<html>`, persists in `localStorage`, respects `prefers-color-scheme`.
- Inline blocking script in `__root.tsx` `head` prevents flash of wrong theme/dir on hydration.

## Lead Capture Form

Built with `react-hook-form` + `zod` (both installed). Schema:
- `businessName`: trim, 2–120 chars
- `industry`: trim, 5–500 chars
- `email`: zod `.email()`, max 255
- `phone`: regex `^[+\d][\d\s\-()]{6,20}$`
- `teamSize`: enum `"1-5" | "6-20" | "20+"`
- `outcomes`: trim, 5–1000 chars
- `honeypot`: must be empty

Honeypot field: absolute-positioned off-screen (`left:-10000px`), `aria-hidden`, `tabIndex={-1}`, `autoComplete="off"`.

Submit handler:
- `preventDefault` via RHF; if honeypot filled → fake success, no network call.
- Disable button + show `Loader2` spinner.
- `AbortController` 15s timeout.
- `fetch(GAS_URL, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body, signal })` to bypass CORS preflight.
- **Payload (exact backend keys, per your correction):**
  ```js
  JSON.stringify({
    businessName: data.businessName,
    businessDescription: data.industry,
    businessEmail: data.email,
    phoneNumber: data.phone,
    teamSize: data.teamSize,
    expectedOutcomes: data.outcomes,
    honeypot: data.honeypot,
  })
  ```
- Await JSON; if `status === "success"` → reset form + show full-card success overlay with check icon, "Submit another" reset button.
- Else / on throw / on timeout → hide spinner, re-enable button, show inline error block under the form.
- `sales@intakeflow.qzz.io` rendered as `mailto:` link below the card.

## Files to Create / Edit

```
src/styles.css                              # extended @theme tokens, RTL font, utilities, keyframes
src/routes/__root.tsx                       # font <link>s + anti-flash bootstrap script
src/routes/index.tsx                        # page composition + providers
src/lib/theme.tsx                           # ThemeProvider + useTheme
src/lib/i18n.tsx                            # LanguageProvider + useI18n
src/lib/translations.ts                     # en/ar dictionaries
src/lib/lead-schema.ts                      # zod schema + submitLead helper (with key mapping)
src/components/landing/Header.tsx
src/components/landing/ThemeToggle.tsx
src/components/landing/LanguageToggle.tsx
src/components/landing/Hero.tsx
src/components/landing/DashboardMockup.tsx
src/components/landing/LeadJourney.tsx
src/components/landing/Analytics.tsx
src/components/landing/CloudInfra.tsx
src/components/landing/LeadForm.tsx
src/components/landing/Footer.tsx
```

## Dependencies

All required packages (`react-hook-form`, `@hookform/resolvers`, `zod`, `lucide-react`, `sonner`, shadcn primitives) are already installed — no `bun add` needed.

## Quality Bar

- Fully responsive across mobile / tablet / desktop.
- Theme & language toggles work without reload, no flash, persist across refresh.
- RTL layout mirrors cleanly (icons, arrows, paddings).
- Form validation messages localized; success/error states styled in both themes.
- Semantic HTML, single `<h1>`, meta/OG tags set on root route.
