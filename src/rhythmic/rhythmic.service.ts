import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RhythmicSearchParams } from './entities/rhythmic.search.params';
import { convertToSimplified } from '../utils/convert.to.simplified';

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

  async getRhythmicPoetry(id: number, page_size: number, page_index: number) {
    if (!page_index) {
      page_index = 1;
    }
    if (!page_size) {
      page_size = 20;
    }
    const result = await this.prisma.poetry.findMany({
      skip: (page_index - 1) * page_size,
      take: page_size,
      where: {
        rhythmic: {
          is: {
            r_id: id,
          },
        },
      },
    });
    result.forEach((item) => {
      if (item.p_title) {
        item.p_title = convertToSimplified(item.p_title);
      }
      if (item.p_paragraph) {
        item.p_paragraph = convertToSimplified(item.p_paragraph);
      }
    });
    return result;
  }
}
