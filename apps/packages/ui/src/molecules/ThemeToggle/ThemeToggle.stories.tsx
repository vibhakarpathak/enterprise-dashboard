import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from './ThemeToggle';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Molecules/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
  },
};

export default meta;

type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {
  render: () => <ThemeToggle />,
};
