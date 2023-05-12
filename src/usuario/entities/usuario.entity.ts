import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'usuario' })
export class Usuario extends Model {
  @Column
  nome: string;

  @Column
  email: string;

  @Column
  senha: string;
}
