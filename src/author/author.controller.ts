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
import { AuthorService } from './author.service';
import { AuthorSearchParams } from './entities/author.search.params';
import { ApiBody, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @ApiOperation({ summary: '通过关键字查询 作者' })
  @Post('search')
  searchAuthor(@Body(ValidationPipe) params: AuthorSearchParams) {
    return this.authorService.searchAuthor(params);
  }

  @ApiOperation({ summary: '通过author的Id查询 诗词列表' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: '作者 id',
  })
  @ApiQuery({
    name: 'page_size',
    type: Number,
    description: '每页查询个数',
  })
  @ApiQuery({
    name: 'page_index',
    type: Number,
    description: '目前页数',
  })
  @Get(':id/poetry')
  getAuthorPoetry(
    @Param('id', ParseIntPipe) id: number,
    @Query('page_size', ParseIntPipe) page_size: number,
    @Query('page_index', ParseIntPipe) page_index: number,
  ) {
    return this.authorService.getAuthorPoetry(id, page_size, page_index);
  }
}
