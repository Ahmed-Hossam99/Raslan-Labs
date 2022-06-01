import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginatedDto } from './paginated.dto';

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
  extraModel: Type<any> = null,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        title: `PaginatedResponseOf${model.name}`,
        allOf: [
          { $ref: getSchemaPath(PaginatedDto) },
          {
            properties: {
              docs: {
                type: 'array',
                items: {
                  allOf: [
                    { $ref: getSchemaPath(model) },
                    { ...(extraModel && { $ref: getSchemaPath(extraModel) }) },
                  ],
                },
              },
            },
          },
        ],
      },
    }),
  );
};
