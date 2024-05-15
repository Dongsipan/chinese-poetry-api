import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RhythmicSearchParams } from './entities/rhythmic.search.params';

@Injectable()
export class RhythmicService {
  constructor(private prisma: PrismaService) {}

  searchRhythmic(params: RhythmicSearchParams) {
    if (!params.page_index) {
      params.page_index = 1;
    }
    if (!params.page_size) {
      params.page_size = 20;
    }
    return this.prisma.rhythmic.findMany({
      skip: (params.page_index - 1) * params.page_size,
      take: params.page_size,
      where: {
        r_name: {
          contains: params.keywords,
        },
      },
    });
  }
}
