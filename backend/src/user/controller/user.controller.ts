import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@ApiTags('Auth')
@Controller('auth')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/login')
  @ApiOperation({ summary: "Connexion d'un utilisateur" })
  @ApiBody({ type: LoginUserDto })
  login(@Body() dto: LoginUserDto) {
    return this.userService.login(dto);
  }

  @Post('/register')
  @ApiOperation({ summary: "Inscription d'un nouvel utilisateur" })
  @ApiBody({ type: CreateUserDto })
  register(@Body() dto: CreateUserDto) {
    return this.userService.register(dto);
  }
}
