import { Request, Response } from "express";

export default (resource) => {
  const index = async (req: Request, res: Response) => {
    const query = {};

    const response = await resource.findMany(query).then((data) => data);

    return res.json(response);
  };

  const show = async (req: Request, res: Response) => {
    const { id } = req.params;
    const query = {};

    const response = await resource.findById(id, query).then((data) => data);

    return res.json(response);
  };

  const create = async (req: Request, res: Response) => {
    const data = req.body;
    const query = {};

    const response = await resource.create(data, query).then((data) => data);

    return res.json(response);
  };

  const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;
    const query = {};

    const response = await resource
      .updateById(id, data, query)
      .then((data) => data);

    return res.json(response);
  };

  const destroy = async (req: Request, res: Response) => {
    const { id } = req.params;

    const response = await resource.destroyById(id).then((m) => !!m);
    return res.json(response);
  };

  return {
    index,
    show,
    create,
    update,
    destroy,
  };
};
