// import './polyfills';
// // import { scan } from 'react-scan';

// // if (typeof window !== 'undefined') {
// //   scan({
// //     enabled: true,
// //     log: true, // logs render info to console (default: false)
// //   });
// // }

// export const decorators = [(Story) => <Story />];

import type { Preview } from '@storybook/react';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        server: {
            headers: {
                'Cross-Origin-Embedder-Policy': 'require-corp',
                'Cross-Origin-Opener-Policy': 'same-origin',
            },
        },
    },
};

export default preview;
