import debitoRepository from '../repository/Debito';
import { DebitoInstance } from '../models/Debito';
import BaseResource from './BaseResource';

export class DebitoResource extends BaseResource<DebitoInstance> {
  constructor() {
    super(debitoRepository);
  }
}

export default new DebitoResource();
