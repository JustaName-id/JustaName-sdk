import { exec } from 'child_process';
import { AppDetails, PackageManager} from './questions';

export const downloadDetails = async (project: AppDetails) => {

  const downloadUrl = 'https://github.com/JustaName-id/JustaName-sdk/archive/refs/heads/main.tar.gz';

  return {
    downloadUrl,
    frontendFramework: 'examples/frontend/'+ project.frontendFramework,
    backendFramework: 'examples/backend/'+ project.backendFramework,
  }
}

export const installDependencies = (directory: string, packageManager: PackageManager): Promise<void> => {
  return new Promise((resolve, reject) => {
    exec(packageManager === 'npm' ? 'npm install' : 'yarn', { cwd: directory }, (error, stdout) => {
      if (error) {
        reject(new Error(`Failed to install dependencies: ${error.message}`));
        return;
      }
      resolve();
    });
  });
};