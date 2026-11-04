# DESIGN.md

Design system reference for the EISD Laboratory site, reverse-documented from
`tailwind.config.ts`, `app/globals.css`, and actual component usage. Follow these tokens/patterns
instead of inventing new ones - the existing surface area is already fairly large.

## Color palette

Defined in `tailwind.config.ts`:

| Token | Value | Usage |
|---|---|---|
| `primary` | `#494CA0` (indigo/purple) | Brand color - buttons, links, active nav state, headings accents |
| `primary-dark` | `#3A3D80` | Button hover state |
| `primary-light` | `#6366B8` | Rarely used directly; lighter accents |
| `accent-green` | `#00D97A` | Secondary brand color - badges, dot indicators, gradient pairing with `primary`, glow text |
| `accent-pink` | `#FDE2E4` | Rare - soft pink shadow/gradient accents |

Neutral text/background colors use plain Tailwind grays (`text-gray-900`, `text-gray-600`,
`text-gray-400`, `border-gray-100`, `border-gray-200`) - there is no custom neutral scale.

Footer uses one hardcoded off-palette color: `bg-[#1C1629]` (dark plum), not part of the
Tailwind theme - treat the footer as an intentionally darker "closing" section rather than
extending this into a general dark-mode color.

`AnnouncementBar.tsx` inlines `#494ca0` and `#00d97a` directly via `style=` (not Tailwind
classes) rather than using the `primary`/`accent-green` tokens, even though the hex values match
exactly - if editing that component, prefer switching to `bg-primary`/`text-accent-green` etc.
for consistency rather than copying the inline-style pattern elsewhere.

Body background is a fixed diagonal gradient (`app/globals.css`):
```css
background: linear-gradient(135deg, #FAFBFF 0%, #FFFFFF 50%, #FFFAFC 100%);
```
This very-light lavender-to-white-to-pink wash is the canvas the whole site sits on - cards are
designed to read as "floating" on top of it (hence heavy use of white/translucent surfaces +
soft shadows rather than flat borders).

**Known gap:** `accent-blue` is referenced in `app/contact/page.tsx` but not defined in the
Tailwind config - see CLAUDE.md "Known inconsistency". Do not copy that pattern elsewhere.

## Typography

- Font: **Inter** (`next/font/google`, loaded once in `app/layout.tsx`, applied via
  `inter.className` on `<body>`). No secondary/display typeface.
- Headings: `font-bold` or `font-extrabold`, sizes scale from `text-2xl` (card titles) up to
  `text-5xl` (page H1s), always paired with responsive variants (`text-3xl sm:text-4xl lg:text-5xl`).
- Body copy: `text-sm` to `text-base`, `text-gray-600` (primary body) or `text-gray-500`
  (secondary/subtitle), `leading-relaxed` almost everywhere text wraps more than one line.
- Eyebrow/label text: `text-xs font-semibold uppercase tracking-wide text-primary` - used
  consistently for the little badge above H1s (see "Hero pattern" below).
- Two-tone headings are a signature: split a heading across `<span>`s, coloring one clause
  `text-gray-900` and the other `text-primary` or `text-accent-green` (see `Hero.tsx`,
  `about/page.tsx`, `structure/page.tsx`).

## Spacing, radius, shadows

- Border radius trends large and consistent: `rounded-xl` / `rounded-2xl` for cards,
  `rounded-3xl` for hero/CTA panels, `rounded-full` for pills, badges, buttons, and avatars.
- Custom shadow tokens (`tailwind.config.ts`):
  - `shadow-soft` -> `0 2px 15px rgba(0,0,0,0.05)` - subtle, for badges/pills
  - `shadow-card` -> `0 4px 20px rgba(0,0,0,0.08)` - standard card lift
- Section vertical rhythm: `py-12` to `py-16` between major sections, `px-4` as the standard
  horizontal gutter, content wrapped in `max-w-5xl` / `max-w-6xl` / `max-w-7xl mx-auto`
  depending on how wide the section's grid needs to be.
- Standard breakpoints used throughout: `sm:` (640px), `md:` (768px, the main mobile/desktop
  split point for nav and grids), `lg:` (1024px), `xl:` (rare, only in `Hero.tsx` heading sizes).

## Custom utility classes (`app/globals.css`)

