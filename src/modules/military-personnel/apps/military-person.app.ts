import { hashPassword, sendMail, signJwt } from "../../shared/utils"
import { SET_PASSWORD as SET_PASSWORD_SUBJECT } from "../constants"
import { ICreatMilitaryPersonDTO } from "../interfaces"
import { MilitaryPersonService } from "../services"
import { getSetPasswordTemplate } from "../templates"

export class MilitaryPersonApp {
  constructor(private readonly militaryPersonService: MilitaryPersonService) {}

  async create(input: ICreatMilitaryPersonDTO) {
    const randomPassword = this.generateRandomHash()
    const password = await hashPassword(randomPassword)

    const user = await this.militaryPersonService.create(input, password)
    const { email, name, last_name: lastName, id, MilitaryPerson } = user

    const setPasswordToken = signJwt({ id }, "24h")
    const route = this.getSetPasswordRoute(setPasswordToken)
    await this.militaryPersonService.createSetPasswordToken(
      id,
      setPasswordToken,
    )

    await sendMail({
      to: email,
      subject: SET_PASSWORD_SUBJECT,
      html: getSetPasswordTemplate({
        name,
        lastName,
        route,
        grade: MilitaryPerson?.MilitaryGrade?.name ?? "",
        militaryForceLogo:
          MilitaryPerson?.MilitaryInstallation?.MilitaryForce.image_url ?? "",
      }),
    })

    return user
  }

  async setPasswordFirstTime(email: string, userId: string, password: string) {
    const hashedPassword = await hashPassword(password)
    await this.militaryPersonService.setPasswordFirstTime(
      email,
      userId,
      hashedPassword,
    )
  }

  private getSetPasswordRoute(authToken: string) {
    return `${process.env.BASE_FRONTEND_URL}/auth/set-password?authToken=${authToken}`
  }

  private generateRandomHash() {
    return Math.random().toString(36).slice(-15)
  }
}
