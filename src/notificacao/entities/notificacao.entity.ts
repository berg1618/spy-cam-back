import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Pessoa } from '../../pessoa/entities/pessoa.entity';

@Table({ tableName: 'notificacao' })
export class Notificacao extends Model {
  @Column
  mensagem: string;

  @ForeignKey(() => Pessoa)
  @Column
  pessoa_id: number;

  @BelongsTo(() => Pessoa)
  pessoa: Pessoa;
}
