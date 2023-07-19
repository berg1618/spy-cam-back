import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Registro } from '../../registro/entities/registro.entity';

@Table({ tableName: 'pessoa' })
export class Pessoa extends Model {
  @Column
  nome_pessoa: string;

  @Column({ type: DataType.TEXT })
  fotos: string;

  @HasMany(() => Registro)
  registro: Registro[];
}
