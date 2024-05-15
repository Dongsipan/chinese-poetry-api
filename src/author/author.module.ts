import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [AuthorController],
  providers: [AuthorService],
  imports: [PrismaModule],
})
export class AuthorModule {}
