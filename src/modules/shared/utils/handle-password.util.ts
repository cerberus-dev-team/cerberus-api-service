import { compare, hash } from "bcryptjs"

export const hashPassword = async (plainPassword: string) => {
  const hashedPassword = await hash(plainPassword, 10)

  return hashedPassword
}

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string,
) => {
  const isPasswordValid = await compare(plainPassword, hashedPassword)

  return isPasswordValid
}
