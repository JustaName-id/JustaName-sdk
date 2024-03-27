import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { RequestChallenge, SubnameAdd } from './interfaces';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getWelcomeMessage(): any {
    return { message: 'Welcome to JustaName NestJs!' };
  }

  @Get('/request-challenge')
  async requestChallenge(@Query() query: RequestChallenge): Promise<any> {
    return this.appService.requestChallenge(query);
  }

  // TODO: error status code should reflect the actual status code from the backend
  @Post('/subnames/add')
  async addSubname(
    @Body() request: SubnameAdd,
    @Res() response: Response,
  ): Promise<any> {
    const subname = await this.appService.addSubname(request);
    response.status(subname.error ? 500 : 201).send(subname);
  }
}
