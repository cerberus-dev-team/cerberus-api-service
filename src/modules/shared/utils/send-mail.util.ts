import { createTransport } from "nodemailer"

import { envVariables } from "../config"

interface ISendMailDTO {
  to: string
  subject: string
  html: string
}

const createTransporter = () => {
  const transporter = createTransport({
    host: envVariables.MAIL_HOST,
    port: envVariables.MAIL_PORT,
    auth: {
      user: envVariables.MAIL_USER,
      pass: envVariables.MAIL_PASS,
    },
    tls: { rejectUnauthorized: false },
  })

  return transporter
}

export const sendMail = async ({ to, subject, html }: ISendMailDTO) => {
  const transporter = createTransporter()

  await transporter.sendMail({
    from: envVariables.MAIL_USER,
    to,
    subject,
    html,
  })
}
