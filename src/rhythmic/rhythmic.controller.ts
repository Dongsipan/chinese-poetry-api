import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { RhythmicService } from './rhythmic.service';
import { RhythmicSearchParams } from './entities/rhythmic.search.params';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('rhythmic')
export class RhythmicController {
  constructor(private readonly rhythmicService: RhythmicService) {}

  @ApiOperation({ summary: '通过关键字查询 词牌/韵律' })
  @ApiBody({
    type: RhythmicSearchParams,
  })
  @Post('search')
  searchRhythmic(@Body(ValidationPipe) params: RhythmicSearchParams) {
    return this.rhythmicService.searchRhythmic(params);
  }
}
