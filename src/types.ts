export type SimpleConfigValue = StringConstructor | NumberConstructor | BooleanConstructor

export type CustomConfigValue = (value: string) => ReturnType<SimpleConfigValue>

export type ConfigValue = SimpleConfigValue | CustomConfigValue

export interface ConfigValueObject {
  [key: string]: SimpleConfigValue
}

export type Schema<C extends ConfigValueObject> = {
  [key in keyof C]: Attribute
}

export type ConfigType<C extends ConfigValueObject, S extends Schema<C>> = {
  [key in keyof S]: S[key]['type']
}

interface BaseAttribute<T extends SimpleConfigValue> {
  /**
   * Type of config value
   */
  type: T
  /**
   * Description of config value for better error logging
   */
  description: string
  /**
   * Name of corresponding env var
   * Default: config value key name converted to screaming snake case
   * Example: `someConfigValue` -> `SOME_CONFIG_VALUE`
   */
  env?: string
  /**
   * Default value for config value if not set
   * This will take precedence over the nullable value if set
   */
  default?: ReturnType<T>
}

interface NullableAttribute {
  /**
   * Makes a config value nullable
   * The default value takes precedence over this value
   */
  nullable?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BooleanAttribute extends BaseAttribute<BooleanConstructor> {}

export interface StringAttribute extends BaseAttribute<StringConstructor>, NullableAttribute {}

export interface NumberAttribute extends BaseAttribute<NumberConstructor>, NullableAttribute {}

export type Attribute = BooleanAttribute | StringAttribute | NumberAttribute
