import { JustaName } from '@justaname.id/sdk';

export const justaname = JustaName.init({ 
    dev: process.env.DEV === "true",
})