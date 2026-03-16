import { OmitType } from '@nestjs/swagger';
import { Movie } from '../entity/movie.entity';

export class CreateMovieDto extends OmitType(Movie, ['id'] as const) { }