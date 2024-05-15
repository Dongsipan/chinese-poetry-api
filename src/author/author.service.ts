import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthorSearchParams } from './entities/author.search.params';

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
}
