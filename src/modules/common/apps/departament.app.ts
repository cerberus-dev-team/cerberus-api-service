import { DepartamentService } from "../services"

export class DepartamentApp {
  constructor(private readonly departamentService: DepartamentService) {}

  async getDepartaments() {
    return await this.departamentService.getAllDepartaments()
  }
}
