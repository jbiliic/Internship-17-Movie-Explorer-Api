import { ApiProperty } from "@nestjs/swagger";

export class Genre {

    @ApiProperty({ example: 1 })
    id!: number;

    @ApiProperty({ example: 'Action' })
    name!: string;
}