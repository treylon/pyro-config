import parseNumberValue from './parse-number'

describe('test number parsing', () => {
  test('allow valid number value', () => {
    expect(
      parseNumberValue('0', {
        description: '',
        type: Number,
      })
    ).toBe(0)
    expect(
      parseNumberValue('3600', {
        description: '',
        type: Number,
      })
    ).toBe(3600)
    expect(
      parseNumberValue('3.6', {
        description: '',
        type: Number,
      })
    ).toBe(3.6)
    expect(
      parseNumberValue('-3.6', {
        description: '',
        type: Number,
      })
    ).toBe(-3.6)
  })

  test('throw if invalid value set not matter if default or nullable defined', () => {
    expect(() =>
      parseNumberValue('invalid value', {
        description: '',
        type: Number,
      })
    ).toThrow()
    expect(() =>
      parseNumberValue('invalid value', {
        description: '',
        type: Number,
        default: 4,
      })
    ).toThrow()
    expect(() =>
      parseNumberValue('invalid value', {
        description: '',
        type: Number,
        nullable: true,
      })
    ).toThrow()
  })

  test('throw if unset without default', () => {
    expect(() =>
      parseNumberValue('', {
        description: '',
        type: Number,
      })
    ).toThrowError()
    expect(() =>
      parseNumberValue(undefined, {
        description: '',
        type: Number,
      })
    ).toThrowError()
    expect(() =>
      parseNumberValue(null, {
        description: '',
        type: Number,
      })
    ).toThrowError()
  })

  test('fall back to default if not set', () => {
    expect(
      parseNumberValue('', {
        description: '',
        type: Number,
        default: 3,
      })
    ).toBe(3)
    expect(
      parseNumberValue(undefined, {
        description: '',
        type: Number,
        default: 3,
      })
    ).toBe(3)
    expect(
      parseNumberValue(null, {
        description: '',
        type: Number,
        default: 3,
      })
    ).toBe(3)
  })

  test('allow to be unset if nullable', () => {
    expect(
      parseNumberValue('', {
        description: '',
        type: Number,
        nullable: true,
      })
    ).toBe(null)
  })

  test('Default value takes precedence over nullable definition', () => {
    expect(
      parseNumberValue('', {
        description: '',
        type: Number,
        default: 3,
        nullable: true,
      })
    ).toBe(3)
  })
})
