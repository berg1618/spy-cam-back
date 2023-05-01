import { Model } from 'sequelize';
import { Column, Table } from 'sequelize-typescript';

@Table
export class Notificacao extends Model {
  @Column({ primaryKey: true })
  id;

  @Column
  mensagem: string;

  @Column
  id_pessoa: number;
}
