import Config from './config'

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
}

describe('Config usage', () => {
  test('test valid config', () => {
    process.env.BOOLEAN_VALUE = 'true'
    process.env.STRING_VALUE = 'string value'
    process.env.NUMBER_VALUE = '25'

    const config = Config.create(testConfigSchema)

    expect(config.get('booleanValue')).toBe(true)
    expect(config.get('stringValue')).toBe('string value')
    expect(config.get('numberValue')).toBe(25)
  })
})
