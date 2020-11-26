import { Options } from "sequelize";
import BaseSequelizeRepository from "../repository/BaseRepository";

export const CREATED = "created";
export const UPDATED = "updated";
export const DESTROYED = "destroyed";

export type Instance = {
  id: string;
};

export default class BaseResource<TModel extends Instance> {
  protected readonly repository: BaseSequelizeRepository<TModel>;

  protected events: string[];

  constructor(repository: BaseSequelizeRepository<TModel>) {
    this.repository = repository;
    this.events = [CREATED, UPDATED, DESTROYED];

    this.getRepository = this.getRepository.bind(this);
    this.findMany = this.findMany.bind(this);
    this.findOne = this.findOne.bind(this);
    this.findById = this.findById.bind(this);

    this.create = this.create.bind(this);

    this.update = this.update.bind(this);
    this.updateById = this.updateById.bind(this);

    this.destroy = this.destroy.bind(this);
    this.destroyById = this.destroyById.bind(this);

    // this.getEmitter = this.getEmitter.bind(this)
    // this.emit = this.emit.bind(this)
    // this.emitCreated = this.emitCreated.bind(this)
    // this.emitUpdated = this.emitUpdated.bind(this)
    // this.emitDestroyed = this.emitDestroyed.bind(this)
    // this.reload = this.reload.bind(this)
    // this.count = this.count.bind(this)
    // this.findManyPaginated = this.findManyPaginated.bind(this)
    // this.findManyByIds = this.findManyByIds.bind(this)
    // this.bulkUpdate = this.bulkUpdate.bind(this)
    // this.bulkDestroy = this.bulkDestroy.bind(this)
    // this.existsById = this.existsById.bind(this)
    // this.exists = this.exists.bind(this)
    // this.build = this.build.bind(this)
  }

  /**
   * @returns {BaseSequelizeRepository}
   */
  getRepository() {
    return this.repository;
  }

  findMany(query: Options = {}) {
    return this.getRepository().findMany(query);
  }

  findById(id: string, query: Options = {}): Promise<TModel> {
    return this.getRepository().findById(id, query);
  }

  findOne(query: Options = {}): Promise<TModel> {
    return this.getRepository().findOne(query);
  }

  create(data: TModel, options: Options = {}): Promise<TModel> {
    return this.getRepository()
      .create(data, options)
      .then((model) => {
        return model;
      });
  }

  update(model: TModel, data: TModel, options: Options = {}) {
    return this.getRepository()
      .update(model, data, options)
      .then((model) => {
        return model;
      });
  }

  updateById(id: string, data: TModel, options: Options = {}) {
    return this.getRepository()
      .findById(id, options)
      .then((model) => this.update(model, data, options));
  }

  destroy(model: TModel, options: Options = {}) {
    return this.getRepository()
      .destroy(model, options)
      .then(() => {
        return model;
      });
  }

  destroyById(id: string, options: Options = {}) {
    return this.getRepository()
      .findById(id, options)
      .then((model) => this.destroy(model, options));
  }
}
