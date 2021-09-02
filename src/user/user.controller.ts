import { Body, Controller, Post} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { LoginUserDto } from './login-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }

  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto): Promise<{accessToken: string}> {
    return this.userService.login(loginUserDto);
  }
}
