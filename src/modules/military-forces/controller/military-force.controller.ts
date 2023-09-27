import { Request, Response } from "express"
import { ReasonPhrases, StatusCodes } from "http-status-codes"

import { handleResponse } from "../../shared/utils"
import { MilitaryForceApp } from "../app"
import { MilitaryForceService } from "../services"

class MilitaryForceController {
  constructor(private readonly militaryForceApp: MilitaryForceApp) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const militaryForces = await this.militaryForceApp.getMilitaryForces()

      handleResponse({ res, data: militaryForces, status: StatusCodes.OK })
      return
    } catch (error) {
      handleResponse({
        res,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        data: ReasonPhrases.INTERNAL_SERVER_ERROR,
      })
      return
    }
  }
}

const militaryForceService = new MilitaryForceService()
const militaryForceApp = new MilitaryForceApp(militaryForceService)
const militaryForceController = new MilitaryForceController(militaryForceApp)

export { militaryForceController }
