import { ApiProperty } from '@nestjs/swagger';

export class IPagination<T = any> {
  @ApiProperty({ type: () => [Object], description: '列表数据' })
  list: T[];
  @ApiProperty({ type: Number, description: '总数' })
  total: number;
  @ApiProperty({ type: Number, description: '每页数据' })
  pageSize: number;
  @ApiProperty({ type: Number, description: '当前页' })
  pageIndex: number;
}
