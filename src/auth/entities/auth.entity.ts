import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuario')
export class Auth {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column({default: 'user'})
    rol: string;

    @Column({default: true})
    estado: boolean;

    @CreateDateColumn()
    fechaCreacion: Date;
}
