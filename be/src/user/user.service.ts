import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { type LoginDTO } from './dto/loginDTO';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import type { RegisterDTO } from './dto/registerDTO';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) { }

    async login(@Body() body: LoginDTO) {
        const { email, password } = body;

        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!existingUser) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordMatching = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordMatching) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: existingUser.id,
            email: existingUser.email,
            isAdmin: existingUser.isAdmin
        };

        const token = this.jwtService.sign(payload);

        return {
            access_token: token
        };
    }

    async register(@Body() body: RegisterDTO) {
        const { email, password, name } = body;

        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new UnauthorizedException('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                isAdmin: false
            },
        });

        const payload = {
            sub: newUser.id,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        };

        const token = this.jwtService.sign(payload);

        return {
            access_token: token
        };
    }
}
