import { NumberAttribute } from './types'

function parseNumberValue<T extends NumberAttribute>(
  value: string | null | undefined,
  attribute: T
): number | null {
  // Return directly if non-empty string value is set that can be parsed to a number
  if (typeof value === 'string' && value.length && !isNaN(Number(value))) return Number(value)

  // Throw if non parsable number set
  if (isNaN(Number(value))) {
    if (value) throw new Error(`Invalid value "${value}" set`)
  }

  // Return default value if set
  if (typeof attribute.default === 'number') {
    return attribute.default
  }

  // If nullable return null
  if (attribute.nullable === true) {
    return null
  }

  // No valid value could be found
  throw new Error(`Value is not set`)
}

export default parseNumberValue
