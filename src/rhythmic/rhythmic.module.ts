import { Module } from '@nestjs/common';
import { RhythmicService } from './rhythmic.service';
import { RhythmicController } from './rhythmic.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [RhythmicController],
  providers: [RhythmicService],
  imports: [PrismaModule],
})
export class RhythmicModule {}
