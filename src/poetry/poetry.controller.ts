import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { PoetryService } from './poetry.service';
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';
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

  @ApiOperation({ summary: '通过 id 查询 诗词' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: '诗词 id',
  })
  @Get(':id')
  getPoetryById(@Param('id', ParseIntPipe) id: number) {
    return this.poetryService.getPoetryById(id);
  }
}
