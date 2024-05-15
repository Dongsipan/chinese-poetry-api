import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { PoetryService } from './poetry.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { PoetrySearchParams } from './entities/poetry.search.params';

@Controller('poetry')
export class PoetryController {
  constructor(private readonly poetryService: PoetryService) {}

  @ApiOperation({ summary: '通过关键字查询 诗词' })
  @ApiBody({
    type: PoetrySearchParams,
    schema: { example: { keywords: '杜甫' } },
  })
  @Post('search')
  searchPoetry(@Body(ValidationPipe) searchParams: PoetrySearchParams) {
    return this.poetryService.searchPoetry(searchParams);
  }
}
