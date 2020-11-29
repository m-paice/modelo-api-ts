import addressRepository from "../repository/Address";
import { AddresInstance } from "../models/Address";
import BaseResource from "./BaseResource";

export class AddressResource extends BaseResource<AddresInstance> {
  constructor() {
    super(addressRepository);
  }
}

export default new AddressResource();
