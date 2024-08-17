import express from 'express'
import userRouter from "./users.routes"
import routesRouter from "./routes.routes"

const router = express.Router()

router.use("/users", userRouter);
router.use("/routes", routesRouter);

export default router