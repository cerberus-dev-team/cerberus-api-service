import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

import { AuthException, PrismaException } from "../../shared/errors"
import { handleResponse } from "../../shared/utils"
import { AuthApp } from "../apps"
import { AuthSevice } from "../services"

class AuthController {
  constructor(private readonly authApp: AuthApp) {}

  login = async (req: Request, res: Response) => {
    try {
      const { email, password, clientSecret } = req.body

      const data = await this.authApp.login({ email, password, clientSecret })

      handleResponse({ res, data, status: StatusCodes.OK })
      return
    } catch (error) {
      if (error instanceof PrismaException) {
        handleResponse({
          res,
          data: error.message,
          status: StatusCodes.CONFLICT,
        })
        return
      }
      if (error instanceof AuthException) {
        handleResponse({
          res,
          data: error.message,
          status: StatusCodes.UNAUTHORIZED,
        })
        return
      }

      handleResponse({
        res,
        data: "Internal server error",
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      })
      return
    }
  }
}

const authService = new AuthSevice()
const authApp = new AuthApp(authService)
const authController = new AuthController(authApp)

export { authController }
