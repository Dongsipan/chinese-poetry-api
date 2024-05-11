import { Controller, Get, Query } from '@nestjs/common';
import { PoetryService } from './poetry.service';
import { SearchQuery } from './entities/search.query';
import { ApiOperation } from '@nestjs/swagger';

@Controller('poetry')
export class PoetryController {
  constructor(private readonly poetryService: PoetryService) {}

  @ApiOperation({ summary: '通过关键字查询 诗词' })
  @Get('search')
  searchPoetry(@Query() query: SearchQuery) {
    console.log(query);
    return this.poetryService.searchPoetry();
  }
}
