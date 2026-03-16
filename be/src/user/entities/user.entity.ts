import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsBoolean, IsNumber, IsString, MinLength } from 'class-validator';

export class User {
    @ApiProperty({ example: 1 })
    id!: number;

    @ApiProperty({ example: 'user@example.com' })
    @IsEmail({}, { message: 'Must be a valid email address' })
    @IsNotEmpty()
    email!: string;

    @ApiProperty({ example: 'password123' })
    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password!: string;

    @ApiProperty({ example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    name!: string;

    @ApiProperty({ example: false })
    @IsBoolean()
    isAdmin!: boolean;
}