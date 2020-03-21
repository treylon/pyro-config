import { constantCase } from 'change-case'
import parseBooleanValue from './parse-boolean'
import parseNumberValue from './parse-number'
import parseStringValue from './parse-string'
import {
  Attribute,
  BooleanAttribute,
  ConfigType,
  ConfigValue,
  ConfigValueObject,
  NumberAttribute,
  Schema,
  StringAttribute,
} from './types'

function parse<A extends ConfigValue>(value: string | null | undefined, attribute: Attribute): any {
  switch (attribute.type) {
    case Boolean:
      return parseBooleanValue(value, attribute as BooleanAttribute)
    case String:
      return parseStringValue(value, attribute as StringAttribute)
    case Number:
      return parseNumberValue(value, attribute as NumberAttribute)
  }
  throw new Error('Invalid type has been passed in')
}

class Config<C extends ConfigValueObject, T extends Schema<C>> {
  public static create<C extends ConfigValueObject, T extends Schema<C>>(schema: T): Config<C, T> {
    const instance = new Config(schema)
    instance.parse()
    return instance
  }

  public get<K extends keyof T>(key: K): ConfigType<C, T>[K] {
    return this.config[key]
  }

  private readonly schema: T
  private config: ConfigType<C, T> = {} as any

  private constructor(schema: T) {
    this.schema = schema
  }

  private parse(): void {
    const env = process.env
    for (const [key, value] of Object.entries(this.schema)) {
      const configKey = key as keyof T
      const envName = value.env || constantCase(key)
      this.config[configKey] = parse(env[envName], value)
    }
  }
}

export default Config
