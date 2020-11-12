import { PrismaClient } from "@prisma/client"

/**
 * Create a single Prisma connection for the application.
 */
export const DB: PrismaClient = new PrismaClient()

export default DB
