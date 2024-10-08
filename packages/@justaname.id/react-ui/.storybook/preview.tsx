import { JustaThemeProvider } from '../src/lib/providers/JustaThemeProvider';

export const decorators = [
  (Story) => (
    <JustaThemeProvider>
      <Story />
    </JustaThemeProvider>
  ),
];