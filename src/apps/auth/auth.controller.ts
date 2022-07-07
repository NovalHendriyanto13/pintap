import { Controller, Post, Request } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  @Post('login')
  async login(@Request() req) {
    const { username, password } = req.body;
    const user = await this.userService.findByUsername(username);

    if (user) {
      const base64Password: string = Buffer.from(password).toString('base64');
      const { password: passwordDb } = user;
      if (base64Password != passwordDb) {
        return {
          status: false,
          data: null,
          message: 'Wrong Password!',
        };
      }
    } else {
      return {
        status: false,
        data: null,
        message: 'Username is not exists!',
      };
    }

    const token = await this.authService.generateToken({
      username: user.username,
      name: user.name,
    });
    return {
      status: true,
      data: {
        username: user.username,
        name: user.name,
        token,
      },
      message: 'Login is success',
    };
  }
}
