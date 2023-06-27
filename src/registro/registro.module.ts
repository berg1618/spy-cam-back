import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RegistroService } from './registro.service';
import { RegistroController } from './registro.controller';
import { Registro } from './entities/registro.entity';

@Module({
  imports: [SequelizeModule.forFeature([Registro])],
  providers: [RegistroService],
  controllers: [RegistroController],
})
export class RegistroModule {}
