import { Router } from "express";

import usersRoutes from "./users";
import addressRoutes from "./address";

const routes = Router();

// const auth = authenticatedRoute()

routes.use("/users", usersRoutes);
routes.use("/address", addressRoutes);

export default routes;
