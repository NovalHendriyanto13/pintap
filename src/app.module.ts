import { Module } from '@nestjs/common';
import { DatabaseModule } from './services/databases/database.module';
import { AuthModule } from './apps/auth/auth.module';
import { UserModule } from './apps/users/user.module';
import { UserModule as UserAwsModule } from './apps/aws/users/user.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, UserAwsModule],
})
export class AppModule {}
