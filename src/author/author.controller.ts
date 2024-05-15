import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorSearchParams } from './entities/author.search.params';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @ApiOperation({ summary: '通过关键字查询 作者' })
  @ApiBody({
    type: AuthorSearchParams,
    schema: { example: { keywords: '李白' } },
  })
  @Post('search')
  searchAuthor(@Body(ValidationPipe) params: AuthorSearchParams) {
    return this.authorService.searchAuthor(params);
  }
}
