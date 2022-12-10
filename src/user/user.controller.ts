import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { LoginUserDto } from './login-user.dto';
import { ResetPassword } from './model/resetPassword.model';
import { UpdatePasswordDto } from './model/updatePassword.dto'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    return this.userService.login(loginUserDto);
  }

  @Post('/reset')
  resetPassword(@Body() user_values: ResetPassword) {
    return this.userService.resetPassword(user_values);
  }

  @Post('/update')
  updatePassword(@Body() updatePassword: UpdatePasswordDto) {
    return this.userService.updatePassword(updatePassword);
  }

  @Post('/cash_register')
  onCashRegister(@Body() loginUserDto: LoginUserDto) {
    return this.userService.onCashRegister();
  }
}
