import { Request, Response } from "express"
import { ReasonPhrases, StatusCodes } from "http-status-codes"

import { handleResponse } from "../../shared/utils"
import { DepartamentApp } from "../apps"
import { DepartamentService } from "../services"

class DepartamentController {
  constructor(private readonly departamentApp: DepartamentApp) {}

  getAll = async (req: Request, res: Response) => {
    try {
      const departaments = await this.departamentApp.getDepartaments()
      handleResponse({ res, data: departaments, status: StatusCodes.OK })
    } catch (error) {
      handleResponse({
        res,
        data: ReasonPhrases.INTERNAL_SERVER_ERROR,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      })
    }
  }
}

const departamentService = new DepartamentService()
const departamentApp = new DepartamentApp(departamentService)
const departamentController = new DepartamentController(departamentApp)

export { departamentController }
