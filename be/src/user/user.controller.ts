import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDTO } from './dto/loginDTO';
import { ApiOkResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { User } from './entities/user.entity';
import { RegisterDTO } from './dto/registerDTO';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/login')
  @ApiOperation({ summary: 'Login to the application' })
  @ApiOkResponse({
    description: 'The user has been successfully logged in.',
    type: User,
  })
  login(@Body() userData: LoginDTO) {
    return this.userService.login(userData);
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiOkResponse({
    description: 'The user has been successfully registered.',
    type: User,
  })
  register(@Body() userData: RegisterDTO) {
    return this.userService.register(userData);
  }

}
