import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgentesModule } from './agentes/agentes.module';

@Module({
  imports: [AgentesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
