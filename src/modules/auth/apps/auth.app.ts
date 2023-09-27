import { envVariables } from "../../shared/config"
import { AuthException } from "../../shared/errors"
import { comparePassword, signJwt } from "../../shared/utils"
import { IAuthLoginDTO } from "../interfaces"
import { AuthSevice } from "../services"

export class AuthApp {
  constructor(private readonly authService: AuthSevice) {}

  async login({ email, password, clientSecret }: IAuthLoginDTO) {
    if (!clientSecret || clientSecret !== envVariables.CLIENT_SECRET) {
      throw new AuthException("Invalid client secret or not provided")
    }

    const user = await this.authService.login(email)

    if (!user) {
      throw new AuthException("Invalid credentials")
    }

    const isValidPassword = await comparePassword(password, user.password)

    if (!isValidPassword) {
      throw new AuthException("Invalid credentials")
    }

    const { id } = user
    const token = signJwt({ id }, "2h")

    return { token }
  }
}
