/**
 * Simple typed error for demo purposes.
 */
export class BrowserNotFoundError extends Error {
  constructor(public readonly browser: string, public readonly os?: string) {
    super(
      `No ${browser} browser executable path for ${os || "No OS"} was defined.`
    )
  }
}

export default BrowserNotFoundError
