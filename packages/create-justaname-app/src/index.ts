#!/usr/bin/env node

import { collectAppDetails } from './lib/helpers/questions';
import { downloadApp, DownloadDetails } from './lib/helpers/download';
import Ora from "ora";
import { setupDirectories } from './lib/helpers/setup';
import { installPackages } from './lib/helpers/install';

/**
 * Initiates the application setup process by collecting app details,
 * downloading the app, setting up directories, and installing packages.
 * 
 * @async
 * @function main
 * @description Main script function that orchestrates the application setup process.
 * Steps include collecting user input for app details, downloading the app,
 * setting up necessary directories, and installing any required packages.
 */
async function main() {
  const collectApps = await collectAppDetails();
  let spinner = Ora();

  spinner.start('Downloading the app...')

  let details: DownloadDetails | undefined = undefined
  try {
    details = await downloadApp(collectApps);
  }
  catch (error) {
    spinner.fail('Failed to download the app');
  }

  if (!details) {
    process.exit(1);
  }


  spinner.succeed('App downloaded successfully');

  spinner = Ora({
    text: 'Setting up directories...',
    color: 'green',
    spinner:'dots'
  })
  await setupDirectories(details);
  spinner.succeed('Directories setup successfully');

  spinner.start('Installing packages...')
  await installPackages(details);
  spinner.succeed('Packages installed successfully')

}

main().catch((err) => {
  console.error('An error occurred:', err);
  process.exit(1);
});