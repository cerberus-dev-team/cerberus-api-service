/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express"

interface IResponse {
  res: Response
  data: any
  status: number
}

export const handleResponse = ({ res, data, status }: IResponse): void => {
  res.status(status).json({ data })
}
