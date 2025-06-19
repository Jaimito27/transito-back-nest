import { Usuario } from "../entities/usuario.entity";

export interface PaginatedUsuarios{
    data: Usuario[];
    total: number;
    page: number;
    lastPage: number;
}