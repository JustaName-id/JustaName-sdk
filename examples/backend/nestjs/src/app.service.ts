import { Injectable } from '@nestjs/common';
import { ChainId, JustaName } from '@justaname.id/sdk';
import { RequestChallenge, SubnameAdd } from './interfaces';

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

  async requestChallenge(request: RequestChallenge): Promise<any> {
    if (!request.address) {
      return {
        message: 'Address is required',
      };
    }

    try {
      const challenge = await this.justaname.siwe.requestChallenge({
        chainId: this.chainId as ChainId,
        origin: this.origin,
        address: request.address,
        domain: this.domain,
      });

      return challenge;
    } catch (error) {
      return {
        error: error.message,
      }
    }
  }

  async addSubname(request: SubnameAdd): Promise<any> {
    if (!request.username) {
      return {
        message: 'Username is required',
      };
    }

    try {
      const add = await this.justaname.subnames.addSubname({
        username: request.username,
        ensDomain: this.domain,
        chainId: this.chainId
      },
      {
        xSignature: request.signature,
        xAddress: request.address,
        xMessage: request.message,
      });

      return add;
    } catch (error) {
      return {
        error: error.message,
      }
    }
  }
}
