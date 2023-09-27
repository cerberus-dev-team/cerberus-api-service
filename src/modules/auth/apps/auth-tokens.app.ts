import { AuthException } from "../../shared/errors"
import { verifyJwt } from "../../shared/utils"
import { AuthTokenService } from "../services"

export class AuthTokenApp {
  constructor(private readonly authTokenService: AuthTokenService) {}

  async verifySetPasswordToken(token: string) {
    const authToken = await this.authTokenService.verifySetPasswordToken(token)

    if (!authToken) {
      throw new AuthException("Invalid token")
    }

    const verifyToken = verifyJwt(token)

    if (!verifyToken) {
      throw new AuthException("Invalid token")
    }

    return authToken
  }
}
