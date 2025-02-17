import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { UsuarioService } from './usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule.forRoot(), UsuarioModule, AuthModule],
  controllers: [AuthController],
  providers: [AuthService, UsuarioService, PrismaService, JwtService],
})
export class AppModule {}
