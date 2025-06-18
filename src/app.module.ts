import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgentesModule } from './agentes/agentes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViasModule } from './vias/vias.module';
import { HistoricoAsignacionModule } from './historico-asignacion/historico-asignacion.module';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    AgentesModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'tiven123',
      database: 'transito_app',
      //entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),

    ViasModule,

    HistoricoAsignacionModule,

    AuthModule,

    UsuariosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
