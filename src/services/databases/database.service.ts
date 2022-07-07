import { Sequelize } from 'sequelize-typescript';
import { envConfig } from '../../configs/env.config';
import { dbConfig } from './database.interface';
import { User } from 'src/apps/users/user.model';

export const DatabaseService = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const config: dbConfig = {
        dialect: 'postgres',
        host: envConfig.database.host,
        port: envConfig.database.port,
        username: envConfig.database.username,
        password: envConfig.database.password,
        database: envConfig.database.dbName,
      };

      const sequelize = new Sequelize(config);
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
