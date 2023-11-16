import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

import { MQTTHandler } from "../../shared/handlers"
import { handleResponse } from "../../shared/utils"
import { InstallationAnomaliesApp } from "../apps"
import { InstallationAnomaliesService } from "../services"

class InstallationAnomaliesController {
  constructor(
    private readonly installationAnomaliesApp: InstallationAnomaliesApp,
  ) {}

  getInstallationAnomalies = async (req: Request, res: Response) => {
    try {
      const { user } = req
      const installationAnomalies =
        await this.installationAnomaliesApp.getInstallationAnomalies(user)
      handleResponse({
        res,
        data: installationAnomalies,
        status: StatusCodes.OK,
      })
      return
    } catch (error) {
      handleResponse({
        res,
        data: null,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      })
      return
    }
  }
}

const installationAnomaliesService = new InstallationAnomaliesService()

const mqttHandler = MQTTHandler.getInstance()

const installationAnomaliesApp = new InstallationAnomaliesApp(
  installationAnomaliesService,
  mqttHandler,
)
const installationAnomaliesController = new InstallationAnomaliesController(
  installationAnomaliesApp,
)

export { installationAnomaliesController }
