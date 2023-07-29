import { Test, TestingModule } from '@nestjs/testing';
import { PessoaService } from './pessoa.service';
import { getModelToken } from '@nestjs/sequelize';
import { Pessoa } from './entities/pessoa.entity';
import { Usuario_Pessoa } from '../usuario_pessoa/entities/usuario_pessoa.entity';
import { UnauthorizedException } from '@nestjs/common';

const pessoa = {
  nome_pessoa: 'claudo',
  fotos: '/home/aluno/Downloads/wp9382766.jpg',
};

describe('PessoaService', () => {
  let service: PessoaService;
  let pessoa: typeof Pessoa;
  let usuario_pessoa: typeof Usuario_Pessoa;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PessoaService,
        {
          provide: getModelToken(Pessoa),
          useValue: {
            create: jest.fn(() => pessoa),
            findAll: jest.fn(() => pessoa),
            findOne: jest.fn(() => pessoa),
            destroy: jest.fn(() => pessoa),
          },
        },
        {
          provide: getModelToken(Usuario_Pessoa),
          useValue: {
            create: jest.fn(() => usuario_pessoa),
            update: jest.fn(() => usuario_pessoa),
          },
        },
      ],
    }).compile();

    service = module.get<PessoaService>(PessoaService);
    pessoa = module.get<typeof Pessoa>(getModelToken(Pessoa));
    usuario_pessoa = module.get<typeof Usuario_Pessoa>(
      getModelToken(Usuario_Pessoa),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve cadastrar uma pessoa', async () => {
    const fotos = './arquivos/pessoas/foto.jpg';

    expect(await service.cadastrarPessoa(pessoa, fotos, 1)).toMatchObject({
      msg: 'pessoa cadastrada com sucesso',
    });
  });

  it('deve listar todas as pessoas', async () => {
    expect(await service.listarPessoas()).toBeTruthy();
  });

  it('deve remover uma pessoa', async () => {
    const id = 1;
    const dados = {
      dados: 'removido com sucesso',
    };
    expect(await service.removerPessoa(id)).toStrictEqual(dados);
  });
});
