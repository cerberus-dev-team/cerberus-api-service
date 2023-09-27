export const beautifyPrismaError = (error: string) => {
  return error.replace(/\n/g, " ")
}
