import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from './usuarios.controller';
import { UsuarioService } from './usuario.services';
import { Response } from 'express';

describe('Teste classe de equivalencia UsuarioController', () => {
  let controller: UsuariosController;
  let service: UsuarioService;
  let res: Response


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [
          {
            provide: UsuarioService,
            useValue: {
              login: jest.fn(),
              cadastrarUser: jest.fn(),
              userExists: jest.fn()
            },
          }
        ],
        controllers: [UsuariosController]
        
    }).compile();

    controller = module.get<UsuariosController>(UsuariosController)
    service = module.get<UsuarioService>(UsuarioService)
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as unknown as Response;

  });

  it('should be define', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  })

  describe("testando cadastro de um usuario", () => {
    it('deve retornar usuario cadastrado', async () => {

      const body = {
        nome: "pesoa1",
        email: "pessoa@gmail.com",
        senha: "123"
     }
    
        const result = await controller.CadastrarPessoa(body, res)
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ msg: 'usuario cadastrado' });

        // a funcao de cadastrar é chamada pelo mens uma vez
        expect(service.cadastrarUser).toHaveBeenCalledTimes(1)
    })

    it('erro ao mandar campo nome como null', async () => {

      const body = {
        nome: "",
        email: "pessoa@gmail.com",
        senha: "123"
     }
    
        const result = await controller.CadastrarPessoa(body, res)
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ msg: 'preencha todos os campos' });

        // a funcao de cadastrar nao deve ser chamada
        expect(service.cadastrarUser).toHaveBeenCalledTimes(0)
    })

    it('erro ao mandar campo email como null', async () => {

      const body = {
        nome: "wedwed",
        email: "",
        senha: "123"
     }
    
        const result = await controller.CadastrarPessoa(body, res)
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ msg: 'preencha todos os campos' });
        
         // a funcao de cadastrar nao deve ser chamada
         expect(service.cadastrarUser).toHaveBeenCalledTimes(0)
    })

    it('erro ao mandar campo senha como null', async () => {

      const body = {
        nome: "wedwed",
        email: "pessoa@gmail.com",
        senha: ""
     }
    
        const result = await controller.CadastrarPessoa(body, res)
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ msg: 'preencha todos os campos' });

         // a funcao de cadastrar nao deve ser chamada
         expect(service.cadastrarUser).toHaveBeenCalledTimes(0)
    })

    it('erro ao mandar corpo da requisicao vazio', async () => {
        try {
          const body = null
    
          const result = await controller.CadastrarPessoa(body, res)
        }
        catch (err) {
            expect(err.status).toBe(500);
            expect(err).toEqual(new Error('erro no servidor'))

             // a funcao de cadastrar nao deve ser chamada
             expect(service.cadastrarUser).toHaveBeenCalledTimes(0)
        }
    })
  })
});