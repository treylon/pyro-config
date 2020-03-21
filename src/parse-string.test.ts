import parseStringValue from './parse-string'

describe('test string parsing', () => {
  test('allow valid string value', () => {
    expect(
      parseStringValue('Some string value', {
        description: '',
        type: String,
      })
    ).toBe('Some string value')
  })

  test('throw if unset without default', () => {
    expect(() =>
      parseStringValue('', {
        description: '',
        type: String,
      })
    ).toThrowError()
    expect(() =>
      parseStringValue(undefined, {
        description: '',
        type: String,
      })
    ).toThrowError()
    expect(() =>
      parseStringValue(null, {
        description: '',
        type: String,
      })
    ).toThrowError()
  })

  test('fall back to default if not set', () => {
    expect(
      parseStringValue('', {
        description: '',
        type: String,
        default: 'Default String',
      })
    ).toBe('Default String')
    expect(
      parseStringValue(undefined, {
        description: '',
        type: String,
        default: 'Default String',
      })
    ).toBe('Default String')
    expect(
      parseStringValue(null, {
        description: '',
        type: String,
        default: 'Default String',
      })
    ).toBe('Default String')
  })

  test('allow to be unset if nullable', () => {
    expect(
      parseStringValue('', {
        description: '',
        type: String,
        nullable: true,
      })
    ).toBe(null)
  })

  test('Default value takes precedence over nullable definition', () => {
    expect(
      parseStringValue('', {
        description: '',
        type: String,
        default: 'Default String',
        nullable: true,
      })
    ).toBe('Default String')
  })
})
