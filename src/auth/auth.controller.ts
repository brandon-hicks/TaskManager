import { Controller, Post, Body } from '@nestjs/common';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authservice: AuthService,
    ) { }

    @Post('/signup')
    signUp(@Body() authcredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authservice.signUp(authcredentialsDto);
    }
}
