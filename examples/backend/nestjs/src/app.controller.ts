import { Controller, Post, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SubnameUpdate } from './interfaces/update.interface';
import { SubnameClaim } from './interfaces/claim.interface';
import { RequestChallenge } from './interfaces/request-challenge.interface';

@Controller('/api/subnames')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/request-challenge')
  async requestChallenge(req: RequestChallenge): Promise<any> {
    return this.appService.requestChallenge(req);
  }

  @Post('/claim')
  async claimSubname(req: SubnameClaim): Promise<any> {
    return this.appService.claimSubname(req);
  }

  @Post('/update')
  async updateSubname(req: SubnameUpdate): Promise<any> {
    return this.appService.updateSubname(req);
  }
}
