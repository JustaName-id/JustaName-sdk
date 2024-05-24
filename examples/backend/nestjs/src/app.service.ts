import { Injectable, OnModuleInit } from '@nestjs/common';
import { ChainId, JustaName } from '@justaname.id/sdk';
import { RequestChallenge, SubnameAdd } from './interfaces';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AppService implements OnModuleInit {
  chainId: number;
  domain: string;
  origin: string;
  justaname: JustaName;

  constructor(readonly configService: ConfigService) {
    this.chainId = parseInt(this.configService.get('JUSTANAME_CHAIN_ID'));
    this.domain = this.configService.get('JUSTANAME_DOMAIN');
    this.origin = this.configService.get('JUSTANAME_ORIGIN');
  }

  async onModuleInit(): Promise<void> {
    await this.init();
  }

  async init() {
    this.justaname = await JustaName.init({
      apiKey: this.configService.get('JUSTANAME_API_KEY'),
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
        // 30mins
        ttl: 1800000,
        chainId: this.chainId as ChainId,
        origin: this.origin,
        address: request.address,
        domain: this.domain,
      });

      return challenge;
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async addSubname(request: SubnameAdd): Promise<any> {
    if (!request.username) {
      return {
        message: 'Username is required',
      };
    }

    try {
      const add = await this.justaname.subnames.addSubname(
        {
          username: request.username,
          ensDomain: this.domain,
          chainId: this.chainId,
        },
        {
          xSignature: request.signature,
          xAddress: request.address,
          xMessage: request.message,
        },
      );

      return add;
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }
}
