import { MilitaryForceService } from "../services"

export class MilitaryForceApp {
  constructor(private readonly militaryForceService: MilitaryForceService) {}

  async getMilitaryForces() {
    return await this.militaryForceService.getMilitaryForces()
  }
}
