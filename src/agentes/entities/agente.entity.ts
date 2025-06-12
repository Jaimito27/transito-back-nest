import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('agente_transito')
export class Agente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nombre_completo', nullable: false })
  nombreCompleto: string;

  @Column({ name: 'codigo', unique: true, nullable: false })
  codigo: string;

  @Column({
    name: 'anos_experiencia',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  anosExperiencias: string;

  @Column({ name: 'codigo_secretaria_transito', nullable: false })
  codigoSecretariaTransito: string;
}
