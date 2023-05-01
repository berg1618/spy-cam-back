import { Model } from 'sequelize';
import { Column, Table } from 'sequelize-typescript';

@Table
export class Usuario extends Model {
  @Column({ primaryKey: true })
  id;

  @Column
  nome: string;

  @Column
  email: string;

  @Column
  senha: string;
}
