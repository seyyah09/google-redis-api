import * as bcrypt from 'bcrypt';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/createUser-dto';
import { GoogleUser, User } from 'src/typeorm/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UserDetails } from 'src/utils/types';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(GoogleUser) private readonly googleUserRepository: Repository<GoogleUser>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private jwtService: JwtService,
        private readonly userService: UserService
    ) {}
    async validateGoogleUser(details: UserDetails) {
        console.log(details);
        const user = await this.googleUserRepository.findOneBy({
            email: details.email
        });
        console.log(user);
        
        if (user) return user;
        
        const newUser = await this.googleUserRepository.create(details);
        return await this.googleUserRepository.save(newUser);
    }

    async validateUser(username: string, password: string) {
        const user = await this.userService.findByUsername(username);
        const passwordCheck = await bcrypt.compare(password, user.password);
        if(user && passwordCheck) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(userinfo: User) {
        const payload = {
          username: userinfo.username,
          sub: {
            userId: userinfo.id
          }
        };
    
        return await {
          ...userinfo,
          accessToken: this.jwtService.sign(payload),
          payload
          //refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
        };
      }
}