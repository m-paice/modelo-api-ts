import { Router, Request, Response } from "express";

import resourceController from "../../../resource/controller";
import usuarioResource from "../../../resource/Usuario";
import { promiseHandler } from "../../../utils/routing";

const controller = resourceController(usuarioResource);

const router = Router();

const controllerUsuario = {
  ...controller,
  create: promiseHandler((req: Request, res: Response) => {
    if (req.body.document === "fisica") {
      return usuarioResource.criarFisica(req.body);
    }
  }),
};

router.get("/", controller.index);
router.get("/:id", controller.show);
router.post("/", controllerUsuario.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.destroy);

export default router;
