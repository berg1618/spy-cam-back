import { Module } from '@nestjs/common';
import { Pessoa } from './entities/pessoa.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { PessoaService } from './pessoa.service';
import { PessoaController } from './pessoa.controller';

@Module({
  imports: [SequelizeModule.forFeature([Pessoa])],
  providers: [PessoaService],
  controllers: [PessoaController],
})
export class PessoaModule {}
