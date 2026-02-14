# UI Library Vision

A framework-agnostic UI library focused on the flexibility of native HTML semantics (inspired by Every Layout): compose first, skin second.

## Goals

- **Native-first composition**: use semantic HTML patterns and low-level layout primitives instead of heavyweight component abstractions.
- **Skin-able architecture**: separate structure/behavior from visual themes so teams can swap design systems without rewriting logic.
- **Framework agnostic core**: baseline implementation works in plain HTML/CSS/JS and can be wrapped for Angular (and others).
- **Component quality loop**: each primitive is independently testable (Playwright) and previewable/documented (Storybook).
- **Accessibility from day one**: enforce WCAG/508 and a11y checks in CI and development workflows.

## Recommended Architecture

### 1) Package topology (monorepo)

- `packages/core`
  - Layout primitives and behavior hooks using Web Standards (custom properties, data attributes, optional web components where helpful).
  - Zero framework dependency.
- `packages/tokens`
  - Design tokens (color, typography, spacing, motion) in a platform-neutral format (e.g., Style Dictionary-compatible JSON).
- `packages/themes/*`
  - Theme packages that map tokens to actual CSS variables/utilities.
- `packages/angular`
  - Thin Angular wrappers/directives around core primitives for ergonomic Angular usage.
- `apps/storybook`
  - Storybook docs/examples for core + angular wrappers.

### 2) Primitive strategy

Start with composable layout/system primitives rather than opinionated widgets:

- `Stack`, `Inline`, `Cluster`, `Sidebar`, `Switcher`, `Center`, `Grid`, `Cover`, `Frame`, `Reel`.
- Implement as semantic HTML patterns + CSS utility classes/custom properties.
- Provide optional JS only where necessary (focus management, disclosure patterns, keyboard interaction).

### 3) Styling model

- **Structure layer**: layout primitives + accessibility semantics.
- **Skin layer**: theme tokens and component skins.
- **State layer**: data attributes/ARIA state selectors.

This ensures teams can keep layout contracts stable while iterating visual design independently.

## Tooling Stack

### Storybook

- Use Storybook as the canonical component catalog.
- Document each primitive with:
  - Purpose and constraints
  - Accessibility guidance
  - API/props/options
  - Do/Don’t examples

### Testing

- **Unit tests**: Vitest/Jest for low-level utility logic.
- **Component behavior tests**: Playwright component/e2e tests for interaction, keyboard nav, and ARIA states.
- **Visual regression**: Playwright snapshots (or Chromatic if adopting hosted workflow).
- **Accessibility tests**:
  - `axe-core` integration in Playwright
  - Linting: `eslint-plugin-jsx-a11y` equivalent for framework wrappers where relevant
  - CI gate for major WCAG violations

## Accessibility (508/WCAG) Baseline

Bake these into your definition of done:

- Keyboard navigable with visible focus states
- Proper name/role/value for interactive elements
- Color contrast checks against token palette
- Reduced-motion support (`prefers-reduced-motion`)
- Screen reader smoke tests for critical flows
- A11y checks mandatory in CI (no "optional" lane)

## Suggested Delivery Phases

### Phase 1: Foundation

- Set up monorepo + package boundaries.
- Add token pipeline.
- Build first 4–6 layout primitives.
- Stand up Storybook and Playwright.

### Phase 2: Core usability

- Add accessibility CI gates.
- Add Angular wrappers for core primitives.
- Introduce first skin/theme package.

### Phase 3: Scale and governance

- Add contribution standards and review checklist.
- Add visual regression baselines.
- Create migration guidance for adopting teams.

## Gaps and Decisions to Confirm

To avoid rework, these decisions should be clarified early:

1. **Browser support matrix**
   - Which browsers/versions are required (especially for enterprise/508 constraints)?
2. **Theming scope**
   - One default theme first, or multiple brands from day one?
3. **Web components vs class-based primitives**
   - Do you want custom elements, utility classes, or both?
4. **Angular compatibility target**
   - Which Angular versions must be supported?
5. **A11y compliance target**
   - WCAG 2.1 AA only, or specific 508 audit criteria/checklist to enforce?
6. **Visual regression strategy**
   - Local Playwright snapshots only, or managed baseline service (e.g., Chromatic/Percy)?
7. **Distribution model**
   - Internal npm registry only, or public package publishing?

## Questions for You

- Do you want me to scaffold this repository next with:
  1) monorepo structure,
  2) Storybook,
  3) Playwright + axe integration,
  4) initial layout primitives,
  5) Angular wrapper package?
- If yes, should I optimize for **Angular-first ergonomics** while preserving framework-agnostic core APIs?

---

If you want, the next step can be a concrete bootstrap PR that sets up the structure above and ships the first primitive set with tests/docs.
