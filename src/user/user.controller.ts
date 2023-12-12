import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {};
    
    @UseGuards(JwtGuard)
    @Get('getallusers')
    async getUsers() {
        return await this.userService.getAllUsers();
    };

    // @Get('status')
    // user(@Req() request: Request) {
    //     if (request.user) {
    //         return { msg: 'Authenticated' };
    //     } else {
    //         return { msg: 'Not Authenticated' };
    //     }
    // }
}
