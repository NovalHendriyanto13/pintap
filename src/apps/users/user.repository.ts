import { User } from './user.model';
import { USER_REPOSITORY } from '../../configs/app.config';

export const userRepository = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
