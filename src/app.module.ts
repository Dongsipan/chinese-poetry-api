import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PoetryModule } from './poetry/poetry.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthorModule } from './author/author.module';
import { RhythmicModule } from './rhythmic/rhythmic.module';
import { CollectionModule } from './collection/collection.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    PoetryModule,
    PrismaModule,
    AuthorModule,
    RhythmicModule,
    CollectionModule,
  ],
})
export class AppModule {}
