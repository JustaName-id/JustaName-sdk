import fetch from 'node-fetch';
import tar from 'tar';
import fs from 'fs-extra';
import path from 'path';
import { collectAppDetails } from './lib/helpers/questions';
import { downloadDetails } from './lib/helpers/download';
import Ora from "ora";

async function main() {
  const collectApps = await collectAppDetails();
  const details = await downloadDetails(collectApps);

  const spinner = Ora({
    text: 'Downloading your app...',
    color: 'green',
    spinner:'balloon2'
  }).start();

  try {
    const response = await fetch(details.downloadUrl);
    console.log(response);
    if (!response.ok) throw new Error('Failed to download the app');

    const projectDir = path.join(process.cwd(), collectApps.appName);
    await fs.ensureDir(projectDir);

    await new Promise((resolve, reject) => {
      response.body
        .pipe(tar.extract({ cwd: projectDir, strip: 1 }))
        .on('error', reject)
        .on('finish', resolve);
    });

    const frontendDir = path.join(projectDir, details.frontendFramework);
    const backendDir = path.join(projectDir, details.backendFramework);

    await fs.copy(frontendDir, path.join(projectDir, 'frontend'));
    await fs.copy(backendDir, path.join(projectDir, 'backend'));

    spinner.succeed('Download complete');
  } catch (err) {
    spinner.fail('Download failed');
    console.error('An error occurred:', err);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('An error occurred:', err);
  process.exit(1);
});