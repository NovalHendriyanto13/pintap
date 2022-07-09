import { Injectable, Inject } from '@nestjs/common';
import * as moment from 'moment';
import { User } from './user.model';
import { USER_REPOSITORY } from '../../configs/app.config';

@Injectable()
export class UserService {
  private attributes: string[] = ['id', 'username', 'name'];
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepo: typeof User,
  ) {}

  async find(): Promise<User[] | null> {
    return this.userRepo.findAll<User>({
      attributes: ['id', 'username', 'name'],
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepo.findOne<User>({
      attributes: ['id', 'username', 'name'],
      where: { id },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    const attributes = this.attributes;
    attributes.push('password');
    return this.userRepo.findOne<User>({
      attributes: attributes,
      where: { username },
    });
  }

  async update(id: string, data: any) {
    const [numberOfAffectedRows, [updatedUser]] = await this.userRepo.update(
      { ...data },
      {
        where: { id },
        returning: true,
      },
    );

    return { numberOfAffectedRows, updatedUser };
  }

  async create(data: any) {
    return this.userRepo.create<User>(data);
  }

  async delete(id: string) {
    const data = { deletedat: moment().format('YYYY-MM-DD hh:mm:ss') };
    const [numberOfAffectedRows, [updatedUser]] = await this.userRepo.update(
      { ...data },
      {
        where: { id },
        returning: true,
      },
    );

    return { numberOfAffectedRows, updatedUser };
  }
}