These are hand-rolled `@layer components` / `@layer utilities` classes - prefer reusing them
over writing new inline box-shadow/gradient CSS:

- **`.glass-card`** - translucent white (`bg-white/70`) + `backdrop-blur-md` + soft border +
  layered shadow. The default "floating pill/badge" surface (hero badges, section eyebrows).
- **`.card-surface`** - solid white card with a single soft shadow. Simpler/flatter than `.glass-card`.
- **`.hero-offset` / `.hero-offset-sm`** - top padding that clears the floating header
  (`calc(32px + var(--header-height))`), animated when the announcement bar is dismissed. See
  "Hero top spacing" below.
- **`.card-hover`** - adds a diagonal shine sweep on hover plus a lift + shadow bump. For cards
  that should feel interactive/clickable.
- **`.card-glow-smooth`** - softer alternative hover glow (colored shadow bloom, no shine sweep).
- **`.shimmer-enhanced`** - the 45-degree-rotated shimmer sweep used on almost every pill badge
  (`glass-card ... shimmer-enhanced` is the standard badge combo - see any page hero).
- **`.text-gradient`** - animated primary-to-green-to-primary gradient text clip. Defined but not
  currently used by any component (its one usage was on the Gallery page, since removed) - check
  before assuming it's live anywhere.
- **`.glow-primary` / `.glow-primary-soft`** - primary-colored glow shadows, `.glow-primary` also
  lifts + scales slightly on hover. For primary CTA buttons that need extra emphasis.
- **`.shadow-glow-purple` / `-pink` / `-cyan`** and **`.shadow-gradient-purple` / `-green` / `-pink`**
  - pre-mixed colored shadow recipes; pick the one matching the section's accent instead of
  hand-writing new `rgba()` shadows.
- **`.hover-scale`** - generic `scale(1.05)` on hover for icons/buttons.
- **`.animate-floating` / `.float` / `.animate-float-slow`** - three flavors of a vertical bob
  loop, given as separate utilities rather than one parameterized one - reuse an existing one
  rather than adding a fourth.
- **`.pulse-glow` / `.pulse-subtle`** - pulsing box-shadow / opacity+scale loops, used on small
  "live" status dot indicators.
- **`.hide-scrollbar`**, **`.snap-x`/`.snap-y`/`.snap-start`/`.snap-center`/`.snap-end`** - for any
  horizontally-scrolling carousel/track (see `EventGallery.tsx` for a JS-driven alternative when an
  infinite auto-scroll that users can also drag or swipe is needed instead of scroll-snap).
- **`.hairline`** - 1px `bg-gray-200` divider, used as the horizontal rules flanking
  `SectionHeading`'s eyebrow badge.
- **Currently unused, defined but not applied anywhere in `app/`/`components/`** (available if a
  new component wants them, but don't assume they're live on the current site): `.icon-bounce`,
  `.fade-in-up`, `.bg-gradient-animate`, `.text-glow-green`, `.shimmer` (distinct from
  `.shimmer-enhanced`, which *is* used), `.float`, `.animate-float-slow`, `.pulse-glow`,
  `.stagger-item`, `.perspective-1000`/`.preserve-3d`, `.backdrop-blur-soft`/`-hard`,
  `.animate-gradient-border`, `.transition-transform-smooth`, `.shadow-glow-purple`/`-pink`/`-cyan`,
  `.line-accent-glow`. The `glitchSubtle` keyframe is defined with no class referencing it at all.
  Prefer reusing one of these over writing new CSS before adding a fifth float variant etc., but
  verify in a browser that the effect still looks right before relying on it — some may predate
  a redesign pass.

Global page-level rules also set `scroll-behavior: smooth`, a custom `::selection` color, and a
visible `:focus-visible` outline in `primary` - do not override these per-component.

## Animation conventions (Framer Motion)

- **Scroll reveals**: wrap content in `<FadeIn direction="up" delay={n}>` - the shared component
  in `components/FadeIn.tsx`. Default direction is `up` (`y: 40 -> 0`), `viewport={{ once: true }}`
  so reveals do not re-trigger on scroll-back. Stagger sibling sections with incrementing `delay`
  (commonly `0.1 * index` or fixed steps like `0.2`, `0.3`, `0.4`).
