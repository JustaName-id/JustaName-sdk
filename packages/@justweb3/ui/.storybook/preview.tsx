import { JustWeb3ThemeProvider } from '../src/lib/providers/JustWeb3ThemeProvider';

export const decorators = [
  (Story) => (
    <JustWeb3ThemeProvider>
      <Story />
    </JustWeb3ThemeProvider>
  ),
];