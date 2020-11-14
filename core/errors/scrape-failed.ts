/**
 * Simple typed error for demo purposes.
 */
export class ScrapeFailedError extends Error {
  constructor(public readonly url: string, public readonly result?: any) {
    super(`Scrape of ${url} failed. See result property for more information.`)
  }
}

export default ScrapeFailedError
