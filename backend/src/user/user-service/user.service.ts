import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validation(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }

    return { userId: user.id, email: user.email };
  }

  async login(dto: LoginUserDto) {
    const user = await this.validation(dto.email, dto.password);
    const payload = { sub: user.userId, email: user.email };
    return {
      message: 'Connexion réussie',
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(dto: CreateUserDto) {
    const { email, password, username } = dto;

    const userExist = await this.usersRepository.findOne({ where: { email } });
    if (userExist) {
      throw new BadRequestException('Un compte avec cet email existe déjà.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      email,
      username,
      password: hashedPassword,
    });
    await this.usersRepository.save(user);

    const payload = { sub: user.id, email: user.email };
    return {
      message: 'Inscription réussie',
      access_token: this.jwtService.sign(payload),
    };
  }

  async findAll() {
    const users = await this.usersRepository.find();
    return users.map((user) => ({
      email: user.email,
      username: user.username,
    }));
  }
}
