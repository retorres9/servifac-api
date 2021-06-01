import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRespository } from './user.repository';
import { jwtConstants } from './user.constants';
import { JwtPayload } from './jwt.payload';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRespository)
    private userRepository: UserRespository,
  ) {
    super({
      secretOrKey: '12345',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { user_username } = payload;
    const user: User = await this.userRepository.findOne({ user_username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