- **Above-the-fold entrance** (Hero, first section of a page): inline `motion.div`/`motion.h1`
  with `initial={{ opacity: 0, y: 16-20 }}` -> `animate={{ opacity: 1, y: 0 }}`, staggered via
  explicit `transition.delay` (0.1, 0.2, 0.35, 0.45, 0.55 - roughly 0.1-0.15s apart), since these
  fire on mount rather than on scroll (`animate`, not `whileInView`).
- **Interactive/looping micro-animations** (progress dot pulse, shimmer sweep) use `animate` with
  an array of keyframe values and `repeat: Infinity`.
- **Physics-based** elements (scroll progress bar, back-to-top ring) use `useScroll` +
  `useSpring({ stiffness: 100, damping: 30 })` rather than a fixed-duration tween - this is the
  house style for anything tracking a continuous scroll value.
- **Carousel/drag transitions** (Divisions carousel): spring transitions
  (`type: "spring", stiffness: 120, damping: 25, mass: 0.8`) for auto-positioning, but a `tween`
  with a cubic-bezier ease for the mobile swipe/exit animation - match whichever variant already
  exists in `Divisions.tsx` if extending it.
- Standard easing for plain CSS transitions (non-Framer): `ease-out` for entrances, `duration-300`
  as the default Tailwind transition speed for hover states.

## Component patterns to follow

- **Hero pattern** (repeated on every page): pill badge (`glass-card` + green dot +
  uppercase eyebrow text) -> two-tone `<h1>` -> gray subtitle paragraph -> optional CTA row.
  Copy the structure from `about/page.tsx` or `structure/page.tsx` hero sections rather than
  designing a new hero layout per page.
- **Floating glass navbar**: `Navbar.tsx` wraps its row in glisse's `Glass`, a `rounded-[2rem]`
  `max-w-6xl` bar floating over the page. Tune it through `--lg-blur` and `--lg-glass` (lighter
  when closed, more opaque while the mobile menu is open so the links stay readable), not with
  extra background classes. The same recipe applies on every page.
- **Hero top spacing**: `body` has no top padding, so pages start at `y=0` behind the header and
  the body gradient shows through it. Text heroes use `.hero-offset` or `.hero-offset-sm`
  (Events/Structure and Articles/Contact/Achievements respectively) so hero text sits the same
  distance below the navbar and follows the announcement bar. Use one of them for any new page
  rather than a fixed `pt-*`. Full-bleed tops add the header to their own height instead:
  `about/page.tsx` uses `h-[calc(280px+var(--header-height))]` with `hero-offset` on the overlay,
  and `events/[id]/page.tsx` uses `h-[calc(16rem+var(--header-height))]`. Anything sticky uses
  `top-[calc(var(--header-height)+1rem)]`.
- **Photo under the navbar**: a full-bleed image at the top of a page needs a white fade behind
  the glass (`bg-gradient-to-b from-white via-white/90 to-transparent`, as on the event banner),
  otherwise the glass refracts the photo and looks different from every other page. Text over a
  photo needs a strong enough wash to stay legible on mobile (see the `via-70%` gradient in
  `about/page.tsx`).
- **Event poster in a card**: posters are portrait, about 4:5. On `events/page.tsx` the poster
  column holds an `aspect-[4/5]` spacer with the `fill` image over it, so it sets the card height
  and leaves no white gap. The grid only goes two-column at `lg`; at tablet widths two columns
  crop the poster heavily. "Other Event" on the detail page follows the same idea: stacked on
  mobile, side by side from `sm`, stacked again in the `lg` sidebar.
- **`SectionHeading`**: always use this for section titles instead of a bespoke `<h2>` block -
  it already handles the hairline + eyebrow-pill + animated title/subtitle reveal.
- **Card with top gradient bar**: a `<div className="h-1 bg-gradient-to-r {gradient}">` strip
  along the top edge of a card is the standard way to give each card/category its own color
  identity (see `FocusArea.tsx`, `Divisions.tsx`, event cards). Pick a gradient from the existing
  `gradients` arrays rather than inventing new stop combinations per component.
- **Person/avatar card** (`PersonCard` in `structure/page.tsx`): rounded-2xl bordered image,
  hover overlay revealing a LinkedIn link, name below, optional colored role badge, mono-styled
  member "code" beneath. Reuse this exact structure for any new member-facing UI.
