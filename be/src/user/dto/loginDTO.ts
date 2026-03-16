import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

export class LoginDTO {

    @ApiProperty({ example: 'user@example.com' })
    @IsNotEmpty()
    @IsEmail({}, { message: 'Must be a valid email address' })
    email!: string

    @ApiProperty({ example: 'password123' })
    @IsNotEmpty()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password!: string
}