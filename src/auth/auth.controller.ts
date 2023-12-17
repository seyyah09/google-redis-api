import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './strategies/Guards';
import { CreateUserDto } from 'src/dto/createUser-dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from './strategies/local-strategy';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ){}

    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    handleLogin() {
        return {
            msg: "Google Authentication"
        }
    };

    @Get('google/redirect')
    @UseGuards(GoogleAuthGuard)
    handleRedirect() {
        return { msg: 'OK' }
    }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req) {
        console.log('login info:');
        console.log(req.user);
        return await this.authService.login(req.user);
    }
    
    @Post('create')
    async createUser(@Body() dto: CreateUserDto) {
        console.log(dto);
        return  {
            user: await this.userService.create(dto)
        }
    }

    
}
