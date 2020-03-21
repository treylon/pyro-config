import { BooleanAttribute } from './types'

function parseBooleanValue(value: string | null | undefined, attribute: BooleanAttribute): boolean {
  // Return directly if correct boolean value is set
  if (value === 'true') return true
  if (value === 'false') return false

  // If any value other then `true` or `false` set throw because this is not allowed
  if (value) throw new Error(`Invalid value "${value}" set`)

  // If a default value has been provided return it
  if (typeof attribute.default === 'boolean') {
    return attribute.default
  }

  // No valid value could be found
  throw new Error(`Value is not set`)
}

export default parseBooleanValue
