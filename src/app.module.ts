import { Module } from '@nestjs/common';
import { DatabaseModule } from './services/databases/database.module';
import { AuthModule } from './apps/auth/auth.module';
import { UserModule } from './apps/users/user.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule],
})
export class AppModule {}
