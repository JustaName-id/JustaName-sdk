import './polyfills';

import { scan } from 'react-scan'; // import this BEFORE react

if (typeof window !== 'undefined') {
  scan({
    enabled: true,
    log: true, // logs render info to console (default: false)
  });
}

export const decorators = [(Story) => <Story />];
