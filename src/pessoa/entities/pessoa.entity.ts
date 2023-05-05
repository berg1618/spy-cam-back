import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Notificacao } from 'src/notificacao/entities/notificacao.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Table({ tableName: 'pessoa' })
export class Pessoa extends Model {
  @Column
  nome_pessoa: string;

  @Column
  fotos: string;

  @ForeignKey(() => Usuario)
  @Column
  id_usuario: number;

  @BelongsTo(() => Usuario)
  usuario: Usuario;

  @HasMany(() => Notificacao)
  noticacoes: Notificacao[];
}
