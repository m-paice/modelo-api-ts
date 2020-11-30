import { Model, Options } from "sequelize";

class BaseRepository<T> {
  private readonly model;

  constructor(model: Model<T, any>) {
    this.model = model;
  }

  findMany(options: Options): Promise<T[]> {
    return this.model.findAll(options);
  }

  findOne(options: Options): Promise<T> {
    return this.model.findOne(options);
  }

  findById(id: string, options: Options): Promise<T> {
    return this.model.findByPk(id, options);
  }

  create(data: Partial<T>, options: Options): Promise<T> {
    return this.model.create(data, options);
  }

  update(model: any, data: T, options: Options): Promise<T> {
    return model.update(data, options);
  }

  updateById(id: string, data: T, options: Options): Promise<T> {
    return this.findById(id, options).then((model) =>
      this.update(model, data, options)
    );
  }

  destroy(model: any, options: Options) {
    return model.destroy(options);
  }

  destroyById(id: string, options: Options) {
    return this.findById(id, options).then((model) =>
      this.destroy(model, options)
    );
  }
}

export default BaseRepository;
