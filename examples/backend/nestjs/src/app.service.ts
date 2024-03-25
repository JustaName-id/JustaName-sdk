import { Injectable } from '@nestjs/common';
import { ChainId, JustaName } from '@justaname.id/sdk';
import { RequestChallenge } from './interfaces/request-challenge.interface';
import { SubnameUpdate } from './interfaces/update.interface';
import { SubnameClaim } from './interfaces/claim.interface';

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

  async claimSubname(req: SubnameClaim): Promise<any> {
    if (!req.username || !req.address || !req.signature) {
      return {
        message: 'Username, address and signature are required',
      };
    }

    try {
      const claim = await this.justaname.subnames.claimSubname({
        username: req.username,
        ensDomain: this.domain,
        chainId: this.chainId,
      }, {
        xSignature: req.signature,
        xAddress: req.address,
        xMessage: req.message,
      });

      return claim;
    } catch (error) {
      console.error(error);
    }

    return {
        message: 'Something went wrong'
    }
  }
  
  // TODO: add text, contentHash and addresses
  async updateSubname(req: SubnameUpdate): Promise<any> {
    if (!req.username || !req.address || !req.signature || !req.message) {
      return {
        message: 'Username, address, signature and message are required',
      };
    }

    try {
      const update = await this.justaname.subnames.updateSubname({
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

      return update;
    } catch (error) {
      console.error(error);
    }

    return {
        message: 'Something went wrong'
    }
  }
}
