import { prisma } from "../../shared/services"

export class DepartamentService {
  async getAllDepartaments() {
    return await prisma.departament.findMany()
  }
}
