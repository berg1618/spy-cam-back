import { Module } from '@nestjs/common';
import { Pessoa } from './entities/pessoa.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Pessoa])],
})
export class PessoaModule {}
