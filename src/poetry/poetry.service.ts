import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PoetrySearchParams } from './entities/poetry.search.params';
import { convertToSimplified } from '../utils/convert.to.simplified';
import { Prisma } from '@prisma/client';

@Injectable()
export class PoetryService {
  constructor(private prisma: PrismaService) {}

  async searchPoetry(searchParams: PoetrySearchParams) {
    if (!searchParams.page_index) {
      searchParams.page_index = 1;
    }
    if (!searchParams.page_size) {
      searchParams.page_size = 20;
    }
    let searchQuery = {};
    if (searchParams.type === 'title') {
      searchQuery = {
        p_title: {
          contains: searchParams.keywords,
        },
      };
    }
    if (searchParams.type === 'para') {
      searchQuery = {
        p_paragraph: {
          contains: searchParams.keywords,
        },
      };
    }
    if (searchParams.type === 'rhy') {
      searchQuery = {
        rhythmic: {
          is: {
            r_name: {
              contains: searchParams.keywords,
            },
          },
        },
      };
    }
    if (searchParams.type === 'author') {
      searchQuery = {
        author: {
          is: {
            a_name: {
              contains: searchParams.keywords,
            },
          },
        },
      };
    }
    const total = await this.prisma.poetry.count({
      where: {
        ...searchQuery,
      },
    });
    const result = await this.prisma.poetry.findMany({
      skip: (searchParams.page_index - 1) * searchParams.page_size,
      take: searchParams.page_size,
      where: {
        ...searchQuery,
      },
    });
    return {
      list: result,
      total: total,
      pageIndex: searchParams.page_index,
      pageSize: searchParams.page_size,
    };
  }

  async getPoetryById(id: number) {
    const result = await this.prisma.poetry.findUnique({
      where: {
        p_id: id,
      },
    });
    result.p_other = result.p_paragraph;
    result.p_paragraph = convertToSimplified(result.p_paragraph); // 繁体转简体
    return result;
  }

  async getPoetryByRhythmic() {
    const result = await this.prisma.$queryRaw(
      Prisma.sql`SELECT * FROM "public".poetry ORDER BY RANDOM() LIMIT 1;`,
    );
    if (result[0] && result[0].p_title) {
      result[0].p_title = convertToSimplified(result[0].p_title);
    }
    if (result[0] && result[0].p_paragraph) {
      result[0].p_paragraph = convertToSimplified(result[0].p_paragraph);
    }
    return result;
  }
}
