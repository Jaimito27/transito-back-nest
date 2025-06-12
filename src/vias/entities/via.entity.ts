import { Agente } from 'src/agentes/entities/agente.entity';
import { HistoricoAsignacion } from 'src/historico-asignacion/entities/historico-asignacion.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('via')
export class Via {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tipo', nullable: false })
  tipo: string;

  @Column({ name: 'es_calle_o_carrera', nullable: false })
  esCalleOCarrera: string;

  @Column({ name: 'numero', nullable: false })
  numero: number;

  @Column({
    name: 'nivel_congestion',
    nullable: false,
    precision: 5,
    scale: 2,
    type: 'decimal',
  })
  nivelCongestion: string;

  //Relacion one to many
  @OneToMany(()=> Agente, (agente) => agente.viaActual, {
    cascade: ['insert', 'update', 'remove'], //propaga operaciones como insertar, eliminar, actualizar
    eager: false//carga perezosa
  })
  agentesTransito: Agente[]

  //realacion one yo many con historico
  @OneToMany(() => HistoricoAsignacion, (historico) => historico.viaAsignada, {
    cascade: ['insert', 'update', 'remove'],
    eager: false
  })
  historialAsignaciones: HistoricoAsignacion[];
}
