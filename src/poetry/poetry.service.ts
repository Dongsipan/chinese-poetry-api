import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PoetryService {
  constructor(private prisma: PrismaService) {}
  searchPoetry() {
    return this.prisma.poetry.findMany({
      skip: 0,
      take: 20,
      where: {
        p_title: {
          contains: '春',
        },
      },
    });
  }
}
