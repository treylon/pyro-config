import Config from './config'

export function CustomParser(value: string | null | undefined): string {
  return `${value}.1.2.3.4`
}

const testConfigSchema = {
  booleanValue: {
    type: Boolean,
    description: 'Test description',
  },
  stringValue: {
    type: String,
    description: 'Test description',
  },
  numberValue: {
    type: Number,
    description: 'Test description',
  },
  customValue: {
    type: CustomParser,
    description: 'Test description',
  },
}

describe('Config usage', () => {
  test('test valid config', () => {
    process.env.BOOLEAN_VALUE = 'true'
    process.env.STRING_VALUE = 'string value'
    process.env.NUMBER_VALUE = '25'
    process.env.CUSTOM_VALUE = 'asdf'

    const config = Config.create(testConfigSchema)

    expect(config.get('booleanValue')).toBe(true)
    expect(config.get('stringValue')).toBe('string value')
    expect(config.get('numberValue')).toBe(25)
    expect(config.get('customValue')).toBe('asdf.1.2.3.4')
  })
})
