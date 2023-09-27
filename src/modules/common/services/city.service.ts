import { prisma } from "../../shared/services"

export class CityService {
  async getCitiesByDepartamentId(departamentId: number) {
    return await prisma.city.findMany({
      where: {
        departamentId,
      },
    })
  }
}
