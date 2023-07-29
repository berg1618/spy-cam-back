import { Test, TestingModule } from '@nestjs/testing';
import { PessoaController } from './pessoa.controller';
import { PessoaService } from './pessoa.service';
import { Pessoa } from './entities/pessoa.entity';
import { Registro } from 'src/registro/entities/registro.entity';

describe('Teste PessoaController', () => {
  let controller: PessoaController;
  let service: PessoaService;


  // let pessoa: Pessoa = {
  //   nome_pessoa: 'claudio',
  //   fotos: '/home/day/Downloads/ea144c3a9eae5a28f12872ee0ab3b74d.jpg',
  //   registro: [] 
  // }

  let usuario = {
    sub: 1
  }

  let status = 201
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PessoaService,
          useValue: {
            cadastrarPessoa: jest.fn().mockResolvedValue(status),
            listarPessoas: jest.fn()
          },
        },
      ],
      controllers: [PessoaController],
    }).compile();

    controller = module.get<PessoaController>(PessoaController);
    service = module.get<PessoaService>(PessoaService);
  });

  it('should be define', () => {
    expect(controller).toBeDefined();
    // expect(service).toBeDefined();
  });

  const foto = '/home/day/Downloads/ea144c3a9eae5a28f12872ee0ab3b74d.jpg'

  describe('testando o cadastro de uma pessoa', () => {
    // it('cadastrado com sucesso', async () => {
    //     const a = await controller.cadastrarPessoa(pessoa, foto, 1)

    // });


  });
});
