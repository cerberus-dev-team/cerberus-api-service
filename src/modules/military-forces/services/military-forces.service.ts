import { prisma } from "../../shared/services"

export class MilitaryForceService {
  async getMilitaryForces() {
    return await prisma.militaryForce.findMany()
  }
}
