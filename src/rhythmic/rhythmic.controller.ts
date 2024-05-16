import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { RhythmicService } from './rhythmic.service';
import { RhythmicSearchParams } from './entities/rhythmic.search.params';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('rhythmic')
export class RhythmicController {
  constructor(private readonly rhythmicService: RhythmicService) {}

  @ApiOperation({ summary: '获取rhythmic 列表' })
  @Get()
  getRhythmic(
    @Query('page_size', ParseIntPipe) page_size: number,
    @Query('page_index', ParseIntPipe) page_index: number,
  ) {
    return this.rhythmicService.getRhythmic(page_size, page_index);
  }

  @ApiOperation({ summary: '通过关键字查询 词牌/韵律' })
  @ApiBody({
    type: RhythmicSearchParams,
  })
  @Post('search')
  searchRhythmic(@Body(ValidationPipe) params: RhythmicSearchParams) {
    return this.rhythmicService.searchRhythmic(params);
  }

  @ApiOperation({ summary: '通过rhythmic的Id查询 诗词列表' })
  @Get(':id/poetry')
  getRhythmicPoetry(
    @Param('id', ParseIntPipe) id: number,
    @Query('page_size', ParseIntPipe) page_size: number,
    @Query('page_index', ParseIntPipe) page_index: number,
  ) {
    return this.rhythmicService.getRhythmicPoetry(id, page_size, page_index);
  }
}
