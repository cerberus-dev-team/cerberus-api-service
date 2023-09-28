import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

import { PrismaException } from "../../shared/errors"
import { handleResponse } from "../../shared/utils"
import { MilitaryPersonApp } from "../apps"
import { MilitaryPersonService } from "../services"

class MilitaryPersonController {
  constructor(private readonly militaryPersonApp: MilitaryPersonApp) {}

  create = async (req: Request, res: Response) => {
    try {
      const { body } = req
      const user = await this.militaryPersonApp.create({ ...body })
      handleResponse({ res, data: { user }, status: StatusCodes.CREATED })
    } catch (error) {
      if (error instanceof PrismaException) {
        handleResponse({
          res,
          data: error.message,
          status: StatusCodes.CONFLICT,
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

  getMilitaryPersonById = async (req: Request, res: Response) => {
    try {
      const { query } = req
      const id = (query.id as string) ? query.id : req.user

      const user = await this.militaryPersonApp.getMilitaryPersonById(
        String(id),
      )

      if (!user) {
        handleResponse({
          res,
          data: "User not found",
          status: StatusCodes.NOT_FOUND,
        })
        return
      }

      handleResponse({ res, data: user, status: StatusCodes.OK })
      return
    } catch (error) {
      handleResponse({
        res,
        data: "Internal server error",
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      })
      return
    }
  }

  setPasswordFirstTime = async (req: Request, res: Response) => {
    try {
      const { body, params } = req
      const { userId } = params
      const { password, email } = body
      await this.militaryPersonApp.setPasswordFirstTime(email, userId, password)
      handleResponse({ res, data: "Password set", status: StatusCodes.OK })
    } catch (error) {
      if (error instanceof PrismaException) {
        handleResponse({
          res,
          data: error.message,
          status: StatusCodes.CONFLICT,
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

const militaryPersonService = new MilitaryPersonService()
const militaryPersonApp = new MilitaryPersonApp(militaryPersonService)
const militaryPersonController = new MilitaryPersonController(militaryPersonApp)

export { militaryPersonController }
