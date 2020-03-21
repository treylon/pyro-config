// @ts-ignore
import resolve from 'rollup-plugin-node-resolve'
// @ts-ignore
import typescript from 'rollup-plugin-typescript2'
// @ts-ignore
import pkg from '../package.json'

const config = [
  {
    input: './src/index.ts',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],

    plugins: [
      resolve({
        jsnext: true,
        extensions: ['.ts'],
      }),
      typescript(),
    ],
  },

  {
    input: './src/index.ts',
    output: {
      name: 'Config',
      file: pkg.browser,
      format: 'umd',
    },

    plugins: [
      resolve({
        jsnext: true,
        extensions: ['.ts'],
      }),
      typescript({ tsconfigOverride: { compilerOptions: { target: 'es5' } } }),
    ],
  },
]

module.exports = config
