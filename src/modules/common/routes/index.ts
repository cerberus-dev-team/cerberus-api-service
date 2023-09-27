import { Router } from "express"

import { checkSession } from "../../shared/middlewares"
import { cityController, departamentController } from "../controllers"

const commonRouter = Router()

commonRouter.get("/departaments", checkSession, departamentController.getAll)

commonRouter.get(
  "/cities/:departamentId",
  checkSession,
  cityController.getCitiesByDepartmentId,
)

export { commonRouter }
