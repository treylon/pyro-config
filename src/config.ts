import { constantCase } from 'change-case'
import parseBooleanValue from './parse-boolean'
import parseNumberValue from './parse-number'
import parseStringValue from './parse-string'
import {
  Attribute,
  BooleanAttribute,
  ConfigType,
  ConfigValueObject,
  NumberAttribute,
  Schema,
  StringAttribute,
} from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parse(value: string | null | undefined, attribute: Attribute): any {
  switch (attribute.type) {
    case Boolean:
      return parseBooleanValue(value, attribute as BooleanAttribute)
    case String:
      return parseStringValue(value, attribute as StringAttribute)
    case Number:
      return parseNumberValue(value, attribute as NumberAttribute)
    default:
      return attribute.type(value, attribute)
  }
}

class Config<C extends ConfigValueObject, S extends Schema<C>> {
  public static create<C extends ConfigValueObject, S extends Schema<C>>(schema: S): Config<C, S> {
    return new Config(schema)
  }

  public get<K extends keyof S>(key: K): ConfigType<C, S>[K] {
    return this.config[key]
  }

  private readonly schema: S
  private readonly config: ConfigType<C, S>

  private constructor(schema: S) {
    this.schema = schema
    this.config = this.loadAndParse()
  }

  private loadAndParse(): ConfigType<C, S> {
    const env = process.env
    const parsedConfig: Partial<ConfigType<C, S>> = {}
    for (const [key, value] of Object.entries(this.schema)) {
      const configKey = key as keyof S
      const envName = value.env || constantCase(key)
      parsedConfig[configKey] = parse(env[envName], value)
    }
    return parsedConfig as ConfigType<C, S>
  }
}

export default Config
