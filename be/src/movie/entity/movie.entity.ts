import { ApiProperty } from '@nestjs/swagger';
import { Genre } from '../../genre/entity/genre.entity';
import { IsNotEmpty, IsNumber, IsPositive, IsUrl, IsString } from 'class-validator';

export class Movie {
    @ApiProperty({ example: 1 })
    id!: number;

    @ApiProperty({ example: 'Inception' })
    @IsString()
    @IsNotEmpty()
    name!: string;

    @ApiProperty({ example: 'A thief who steals corporate secrets...' })
    @IsString()
    @IsNotEmpty()
    description!: string;

    @ApiProperty({ example: 2010 })
    @IsNumber()
    @IsNotEmpty()
    year!: number;

    @ApiProperty({ example: 8.8 })
    @IsNotEmpty()
    @IsNumber({}, { message: 'Rating must be a number' })
    @IsPositive({ message: 'Rating must be a positive number' })
    rating!: number;

    @ApiProperty({ example: '2h 28min' })
    @IsString()
    @IsNotEmpty()
    length!: string;

    @ApiProperty({ example: 'https://image.url/poster.jpg' })
    @IsNotEmpty()
    @IsUrl({}, { message: 'Must be a valid URL' })
    imgURL!: string;

    @ApiProperty({ type: () => [Genre] })
    genres!: Genre[];
}