import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./auth-credentials.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
     async signUp(authCradentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCradentialsDto;

        const user = new User();
        user.userName = username;
        user.password = password;

        await user.save();
     }
}