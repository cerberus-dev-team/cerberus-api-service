import dotenv from "dotenv"

dotenv.config()

export const envVariables = {
  PORT: process.env.PORT ?? 3000,
  MAIL_HOST: process.env.MAIL_HOST ?? "",
  MAIL_PORT: Number(process.env.MAIL_PORT) || 587,
  MAIL_USER: process.env.MAIL_USER ?? "",
  MAIL_PASS: process.env.MAIL_PASS ?? "",
  MAIL_PRIVATE_KEY: process.env.MAIL_PRIVATE_KEY ?? "",
  BASE_FRONTEND_URL: process.env.BASE_FRONTEND_URL ?? "http://localhost:5173",
  JWT_SECRET: process.env.JWT_SECRET ?? "",
  CLIENT_SECRET: process.env.CLIENT_SECRET ?? "",
  MQTT_HOST: process.env.MQTT_HOST ?? "",
  MQTT_PORT: Number(process.env.MQTT_PORT) || 1883,
  MQTT_USERNAME: process.env.MQTT_USERNAME ?? "",
  MQTT_PASSWORD: process.env.MQTT_PASSWORD ?? "",
  MQTT_PROTOCOL: process.env.MQTT_PROTOCOL ?? "",
  MQTT_PATH: process.env.MQTT_PATH ?? "/",
}
