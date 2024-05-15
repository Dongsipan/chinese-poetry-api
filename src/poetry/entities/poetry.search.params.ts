import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, Length } from 'class-validator';

export class PoetrySearchParams {
  @Length(1, 20, {
    message: '关键字最少 1 个字符，最多 20 个字符',
  })
  @ApiProperty({ name: 'keywords', description: '查询字符串', required: false })
  keywords?: string;
  @IsNotEmpty()
  @IsEnum(['title', 'para', 'rhy', 'author'])
  @ApiProperty({
    name: 'type',
    description: '查询模式',
    enum: ['title', 'para', 'rhy', 'author'], // 'title（标题查询）, para（正文查询）, rhy（词牌/韵律查询）, author（作者查询）'
    required: true,
  })
  type?: string;
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
