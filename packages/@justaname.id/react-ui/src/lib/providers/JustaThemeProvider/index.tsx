// JustaThemeProvider.tsx
import React, { createContext, useContext, ReactNode } from 'react';
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
    '--justaname-primary-color': hsl,
    '--justaname-primary-color-light': generateLightVariation(hsl),
    '--justaname-primary-color-dark': generateDarkVariation(hsl),
    '--justaname-primary-color-foreground': isTooLight ? '#000000' : '#ffffff'
  }
}

const getBackgroundVariations = (color: string) => {
  const hsl = convertToHSL(color);
  const isTooLight = detectLightColor(hsl);
  const foreground2 = isTooLight ?  'hsl(0, 0%, 0%)' : 'hsl(0, 0%, 100%)'
  return {
    '--justaname-background-color': hsl,
    '--justaname-foreground-color-2': isTooLight ? 'hsl(0, 0%, 0%)' : 'hsl(0, 0%, 100%)',
    '--justaname-foreground-color-3': detectLightColor(foreground2) ? generateDarkVariation(foreground2) : generateLightVariation(foreground2),
    '--justaname-foreground-color-4': detectLightColor(hsl,50) ?  generateDarkVariation(hsl, 0.1) : generateLightVariation(hsl, 0.4),
    '--justaname-border-color': isTooLight ?  'hsl(0, 0%, 0%)' : 'hsl(0, 0%, 100%)',
  }
}

const defaultFontFamily = "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji";
const defaultErrorColor = 'hsl(0, 100%, 50%)';
const defaultPrimaryColor = 'hsl(216, 90%, 58%)';
const defaultBackground = 'hsl(0, 0%, 100%)';

const defaultTheme = {
  '--justaname-font-family': defaultFontFamily,
  '--justaname-error-color': defaultErrorColor,
  ...getPrimaryColorVariations(defaultPrimaryColor),
  ...getBackgroundVariations(defaultBackground)

} as const;

type ThemeValues = keyof typeof defaultTheme;

type ThemeChangeableValues = 'primary' | 'background';

interface JustaThemeContextProps{
  changeTheme: (variable: ThemeChangeableValues, value: string) => void;
}

export interface JustaThemeProviderProps extends JustaThemeProviderConfig{
  children: ReactNode;
}

export interface JustaThemeProviderConfig {
  color?: {
    primary?: string;
    background?:string;
  }
}

const JustaThemeContext = createContext<JustaThemeContextProps>({
  changeTheme: () => {},
});

export const JustaThemeProvider: React.FC<JustaThemeProviderProps> = ({ children, color }) => {
  const [theme, setTheme] = React.useState<{ [key in ThemeValues]: string }>(
    {
      ...defaultTheme,
      ...getPrimaryColorVariations(color?.primary || defaultTheme['--justaname-primary-color']),
      ...getBackgroundVariations(color?.background || defaultTheme["--justaname-background-color"])
    }
  )

  const changeTheme = (variable: ThemeChangeableValues, value: string) => {
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
  }

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
    <JustaThemeContext.Provider value={{ changeTheme }}>
      {/*<GlobalStyle theme={theme} />*/}
      {children}
    </JustaThemeContext.Provider>
  );
};

export const useJustaTheme = () => {
  const context = useContext(JustaThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a JustaThemeProvider');
  }
  return context;
}