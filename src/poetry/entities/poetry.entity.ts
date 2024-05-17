import { ApiProperty } from '@nestjs/swagger';

export class PoetryEntity {
  @ApiProperty({ name: 'p_id', description: '诗词Id', type: Number })
  p_id: number;
  @ApiProperty({ name: 'p_title', description: '诗词标题', type: String })
  p_title: string;
  @ApiProperty({ name: 'p_author_id', description: '诗词作者id', type: Number })
  p_author_id: number;
  @ApiProperty({
    name: 'p_rhythmic_id',
    description: '词牌/旋律Id',
    type: String,
  })
  p_rhythmic_id: number;
  @ApiProperty({ name: 'p_paragraph', description: '诗词正文', type: String })
  p_paragraph: string;
  @ApiProperty({ name: 'p_note', description: '诗词注解', type: String })
  p_note: string;
  @ApiProperty({
    name: 'p_collection_id',
    description: '诗集/文集Id',
    type: String,
  })
  p_collection_id: number;
  @ApiProperty({ name: 'p_other', description: '诗词其他信息', type: String })
  p_other: string;
  @ApiProperty({
    name: 'p_img_path',
    description: '诗词图片路径',
    type: String,
  })
  p_img_path: string;
}
