import { Request, Response } from "express"
import { ReasonPhrases, StatusCodes } from "http-status-codes"

import { handleResponse } from "../../shared/utils"
import { CityApp } from "../apps"
import { CityService } from "../services"

class CityController {
  constructor(private readonly cityApp: CityApp) {}

  getCitiesByDepartmentId = async (req: Request, res: Response) => {
    try {
      const { departamentId } = req.params
      const cities = await this.cityApp.getCitiesByDepartamentId(
        Number(departamentId),
      )

      handleResponse({ res, data: cities, status: StatusCodes.OK })
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

const cityService = new CityService()
const cityApp = new CityApp(cityService)
const cityController = new CityController(cityApp)

export { cityController }
