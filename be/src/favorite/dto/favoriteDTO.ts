import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, isNumber } from "class-validator";

export class FavoriteDTO {
    @ApiProperty()
    id!: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber({}, { message: 'movieId must be a number' })
    movieId!: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber({}, { message: 'userId must be a number' })
    userId!: number;
}
