import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from '../dto/user.dto';
import { UserService } from '../user-service/user.service';
import { AuthGuard } from '../strategy/jwt-auth.guard';

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

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lister tous les utilisateurs (protégé)' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
