import { PrismaClient } from "@prisma/client"

/**
 * Create a single Prisma connection for the application.
 */
export const prisma: PrismaClient = new PrismaClient()

/**
 * Basic Prisma abstraction for a common task.
 *
 * @param {string} url
 * @param {string} html
 * @return {Promise<void>}
 */
export const storeScrape = async (url: string, html: string): Promise<void> => {
  prisma.scrape.create({
    data: {
      url: url,
      html: html,
    },
  })
}

export default prisma
