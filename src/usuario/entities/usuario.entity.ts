import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Pessoa } from 'src/pessoa/entities/pessoa.entity';

@Table
export class Usuario extends Model {
  @Column
  nome: string;

  @Column
  email: string;

  @Column
  senha: string;

  @HasMany(() => Pessoa)
  pessoas: Pessoa[];
}
