import { Router } from "express"

import { checkSession } from "../../shared/middlewares"
import { militaryPersonController } from "../controllers"

const militaryPersonRouter = Router()

militaryPersonRouter.post("/", checkSession, militaryPersonController.create)

militaryPersonRouter.get(
  "/profile",
  checkSession,
  militaryPersonController.getMilitaryPersonById,
)

militaryPersonRouter.put(
  "/set-password/:userId",
  militaryPersonController.setPasswordFirstTime,
)

export { militaryPersonRouter }
