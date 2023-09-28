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

  async getMilitaryPerson(id: string) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        Role: true,
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
  }

  async getPersonalData(userId: string) {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        last_name: true,
        email: true,
        MilitaryPerson: {
          select: {
            id: true,
            phoneNumber: true,
            MilitaryGrade: {
              select: {
                id: true,
                name: true,
              },
            },
            BloodType: {
              select: {
                id: true,
                type: true,
              },
            },
            MilitaryInstallation: {
              select: {
                id: true,
                name: true,
                MilitaryForce: {
                  select: {
                    id: true,
                    name: true,
                    image_url: true,
                  },
                },
              },
            },
          },
        },
      },
    })
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
