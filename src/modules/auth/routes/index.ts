import { Router } from "express"

import { authController, authTokenController } from "../controllers"

const authRouter = Router()

authRouter.post(
  "/verify-set-password-token",
  authTokenController.verifySetPasswordToken,
)

authRouter.post("/login", authController.login)

authRouter.post

export { authRouter }
