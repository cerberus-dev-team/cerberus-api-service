import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

import { AuthException, PrismaException } from "../../shared/errors"
import { handleResponse } from "../../shared/utils"
import { AuthTokenApp } from "../apps"
import { AuthTokenService } from "../services"

class AuthTokenController {
  constructor(private readonly authTokenApp: AuthTokenApp) {}

  verifySetPasswordToken = async (req: Request, res: Response) => {
    try {
      const { token } = req.query
      const result = await this.authTokenApp.verifySetPasswordToken(
        token as string,
      )

      handleResponse({ res, status: StatusCodes.OK, data: result })
      return
    } catch (error) {
      if (error instanceof AuthException) {
        handleResponse({
          res,
          status: StatusCodes.UNAUTHORIZED,
          data: error.message,
        })
        return
      }

      if (error instanceof PrismaException) {
        handleResponse({
          res,
          status: StatusCodes.CONFLICT,
          data: error.message,
        })
        return
      }

      handleResponse({
        res,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        data: "Internal server error",
      })
      return
    }
  }
}

const authTokenService = new AuthTokenService()
const authTokenApp = new AuthTokenApp(authTokenService)
const authTokenController = new AuthTokenController(authTokenApp)

export { authTokenController }
