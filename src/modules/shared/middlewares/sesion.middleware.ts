import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

import { handleResponse, verifyJwt } from "../utils"

export const checkSession = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers

  if (!authorization) {
    handleResponse({
      res,
      data: "Authorization header is required",
      status: StatusCodes.UNAUTHORIZED,
    })
    return
  }

  const token = authorization.split(" ").pop()

  if (!token) {
    handleResponse({
      res,
      data: "Token is required",
      status: StatusCodes.UNAUTHORIZED,
    })
    return
  }

  const decoded = verifyJwt(token)

  if (!decoded) {
    handleResponse({
      res,
      data: "Token provided is invalid",
      status: StatusCodes.UNAUTHORIZED,
    })
    return
  }

  req.user = decoded.id

  next()
}
