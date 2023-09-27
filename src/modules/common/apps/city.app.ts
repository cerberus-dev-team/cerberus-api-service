import { CityService } from "../services"

export class CityApp {
  constructor(private readonly cityService: CityService) {}

  async getCitiesByDepartamentId(departamentId: number) {
    return await this.cityService.getCitiesByDepartamentId(departamentId)
  }
}
