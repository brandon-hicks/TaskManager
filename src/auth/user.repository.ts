import { Repository, EntityRepository } from "typeorm";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./auth-credentials.dto";


@EntityRepository(User)
export class UserRepository extends Repository<User> {
   async signUp(authCradentialsDto: AuthCredentialsDto): Promise<void> {
      const { username, password } = authCradentialsDto;

      const user = new User();
      user.username = username;
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPassword(password, user.salt);

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

   async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
      const { username, password } = authCredentialsDto;
      const user = await this.findOne({ username })

      if (user && await user.validatePassword(password)) {
         return user.username;
      } else {
         return null;
      }
   }

   private async hashPassword(password: string, salt: string): Promise<string> {
      return bcrypt.hash(password, salt);
   }
}
