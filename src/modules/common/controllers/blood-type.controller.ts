import { Request, Response } from "express"
import { ReasonPhrases, StatusCodes } from "http-status-codes"

import { handleResponse } from "../../shared/utils"
import { BloodTypeApp } from "../apps"
import { BloodTypeService } from "../services"

class BloodTypeController {
  constructor(private readonly bloodTypeApp: BloodTypeApp) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const bloodTypes = await this.bloodTypeApp.getBloodTypes()
      handleResponse({
        res,
        data: bloodTypes,
        status: StatusCodes.OK,
      })
      return
    } catch (error) {
      handleResponse({
        res,
        data: ReasonPhrases.INTERNAL_SERVER_ERROR,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      })
      return
    }
  }
}

const bloodTypeService = new BloodTypeService()
const bloodTypeApp = new BloodTypeApp(bloodTypeService)
const bloodTypeController = new BloodTypeController(bloodTypeApp)

export { bloodTypeController }
