# Pyro Config

The idea of pyro-config is the offer the **simplest** solution to load, validate and access your apps's **configuration**, following the 12-factor-app standards.

It's built with **TypeScript** and outputs the configuration **100% typed** and validated.

## Install

Using yarn

```html
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
    default: 'something',
    description: 'Test description',
  },
  numberValue: {
    type: Number,
    default: 'something',
    description: 'Test description',
  },
})

const booleanValue = config.get('booleanValue')
const stringValue = config.get('stringValue')
const numberValue = config.get('numberValue')
```

## Docs

To do
