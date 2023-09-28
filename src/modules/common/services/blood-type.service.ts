import { prisma } from "../../shared/services"

export class BloodTypeService {
  async getBloodTypes() {
    return await prisma.bloodType.findMany()
  }
}
