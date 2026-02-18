import { describe, expect, it } from 'vitest';
import { box, center, inline, sidebar, stack, theme } from '../src/primitives';

describe('core primitives', () => {
  it('renders stack with class and attributes', () => {
    const html = stack('<p>Hello</p>', { attrs: { 'data-testid': 'stack' } });
    expect(html).toContain('class="ui-stack"');
    expect(html).toContain('data-testid="stack"');
  });

  it('renders inline and center wrappers', () => {
    expect(inline('<button>Save</button>')).toContain('ui-inline');
    expect(center('<section>content</section>')).toContain('ui-center');
  });

  it('renders sidebar semantic regions', () => {
    const html = sidebar('<nav>Menu</nav>', '<article>Body</article>');
    expect(html).toContain('<aside>');
    expect(html).toContain('<main>');
  });

  it('renders box with optional class name', () => {
    const html = box('<p>Body</p>', { className: 'invert' });
    expect(html).toContain('class="invert ui-box"');
  });

  it('renders theme wrapper', () => {
    const html = theme('<p>Themed content</p>');
    expect(html).toContain('class="ui-theme"');
  });
});
