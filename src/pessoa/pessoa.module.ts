import { Module } from '@nestjs/common';
import { Pessoa } from './entities/pessoa.entity';
import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { PessoaService } from './pessoa.service';
import { PessoaController } from './pessoa.controller';

@Module({
  imports: [SequelizeModule.forFeature([Pessoa])],
  providers: [
    PessoaService,
    {
      provide: getModelToken(Pessoa),
      useValue: Pessoa,
    },
  ],
  controllers: [PessoaController],
})
export class PessoaModule {}
