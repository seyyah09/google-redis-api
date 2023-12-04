import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dto/createUser-dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {};

    @Get()
    getHello() {
        return "hello"
    }

    @Post('newuser')
    async createUser(@Body() dto: CreateUserDto) {
        console.log(dto);
        return  {
            user: await this.userService.create(dto)
        }
    }

    // @Get('status')
    // user(@Req() request: Request) {
    //     if (request.user) {
    //         return { msg: 'Authenticated' };
    //     } else {
    //         return { msg: 'Not Authenticated' };
    //     }
    // }
}
