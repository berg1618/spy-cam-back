import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Usuario extends Model {
  @Column
  nome: string;

  @Column
  email: string;

  @Column
  senha: string;
}
