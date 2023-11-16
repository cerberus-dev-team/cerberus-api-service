import { MQTTHandler } from "../../shared/handlers"
import { ICreateInstallationAnomaly } from "../interfaces"
import { InstallationAnomaliesService } from "../services"

export class InstallationAnomaliesApp {
  private readonly ANOMALY_TOPIC = "anomally"

  constructor(
    private readonly installationAnomaliesService: InstallationAnomaliesService,

    private readonly mqttHandler: MQTTHandler,
  ) {
    this.init()
  }

  async createInstallationAnomaly(input: ICreateInstallationAnomaly) {
    await this.installationAnomaliesService.createInstallationAnomaly(input)
  }

  async getInstallationAnomalies(userId: string) {
    return this.installationAnomaliesService.getInstallationAnomalies(userId)
  }

  private init() {
    console.log("InstallationAnomaliesApp init")
    this.subscribeToAnomalyTopic()
    this.mqttHandler.onMessage((topic, message) => {
      if (topic === this.ANOMALY_TOPIC) {
        console.log(message)
        // const input: ICreateInstallationAnomaly = JSON.parse(message)
        // await this.createInstallationAnomaly(input)
        // console.log("ANOMALLY DETECTED")
      }
    })
  }

  private subscribeToAnomalyTopic() {
    this.mqttHandler.subscribe(this.ANOMALY_TOPIC)
  }
}
