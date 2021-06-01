import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRespository } from './user.repository';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from './login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.payload';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRespository)
    private userRepository: UserRespository,
    private jwtService: JwtService
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUserDto);
  }

  async login(loginUserDto: LoginUserDto): Promise<{accessToken: string}> {
    const { user_username, user_password } = loginUserDto;
    const user = await this.userRepository.findOne({ user_username });
    console.log(user);
    
    const user_userRole = user.user_role;
    if (
      user &&
      (await bcrypt.compare(user_password, user.user_password))
    ) {
        const payload: JwtPayload = {user_username, user_userRole}
        const accessToken: string = await this.jwtService.sign(payload)
        console.log(accessToken);
        
      return {accessToken};
    } else {
      throw new UnauthorizedException('Check login credentials');
    }
  }
}
