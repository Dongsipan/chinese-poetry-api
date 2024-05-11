import { ApiProperty } from '@nestjs/swagger';

export class SearchQuery {
  @ApiProperty({ name: '查询字符串', required: false })
  keywords?: string;
  @ApiProperty({
    name: '查询模式',
    enum: ['title', 'para', 'rhy', 'author'],
    enumName:
      'title（标题查询）, para（正文查询）, rhy（词牌/韵律查询）, author（作者查询）',
    required: false,
  })
  type?: string;
  @ApiProperty({ name: '每页查询个数', required: false })
  page_size?: number;
  @ApiProperty({ name: '目前页数', required: false })
  page_index?: number;
}
