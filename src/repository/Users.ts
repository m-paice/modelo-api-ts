import Users, { UserInstance } from "../models/Users";
import BaseRepository from "./BaseRepository";

class UsersRepository extends BaseRepository<UserInstance> {
  constructor() {
    super(Users);
  }
}

export default new UsersRepository();
