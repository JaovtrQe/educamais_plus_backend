import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PrismaService } from 'src/prisma/prisma.service'
import { JwtStrategy } from './jwt.strategy'
import { RolesGuard } from './roles.guard'

@Module({
  imports: [
    JwtModule.register({
      secret: 'segredo_super_secreto', // depois vamos melhorar isso
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy, RolesGuard],
})
export class AuthModule {}