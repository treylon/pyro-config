import parseBooleanValue from './parse-boolean'

describe('test boolean parsing', () => {
  test('allow valid boolean value', () => {
    expect(
      parseBooleanValue('true', {
        description: '',
        type: Boolean,
      })
    ).toBe(true)
    expect(
      parseBooleanValue('false', {
        description: '',
        type: Boolean,
      })
    ).toBe(false)
  })

  test('throw if invalid value set not matter if default defined', () => {
    expect(() =>
      parseBooleanValue('invalid value', {
        description: '',
        type: Boolean,
      })
    ).toThrow()
    expect(() =>
      parseBooleanValue('invalid value', {
        description: '',
        type: Boolean,
        default: true,
      })
    ).toThrow()
  })

  test('throw if unset without default', () => {
    expect(() =>
      parseBooleanValue('', {
        description: '',
        type: Boolean,
      })
    ).toThrowError()
    expect(() =>
      parseBooleanValue(undefined, {
        description: '',
        type: Boolean,
      })
    ).toThrowError()
    expect(() =>
      parseBooleanValue(null, {
        description: '',
        type: Boolean,
      })
    ).toThrowError()
  })

  test('fall back to default if not set', () => {
    // Truthy default value
    expect(
      parseBooleanValue('', {
        description: '',
        type: Boolean,
        default: true,
      })
    ).toBe(true)
    expect(
      parseBooleanValue(undefined, {
        description: '',
        type: Boolean,
        default: true,
      })
    ).toBe(true)
    expect(
      parseBooleanValue(null, {
        description: '',
        type: Boolean,
        default: true,
      })
    ).toBe(true)

    // Falsy default value
    expect(
      parseBooleanValue('', {
        description: '',
        type: Boolean,
        default: false,
      })
    ).toBe(false)
    expect(
      parseBooleanValue(undefined, {
        description: '',
        type: Boolean,
        default: false,
      })
    ).toBe(false)
    expect(
      parseBooleanValue(null, {
        description: '',
        type: Boolean,
        default: false,
      })
    ).toBe(false)
  })
})
