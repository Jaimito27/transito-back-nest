import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae el token del header Authorization: Bearer <token>
            ignoreExpiration: false, // No ignorar expiración: si el token está expirado, rechaza
            secretOrKey: 'SECRET_KEY' // Llave secreta para validar la firma
        })
    }
 // El payload es la data decodificada del token.
 // Aquí puedes retornar info extraída para inyectar en el request (ejemplo: userId, username, rol)
    async validate(payload: any) {
        return {
            username: payload.username,
            rol: payload.rol
        }
    }
}
//Define cómo se valida el JWT en las rutas protegidas.




