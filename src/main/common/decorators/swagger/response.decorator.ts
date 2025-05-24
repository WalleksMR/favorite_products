import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiOperation, ApiResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiResponseType = <TModel extends Type<any>>(
  model: TModel,
  data?: { httpStatus?: number; isArray?: boolean; description?: string; summary?: string },
) => {
  return applyDecorators(
    ApiOperation({ summary: data?.summary && data?.summary }),
    ApiResponse({
      description: data?.description && data?.description,
      isArray: data?.isArray ? data.isArray : false,
      status: data?.httpStatus ? data.httpStatus : HttpStatus.OK,
      type: model,
      schema: {
        allOf: [{ $ref: getSchemaPath(model) }],
      },
    }),
  );
};
