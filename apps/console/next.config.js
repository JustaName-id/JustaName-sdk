//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
// const MillionLint = require('@million/lint');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // distDir: '../../dist/apps/console',
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  async rewrites() {
    return [
      // Posthog
      {
        source: '/analytics/:path*',
        destination: 'https://eu.posthog.com/:path*',
      },
      {
        source: '/analytics/:path*/',
        destination: 'https://eu.posthog.com/:path*/',
      },
    ];
  },
  skipTrailingSlashRedirect: true,
  async headers() {
    async function getMyIp() {
      const x = await fetch('https://api.ipify.org');
      // const x = await fetch('https://api.my-ip.io/ip')
      return await x.text();
    }
    const ip = await getMyIp();
    return [
      {
        source: '/analytics/:path*',
        headers: [
          { key: 'X-Forwarded-Proto', value: 'https' },
          {
            key: 'X-Forwarded-Host',
            value: 'https://www.useflytrap.com',
          },
          { key: 'X-Forwarded-For', value: ip },
        ],
      },
      {
        source: '/analytics/:path*/',
        headers: [
          { key: 'X-Forwarded-Proto', value: 'https' },
          {
            key: 'X-Forwarded-Host',
            value: 'https://www.useflytrap.com',
          },
          { key: 'X-Forwarded-For', value: ip },
        ],
      },
    ];
  },
  experimental: {
    serverComponentsExternalPackages: ['@xmtp/user-preferences-bindings-wasm'],
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

// module.exports = MillionLint.next({ rsc: true })(
//   composePlugins(...plugins)(nextConfig)
// );

module.exports = composePlugins(...plugins)(nextConfig);
