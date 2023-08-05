import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    // Post --> Register 
    @Post('register')
    signUp(@Body() dto: AuthDto){
        return this.authService.signUp(dto)
    }
    
    // Post --> Login
    @Post('login')
    signIn(@Body() dto: AuthDto){
        return this.authService.signIn(dto)
    }

    // Get --> all courses
    // Get Course by Id 
    // Delete Course By Id
    // Edit Course By Id
}
