import { DownloadDetails } from './download';
import fs from 'fs-extra';
import { BackendFramework, FrontendFramework, FullstackFramework } from './questions';
import { getEnv } from './env';
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

export const setupEnv = async (framework: FrontendFramework | BackendFramework | FullstackFramework, downloaded: DownloadDetails) => {

  const dir = downloaded.directory + '/' + downloaded.appName + '/';
  const envPath = dir + framework + '/.env';
  const env = getEnv(framework, downloaded);
  await fs.writeFile(envPath, env);
}


