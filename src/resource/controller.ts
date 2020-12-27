import { Model } from 'sequelize';
import { Request, Response } from 'express';

export default <T>(resource: any) => {
  const index = async (req: Request, res: Response) => {
    const query = req.query;

    try {
      const response = await resource
        .findMany(query)
        .then((data: Partial<T>) => data);

      return res.json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  const show = async (req: Request, res: Response) => {
    const { id } = req.params;
    const query = req.query;

    try {
      const response = await resource
        .findById(id, query)
        .then((data: Partial<T>) => data);

      return res.json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  const create = async (req: Request, res: Response) => {
    const data = req.body;
    const query = {};

    try {
      const response = await resource
        .create(data, query)
        .then((data: Partial<T>) => data);

      return res.json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const query = {};

    try {
      const response = await resource
        .updateById(id, data, query)
        .then((data: Partial<T>) => data);

      return res.json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  const destroy = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const response = await resource
        .destroyById(id)
        .then((data: Partial<T>) => !!data);

      return res.json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  return {
    index,
    show,
    create,
    update,
    destroy,
  };
};
