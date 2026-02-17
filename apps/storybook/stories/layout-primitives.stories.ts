import type { Meta, StoryObj } from '@storybook/html';
import { center, cluster, inline, sidebar, stack } from '../../../packages/core/src/primitives';

const meta: Meta = {
  title: 'Primitives/Layout'
};

export default meta;

type Story = StoryObj;

export const Stack: Story = {
  render: () =>
    stack(`
      <div class="ui-surface">First item</div>
      <div class="ui-surface">Second item</div>
      <div class="ui-surface">Third item</div>
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
      <span class="ui-surface">Tag 1</span>
      <span class="ui-surface">Tag 2</span>
      <span class="ui-surface">Tag 3</span>
    `, { attrs: { style: '--cluster-justify: center;' } })
};

export const Sidebar: Story = {
  render: () =>
    sidebar(
      '<nav class="ui-surface" aria-label="Primary"><a href="#">Overview</a></nav>',
      '<article class="ui-surface"><h2>Content</h2><p>Responsive side-by-side layout.</p></article>'
    )
};

export const Center: Story = {
  render: () =>
    center('<section class="ui-surface"><h2>Centered content</h2><p>Readable measure and gutters.</p></section>')
};
