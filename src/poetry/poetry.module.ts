import { Module } from '@nestjs/common';
import { PoetryService } from './poetry.service';
import { PoetryController } from './poetry.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [PoetryController],
  providers: [PoetryService],
  imports: [PrismaModule],
})
export class PoetryModule {}
