import { Router } from "express"

import { checkSession } from "../../shared/middlewares"
import {
  bloodTypeController,
  cityController,
  departamentController,
} from "../controllers"

const commonRouter = Router()

commonRouter.get("/departaments", checkSession, departamentController.getAll)

commonRouter.get("/blood-types", checkSession, bloodTypeController.getAll)

commonRouter.get(
  "/cities/:departamentId",
  checkSession,
  cityController.getCitiesByDepartmentId,
)

export { commonRouter }
