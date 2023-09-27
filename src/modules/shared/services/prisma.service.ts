import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient({
  errorFormat: "minimal",
})

prisma
  .$connect()
  .then(() => console.log("Connected to database successfully 🚀"))
  .catch((err) => console.log("Error connecting to database 🚨", err))

export { prisma }
