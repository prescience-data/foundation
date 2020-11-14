import { PrismaClient } from "@prisma/client"

/**
 * Create a single Prisma connection for the application.
 */
export const prisma: PrismaClient = new PrismaClient()

export default prisma
