import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Pessoa } from 'src/pessoa/entities/pessoa.entity';

@Table({ tableName: 'notificacao' })
export class Notificacao extends Model {
  @Column
  mensagem: string;

  @ForeignKey(() => Pessoa)
  @Column
  id_pessoa: number;

  @BelongsTo(() => Pessoa)
  pessoa: Pessoa;
}
