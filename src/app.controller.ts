import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/generate-types')
  async generateGraphQLTypes(
    @Body('dtoFilePath') dtoFilePath: string,
  ): Promise<any> {
    console.log('hello world');
    if (!dtoFilePath) {
      throw new Error('Path is required');
    }

    return this.appService.generateGraphQLTypes(dtoFilePath);
  }
}
