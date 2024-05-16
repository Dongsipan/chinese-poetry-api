import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthorSearchParams } from './entities/author.search.params';
import { convertToSimplified } from '../utils/convert.to.simplified';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  searchAuthor(params: AuthorSearchParams) {
    if (!params.page_index) {
      params.page_index = 1;
    }
    if (!params.page_size) {
      params.page_size = 20;
    }
    return this.prisma.author.findMany({
      skip: (params.page_index - 1) * params.page_size,
      take: params.page_size,
      where: {
        a_name: {
          contains: params.keywords,
        },
      },
    });
  }

  async getAuthorPoetry(id: number, page_size: number, page_index: number) {
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
        author: {
          is: {
            a_id: id,
          },
        },
      },
    });

    result.forEach((item) => {
      item.p_title = convertToSimplified(item.p_title);
      item.p_paragraph = convertToSimplified(item.p_paragraph);
    });
    return result;
  }

  getRandomAuthor(limit: number) {
    const result = this.prisma.$queryRaw(
      Prisma.sql`SELECT * FROM author ORDER BY RANDOM() LIMIT ${limit}`,
    );
    return result;
  }
}
