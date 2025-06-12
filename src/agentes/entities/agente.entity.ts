import { HistoricoAsignacion } from 'src/historico-asignacion/entities/historico-asignacion.entity';
import { Via } from 'src/vias/entities/via.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  //Relacion muchos a uno con Via
  @ManyToOne(() => Via, (via) => via.agentesTransito,{
    onDelete: 'CASCADE',
    eager: false,
    nullable: true
  })
  @JoinColumn({name: 'id_via_actual'})
  viaActual: Via;


  //Relacion one a muchos con historicos(bidireccional)
  @OneToMany(() => HistoricoAsignacion, (historico) => historico.agenteTransito, {
    cascade: ['insert', 'update', 'remove'],
   
    eager: false
  })

  historialAsignaciones: HistoricoAsignacion[];
}
