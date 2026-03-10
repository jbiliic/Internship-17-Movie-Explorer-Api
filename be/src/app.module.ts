import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MovieModule } from './movie/movie.module';
import { GenreModule } from './genre/genre.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [PrismaModule, MovieModule, GenreModule, FavoriteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
