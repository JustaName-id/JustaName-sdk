import { AppDetails} from './questions';
import fetch from 'node-fetch';
import path from 'path';
import fs from 'fs-extra';
import tar from 'tar';

interface GetDownloadDetails {
  downloadUrl: string;
  directory: string;
  frontendFrameworkPath?: string;
  backendFrameworkPath?: string;
  fullstackFrameworkPath?: string;
}
export const getDownloadDetails = async (project: AppDetails): Promise<GetDownloadDetails> => {

  const downloadUrl = 'https://github.com/JustaName-id/JustaName-sdk/archive/refs/heads/main.tar.gz';
  const projectDir = path.join(process.cwd(), project.directory, project.appName);

  let frontendFrameworkPath: string | undefined;
  let backendFrameworkPath: string | undefined;
  let fullstackFrameworkPath: string | undefined;

  if (project.frontendFramework && project.backendFramework) {
    frontendFrameworkPath = 'examples/frontend/' + project.frontendFramework;
    backendFrameworkPath = 'examples/backend/' + project.backendFramework;
  }

  if (project.fullstackFramework) {
    if(project.fullstackFramework==='nextjs'){
      fullstackFrameworkPath = 'examples/fullstack/nextjs/' + (project.appDir ? 'app' : 'pages')
    }
    else{
      fullstackFrameworkPath = 'examples/fullstack/' + project.fullstackFramework;
    }
  }

  return {
    downloadUrl,
    directory: projectDir,
    frontendFrameworkPath,
    backendFrameworkPath,
    fullstackFrameworkPath
  }
}

export interface DownloadDetails extends GetDownloadDetails, AppDetails {
  frontendDir?: string;
  backendDir?: string;
  fullstackDir?: string;
}

export const downloadApp = async (project: AppDetails) : Promise<DownloadDetails> => {
  const details = await getDownloadDetails(project);
  const response = await fetch(details.downloadUrl);
  if (!response.ok) throw new Error('Failed to download the app');
  const { directory, appName } = project;
  const projectDir = path.join(process.cwd(), directory, appName);
  await fs.remove(projectDir);
  await fs.ensureDir(projectDir);
  await fs.ensureDir(projectDir + '/temp');

  await new Promise((resolve, reject) => {
    response.body
      .pipe(tar.extract({ cwd: projectDir + '/temp', strip: 1 }))
      .on('error', reject)
      .on('finish', resolve);
  });


  let frontendDir: string | undefined;
  let backendDir: string | undefined;
  let fullstackDir: string | undefined;

  if (details.frontendFrameworkPath && details.backendFrameworkPath) {
    frontendDir = path.join(projectDir + '/temp', details.frontendFrameworkPath);
    backendDir = path.join(projectDir + '/temp', details.backendFrameworkPath);
  }

  if (details.fullstackFrameworkPath) {
    fullstackDir = path.join(projectDir + '/temp', details.fullstackFrameworkPath);
  }

  return {
    ...details,
    ...project,
    frontendDir,
    backendDir,
    fullstackDir
  };
}