/**
 * Handles errors thrown when an object is not found on the page and script cannot continue.
 */
export class ElementNotFoundError extends Error {
  constructor(public readonly name: string, public readonly element?: any) {
    super(
      `Could not find page element ${name}. See element property for more information.`
    )
  }
}

export default ElementNotFoundError
