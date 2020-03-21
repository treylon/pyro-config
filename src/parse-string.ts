import { StringAttribute } from './types'

function parseStringValue<T extends StringAttribute>(
  value: string | null | undefined,
  attribute: T
): string | null {
  // Return directly if non-empty string value is set
  if (typeof value === 'string' && value.length) return value

  // Return default value if set
  if (typeof attribute.default === 'string') {
    return attribute.default
  }

  // If nullable return null
  if (attribute.nullable === true) {
    return null
  }

  // No valid value could be found
  throw new Error(`Value is not set`)
}

export default parseStringValue
