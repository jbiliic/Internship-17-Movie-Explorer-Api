import { IsOptional, IsString } from 'class-validator';

export class MovieQueryFilterDTO {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsString()
    genre?: string;

    @IsOptional()
    @IsString()
    sortBy?: string;
}