# UI Library Workspace

Framework-agnostic, native-first layout library with Angular wrappers, Storybook documentation, and Playwright + axe accessibility testing.

## What is scaffolded

- `packages/core`: Framework-agnostic layout primitives (`stack`, `inline`, `cluster`, `center`, `sidebar`) and CSS contracts.
- `packages/tokens`: Platform-neutral design tokens.
- `packages/themes-default`: Default theme CSS that maps tokens to runtime variables.
- `packages/angular`: Angular directive wrappers for applying core primitive classes ergonomically.
- `apps/storybook`: Storybook stories documenting and previewing primitives.
- `tests/e2e`: Playwright accessibility regression test with `@axe-core/playwright`.
- `.github/workflows/ci.yml`: CI pipeline running unit + e2e checks.

## Architecture principles

1. **Compose with native HTML first** and keep semantics explicit.
2. **Separate structure and skin** so layouts stay stable across themes.
3. **Treat accessibility as a release gate**, not as optional QA.
4. **Keep core framework-agnostic**, then add thin framework wrappers.
5. **Support Angular-first ergonomics** without coupling core APIs to Angular.

## Quick start

```bash
npm install
npm run storybook
npm run test
npm run test:e2e
```

## Current primitive coverage

- Stack
- Inline
- Cluster
- Center
- Sidebar

## Next recommended increments

1. Add remaining Every Layout-style primitives (`switcher`, `cover`, `frame`, `reel`, `grid`).
2. Add richer keyboard interaction test matrix for interactive patterns.
3. Introduce token build pipeline and multiple themes/brands.
4. Add Angular examples directly inside Storybook.
