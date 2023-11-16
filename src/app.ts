import cors from "cors"
import express from "express"
import morgan from "morgan"

import { envVariables } from "./modules/shared/config"
import { MQTTHandler } from "./modules/shared/handlers"
import router from "./router"

const app = express()
const mqttHandler = MQTTHandler.getInstance()

app.set("port", envVariables.PORT)
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }))
app.use(router)

mqttHandler.connect()
export default app
