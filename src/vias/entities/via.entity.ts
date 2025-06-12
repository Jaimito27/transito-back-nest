import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('via')
export class Via {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name: 'tipo', nullable: false})
    tipo: string;

    @Column({name: 'es_calle_o_carrera', nullable: false})
    esCalleOCarrera: string;

    @Column({name: 'numero', nullable: false})
    numero: number;

    @Column({name: 'nivel_congestion', nullable: false, precision: 5, scale: 2, type: 'decimal'})
    nivelCongestion: string;

    
}
