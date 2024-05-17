import { ApiProperty } from '@nestjs/swagger';

export class IResponse<T = any> {
  @ApiProperty({ type: 'object' })
  data?: T;

  @ApiProperty({ type: 'number', default: 200 })
  code: number;

  @ApiProperty({ type: 'string', default: 'success' })
  message: string;

  constructor(code: number, data: T, message = 'success') {
    this.code = code;
    this.data = data;
    this.message = message;
  }
}
