import type { Preview } from '@storybook/html';
import '../packages/core/src/layout.css';
import '../packages/themes-default/src/theme.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    a11y: {
      test: 'todo'
    }
  }
};

export default preview;
