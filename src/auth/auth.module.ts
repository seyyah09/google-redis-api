import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/GoogleStrategy';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleUser, User } from 'src/typeorm/entities/user.entity';
import { SessionSerializer } from './strategies/Serializer';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-strategy';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, GoogleUser]),
    JwtModule.register({
      secret: `${process.env.jwt_secret}`,
      signOptions: { expiresIn: '900s'}
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    SessionSerializer,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService
    }
  ],
})
export class AuthModule {}
