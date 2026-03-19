import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl } from 'class-validator';

export class CreateMovieDto {
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

    @ApiProperty()
    @IsArray()
    @IsNumber({}, { each: true })
    genres!: number[];

}