import React, { useEffect } from 'react'; // Ensure React is imported
import { darkTheme, lightTheme, applyTheme } from "@enterprise/tokens";
import type { Decorator } from "@storybook/react";
import '../src/globals.css';

export const globalTypes = {
  theme: {
    name: "Theme",
    defaultValue: "dark",
    toolbar: {
      icon: "circlehollow",
      items: ["light", "dark"]
    }
  }
};

export const decorators: Decorator[] = [
  (Story, context) => {
    const themeName = context.globals.theme;
    const themeTokens = themeName === "dark" ? darkTheme : lightTheme;

    useEffect(() => {
      applyTheme(themeTokens);
    }, [themeTokens]);

    return (
      <div className={`${themeName} min-h-screen p-4 bg-surface text-text`}> 
        <Story />
      </div>
    );
  }
];