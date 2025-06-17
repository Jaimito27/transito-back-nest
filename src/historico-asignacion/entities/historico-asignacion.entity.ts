import { Agente } from "src/agentes/entities/agente.entity";
import { Via } from "src/vias/entities/via.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('historico_asignacion')
export class HistoricoAsignacion {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'fecha_asignacion', nullable: false, type: 'timestamp' })
    fechaAsignacion: Date;

    @Column({ name: 'usuario_asignador' })
    usuarioAsignador: string;

    @DeleteDateColumn()
    deletedAt: Date | null;

    @ManyToOne(() => Agente, (agente) => agente.historialAsignaciones, {
        onDelete: 'CASCADE', //elimina el historico si el agente es elimnado
        eager: false, //no se usa cratga perezosa en los muchos
        nullable: false //porque un historico debe estar asociado siempre a un agente
    })
    @JoinColumn({ name: 'id_agente' })
    agenteTransito: Agente;

    //relacion con via
    @ManyToOne(() => Via, (via) => via.historialAsignaciones, {
        onDelete: 'CASCADE',
        eager: false,
        nullable: false
    })
    @JoinColumn({ name: 'id_via_actual' })
    viaAsignada: Via;
}
