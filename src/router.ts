import { Router } from "express"
import { StatusCodes } from "http-status-codes"

import { authRouter } from "./modules/auth/routes"
import { commonRouter } from "./modules/common/routes"
import { installationAnomaliesRouter } from "./modules/installation-anomalies/routes"
import { militaryForceRouter } from "./modules/military-forces/routes"
import { militaryInstallationRouter } from "./modules/military-installations/routes"
import { militaryPersonRouter } from "./modules/military-personnel/routes"
import { handleResponse } from "./modules/shared/utils"

const router = Router()

router.get("/", (_req, res) =>
  handleResponse({ res, data: "API is running 🍺", status: StatusCodes.OK }),
)

router.use("/api/installation-anomalies", installationAnomaliesRouter)
router.use("/api/military-personnel", militaryPersonRouter)
router.use("/api/military-forces", militaryForceRouter)
router.use("/api/military-installations", militaryInstallationRouter)
router.use("/api/common", commonRouter)
router.use("/api/auth", authRouter)

router.get("*", (_req, res) => {
  handleResponse({
    res,
    data: "The route you are looking for does not exist 😢",
    status: StatusCodes.NOT_FOUND,
  })
})

export default router
