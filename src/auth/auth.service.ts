import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './auth-credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ) { }

    async signUp(authCradentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCradentialsDto);
    }
}
