import { sign, verify } from "jsonwebtoken"

import { envVariables } from "../config"

interface JwtPayload {
  id: string
}

export const signJwt = (payload: JwtPayload, expiresIn: string) => {
  return sign(payload, envVariables.JWT_SECRET, { expiresIn })
}

export const verifyJwt = (token: string) => {
  try {
    const decoded = verify(token, envVariables.JWT_SECRET)

    return decoded as JwtPayload
  } catch (error) {
    return null
  }
}
