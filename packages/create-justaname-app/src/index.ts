import fetch from 'node-fetch';
import tar from 'tar';
import fs from 'fs-extra';
import path from 'path';
import { collectAppDetails } from './lib/helpers/questions';
import { downloadDetails, installDependencies } from './lib/helpers/download';
import Ora from 'ora';
import { BackendEnv, FrontendEnv, createEnvFile } from './lib/helpers/env';

async function main() {
  const collectApps = await collectAppDetails();
  const details = await downloadDetails(collectApps);

  const spinner = Ora({
    text: 'Downloading your app...',
    color: 'green',
    spinner: 'dots',
  }).start();

  try {
    const response = await fetch(details.downloadUrl);
    if (!response.ok) throw new Error('Failed to download the app');
    const { directory, appName } = collectApps;
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

    const frontendDir = path.join(
      projectDir + '/temp',
      details.frontendFramework
    );
    const backendDir = path.join(
      projectDir + '/temp',
      details.backendFramework
    );

    await fs.copy(frontendDir, path.join(projectDir, 'frontend'));
    await fs.copy(backendDir, path.join(projectDir, 'backend'));

    await fs.remove(projectDir + '/temp');

    await installDependencies(path.join(projectDir, 'backend'));
    spinner.succeed('Backend dependencies installed');

    // await installDependencies(path.join(projectDir, 'frontend'));
    // spinner.succeed('Frontend dependencies installed');

    const backendEnv: BackendEnv = {
      JUSTANAME_API_KEY: 'aZsaY98yzzjVaQmNFrMm8jMIdgQeJXOD',
      JUSTANAME_CHAIN_ID: 11155111,
      JUSTANAME_DOMAIN: 'justawallet.eth',
      JUSTANAME_ORIGIN: 'https://justaname.id',
    };

    const frontEnv: FrontendEnv = {
      API_URL: 'http://localhost:3333',
      ENS_DOMAIN: 'justawallet.eth',
      CHAIN_ID: 11155111,
    };

    await createEnvFile(
      path.join(projectDir, 'backend'),
      backendEnv,
    );

    await createEnvFile(
      path.join(projectDir, 'frontend'),
      frontEnv,
      "REACT_APP_",
    );

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
