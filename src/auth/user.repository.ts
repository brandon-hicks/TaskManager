import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
   async signUp(authCradentialsDto: AuthCredentialsDto): Promise<void> {
      const { username, password } = authCradentialsDto;

      const user = new User();
      user.userName = username;
      user.password = password;

      try {
         await user.save();
      } catch (error) {
         if (error.code === '23505') { // 23505 is the code for duplicate username and it comes in as a string
            throw new ConflictException('Username already exists');
         } else {
            throw new InternalServerErrorException();
         }
      }
   }
}
