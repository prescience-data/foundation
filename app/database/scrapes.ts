import { db } from "../../core/services"

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
): Promise<void> => {
  // Flatten any objects passed in.
  if (typeof data !== "string") {
    data = JSON.stringify(data)
  }
  // Store the data.
  db.scrape.create({
    data: {
      url: url,
      data: data,
    },
  })
}
