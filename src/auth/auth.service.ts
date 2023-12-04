import * as bcrypt from 'bcrypt';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/createUser-dto';
import { GoogleUser, User } from 'src/typeorm/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UserDetails } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(GoogleUser) private readonly googleUserRepository: Repository<GoogleUser>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
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
        
        if(user && (await bcrypt.compare(password, user.password) )) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }
}