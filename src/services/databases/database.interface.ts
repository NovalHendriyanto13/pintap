import { Dialect } from 'sequelize/types';

export interface dbConfig {
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  dialect?: Dialect;
  database?: string;
}
