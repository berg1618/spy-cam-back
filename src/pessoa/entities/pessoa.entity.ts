import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Notificacao } from '../../notificacao/entities/notificacao.entity';

@Table({ tableName: 'pessoa' })
export class Pessoa extends Model {
  @Column
  nome_pessoa: string;

  @Column({ type: DataType.TEXT })
  fotos: string;

  @HasMany(() => Notificacao)
  noticacoes: Notificacao[];
}
