import * as mqtt from "mqtt"

import { envVariables } from "../config"

export class MQTTHandler {
  // eslint-disable-next-line no-use-before-define
  private static instance: MQTTHandler | null = null
  private readonly client: mqtt.MqttClient

  private constructor() {
    this.client = mqtt.connect(
      `${envVariables.MQTT_PROTOCOL}://${envVariables.MQTT_HOST}:${envVariables.MQTT_PORT}`,
      {
        username: envVariables.MQTT_USERNAME,
        password: envVariables.MQTT_PASSWORD,
        path: envVariables.MQTT_PATH,
        protocol: "mqtts",
        port: 8883,
      },
    )
  }

  public static getInstance(): MQTTHandler {
    if (!MQTTHandler.instance) {
      MQTTHandler.instance = new MQTTHandler()
    }
    return MQTTHandler.instance
  }

  public connect() {
    this.client.on("connect", () =>
      console.log("MQTT message broker connected ✉️"),
    )
  }

  public subscribe(topic: string) {
    this.client.subscribe(topic, (err) => {
      if (err) {
        console.error(err)
      }
    })
  }

  public onMessage(callback: (topic: string, message: string) => void) {
    this.client.on("message", (topic, message) => {
      callback(topic, message.toString())
    })
  }
}
