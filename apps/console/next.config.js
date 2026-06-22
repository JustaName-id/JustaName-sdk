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
    // PostHog reverse proxy (EU region). posthog-js is configured with
    // api_host: '/analytics' so the browser only ever hits this first-party
    // path (ad-blocker resistant); Next forwards server-side to PostHog.
    //
    // IMPORTANT: PostHog retired `eu.posthog.com` for ingestion. Static assets
    // must go to `eu-assets.i.posthog.com` and everything else (event capture,
    // /decide, session recording /s) to `eu.i.posthog.com`. The dedicated
    // ingestion subdomain is the supported, durable target.
    return [
      // Static assets (array.js, recorder.js, ...) -> assets host.
      {
        source: '/analytics/static/:path*',
        destination: 'https://eu-assets.i.posthog.com/static/:path*',
      },
      // Event ingestion / decide / session recording -> ingestion host.
      // posthog-js sends to `/e/`, `/decide/`, `/s/` WITH a trailing slash, so
      // both the trailing-slash and bare variants are required (a single
      // `:path*` rule does not match `/analytics/e/`).
      {
        source: '/analytics/:path*/',
        destination: 'https://eu.i.posthog.com/:path*/',
      },
      {
        source: '/analytics/:path*',
        destination: 'https://eu.i.posthog.com/:path*',
      },
    ];
  },
  // Prevent Next from 308-redirecting `/analytics/e/` -> `/analytics/e`, which
  // would strip the trailing slash posthog-js depends on.
  skipTrailingSlashRedirect: true,
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
