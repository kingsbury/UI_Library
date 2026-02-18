import type { Meta, StoryObj } from '@storybook/html';
import { box, center, cluster, inline, sidebar, stack, theme } from '../../../packages/core/src';

const meta: Meta = {
  title: 'Primitives/Layout'
};

export default meta;

type Story = StoryObj;
type BoxArgs = {
  invert: boolean;
};
type SidebarArgs = {
  rootWidth: string;
  sidebarWidth: string;
  sidebarSpace: string;
  mainMinInlineSize: string;
  equalHeight: boolean;
  sideFill: boolean;
  mainFill: boolean;
};
type ThemeArgs = {
  presetTheme: 'custom' | 'ocean' | 'forest' | 'mono' | 'asmis';
  mode: 'light' | 'dark';
  rootWidth: string;
  deriveFromColor: boolean;
  seedColor: string;
  bgPage: string;
  bgSurface: string;
  textDefault: string;
  borderDefault: string;
  boxColorLight: string;
  boxColorDark: string;
  focusColor: string;
  space1: string;
  space2: string;
  stackSpace: string;
  sidebarWidth: string;
  sidebarMainMinInlineSize: string;
  sidebarSpace: string;
  tokenOverridesJson: string;
  storageKey: string;
  persistTheme: boolean;
  loadSavedTheme: boolean;
};

type Rgb = { r: number; g: number; b: number };

