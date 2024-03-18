import fs from 'fs-extra';
import path from 'path';

export type BackendEnv = {
    JUSTANAME_API_KEY: string;
    JUSTANAME_CHAIN_ID: number;
    JUSTANAME_DOMAIN: string;
    JUSTANAME_ORIGIN: string;
}

export type FrontendEnv = {
    API_URL: string;
    CHAIN_ID: number;
    ENS_DOMAIN: string;
}

export const createEnvFile = async (directory: string, envVariables: BackendEnv | FrontendEnv, prefix: string = '') => {
    const lines = Object.keys(envVariables).map(key => {
        const value = (envVariables as Record<string, any>)[key];
        // Check if the value is a number or string and convert numbers to strings
        const stringValue = typeof value === 'number' ? value.toString() : value;
        return `${prefix}${key}=${stringValue}\n`;
    });
    const content = lines.join('');
    await fs.writeFile(path.join(directory, '.env'), content);
}
