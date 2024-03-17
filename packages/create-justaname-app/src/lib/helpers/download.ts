import { AppDetails} from './questions';

export const downloadDetails = async (project: AppDetails) => {

  const downloadUrl = 'https://github.com/JustaName-id/JustaName-sdk/archive/refs/heads/main.tar.gz';

  return {
    downloadUrl,
    frontendFramework: 'examples/frontend/'+ project.frontendFramework,
    backendFramework: 'examples/backend/'+ project.backendFramework,
  }
}