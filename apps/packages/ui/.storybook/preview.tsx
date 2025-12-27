import React, { useEffect } from 'react';
import { darkTheme, lightTheme, applyTheme } from '@enterprise/tokens';
import type { Decorator, StoryContext } from '@storybook/react'; // Import StoryContext
import '../src/globals.css';

export const globalTypes = {
  theme: {
    name: 'Theme',
    defaultValue: 'dark',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
    },
  },
};

export const decorators: Decorator[] = [
  (Story: React.ComponentType, context: StoryContext) => {
    // Explicitly type Story and context
    const themeName = context.globals.theme;
    const themeTokens = themeName === 'dark' ? darkTheme : lightTheme;

    useEffect(() => {
      document.documentElement.className = themeName;
      applyTheme(themeTokens);
    }, [themeTokens, themeName]);

    return (
      <div className={`${themeName} antialiased min-h-screen w-full p-8 bg-surface text-text`}>
        <div className="mx-auto max-w-4xl">
          <Story />
        </div>
      </div>
    );
  },
];
