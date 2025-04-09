import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { User } from './entity/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtAuthGuard, JwtStrategy],
  exports: [UserService, JwtAuthGuard],
})
export class UserModule {}
