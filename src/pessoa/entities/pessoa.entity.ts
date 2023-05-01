import { Model } from 'sequelize';
import { Column, Table } from 'sequelize-typescript';

@Table
export class Pessoa extends Model {
  @Column({ primaryKey: true })
  id;

  @Column
  nome_pessoa: string;

  @Column
  id_ususario: number;

  @Column
  fotos: string;
}
