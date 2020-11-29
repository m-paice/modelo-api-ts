import Address, { AddresInstance } from "../models/Address";
import BaseRepository from "./BaseRepository";

class AddressRepository extends BaseRepository<AddresInstance> {
  constructor() {
    super(Address);
  }
}

export default new AddressRepository();
