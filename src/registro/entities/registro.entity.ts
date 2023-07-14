import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Pessoa } from '../../pessoa/entities/pessoa.entity';

@Table({ tableName: 'registro' })
export class Registro extends Model {
  @Column
  mensagem: string;

  @Column
  enviado: boolean;

  @ForeignKey(() => Pessoa)
  @Column
  pessoa_id: number;

  @BelongsTo(() => Pessoa)
  pessoa: Pessoa;
}
