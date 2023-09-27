import { Prisma } from "@prisma/client"

import { PrismaException } from "../../shared/errors"
import { prisma } from "../../shared/services"
import { beautifyPrismaError } from "../../shared/utils"
import { ICreatMilitaryPersonDTO } from "../interfaces"

export class MilitaryPersonService {
  async create(input: ICreatMilitaryPersonDTO, password: string) {
    try {
      const { bloodTypeId, gradeId, phoneNumber, installationId, ...rest } =
        input
      const militaryPerson = await prisma.user.create({
        data: {
          ...rest,
          password,
          MilitaryPerson: {
            create: {
              phoneNumber,
              BloodType: { connect: { id: bloodTypeId } },
              MilitaryGrade: { connect: { id: gradeId } },
              MilitaryInstallation: { connect: { id: installationId } },
            },
          },
        },
        include: {
          MilitaryPerson: {
            include: {
              MilitaryGrade: true,
              BloodType: true,
              MilitaryInstallation: {
                include: {
                  MilitaryForce: true,
                },
              },
            },
          },
        },
      })

      const { password: _, ...user } = militaryPerson

      return user
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new PrismaException(beautifyPrismaError(error.message))
      }

      throw error
    }
  }

  async createSetPasswordToken(userId: string, token: string) {
    try {
      const setPasswordToken = await prisma.userSetPasswordToken.create({
        data: {
          token,
          User: { connect: { id: userId } },
        },
        select: {
          id: true,
          token: true,
        },
      })

      return setPasswordToken
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new PrismaException(beautifyPrismaError(error.message))
      }

      throw error
    }
  }

  async setPasswordFirstTime(email: string, userId: string, password: string) {
    try {
      const user = await prisma.user.update({
        where: { id: userId, AND: { email, active: false, last_login: null } },
        data: {
          password,
          active: true,
          Role: { connect: { name: "USER" } },
        },
      })

      return user
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new PrismaException(beautifyPrismaError(error.message))
      }

      throw error
    }
  }
}
