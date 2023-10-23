import { Request, Response } from "express"
import { ReasonPhrases, StatusCodes } from "http-status-codes"

import { handleResponse } from "../../shared/utils"
import { SecurityNodeApp } from "../apps"
import { SecurityNodeService } from "../services"

class SecurityNodeController {
  constructor(private readonly securityNodeApp: SecurityNodeApp) {}

  createSecurityNode = async (req: Request, res: Response) => {
    try {
      const { militaryInstallationId } = req.params
      const { location } = req.body
      const data = await this.securityNodeApp.createSecurityNode(
        militaryInstallationId,
        location,
      )

      handleResponse({ res, data, status: StatusCodes.CREATED })
    } catch (error) {
      console.log(error)

      handleResponse({
        res,
        data: ReasonPhrases.INTERNAL_SERVER_ERROR,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      })
      return
    }
  }

  getSecurityNodes = async (req: Request, res: Response) => {
    try {
      const { user: militaryInstallationId } = req
      const data = await this.securityNodeApp.getSecurityNodes(
        militaryInstallationId,
      )
      handleResponse({ res, data, status: StatusCodes.OK })
    } catch (error) {
      console.log(error)
      handleResponse({
        res,
        data: ReasonPhrases.INTERNAL_SERVER_ERROR,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      })
      return
    }
  }
}

const securityNodeService = new SecurityNodeService()
const securityNodeApp = new SecurityNodeApp(securityNodeService)
const securityNodeController = new SecurityNodeController(securityNodeApp)

export { securityNodeController }
