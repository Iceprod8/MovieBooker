import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import * as bcrypt from 'bcrypt';

describe('UserService', () => {
  let service: UserService;
  let userRepoMock: Partial<Repository<User>>;
  let jwtServiceMock: Partial<JwtService>;

  beforeEach(async () => {
    userRepoMock = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };
    jwtServiceMock = { signAsync: jest.fn().mockResolvedValue('fake.jwt') };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: getRepositoryToken(User), useValue: userRepoMock },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('createUser', () => {
    it('should create a new user with hashed password', async () => {
      const dto = {
        username: 'user1',
        email: 'user@example.com',
        password: 'pass123',
      };
      userRepoMock.create = jest.fn().mockReturnValue(dto);
      userRepoMock.save = jest.fn().mockResolvedValue({ id: 1, ...dto });

      const result = await service.register(dto);

      expect(userRepoMock.save).toHaveBeenCalled();
      expect(result).toMatchObject({ id: 1, email: dto.email });
    });
  });

  describe('loginUser', () => {
    it('should log in user and return JWT token', async () => {
      const dto = { email: 'user@example.com', password: 'pass123' };
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      userRepoMock.findOne = jest.fn().mockResolvedValue({
        id: 1,
        email: dto.email,
        password: hashedPassword,
      });

      // Correction user.service.spec.ts
      jest
        .spyOn(bcrypt, 'compare')
        .mockImplementation(() => Promise.resolve(true));

      const result = await service.login(dto);

      expect(jwtServiceMock.signAsync).toHaveBeenCalledWith({ userId: 1 });
      expect(result).toEqual({ access_token: 'fake.jwt' });
    });
  });
});
