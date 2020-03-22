# Pyro Config

The idea of pyro-config is the offer the **simplest** solution to load, validate and access your apps's **configuration**, following [The 12-factor App](https://12factor.net/) standards.

It's built with **TypeScript** and outputs the configuration **100% typed** and validated.

## Install

Using yarn

```
yarn add pyro-config
```

Using npm

```
npm install pyro-config --save
```

## Get started

We create a Config instance by calling the static `create` class member with our configuration schema.

This will load the config from `process.env` then validate it.

```typescript
import Config from 'pyro-config'

const config = Config.create({
  booleanValue: {
    type: Boolean,
    default: true,
    description: 'Test description',
  },
  stringValue: {
    type: String,
    nullable: true,
    description: 'Test description',
  },
  numberValue: {
    type: Number,
    description: 'Test description',
    env: 'ANOTHER_NUMBER_VALUE',
  },
})

const booleanValue = config.get('booleanValue')
const stringValue = config.get('stringValue')
const numberValue = config.get('numberValue')
```

## Docs

Access the docs [here](https://treylon.github.io/pyro-config/).
