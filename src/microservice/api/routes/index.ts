import { Router } from "express";

import usersRoutes from "./users";

const routes = Router();

// const auth = authenticatedRoute()

routes.use("/users", usersRoutes);

export default routes;
