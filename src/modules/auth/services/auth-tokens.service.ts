import { Prisma } from "@prisma/client"

import { AuthException } from "../../shared/errors"
import { prisma } from "../../shared/services"
import { beautifyPrismaError } from "../../shared/utils"

export class AuthTokenService {
  async verifySetPasswordToken(token: string) {
    try {
      const authToken = await prisma.userSetPasswordToken.findUnique({
        where: { token, AND: { avaible: true } },
        select: {
          user_id: true,
          avaible: true,
          User: { select: { email: true } },
        },
      })
      return authToken
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new AuthException(beautifyPrismaError(error.message))
      }
      throw error
    }
  }
}
