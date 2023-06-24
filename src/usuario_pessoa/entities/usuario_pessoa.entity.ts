import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Pessoa } from '../../pessoa/entities/pessoa.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Table({ tableName: 'usuario_pessoa' })
export class Usuario_Pessoa extends Model {
  @ForeignKey(() => Usuario)
  @Column
  usuario_id: number;

  @BelongsTo(() => Usuario)
  usuario: Usuario;

  @ForeignKey(() => Pessoa)
  @Column
  pessoa_id: number;

  @BelongsTo(() => Pessoa)
  pessoa: Pessoa;
}
