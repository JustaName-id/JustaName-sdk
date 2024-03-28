import { DownloadDetails } from './download';
import { exec } from 'child_process';
import fs from 'fs-extra';

/**
 * Asynchronously installs packages for a downloaded project by generating a `package.json` file
 * with customized scripts based on the specified frameworks and then executing the installation command.
 *
 * @param {DownloadDetails} downloaded - An object containing details about the downloaded project,
 * including paths to the frontend, backend, or fullstack parts of the application.
 * @async
 * @function installPackages
 * @description Generates a `package.json` file in the project's root directory with scripts tailored
 * to the project's structure (frontend, backend, fullstack). It then executes a predefined script
 * to install dependencies for the specified frameworks. The process outputs are piped to the main
 * process stdout for real-time feedback.
 * 
 * The function handles different project setups:
 * - Frontend only
 * - Backend only
 * - Fullstack
 * - Combined frontend and backend
 * 
 * It defines scripts for installing dependencies and serving each part of the project, as well as combined
 * scripts to handle all operations together. After writing the `package.json`, it executes `yarn install:all`
 * to install all necessary dependencies based on the generated scripts.
 *
 * @returns {Promise<void>} A promise that resolves once the installation process is complete.
 * Throws an error if any step in the execution fails.
 */
export const installPackages = async (downloaded: DownloadDetails) => {
  const dir = downloaded.directory + '/' + downloaded.appName + '/';

  const packageJson = {
    name: downloaded.appName,
    version: '1.0.0',
    main: 'index.js',
    scripts: {
      'install:frontend': downloaded.frontendFramework ? `cd ${downloaded.frontendFramework} && yarn`: undefined,
      'install:backend': downloaded.backendFramework ? `cd ${downloaded.backendFramework} && yarn`: undefined,
      'install:fullstack': downloaded.fullstackFramework ? `cd ${downloaded.fullstackFramework} && yarn`: undefined,
      'install:all': downloaded.frontendFramework && downloaded.backendFramework ? `yarn install:frontend && yarn install:backend` : downloaded.fullstackFramework ? `yarn install:fullstack` : undefined,
      'serve:frontend': downloaded.frontendFramework ? `cd ${downloaded.frontendFramework} && yarn dev`: undefined,
      'serve:backend': downloaded.backendFramework ? `cd ${downloaded.backendFramework} && yarn dev`: undefined,
      'serve:fullstack': downloaded.fullstackFramework ? `cd ${downloaded.fullstackFramework} && yarn dev`: undefined,
      'serve:all': downloaded.frontendFramework && downloaded.backendFramework ? `yarn serve:frontend && yarn serve:backend` : downloaded.fullstackFramework ? `yarn serve:fullstack` : undefined,
    }
  }

  await fs.writeFile(dir + 'package.json', JSON.stringify(packageJson, null, 2));

  await new Promise((resolve, reject) => {
    const child = exec('yarn install:all', {
      cwd: dir
    });

    child.stdout?.pipe(process.stdout);

    child.on('error', reject);

    child.on('exit', resolve);
  });
}



