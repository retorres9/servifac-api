import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRespository } from './user.repository';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from './login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.payload';
import { ResetPassword } from './model/resetPassword.model';
import { UpdatePasswordDto } from './model/updatePassword.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRespository)
    private userRepository: UserRespository,
    private jwtService: JwtService,
  ) { }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUserDto);
  }

  async login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { user_username, user_password } = loginUserDto;
    let user = new User();
    user = await this.userRepository.findOne({ user_username });
    if (!user || user.user_tempPass) {
      throw new UnauthorizedException('Check login credentials');
    }

    const user_userRole = user.user_role;
    if (await bcrypt.compare(user_password, user.user_password)) {
      const payload: JwtPayload = { user_username, user_userRole };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Check login credentials');
    }
  }

  async resetPassword(user_values: ResetPassword) {
    return this.userRepository.resetPassword(user_values);
  }

  async updatePassword(updatePassword: UpdatePasswordDto) {
    return this.userRepository.updatePassword(updatePassword);
  }

  async onCashRegister() {
    return this.userRepository.onCashRegister();
  }
}
