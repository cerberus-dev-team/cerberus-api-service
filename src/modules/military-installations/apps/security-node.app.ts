import { v4 as uuid } from "uuid"

import { SecurityNodeService } from "../services"

export class SecurityNodeApp {
  constructor(private readonly securityNodeService: SecurityNodeService) {}

  async getSecurityNodes(militaryInstallationId: string) {
    return await this.securityNodeService.getSecurityNodes(
      militaryInstallationId,
    )
  }

  async createSecurityNode(militaryInstallationId: string, location: string) {
    const token = uuid()
    const payload = { token, militaryInstallationId, location }
    return await this.securityNodeService.createSecurityNode(payload)
  }
}
