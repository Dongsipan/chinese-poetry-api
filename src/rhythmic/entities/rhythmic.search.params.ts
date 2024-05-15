import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class RhythmicSearchParams {
  @ApiProperty({ name: 'keywords', description: '查询字符串', required: false })
  keywords?: string;
  @ApiProperty({
    name: 'page_size',
    description: '每页查询个数',
    required: false,
  })
  @IsInt()
  page_size?: number = 0;
  @ApiProperty({ name: 'page_index', description: '目前页数', required: false })
  @IsInt()
  page_index?: number = 20;
}
