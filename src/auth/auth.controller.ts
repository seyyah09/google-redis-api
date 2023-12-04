import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './utils/Guards';
import { Request } from 'express';
import { CreateUserDto } from 'src/dto/createUser-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
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
    
    
}
