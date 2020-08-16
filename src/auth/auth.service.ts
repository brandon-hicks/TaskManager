import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './auth-credentials.dto';
import { userInfo } from 'os';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) { }

    async signUp(authCradentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCradentialsDto);
    }

    async signIn(authCradentialsDto: AuthCredentialsDto) {
        const username = await this.userRepository.validateUserPassword(authCradentialsDto)
        if (!username) {
            throw new UnauthorizedException('Invalid credentials');
        }
    }
}
