import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccount } from './entities/auth.entity';
import { EmailModule } from 'src/email/email.module';
import { JwtModule } from "@nestjs/jwt"
import { AccessTokenStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_ACCESS_SECRET,
            signOptions: { expiresIn: '15m' }
        }),
        TypeOrmModule.forFeature([UserAccount]), EmailModule],
    controllers: [AuthController],
    providers: [AuthService, AccessTokenStrategy],
})
export class AuthModule { }
