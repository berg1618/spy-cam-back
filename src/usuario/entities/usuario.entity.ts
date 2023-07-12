import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'usuario' })
export class Usuario extends Model {
  @Column({ allowNull: false })
  nome: string;

  @Column({ allowNull: false, unique: true })
  email: string;

  @Column({ allowNull: false })
  senha: string;
}
