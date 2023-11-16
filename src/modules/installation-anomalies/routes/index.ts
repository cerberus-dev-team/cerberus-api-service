import { Router } from "express"

import { checkSession } from "../../shared/middlewares"
import { installationAnomaliesController } from "../controllers"

const installationAnomaliesRouter = Router()

installationAnomaliesRouter.get(
  "/",
  checkSession,
  installationAnomaliesController.getInstallationAnomalies,
)

export { installationAnomaliesRouter }
