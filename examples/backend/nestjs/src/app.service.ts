import { Injectable } from '@nestjs/common';
import { ChainId, JustaName } from '@justaname.id/sdk';
import { RequestChallenge } from './interfaces/request-challenge.interface';
import { SubnameAdd } from './interfaces/add.interface';

@Injectable()
export class AppService {
  chainId: number;
  domain: string;
  origin: string;
  justaname: JustaName;

  constructor() {
    this.init();
  }

  async init() {
    this.chainId = parseInt(process.env.JUSTANAME_CHAIN_ID);
    this.domain = process.env.JUSTANAME_DOMAIN;
    this.origin = process.env.JUSTANAME_ORIGIN;

    this.justaname = await JustaName.init({
        apiKey: process.env.JUSTANAME_API_KEY as string,
      });
    }

  async requestChallenge(req: RequestChallenge): Promise<any> {
    if (!req.address) {
      return {
        message: 'Address is required',
      };
    }

    try {
      const challenge = await this.justaname.siwe.requestChallenge({
        chainId: this.chainId as ChainId,
        origin: this.origin,
        address: req.address,
        domain: this.domain,
      });

      return challenge;
    } catch (error) {
      console.error(error);
    }

    return {
        message: 'Something went wrong'
    }
  }

  async addSubname(req: SubnameAdd): Promise<any> {
    if (!req.username || !req.address || !req.signature || !req.message) {
      return {
        message: 'Username, address, signature and message are required',
      };
    }

    try {
      const add = await this.justaname.subnames.addSubname({
        username: req.username,
        ensDomain: this.domain,
        chainId: this.chainId,
        text: [],
        contentHash: '',
        addresses: [],
      },
      {
        xSignature: req.signature,
        xAddress: req.address,
        xMessage: req.message,
      });

      return add;
    } catch (error) {
      console.error(error);
    }

    return {
        message: 'Something went wrong'
    }
  }
}
