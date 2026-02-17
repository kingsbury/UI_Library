# UI_Library
Playing with Codex and building a UI library.

## Design tokens + CSS variables (quick start)

This repo includes a simple token system that is easy to copy into any UI project:

- Source of truth tokens in JSON: `tokens/design-tokens.json`
- CSS variables: `src/styles/tokens.css`
- Theme overrides (dark mode): `src/styles/themes.css`
- Component classes that consume semantic variables: `src/styles/components.css`
- Single entrypoint for imports: `src/styles/index.css`

### 1) Include the styles

```css
/* app.css */
@import "./src/styles/index.css";
```

### 2) Use the classes

```html
<main class="ui-page">
  <article class="ui-card">
    <h2 class="ui-card__title">Welcome</h2>
    <p class="ui-card__body">Token-driven styles with CSS variables.</p>
    <button class="ui-button ui-button--primary">Get started</button>
  </article>
</main>
```

### 3) Switch theme (optional)

```js
document.documentElement.dataset.theme = "dark"; // or "light"
```

## Stories for verification

A few browser-friendly stories are included so you can quickly validate behavior:

- `stories/components.stories.html` — card + button usage examples
- `stories/tokens.stories.html` — color swatch view of core tokens
- `stories/theme-toggle.stories.html` — runtime light/dark semantic token toggle

Run locally:

```bash
python -m http.server 4173
# open http://localhost:4173/stories/components.stories.html
```

## Token strategy

Use **base tokens** for raw values (colors, spacing, font sizes), then map them to **semantic tokens** used by components.

- Base token examples: `--ui-color-brand-600`, `--ui-space-4`, `--ui-radius-md`
- Semantic token examples: `--ui-bg-primary`, `--ui-text-default`, `--ui-border-default`

This makes it easy to restyle components globally by changing semantic mappings once.
