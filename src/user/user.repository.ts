import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRespository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const {
      user_ci,
      user_firstName,
      user_lastName,
      user_username,
      user_password,
      user_role,
    } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user_password, salt);

    const user = this.create({
      user_ci,
      user_firstName,
      user_lastName,
      user_username,
      user_password: hashedPassword,
      user_role,
    });

    try {
      await this.save(user);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
