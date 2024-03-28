import { DownloadDetails } from './download';
import fs from 'fs-extra';
import { BackendFramework, FrontendFramework, FullstackFramework } from './questions';
import { getEnv } from './env';

/**
 * Organizes the project structure by moving framework-specific directories into the main project directory.
 * It also calls `setupEnv` to generate `.env` files for each framework based on the project's configuration.
 * 
 * @param {DownloadDetails} downloaded - The details of the downloaded project, including directories and framework choices.
 * @async
 * @function setupDirectories
 * @description Moves downloaded framework-specific directories into the appropriate locations within the main project directory.
 * If the project includes both frontend and backend directories, it moves and sets up environment variables for both.
 * For fullstack projects, it similarly organizes the fullstack directory and sets up its environment.
 * Finally, it cleans up any temporary directories used during the download process.
 * 
 * @returns {Promise<void>} A promise that resolves once all directories are moved and environment files are set up.
 */
export  const setupDirectories = async (downloaded: DownloadDetails) => {
  const dir = downloaded.directory + '/' + downloaded.appName + '/';
  if(downloaded.frontendDir && downloaded.backendDir && downloaded.frontendFramework && downloaded.backendFramework){
    await fs.move(downloaded.frontendDir, dir + downloaded.frontendFramework, {overwrite: true});
    await fs.move(downloaded.backendDir, dir + downloaded.backendFramework, {overwrite: true});
    await setupEnv(downloaded.frontendFramework, downloaded)
    await setupEnv(downloaded.backendFramework, downloaded)
  }
  if(downloaded.fullstackDir && downloaded.fullstackFramework){
    await fs.move(downloaded.fullstackDir, dir + downloaded.fullstackFramework, {overwrite: true});
    await setupEnv(downloaded.fullstackFramework, downloaded)
  }

  await fs.remove(downloaded.directory + '/' + downloaded.appName + '/temp');
}

/**
 * Creates an `.env` file for a specific framework directory within the downloaded project.
 *
 * @param {FrontendFramework | BackendFramework | FullstackFramework} framework - The framework for which to set up the `.env` file.
 * @param {DownloadDetails} downloaded - The details of the downloaded project, including app name, directory, and additional configuration.
 * @async
 * @function setupEnv
 * @description Generates an `.env` file with necessary environment variables for the specified framework.
 * Utilizes `getEnv` to retrieve the formatted environment variables string, which is then written to an `.env` file
 * in the framework's directory. This setup is crucial for configuring the project to run correctly with its dependencies
 * and services.
 * 
 * @returns {Promise<void>} A promise that resolves once the `.env` file is successfully created in the target directory.
 */
export const setupEnv = async (framework: FrontendFramework | BackendFramework | FullstackFramework, downloaded: DownloadDetails) => {

  const dir = downloaded.directory + '/' + downloaded.appName + '/';
  const envPath = dir + framework + '/.env';
  const env = getEnv(framework, downloaded);
  await fs.writeFile(envPath, env);
}


