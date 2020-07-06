import { Controller, Post, Body } from '@nestjs/common';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authservice: AuthService,
    ) {}

    @Post('/auth')
    signUp(@Body() authcredentialsDto: AuthCredentialsDto) {
        return this.authservice.signUp(authcredentialsDto);
    }
}
