import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/createUser-dto';
import { User } from 'src/typeorm/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,)
    {}
    
    async create(createUserDto: CreateUserDto) {
        const userCheck = await this.findByUsername(createUserDto.username);
        console.log(userCheck);
        if(userCheck) {
            return {
                message: "this user already exists"
            }
        }

        const user = await this.userRepository.create(createUserDto);
        
        await this.userRepository.save(user);
        delete user.password;
        
        return {
            message: "the user created as follows:",
            user
        }
    }

    async findUserById(id: number) {
        const user = await this.userRepository.findOneBy({ id });
        return user;
    }

    async findByUsername(username: string) {
        const user = await this.userRepository.findOne({ where: {username: username} });
        return user;
    }

    async getAllUsers(){
        console.log('service e kadar geldik');
        return await this.userRepository.find({
            select: {
                id: true,
                username: true,
            }
        })
    }
}
