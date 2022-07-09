import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Request,
  Param,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('aws')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('initTable')
  async initTable(): Promise<any> {
    await this.userService.initTable();
    return {
      status: true,
      data: null,
      message: 'Init table is success',
    };
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('user')
  async create(@Request() req): Promise<any> {
    const { password, username } = req.body;

    const check = await this.userService.findByUsername(username);
    if (check) {
      return {
        status: false,
        data: null,
        message: 'Create User is already exists',
      };
    }
    const encryptedPassword: string = Buffer.from(password).toString('base64');
    const payload = {
      ...req.body,
      password: encryptedPassword,
    };

    const data = await this.userService.create(payload);
    if (!data) {
      return {
        status: false,
        data: null,
        message: 'Create User is failed',
      };
    }

    return {
      status: true,
      data,
      message: 'Create User is success',
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    const data = await this.userService.findById(id);
    if (!data) {
      return {
        status: false,
        data: null,
        message: 'Get User is failed',
      };
    }
    return {
      status: true,
      data,
      message: 'Get User is success',
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<any> {
    const data = await this.userService.find();
    if (!data) {
      return {
        status: false,
        data: null,
        message: 'Get List User is failed',
      };
    }
    return {
      status: true,
      data,
      message: 'Get List User is success',
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Request() req): Promise<any> {
    const { id } = req.params;
    const { numberOfAffectedRows, updatedUser } = await this.userService.update(
      id,
      req.body,
    );
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Post doesn't exist");
    }

    return {
      status: true,
      data: updatedUser,
      message: 'Update User is success',
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Request() req): Promise<any> {
    const { id } = req.params;
    const { numberOfAffectedRows, updatedUser } = await this.userService.delete(
      id,
    );
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Post doesn't exist");
    }

    return {
      status: true,
      data: null,
      message: 'Delete User is success',
    };
  }
}
