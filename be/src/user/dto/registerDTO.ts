import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator/types/decorator/common/IsNotEmpty";
import { IsEmail } from "class-validator/types/decorator/string/IsEmail";
import { MinLength } from "class-validator/types/decorator/string/MinLength";
import { IsString } from "class-validator/types/decorator/typechecker/IsString";

export class RegisterDTO {

    @ApiProperty({ example: 'user@example.com' })
    @IsNotEmpty()
    @IsEmail({}, { message: 'Must be a valid email address' })
    email!: string;

    @ApiProperty({ example: 'password123' })
    @IsNotEmpty()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password!: string;

    @ApiProperty({ example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    name!: string;
}