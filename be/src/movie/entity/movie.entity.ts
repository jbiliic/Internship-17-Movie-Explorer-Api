// be/src/movie/entities/movie.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { Genre } from '../../genre/entity/genre.entity';

export class Movie {
    @ApiProperty({ example: 1 })
    id!: number;

    @ApiProperty({ example: 'Inception' })
    name!: string;

    @ApiProperty({ example: 'A thief who steals corporate secrets...' })
    description!: string;

    @ApiProperty({ example: 2010 })
    year!: number;

    @ApiProperty({ example: 8.8 })
    rating!: number;

    @ApiProperty({ example: '2h 28min' })
    length!: string;

    @ApiProperty({ example: 'https://image.url/poster.jpg' })
    imgURL!: string;

    @ApiProperty({ type: () => [Genre] })
    genres!: Genre[];
}