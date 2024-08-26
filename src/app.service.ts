import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as fs from 'fs';
import * as path from 'path';
import { GenerateGraphqlObjectType } from './common/types/generate-graphql-object-type.type';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('cartable-svc') private client: ClientProxy) {}

  async generateGraphQLInputType(dtoFilePath: string): Promise<void> {
    // Read the DTO file
    const dtoContent = fs.readFileSync(dtoFilePath, 'utf8');

    // Parse the DTO file and generate the GraphQL input type
    const graphqlInputType = this.convertDtoToGraphQL(dtoContent);

    // Determine the output file path
    const outputFileName = path.basename(dtoFilePath, '.ts') + '.input.ts';
    const outputPath = path.join(path.dirname(dtoFilePath), outputFileName);

    // Save the generated GraphQL input type to a new file
    fs.writeFileSync(outputPath, graphqlInputType);

    console.log(`Generated GraphQL input type at: ${outputPath}`);
  }

  async generateGraphqlQLObjectType(
    data: GenerateGraphqlObjectType,
  ): Promise<void> {
    const result = await lastValueFrom(
      this.client.send(data.pattern, data.payload),
    );
  }

  private convertDtoToGraphQL(dtoContent: string): string {
    // Extract the class name from the DTO file
    const classNameMatch = dtoContent.match(/export class (\w+)/);
    if (!classNameMatch) {
      throw new Error('Unable to determine the class name from the DTO file.');
    }
    const className = classNameMatch[1];

    // Generate the GraphQL input type name
    const graphqlClassName = className.replace('Dto', 'Input');

    // Extract properties from the DTO file
    const propertyRegex = /@(\w+)[^@]*?\n\s+(\w+): (\w+);/g;
    let match;
    let properties = '';

    while ((match = propertyRegex.exec(dtoContent)) !== null) {
      const decorator = match[1];
      const propertyName = match[2];
      const propertyType = match[3];

      let graphqlType: string;

      // Map TypeScript types to GraphQL types
      switch (propertyType) {
        case 'string':
        case 'String':
          graphqlType = 'String';
          break;
        case 'number':
        case 'Number':
        case 'int':
        case 'Int':
          graphqlType = 'Int';
          break;
        case 'Date':
          graphqlType = 'Date';
          break;
        default:
          graphqlType = propertyType; // Handle custom types
          break;
      }

      properties += `  @Field(() => ${graphqlType})\n  ${propertyName}: ${propertyType};\n\n`;
    }

    // Generate the full GraphQL input type definition
    return `import { InputType, Field, Int } from '@nestjs/graphql';\n\n@InputType()\nexport class ${graphqlClassName} {\n${properties}}`;
  }
}
