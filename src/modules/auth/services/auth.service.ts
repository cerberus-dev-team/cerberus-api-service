import { Prisma } from "@prisma/client"

import { AuthException } from "../../shared/errors"
import { prisma } from "../../shared/services"
import { beautifyPrismaError } from "../../shared/utils"

export class AuthSevice {
  async login(email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email, AND: { active: true } },
      })

      return user
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new AuthException(beautifyPrismaError(error.message))
      }
      throw error
    }
  }
}
