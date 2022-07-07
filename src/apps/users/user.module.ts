import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { userRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, ...userRepository],
  exports: [UserService],
})
export class UserModule {}
