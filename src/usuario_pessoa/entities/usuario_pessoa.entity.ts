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
  id_usuario: number;

  @BelongsTo(() => Usuario)
  usuario: Usuario;

  @ForeignKey(() => Pessoa)
  @Column
  id_pessoa: number;

  @BelongsTo(() => Pessoa)
  pessoa: Pessoa;
}
