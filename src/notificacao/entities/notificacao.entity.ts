import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Notificacao extends Model {
  @Column
  mensagem: string;

  @Column
  id_pessoa: number;
}
