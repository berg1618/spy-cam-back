import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { Test, TestingModule } from '@nestjs/testing';

describe('Teste AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  let signInDto = {
    email: "claudio@gmail.com",
    senha: "123"
  }

  let response = {
    msg: "usuario logado",
    id: 1,
    access_token: "fwek09fwefwefkwepofkwepofkwe0fwfwej890fwepifjwei9fjweow"
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn().mockResolvedValue(response),
          },
        },
      ],
      controllers: [AuthController],
    }).compile();


    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);

  });

  it('should be define', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('testando o login', () => {
    it('login com usuario e senha corretos', async () => {
      const result = await controller.signIn(signInDto);

      expect(result).toEqual(response);
    });

  });
});
