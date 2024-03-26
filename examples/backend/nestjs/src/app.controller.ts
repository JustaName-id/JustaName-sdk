import { Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RequestChallenge } from './interfaces/request-challenge.interface';
import { SubnameAdd } from './interfaces/add.interface';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/request-challenge')
  async requestChallenge(req: RequestChallenge): Promise<any> {
    return this.appService.requestChallenge(req);
  }

  @Post('/subnames/add')
  async addSubname(req: SubnameAdd): Promise<any> {
    return this.appService.addSubname(req);
  }
}
