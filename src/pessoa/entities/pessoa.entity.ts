import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Pessoa extends Model {
  @Column
  nome_pessoa: string;

  @Column
  id_ususario: number;

  @Column
  fotos: string;
}
