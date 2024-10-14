// JustWeb3ThemeProvider.tsx
import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import { convertToHSL, detectLightColor, generateDarkVariation, generateLightVariation } from '../../utils';
// import { createGlobalStyle } from 'styled-components';

// const GlobalStyle = createGlobalStyle<{ theme: { [key: string]: string } }>`
//     :root {
//     ${({ theme }) => Object.entries(theme).map(([key, value]) => `${key}: ${value};`).join('\n')}
//   }
// `;

const getPrimaryColorVariations = (color: string) => {
  const hsl = convertToHSL(color);
  const isTooLight = detectLightColor(hsl);
  return {
    '--justweb3-primary-color': hsl,
    '--justweb3-primary-color-light': generateLightVariation(hsl),
    '--justweb3-primary-color-dark': generateDarkVariation(hsl),
    '--justweb3-primary-color-foreground': isTooLight ? '#000000' : '#ffffff'
  }
}

const getDestructiveColorVariations = (color: string) => {
  const hsl = convertToHSL(color);
  const isTooLight = detectLightColor(hsl);
  return {
    '--justweb3-destructive-color': hsl,
    '--justweb3-destructive-color-light': generateLightVariation(hsl),
    '--justweb3-destructive-color-dark': generateDarkVariation(hsl),
    '--justweb3-destructive-color-foreground': isTooLight ? '#000000' : '#ffffff'
  }
}


const getBackgroundVariations = (color: string) => {
  const hsl = convertToHSL(color);
  const isTooLight = detectLightColor(hsl);
  const foreground2 = isTooLight ?  'hsl(0, 0%, 0%)' : 'hsl(0, 0%, 100%)'
  return {
    '--justweb3-background-color': hsl,
    '--justweb3-foreground-color-2': isTooLight ? 'hsl(0, 0%, 0%)' : 'hsl(0, 0%, 100%)',
    '--justweb3-foreground-color-3': detectLightColor(foreground2) ? generateDarkVariation(foreground2) : generateLightVariation(foreground2),
    '--justweb3-foreground-color-4': detectLightColor(hsl,50) ?  generateDarkVariation(hsl, 0.1) : generateLightVariation(hsl, 0.4),
    '--justweb3-border-color': isTooLight ?  'hsl(0, 0%, 0%)' : 'hsl(0, 0%, 100%)',
  }
}

const defaultFontFamily = "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji";
const defaultDestructiveColor = 'hsl(0, 100%, 50%)';
const defaultPrimaryColor = 'hsl(216, 90%, 58%)';
const defaultBackground = 'hsl(0, 0%, 100%)';

const defaultTheme = {
  '--justweb3-font-family': defaultFontFamily,
  ...getDestructiveColorVariations(defaultDestructiveColor),
  ...getPrimaryColorVariations(defaultPrimaryColor),
  ...getBackgroundVariations(defaultBackground)

} as const;

type ThemeValues = keyof typeof defaultTheme;

type ThemeChangeableValues = 'primary' | 'background' | 'destructive';

interface JustWeb3ThemeContextProps{
  changeTheme: (variable: ThemeChangeableValues, value: string) => void;
  theme: {
    [key in ThemeValues]?: string;
  },
  color: {
    primary: string;
    background: string;
    destructive: string;
  }
}

export interface JustWeb3ThemeProviderProps extends JustWeb3ThemeProviderConfig{
  children: ReactNode;
}

export interface JustWeb3ThemeProviderConfig {
  color?: {
    primary?: string;
    background?:string;
    destructive?: string;
  },
}

const JustWeb3ThemeContext = createContext<JustWeb3ThemeContextProps>({
  changeTheme: () => {},
  theme: {
    ...defaultTheme
  },
  color: {
    primary: defaultPrimaryColor,
    background: defaultBackground,
    destructive: defaultDestructiveColor
  }
});

export const JustWeb3ThemeProvider: React.FC<JustWeb3ThemeProviderProps> = ({ children, color: initialColor }) => {
  const [color, setColor] = React.useState({
    primary: initialColor?.primary || defaultPrimaryColor,
    background: initialColor?.background || defaultBackground,
    destructive: initialColor?.destructive || defaultDestructiveColor
  })
  const [theme, setTheme] = React.useState<{ [key in ThemeValues]: string }>(
    {
      ...defaultTheme,
      ...getPrimaryColorVariations(color?.primary || defaultTheme['--justweb3-primary-color']),
      ...getBackgroundVariations(color?.background || defaultTheme["--justweb3-background-color"]),
      ...getDestructiveColorVariations(color?.destructive || defaultTheme["--justweb3-destructive-color"])
    }
  )

  const changeTheme = useCallback((variable: ThemeChangeableValues, value: string) => {
    if (variable === 'primary') {
      setTheme({
        ...theme,
        ...getPrimaryColorVariations(value),
      });
    }
    if (variable === 'background') {
      setTheme({
        ...theme,
        ...getBackgroundVariations(value),
      });
    }
    if (variable === 'destructive') {
      setTheme({
        ...theme,
        ...getDestructiveColorVariations(value),
      });
    }

    setColor({
      ...color,
      [variable]: value
    })
  }, [theme, color])

  React.useEffect(() => {
    setTheme({
      ...defaultTheme,
      ...getPrimaryColorVariations(initialColor?.primary || defaultTheme['--justweb3-primary-color']),
      ...getBackgroundVariations(initialColor?.background || defaultTheme["--justweb3-background-color"]),
      ...getDestructiveColorVariations(initialColor?.destructive || defaultTheme["--justweb3-destructive-color"])
    });
    setColor({
      primary: initialColor?.primary || defaultPrimaryColor,
      background: initialColor?.background || defaultBackground,
      destructive: initialColor?.destructive || defaultDestructiveColor
    })
  }, [initialColor])

  React.useEffect(() => {
      const style = document.createElement('style');
      style.innerHTML = `:root {
      ${Object.entries(theme).map(([key, value]) => `${key}: ${value};`).join('\n')}
    }`;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
    };
  }, [theme]);

  return (
    <JustWeb3ThemeContext.Provider value={{ changeTheme, theme, color }}>
      {children}
    </JustWeb3ThemeContext.Provider>
  );
};

export const useJustWeb3Theme = () => {
  const context = useContext(JustWeb3ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a JustWeb3ThemeProvider');
  }
  return context;
}