import Users, { UsersInstance } from '../models/Users';
import BaseRepository from './BaseRepository';

class UsersRepository extends BaseRepository<UsersInstance> {
  constructor() {
    super(Users);
  }
}

export default new UsersRepository();
