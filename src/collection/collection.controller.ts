import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @ApiOperation({ summary: '获取collection 列表' })
  @Get()
  getCollection() {
    return this.collectionService.getCollection();
  }
  @Get(':id/poetry')
  getCollectionPoetry(
    @Param('id', ParseIntPipe) id: number,
    @Query('page_size', ParseIntPipe) page_size: number,
    @Query('page_index', ParseIntPipe) page_index: number,
  ) {
    return this.collectionService.getCollectionPoetry(
      id,
      page_size,
      page_index,
    );
  }
}
