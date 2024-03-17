import { collectAppDetails } from './lib/helpers/questions';

async function main() {

  const {
    appName,
    frontendFramework,
    backendFramework,
    apiKey,
    ensDomain,
    appDir,
    network
  } = await collectAppDetails();

  console.log(
    appName,
    frontendFramework,
    backendFramework,
    apiKey,
    ensDomain,
    appDir,
    network
  )
}


main().catch((err) => {
  console.error('An error occurred:', err);
  process.exit(1);
});