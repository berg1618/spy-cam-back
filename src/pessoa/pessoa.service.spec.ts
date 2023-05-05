import { Test, TestingModule } from '@nestjs/testing';
import { PessoaService } from './pessoa.service';
import { getModelToken } from '@nestjs/sequelize';
import { Pessoa } from './entities/pessoa.entity';

const pessoa = {
  nome_pessoa: 'claudo',
  fotos: 'in da car',
};

describe('PessoaService', () => {
  let service: PessoaService;
  let model: typeof Pessoa;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PessoaService,
        {
          provide: getModelToken(Pessoa),
          useValue: {
            create: jest.fn(() => pessoa),
          },
        },
      ],
    }).compile();

    service = module.get<PessoaService>(PessoaService);
    model = module.get<typeof Pessoa>(getModelToken(Pessoa));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('cadastrarPessoa()', () => {
    it('deve cadastrar uma pessoa', () => {
      expect(service.cadastrarPessoa(pessoa)).toEqual({
        dados: { fotos: 'in da car', nome_pessoa: 'claudo' },
        messagem: 'pessoa cadastrada com sucesso',
      });
    });
  });
});
