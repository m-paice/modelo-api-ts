import { Router } from "express";

import usuarioRoutes from "./usuario";

const routes = Router();

// const auth = authenticatedRoute()

routes.use("/usuario", usuarioRoutes);

export default routes;
