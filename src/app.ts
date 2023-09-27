import cors from "cors"
import express from "express"
import morgan from "morgan"

import { envVariables } from "./modules/shared/config"
import router from "./router"

const app = express()

app.set("port", envVariables.PORT)
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))
app.use(router)

export default app
