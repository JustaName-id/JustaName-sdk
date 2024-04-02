import { DownloadDetails } from './download';
import { exec } from 'child_process';
import fs from 'fs-extra';
export const installPackages = async (downloaded: DownloadDetails) => {
  const dir = downloaded.directory + '/' + downloaded.appName + '/';

  const packageJson = {
    name: downloaded.appName,
    version: '1.0.0',
    main: 'index.js',
    scripts: {
      'install:frontend': downloaded.frontendFramework
        ? `cd ${downloaded.frontendFramework} && yarn`
        : undefined,
      'install:backend': downloaded.backendFramework
        ? `cd ${downloaded.backendFramework} && yarn`
        : undefined,
      'install:fullstack': downloaded.fullstackFramework
        ? `cd ${downloaded.fullstackFramework} && yarn`
        : undefined,
      'install:all':
        downloaded.frontendFramework && downloaded.backendFramework
          ? `yarn install:frontend && yarn install:backend`
          : downloaded.fullstackFramework
          ? `yarn install:fullstack`
          : undefined,
      'serve:frontend': downloaded.frontendFramework
        ? `cd ${downloaded.frontendFramework} && yarn ${
            downloaded.frontendFramework === 'expo' ? 'start' : 'dev'
          }`
        : undefined,
      'serve:backend': downloaded.backendFramework
        ? `cd ${downloaded.backendFramework} && yarn dev`
        : undefined,
      'serve:fullstack': downloaded.fullstackFramework
        ? `cd ${downloaded.fullstackFramework} && yarn ${
            downloaded.fullstackFramework === 'expo' ? 'start' : 'dev'
          }`
        : undefined,
      'serve:all':
        downloaded.frontendFramework && downloaded.backendFramework
          ? `yarn serve:frontend && yarn serve:backend`
          : downloaded.fullstackFramework
          ? `yarn serve:fullstack`
          : undefined,
    },
  };

  await fs.writeFile(
    dir + 'package.json',
    JSON.stringify(packageJson, null, 2)
  );

  await new Promise((resolve, reject) => {
    const child = exec('yarn install:all', {
      cwd: dir,
    });

    child.stdout?.pipe(process.stdout);

    child.on('error', reject);

    child.on('exit', resolve);
  });
};
