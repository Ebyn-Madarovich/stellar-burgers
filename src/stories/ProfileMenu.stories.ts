// #region Imports
import { ProfileMenuUI } from '@ui';
import type { Meta, StoryObj } from '@storybook/react';
// #endregion

// #region Types
type Story = StoryObj<typeof meta>;
// #endregion

const meta = {
  title: 'Example/ProfileMenu',
  component: ProfileMenuUI,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof ProfileMenuUI>;

export default meta;

export const DefaultProfileMenu: Story = {
  args: {
    pathname: '/profile',
    handleLogout: () => {}
  }
};
