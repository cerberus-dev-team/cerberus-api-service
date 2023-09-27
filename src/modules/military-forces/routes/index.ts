import { Router } from "express"

import { checkSession } from "../../shared/middlewares"
import { militaryForceController } from "../controller"

const militaryForceRouter = Router()

militaryForceRouter.get("/", checkSession, militaryForceController.getAll)

export { militaryForceRouter }
