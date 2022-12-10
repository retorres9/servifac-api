import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import * as bcrypt from 'bcrypt';
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { ResetPassword } from './model/resetPassword.model';
import { UpdatePasswordDto } from './model/updatePassword.dto';

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
    const userFound = await this.findOne(user_ci);

    if (userFound) {
      throw new BadRequestException(`El usuario con cédula '${user_ci}' ya existe`);
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await this.genPassword(user_password);

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
    } catch (error) {
      throw new BadRequestException(error);
    }
    return user;
  }

  async resetPassword(user_values: ResetPassword): Promise<User> {
    const { user_email } = user_values;
    const query = this.createQueryBuilder('user');
    query.where('user.user_email = :user_email', { user_email });
    const user = await query.getOne();
    if (user) {
      const otp = this.generateOTP();
      const salt = await bcrypt.genSalt();
      const tempHash = await bcrypt.hash(otp, salt);
      const query2 = await this.createQueryBuilder('user')
        .update(user)
        .set({ user_tempPass: tempHash })
        .where('user.user_email = :user_email', { user_email })
        .execute();
    }
    return user;
  }

  async updatePassword(updatePassword: UpdatePasswordDto) {
    const { user_useremail, user_newPassword, user_tempPass } = updatePassword;
    const query = this.createQueryBuilder('user');
    query.where("user.user_email = :user_useremail", { user_useremail });
    const user: User = await query.getOne();
    if (user) {
      if (await bcrypt.compare(user_tempPass, user.user_tempPass)) {
        const hashedPassword = await this.genPassword(user_newPassword);
        const updateQuery = await this.createQueryBuilder('user')
          .update(user)
          .set({ user_password: hashedPassword })
          .execute();
        if (updateQuery) {
          await this.createQueryBuilder('user')
            .update(user)
            .set({ user_tempPass: '' })
            .execute();
        }
      } else {
        throw new BadRequestException({ message: `Temporary password doesn't match`, code: '001' })
      }
    } else {
      throw new NotFoundException({ message: 'User not found' });
    }
  }

  async onCashRegister() {
    const today = new Date("2022-04-16").toISOString().split('T')[0];
    const query = this.createQueryBuilder('user');
    query.leftJoinAndSelect('user.user_sale', 'userSale');
    query.select(['user.user_username']);
    query.addSelect('sum(userSale.sale_totalPayment)', 'total_amount');
    query.where('user.user_ci = userSale.user_ci');
    query.andWhere('user.user_ci = 1112849412');
    query.andWhere(`userSale.sale_date = "${today}"`);
    query.groupBy('userSale.sale_paymentType');
    const result = await query.getRawMany();
    return result;
  }

  private async genPassword(rawPassword: string) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(rawPassword, salt);
    return hashedPassword;
  }


  private generateOTP() {
    const values = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',]
    let otp = "";
    for (let index = 0; index < 6; index++) {
      otp += values[Math.floor(Math.random() * 26)];
    }
    console.log(otp);
    return otp;
  }
}
