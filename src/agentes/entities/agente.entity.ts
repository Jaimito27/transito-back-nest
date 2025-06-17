import { HistoricoAsignacion } from 'src/historico-asignacion/entities/historico-asignacion.entity';
import { Via } from 'src/vias/entities/via.entity';
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('agente_transito')
export class Agente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nombre_completo', nullable: false })
  nombreCompleto: string;

  @Column({ name: 'codigo', unique: true, nullable: false })
  codigo: string;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @Column({
    name: 'anos_experiencia',
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  anosExperiencia: string;

  @Column({ name: 'codigo_secretaria_transito', nullable: false })
  codigoSecretariaTransito: string;

  //Relacion muchos a uno con Via
  @ManyToOne(() => Via, (via) => via.agentesTransito, {
    onDelete: 'CASCADE',
    eager: false,
    nullable: true
  })
  @JoinColumn({ name: 'id_via_actual' })
  viaActual: Via | null;


  //Relacion one a muchos con historicos(bidireccional)
  @OneToMany(() => HistoricoAsignacion, (historico) => historico.agenteTransito, {
    cascade: ['insert', 'update', 'remove'],

    eager: false
  })

  historialAsignaciones: HistoricoAsignacion[];
}
