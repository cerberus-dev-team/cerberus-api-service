import { BloodTypeService } from "../services"

export class BloodTypeApp {
  constructor(private readonly bloodTypeService: BloodTypeService) {}

  async getBloodTypes() {
    return await this.bloodTypeService.getBloodTypes()
  }
}
