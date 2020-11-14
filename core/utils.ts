/**
 * Produces a random number between two numbers.
 * Can be set to float bu setting the third constructor item.
 *
 * @param {number} start
 * @param {number} end
 * @param {number} fractionDigits
 * @return {string}
 */
export const rand = (
  start: number,
  end: number,
  fractionDigits = 0
): number => {
  if (start > end) {
    throw new Error(`${start} is larger than ${end}.`)
  }
  return parseFloat(
    (Math.random() * (end - start) + start).toFixed(fractionDigits)
  )
}

/**
 * Shortcut to creating a simple options object with the delay param set.
 *
 * @param {number} start
 * @param {number} end
 * @return {{delay: number}}
 */
export const delay = (start: number, end?: number): { delay: number } => {
  return { delay: rand(start, end || start) }
}

/**
 * Cleans excess whitespace from a string.
 *
 * @param {string} value
 * @return {string}
 */
export const whitespace = (value: string): string => {
  return value.replace(/\s/g, " ")
}
