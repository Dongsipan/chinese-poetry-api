import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PoetrySearchParams } from './entities/poetry.search.params';

@Injectable()
export class PoetryService {
  constructor(private prisma: PrismaService) {}
  searchPoetry(searchParams: PoetrySearchParams) {
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
    return this.prisma.poetry.findMany({
      skip: (searchParams.page_index - 1) * searchParams.page_size,
      take: searchParams.page_size,
      where: {
        ...searchQuery,
      },
    });
  }
}
