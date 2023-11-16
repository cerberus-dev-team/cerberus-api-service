import { Prisma } from "@prisma/client"

import { PrismaException } from "../../shared/errors"
import { prisma } from "../../shared/services"
import { beautifyPrismaError } from "../../shared/utils"
import { ICreateInstallationAnomaly } from "../interfaces"

export class InstallationAnomaliesService {
  async createInstallationAnomaly(input: ICreateInstallationAnomaly) {
    try {
      const { securityNodeId } = input
      const militaryInstallationId = await this.getInstallationIdFromDeviceId(
        securityNodeId,
      )
      await prisma.militaryInstallationAnomaly.create({
        data: { ...input, militaryInstallationId },
      })
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new PrismaException(beautifyPrismaError(error.message))
      }
      throw error
    }
  }

  async getInstallationIdFromDeviceId(deviceId: string) {
    try {
      console.log(deviceId)
      const installation = await prisma.militaryInstallation.findFirstOrThrow({
        where: {
          CameraSecurity: { some: { id: deviceId } },
        },
      })

      return installation.id
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new PrismaException(beautifyPrismaError(error.message))
      }
      throw error
    }
  }

  async getInstallationAnomalies(userId: string) {
    try {
      const installationAnomalies =
        await prisma.militaryInstallationAnomaly.findMany({
          where: {
            militaryInstallation: {
              MilitaryPerson: { some: { userId } },
            },
          },
          include: {
            SecurityNode: {
              select: {
                location: true,
              },
            },
          },
        })
      return installationAnomalies
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new PrismaException(beautifyPrismaError(error.message))
      }
      throw error
    }
  }
}