- **Member grid layout by headcount** (`structure/page.tsx`): rather than one responsive
  `grid-cols-*`, the member grid branches on exact member count (1-3, 4, 5, 6, 7+) so mobile
  never ends up cramming 4+ small avatars into a single cramped row. The 4- and 5-person cases
  render two separate blocks - a mobile-only stacked layout (`md:hidden`, e.g. 3-then-1 or
  3-then-2 rows) and a desktop-only single-row grid (`hidden md:grid`) - instead of relying on
  `grid-cols-4` alone, which has no responsive variant and stays one row at every breakpoint.
  Follow this split-block pattern when adding a new headcount case, rather than trying to express
  both row-breaks in one grid via `order-*` tricks.
- **Icon treatment**: `lucide-react` for generic UI icons (`strokeWidth={1.8}` is the house
  default, slightly thinner than lucide's default 2), always inside a colored rounded-square/
  circle chip (`bg-primary/10 border border-primary/15 text-primary`). Brand/social icons use
  raw inline SVG path data at `viewBox="0 0 24 24"` with `fill="currentColor"` instead.
- **Buttons**: primary action = `bg-primary hover:bg-primary-dark text-white rounded-full`;
  secondary/ghost = `bg-white border border-gray-200 hover:border-primary/30 hover:text-primary`.
  Always `rounded-full`, never a smaller radius, for buttons/pills.
- **Session-scoped promo modal** (`WelcomePopup.tsx`): backdrop (`bg-black/80`) + centered
  `rounded-3xl` panel, `aspect-[4/5]`, sized `w-[min(90vw,28rem,68vh)]`. Click the image to
  zoom it to `w-[min(95vw,52rem,88vh)]` (same aspect ratio, `layout` prop on the `motion.div` for
  a smooth animated resize); click the backdrop to zoom back out (or dismiss entirely if not
  zoomed); Escape or the corner `X` always fully dismisses. Close button and bottom CTA overlay
  are hidden while zoomed so they don't float on top of the enlarged image. Gated by a config
  object (`welcomePopupConfig` in `lib/data.ts`) with a `sessionStorage`-backed dismiss and an
  `activeUntil` expiry date - reuse this component/pattern for any future timed promo rather than
  building a new modal from scratch.
- **Poster card** (`app/achievements/page.tsx`): a non-interactive card that's entirely a
  full-bleed `aspect-square` photo — no separate text block below it. All copy sits inside the
  photo itself, layered over a `bg-gradient-to-t from-black/85 via-black/15 to-transparent`
  scrim: small pills floating at the top corners (`absolute top-2 left-2` / `top-2 right-2`) for
  short tags/status, and a stacked text block anchored `absolute bottom-0` for name/title copy,
  largest text first. Use `card-glow-smooth` (not `card-hover`) since the shine-sweep in
  `card-hover` visually implies clickability — don't put it on a card with no click handler.

## Imagery

- Local team/event photography is `.webp` (and a couple of `.avif` for the Unity Nights event,
  handled via `ImageWithFallback` which falls back `.avif` -> `.webp` on load error).
  Prefer `.webp` for new assets to avoid needing the fallback component.
- Because `images.unoptimized: true` (static export), **pre-size and pre-compress images before
  adding them** - Next.js will not resize them at request time. A raw high-res export dumped in
  as `.webp` without resizing (seen with `members/core/*.webp`, once 2667x2667 PNG bytes mislabeled
  with a `.webp` extension, 5-7MB each) gets sent to the browser at full resolution and just
  downscaled with CSS - it'll look sharp but costs megabytes for a card rendered at ~100px.
  Established source-size conventions in this repo: hero/banner photos (`Hero.tsx`, `about`)
  max ~1600px on the long edge; member avatar photos (`PersonCard`, `structure/page.tsx`) max
  ~1120px (most of `public/images/members/**` already follows this; a few at 400px are fine too
  since display size is a ~100-150px card).
- Event detail banners are the same portrait posters shown in a wide, short frame with
  `object-cover object-top`, so only the top of each poster shows, down to about 22% at 1920px.
  This is an accepted trade-off: a blurred backdrop with the whole poster was considered and
  turned down. A real fix would be a landscape image per event via `heroBanner`.
- Some `app/achievements/page.tsx` entries still point at placeholder imagery/copy - do not treat
  that as a real design decision; it is a stand-in awaiting real photos (see CLAUDE.md's
  Achievements note for which fields are mixed real/placeholder).
