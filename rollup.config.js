import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import pkg from './package.json';

const input = './src/index.js';

const external = id => !id.startsWith('.') && !id.startsWith('/');

const globals = { react: 'React' };

const name = 'Rifm';

const babelOptions = {
  exclude: '**/node_modules/**',
  babelrc: false,
  presets: [['@babel/env', { loose: true }], '@babel/flow', '@babel/react'],
};

export default [
  {
    input,
    output: { file: 'dist/rifm.umd.js', format: 'umd', name, globals },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(),
      babel(babelOptions),
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
      sizeSnapshot(),
    ],
  },

  {
    input,
    output: { file: 'dist/rifm.min.js', format: 'umd', name, globals },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(),
      babel(babelOptions),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      sizeSnapshot(),
      terser(),
    ],
  },

  {
    input,
    output: { file: pkg.main, format: 'cjs' },
    external,
    plugins: [babel(babelOptions), sizeSnapshot()],
  },

  {
    input,
    output: { file: pkg.module, format: 'esm' },
    external,
    plugins: [babel(babelOptions), sizeSnapshot()],
  },

  // to check esm production size
  {
    input,
    output: { file: 'dist/rifm.esm.production.js', format: 'esm' },
    external,
    plugins: [
      babel(babelOptions),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      sizeSnapshot(),
    ],
  },
];
