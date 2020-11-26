import userRepository from "../repository/Users";
import { UserInstance } from "../models/Users";
import BaseResource from "./BaseResource";

export class UserResource extends BaseResource<UserInstance> {
  constructor() {
    super(userRepository);
  }
}

export default new UserResource();
