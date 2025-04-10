import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/user.dto';

describe('UserController', () => {
  let controller: UserController;
  let userServiceMock: Partial<UserService>;

  beforeEach(async () => {
    userServiceMock = {
      register: jest.fn(),
      login: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userServiceMock,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should call UserService.createUser and return the created user', async () => {
      const dto: CreateUserDto = {
        username: 'Alice',
        email: 'a@a.fr',
        password: 'test',
      };
      userServiceMock.register = jest.fn().mockResolvedValue({ id: 1, ...dto });

      const result = await controller.register(dto);
      expect(userServiceMock.register).toHaveBeenCalledWith(dto);
      expect(result).toEqual({
        id: 1,
        username: 'Alice',
        email: 'a@a.fr',
        password: 'test',
      });
    });
  });
});
