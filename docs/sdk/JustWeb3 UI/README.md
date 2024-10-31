**@justweb3/ui** • [**Docs**](globals.md)

***

# @justweb3/ui

The **@justweb3/ui** library provides a unified UI experience and handles theme generation for the **@justweb3/widget** package. It simplifies theming across widgets by dynamically generating color variations and supports custom theming through its context provider.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
    - [Setup with `JustWeb3ThemeProvider`](#setup-with-justweb3themeprovider)
    - [Changing Theme Dynamically](#changing-theme-dynamically)
- [Hooks](#hooks)
    - [`useJustWeb3Theme`](#usejustweb3theme)
    - [Hook Output](#hook-output)
- [How It Works](#how-it-works)
- [Contributing](#contributing)
---

## Installation

Install the library using npm or yarn:

```bash
npm install @justweb3/ui

# or

yarn add @justweb3/ui
```

---

## Usage

### Setup with `JustWeb3ThemeProvider`

To enable the theme context for your widget, wrap your application or component with the `JustWeb3ThemeProvider`. This ensures consistent theming across components and allows you to customize colors dynamically.

```tsx
'use client';

import { JustWeb3ThemeProvider } from '@justweb3/ui';

const App = ({ children }) => {
  return (
    <JustWeb3ThemeProvider
      color={{
        primary: 'hsl(216, 90%, 58%)', // Custom primary color
        background: 'hsl(0, 0%, 98%)', // Custom background color
        destructive: 'hsl(0, 100%, 50%)', // Custom destructive color
      }}
    >
      {children}
    </JustWeb3ThemeProvider>
  );
};

export default App;

```

---

## Changing Theme Dynamically

The `JustWeb3ThemeProvider` offers a `changeTheme` function to dynamically change the primary, background, or destructive colors. Here's an example demonstrating dynamic theme switching.

```tsx
import React, { useState } from 'react';
import { useJustWeb3Theme } from '@justweb3/ui';

const ThemeSwitcher = () => {
  const { changeTheme, color } = useJustWeb3Theme();
  const [newColor, setNewColor] = useState(color.primary);

  const handleThemeChange = () => {
    changeTheme('primary', newColor);
  };

  return (
    <div>
      <h1>Current Primary Color: {color.primary}</h1>
      <input
        type="color"
        value={newColor}
        onChange={(e) => setNewColor(e.target.value)}
      />
      <button onClick={handleThemeChange}>Change Primary Color</button>
    </div>
  );
};

export default ThemeSwitcher;

```

---

## Hooks

### `useJustWeb3Theme`

The `useJustWeb3Theme` hook provides access to the current theme and allows you to modify theme colors dynamically.

### Usage

```tsx
import { useJustWeb3Theme } from '@justweb3/ui';

const Component = () => {
  const { theme, color, changeTheme } = useJustWeb3Theme();

  console.log('Current Theme:', theme);

  const switchToDarkBackground = () => {
    changeTheme('background', 'hsl(0, 0%, 10%)');
  };

  return (
    <div>
      <button onClick={switchToDarkBackground}>Switch to Dark Background</button>
    </div>
  );
};

```

### Hook Output

- **`theme`**: The current theme values.
- **`color`**: The current primary, background, and destructive colors.
- **`changeTheme`**: A function to dynamically change specific theme colors.

---

## How It Works

The `JustWeb3ThemeProvider` internally generates color variations for:

- **Primary Color**: Base color with light and dark variations.
- **Destructive Color**: Used for alerts and destructive actions.
- **Background Color**: Provides variations for background and foreground colors.

The provider uses **CSS variables** for theme management, ensuring that components and styles are synchronized.

Example CSS Variables:

```css
:root {
  --justweb3-primary-color: hsl(216, 90%, 58%);
  --justweb3-primary-color-light: hsl(216, 90%, 68%);
  --justweb3-primary-color-dark: hsl(216, 90%, 48%);
  --justweb3-background-color: hsl(0, 0%, 100%);
  --justweb3-border-color: hsl(0, 0%, 0%);
  --justweb3-destructive-color: hsl(0, 100%, 50%);
  --justweb3-font-family: 'Inter', sans-serif;
}
```

---

## Contributing

We welcome contributions! Please submit issues or pull requests on our [GitHub repository](https://github.com/your-repository).
