import { Router } from "express"

import { checkSession } from "../../shared/middlewares"
import { securityNodeController } from "../controllers"

const militaryInstallationRouter = Router()

militaryInstallationRouter.get(
  "/security-nodes",
  checkSession,
  securityNodeController.getSecurityNodes,
)

militaryInstallationRouter.post(
  "/security-nodes/:militaryInstallationId",
  checkSession,
  securityNodeController.createSecurityNode,
)

export { militaryInstallationRouter }
