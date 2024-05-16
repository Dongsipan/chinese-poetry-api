import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { convertToSimplified } from '../utils/convert.to.simplified';

@Injectable()
export class CollectionService {
  constructor(private prisma: PrismaService) {}
  getCollection() {
    return this.prisma.collection.findMany();
  }

  async getCollectionPoetry(id: number, page_size: number, page_index: number) {
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
        collection: {
          is: {
            c_id: id,
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
