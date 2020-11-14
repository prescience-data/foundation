/**
 * An example of a typed error for use in a specific situation.
 */
export class DemoFailedError extends Error {
  constructor(public readonly reason: string, public readonly context: any) {
    super(
      `The reason why the demo failed was ${name}. See "context" property for more information.`
    )
  }
}

export default DemoFailedError
