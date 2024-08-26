import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { GenerateGraphqlObjectType } from './common/types/generate-graphql-object-type.type';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/generate-input-type')
  async generateGraphQLInputType(
    @Body('dtoFilePath') dtoFilePath: string,
  ): Promise<any> {
    console.log('hello world');
    if (!dtoFilePath) {
      throw new Error('Path is required');
    }

    return this.appService.generateGraphQLInputType(dtoFilePath);
  }

  @Post('/generate-object-type')
  async generateGraphqlQLObjectType(
    @Body() data: GenerateGraphqlObjectType,
  ): Promise<any> {
    return this.appService.generateGraphqlQLObjectType(data);
  }
}
