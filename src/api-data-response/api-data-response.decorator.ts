import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { IResponse } from '../interface/IResponse';
import { IPagination } from '../interface/IPagination';

/**
 * Generates a decorator that adds a response schema for API data responses.
 *
 * @param {Type<T>} entity - The entity type for the data response.
 * @param {boolean} [isPagination=false] - Indicates if the data response is paginated.
 * @return {MethodDecorator} - The decorator for the API data response.
 */
export function ApiDataResponse<T>(
  entity: Type<T>,
  isPagination: boolean = false,
): MethodDecorator {
  const dataSchema = isPagination
    ? {
        data: {
          $ref: getSchemaPath(IPagination),
          properties: {
            list: {
              type: 'array',
              items: {
                $ref: getSchemaPath(entity),
              },
            },
          },
        },
      }
    : {
        data: {
          $ref: getSchemaPath(entity),
        },
      };

  return applyDecorators(
    ApiExtraModels(IResponse, IPagination, entity),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(IResponse) },
          {
            properties: {
              ...dataSchema,
            },
          },
        ],
      },
    }),
  );
}
