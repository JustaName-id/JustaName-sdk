const libName = 'dentity-plugin';
const artifactName = 'justweb3-dentity-plugin';
const libPath = `packages/@justweb3/${libName}`;
const importPath = `@justweb3/${libName}`;

module.exports = {
  name: libName,
  pkgRoot: `${libPath}/dist`,
  branches: [
    '+([0-9])?(.{+([0-9]),x}).x',
    ' main',
    'next',
    'next-major',
    { name: 'beta', prerelease: true },
    { name: 'alpha', prerelease: true },
  ],
  tagFormat: artifactName + '-v${version}',
  commitPaths: [`${libPath}/*`],
  assets: [`${libPath}/README.md`, `${libPath}/CHANGELOG.md`],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: `${libPath}/CHANGELOG.md`,
      },
    ],
    '@semantic-release/npm',
    [
      '@semantic-release/exec',
      {
        prepareCmd: ` PACKAGE_NAME=${importPath} VERSION=\${nextRelease.version} npm run update-deps && VERSION=\${nextRelease.version} npm run bump-version:${libName}`,
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: [`${libPath}/CHANGELOG.md`],
        message:
          `chore(release): ${libName}` +
          '-v${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};
