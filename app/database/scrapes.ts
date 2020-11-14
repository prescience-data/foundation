import { db } from "../../core/services"
import { Scrape } from ".prisma/client"

/**
 * Basic Prisma abstraction for a common task.
 *
 * @param {string} url
 * @param {string} data
 * @return {Promise<void>}
 */
export const storeScrape = async (
  url: string,
  data: string | Record<string, any>
): Promise<Scrape> => {
  // Flatten any objects passed in.
  if (typeof data !== "string") {
    data = JSON.stringify(data)
  }
  // Store the data.
  return db.scrape.create({
    data: {
      url: url,
      data: data,
    },
  })
}