function clampChannel(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function parseHexColor(input: string): Rgb | null {
  const hex = input.trim().replace('#', '');
  if (hex.length !== 3 && hex.length !== 6) return null;
  const full = hex.length === 3 ? hex.split('').map((x) => `${x}${x}`).join('') : hex;
  const num = Number.parseInt(full, 16);
  if (Number.isNaN(num)) return null;
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

function rgbToHex(rgb: Rgb): string {
  const toHex = (v: number): string => clampChannel(v).toString(16).padStart(2, '0');
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

function mix(a: Rgb, b: Rgb, amount: number): Rgb {
  return {
    r: clampChannel(a.r * (1 - amount) + b.r * amount),
    g: clampChannel(a.g * (1 - amount) + b.g * amount),
    b: clampChannel(a.b * (1 - amount) + b.b * amount)
  };
}

function relLuminance(color: Rgb): number {
  const toLinear = (v: number): number => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const r = toLinear(color.r);
  const g = toLinear(color.g);
  const b = toLinear(color.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: Rgb, b: Rgb): number {
  const l1 = relLuminance(a);
  const l2 = relLuminance(b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function bestTextOn(bg: Rgb): string {
  const black = { r: 0, g: 0, b: 0 };
  const white = { r: 255, g: 255, b: 255 };
  return contrast(bg, black) >= contrast(bg, white) ? '#000000' : '#ffffff';
}

export const Stack: Story = {
  render: () =>
    stack(`
      ${box('First item')}
      ${box('Second item')}
      ${box('Third item')}
    `)
};

export const Inline: Story = {
  render: () =>
    inline(`
      <button>Save</button>
      <button>Preview</button>
      <button>Publish</button>
    `)
};

export const Cluster: Story = {
  render: () =>
    cluster(`
      ${box('Tag 1')}
      ${box('Tag 2')}
      ${box('Tag 3')}
    `, { attrs: { style: '--ui-cluster-justify: center;' } })
};

export const Box: Story = {
  args: {
    invert: false
  } satisfies BoxArgs,
  argTypes: {
    invert: { control: 'boolean' }
  },
  render: (args: BoxArgs) =>
    box('<p>Box content</p>', { className: args.invert ? 'invert' : undefined })
};

export const BoxInverted: Story = {
  render: () =>
    box('<p>Inverted box content</p>', { className: 'invert' })
};

export const Sidebar: Story = {
  args: {
    rootWidth: '100%',
    sidebarWidth: '18rem',
    sidebarSpace: '1rem',
    mainMinInlineSize: '50%',
    equalHeight: true,
    sideFill: false,
    mainFill: false
  } satisfies SidebarArgs,
  argTypes: {
    rootWidth: { control: 'text' },
    sidebarWidth: { control: 'text' },
    sidebarSpace: { control: 'text' },
    mainMinInlineSize: { control: 'text' },
    equalHeight: { control: 'boolean' },
    sideFill: { control: 'boolean' },
    mainFill: { control: 'boolean' }
  },
  render: (args: SidebarArgs) => {
    const fill = (value: boolean): string => (value ? '1' : '0');
    const sideFill = args.equalHeight ? '1' : fill(args.sideFill);
    const mainFill = args.equalHeight ? '1' : fill(args.mainFill);
    const style = [
      `--ui-sidebar-width: ${args.sidebarWidth};`,
      `--ui-sidebar-space: ${args.sidebarSpace};`,
      `--ui-sidebar-main-min-inline-size: ${args.mainMinInlineSize};`,
      `--ui-sidebar-side-fill: ${sideFill};`,
      `--ui-sidebar-main-fill: ${mainFill};`
    ].join(' ');
    const side = box('<nav aria-label="Primary"><a href="#">Overview</a></nav>');
    const main = box('<article><h2>Content</h2><p>Responsive side-by-side layout.</p></article>');

    const content = sidebar(
      side,
      main,
      { attrs: { style } }
    );

    return `<style>#storybook-root{inline-size:${args.rootWidth};}</style>${content}`;
  }
};

export const Center: Story = {
  render: () =>
    center(box('<section><h2>Centered content</h2><p>Readable measure and gutters.</p></section>'))
};

export const Theme: Story = {
  args: {
    presetTheme: 'custom',
    mode: 'light',
    rootWidth: '100%',
    deriveFromColor: false,
    seedColor: '#0b5fff',
    bgPage: '#eef2ff',
    bgSurface: '#f8fafc',
    textDefault: '#0f172a',
    borderDefault: '#cbd5e1',
    boxColorLight: '#f8fafc',
    boxColorDark: '#0f172a',
    focusColor: '#0b5fff',
    space1: '0.5rem',
    space2: '1rem',
    stackSpace: 'var(--ui-space-1)',
    sidebarWidth: '18rem',
    sidebarMainMinInlineSize: '50%',
    sidebarSpace: '1rem',
    tokenOverridesJson: '{}',
    storageKey: 'ui-theme-story',
    persistTheme: false,
    loadSavedTheme: false
  } satisfies ThemeArgs,
  argTypes: {
    presetTheme: { control: 'select', options: ['custom', 'ocean', 'forest', 'mono', 'asmis'], table: { category: 'Theme' } },
    mode: { control: 'radio', options: ['light', 'dark'], table: { category: 'Theme' } },
    rootWidth: { control: 'text', table: { category: 'Theme' } },
    deriveFromColor: { control: 'boolean', table: { category: 'Theme' } },
    seedColor: { control: 'color', table: { category: 'Theme' } },
    bgPage: { control: 'color', table: { category: 'Colors' } },
    bgSurface: { control: 'color', table: { category: 'Colors' } },
    textDefault: { control: 'color', table: { category: 'Colors' } },
    borderDefault: { control: 'color', table: { category: 'Colors' } },
    boxColorLight: { control: 'color', table: { category: 'Colors' } },
    boxColorDark: { control: 'color', table: { category: 'Colors' } },
    focusColor: { control: 'color', table: { category: 'Colors' } },
    space1: { control: 'text', table: { category: 'Spacing' } },
    space2: { control: 'text', table: { category: 'Spacing' } },
    stackSpace: { control: 'text', table: { category: 'Spacing' } },
    sidebarWidth: { control: 'text', table: { category: 'Sidebar Demo' } },
    sidebarMainMinInlineSize: { control: 'text', table: { category: 'Sidebar Demo' } },
    sidebarSpace: { control: 'text', table: { category: 'Sidebar Demo' } },
    tokenOverridesJson: { control: 'text', table: { category: 'Overrides & Storage' } },
    storageKey: { control: 'text', table: { category: 'Overrides & Storage' } },
    persistTheme: { control: 'boolean', table: { category: 'Overrides & Storage' } },
    loadSavedTheme: { control: 'boolean', table: { category: 'Overrides & Storage' } }
  },
  render: (args: ThemeArgs) => {
    const presetTokens: Record<
      ThemeArgs['presetTheme'],
      Record<ThemeArgs['mode'], Record<string, string>>
    > = {
      custom: {
        light: {},
        dark: {}
      },
      ocean: {
        light: {
          '--ui-bg-page': '#e0f2fe',
          '--ui-bg-surface': '#e0f2fe',
          '--ui-text-default': '#0c4a6e',
          '--ui-border-default': '#7dd3fc',
          '--ui-box-color-light': '#f0f9ff',
          '--ui-box-color-dark': '#0c4a6e',
          '--ui-focus-color': '#0284c7'
        },
        dark: {
          '--ui-bg-page': '#082032',
          '--ui-bg-surface': '#082f49',
          '--ui-text-default': '#e0f2fe',
          '--ui-border-default': '#0369a1',
          '--ui-box-color-light': '#e0f2fe',
          '--ui-box-color-dark': '#082f49',
          '--ui-focus-color': '#38bdf8'
        }
      },
      forest: {
        light: {
          '--ui-bg-page': '#dcfce7',
          '--ui-bg-surface': '#ecfdf5',
          '--ui-text-default': '#14532d',
          '--ui-border-default': '#86efac',
          '--ui-box-color-light': '#f0fdf4',
          '--ui-box-color-dark': '#14532d',
          '--ui-focus-color': '#16a34a'
        },
        dark: {
          '--ui-bg-page': '#052e16',
          '--ui-bg-surface': '#052e16',
          '--ui-text-default': '#dcfce7',
          '--ui-border-default': '#15803d',
          '--ui-box-color-light': '#dcfce7',
          '--ui-box-color-dark': '#052e16',
          '--ui-focus-color': '#4ade80'
        }
      },
      mono: {
        light: {
          '--ui-bg-page': '#e5e5e5',
          '--ui-bg-surface': '#f5f5f5',
          '--ui-text-default': '#171717',
          '--ui-border-default': '#a3a3a3',
          '--ui-box-color-light': '#fafafa',
          '--ui-box-color-dark': '#171717',
          '--ui-focus-color': '#404040'
        },
        dark: {
          '--ui-bg-page': '#171717',
          '--ui-bg-surface': '#262626',
          '--ui-text-default': '#f5f5f5',
          '--ui-border-default': '#525252',
          '--ui-box-color-light': '#f5f5f5',
          '--ui-box-color-dark': '#171717',
          '--ui-focus-color': '#d4d4d4'
        }
      },
      asmis: {
        light: {
          '--ui-bg-page': '#d9d9d9',
          '--ui-bg-surface': '#f2f2f2',
          '--ui-text-default': '#1f2329',
          '--ui-border-default': '#9aa0a6',
          '--ui-box-color-light': '#f8f8f8',
          '--ui-box-color-dark': '#2f3338',
          '--ui-focus-color': '#f2be2e'
        },
        dark: {
          '--ui-bg-page': '#25282d',
          '--ui-bg-surface': '#3a3d42',
          '--ui-text-default': '#f5f6f7',
          '--ui-border-default': '#6f767d',
          '--ui-box-color-light': '#f5f6f7',
          '--ui-box-color-dark': '#2f3338',
          '--ui-focus-color': '#f2be2e'
        }
      }
    };

    const baseTokens: Record<string, string> = {
      '--ui-bg-page': args.bgPage,
      '--ui-bg-surface': args.bgSurface,
      '--ui-text-default': args.textDefault,
      '--ui-border-default': args.borderDefault,
      '--ui-box-color-dark': args.boxColorDark,
      '--ui-box-color-light': args.boxColorLight,
      '--ui-focus-color': args.focusColor,
      '--ui-space-1': args.space1,
      '--ui-space-2': args.space2,
      '--ui-stack-space': args.stackSpace,
      '--ui-sidebar-width': args.sidebarWidth,
      '--ui-sidebar-main-min-inline-size': args.sidebarMainMinInlineSize,
      '--ui-sidebar-space': args.sidebarSpace,
      '--ui-sidebar-side-fill': '1',
      '--ui-sidebar-main-fill': '1'
    };

    let savedTokens: Record<string, string> = {};
    if (args.loadSavedTheme && typeof window !== 'undefined') {
      try {
        const raw = window.localStorage.getItem(args.storageKey);
        if (raw) savedTokens = JSON.parse(raw) as Record<string, string>;
      } catch {
        savedTokens = {};
      }
    }

    let jsonOverrides: Record<string, string> = {};
    try {
      jsonOverrides = JSON.parse(args.tokenOverridesJson) as Record<string, string>;
    } catch {
      jsonOverrides = {};
    }

    const activePreset = args.presetTheme === 'custom' ? {} : presetTokens[args.presetTheme][args.mode];
    const tokens: Record<string, string> = {
      ...savedTokens,
      ...baseTokens,
      ...activePreset,
      ...jsonOverrides
    };

    if (args.deriveFromColor) {
      const seed = parseHexColor(args.seedColor);
      if (seed) {
        const lightBase = { r: 255, g: 255, b: 255 };
        const darkBase = { r: 10, g: 10, b: 12 };
        const page = args.mode === 'dark' ? mix(seed, darkBase, 0.84) : mix(seed, lightBase, 0.9);
        const surface = args.mode === 'dark' ? mix(seed, darkBase, 0.74) : mix(seed, lightBase, 0.82);
        const text = bestTextOn(surface);
        const border = rgbToHex(args.mode === 'dark' ? mix(seed, lightBase, 0.35) : mix(seed, darkBase, 0.35));

        tokens['--ui-theme-rgb'] = `${seed.r}, ${seed.g}, ${seed.b}`;
        tokens['--ui-bg-page'] = rgbToHex(page);
        tokens['--ui-bg-surface'] = rgbToHex(surface);
        tokens['--ui-text-default'] = text;
        tokens['--ui-box-color-light'] = text === '#000000' ? '#ffffff' : '#f8fafc';
        tokens['--ui-box-color-dark'] = text === '#000000' ? '#0f172a' : '#020617';
        tokens['--ui-border-default'] = border;
      }
    }

    const bgSurface = parseHexColor(tokens['--ui-bg-surface'] ?? '');
    const textDefault = parseHexColor(tokens['--ui-text-default'] ?? '');
    if (bgSurface && textDefault && contrast(bgSurface, textDefault) < 4.5) {
      tokens['--ui-text-default'] = bestTextOn(bgSurface);
    }

    const bgPage = parseHexColor(tokens['--ui-bg-page'] ?? '');
    if (bgPage && contrast(bgPage, parseHexColor(tokens['--ui-focus-color'] ?? '') ?? { r: 11, g: 95, b: 255 }) < 3) {
      tokens['--ui-focus-color'] = bestTextOn(bgPage) === '#000000' ? '#0b5fff' : '#93c5fd';
    }

    const borderDefault = parseHexColor(tokens['--ui-border-default'] ?? '');
    if (bgSurface && borderDefault && contrast(bgSurface, borderDefault) < 3) {
      const refText = parseHexColor(tokens['--ui-text-default'] ?? '') ?? (bestTextOn(bgSurface) === '#000000' ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 });
      tokens['--ui-border-default'] = rgbToHex(args.mode === 'dark' ? mix(refText, bgSurface, 0.45) : mix(refText, bgSurface, 0.6));
    }
    const style = Object.entries(tokens)
      .map(([key, value]) => `${key}: ${value};`)
      .join(' ');

    if (args.persistTheme && typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(args.storageKey, JSON.stringify(tokens));
      } catch {
        // Ignore storage failures in restricted environments.
      }
    }

    const showcase = stack(`
      ${box('<h3>Stack</h3><p>First item</p>')}
      ${inline(`
        ${box('Inline 1')}
        ${box('Inline 2')}
        ${box('Inline 3')}
      `)}
      ${cluster(`
        ${box('Cluster A')}
        ${box('Cluster B')}
        ${box('Cluster C')}
      `, { attrs: { style: '--ui-cluster-justify: center;' } })}
      ${sidebar(
        box('<nav aria-label="Primary"><a href="#">Overview</a></nav>'),
        box('<article><h2>Content</h2><p>Responsive side-by-side layout.</p></article>')
      )}
      ${center(box('<section><h2>Centered content</h2><p>Readable measure and gutters.</p></section>'))}
      ${box('<p>Inverted box sample</p>', { className: 'invert' })}
    `, { attrs: { style: '--ui-stack-space: var(--ui-space-2);' } });

    const themed = theme(showcase, {
      attrs: {
        'data-ui-theme': args.mode,
        style
      }
    });

    const rootBg = tokens['--ui-bg-page'] ?? (args.mode === 'dark' ? '#0b1020' : '#ffffff');
    const rootText = tokens['--ui-text-default'] ?? (args.mode === 'dark' ? '#e2e8f0' : '#111111');
    return `<style>#storybook-root{inline-size:${args.rootWidth};background:${rootBg};color:${rootText};padding:var(--ui-space-2,1rem);box-sizing:border-box;}</style>${themed}`;
  }
};
