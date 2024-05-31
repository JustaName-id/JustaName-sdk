import { AppDetails} from './questions';
import fetch from 'node-fetch';
import path from 'path';
import fs from 'fs-extra';
import tar from 'tar-fs';


/**
 * Defines the structure for the details needed to download a project.
 * 
 * @interface GetDownloadDetails
 * @property {string} downloadUrl - The URL from where the project's tarball can be downloaded.
 * @property {string} directory - The absolute path to the directory where the project will be set up.
 * @property {string} [frontendFrameworkPath] - The relative path within the downloaded project to the frontend framework examples, if applicable.
 * @property {string} [backendFrameworkPath] - The relative path within the downloaded project to the backend framework examples, if applicable.
 * @property {string} [fullstackFrameworkPath] - The relative path within the downloaded project to the fullstack framework examples, if applicable.
 */
interface GetDownloadDetails {
  downloadUrl: string;
  directory: string;
  frontendFrameworkPath?: string;
  backendFrameworkPath?: string;
  fullstackFrameworkPath?: string;
}

/**
 * Constructs the details necessary for downloading the project based on provided app specifications.
 * Determines paths for frontend, backend, or fullstack frameworks based on user choices.
 * 
 * @param {AppDetails} project - The details of the project to be downloaded, including framework choices and directory names.
 * @returns {Promise<GetDownloadDetails>} The details including the download URL, project directory, and optional paths for frontend, backend, and fullstack frameworks.
 */
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

/**
 * Extends the GetDownloadDetails with additional properties that are used to detail the downloaded project's structure.
 * 
 * @interface DownloadDetails
 * @extends {GetDownloadDetails}
 * @extends {AppDetails}
 * @property {string} [frontendDir] - The absolute path to the directory where frontend framework examples are located, if applicable.
 * @property {string} [backendDir] - The absolute path to the directory where backend framework examples are located, if applicable.
 * @property {string} [fullstackDir] - The absolute path to the directory where fullstack framework examples are located, if applicable.
 */
export interface DownloadDetails extends GetDownloadDetails, AppDetails {
  frontendDir?: string;
  backendDir?: string;
  fullstackDir?: string;
}

/**
 * Downloads the app tarball from the specified URL, extracts it to a temporary directory,
 * and identifies the relevant frontend, backend, or fullstack directories based on the project configuration.
 * 
 * @param {AppDetails} project - The project configuration details.
 * @returns {Promise<DownloadDetails>} The comprehensive details of the downloaded project, including framework directories.
 */
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
      .pipe(tar.extract( projectDir + '/temp', { strip: 1 }))
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