import { prisma } from "../../shared/services"
import { ICreateSecurityNodeDTO } from "../interfaces"

export class SecurityNodeService {
  async getSecurityNodes(id: string) {
    const userInfo = await prisma.militaryPerson.findUnique({
      where: { userId: id },
    })

    if (!userInfo) {
      throw new Error("User not found")
    }

    const militaryInstallationId = userInfo.installationId

    if (!militaryInstallationId) {
      throw new Error("User has no installation")
    }

    return await prisma.securityNode.findMany({
      where: { militaryInstallationId },
    })
  }

  async createSecurityNode(data: ICreateSecurityNodeDTO) {
    return await prisma.securityNode.create({
      data,
    })
  }
}
