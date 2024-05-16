import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [CollectionController],
  providers: [CollectionService],
  imports: [PrismaModule],
})
export class CollectionModule {}
