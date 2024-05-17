import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { IResponse } from '../interface/IResponse';

export function ApiDataResponse<T>(entity: Type<T>) {
  return applyDecorators(
    ApiExtraModels(IResponse, entity),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(IResponse) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(entity),
              },
            },
          },
        ],
      },
    }),
  );
}
