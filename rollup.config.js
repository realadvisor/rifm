import fs from 'fs';
import path from 'path';
import replace from '@rollup/plugin-replace';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import gzipSize from 'gzip-size';
import * as brotliSize from 'brotli-size';
import pkg from './package.json';

const input = './src/index.js';
const external = id =>
  id.startsWith('.') === false && path.isAbsolute(id) === false;

const babelOptions = {
  babelrc: false,
  configFile: false,
  babelHelpers: 'bundled',
  presets: [
    ['@babel/preset-env', { bugfixes: true, loose: true }],
    '@babel/flow',
    '@babel/react',
  ],
};

export default [
  {
    input,
    output: { file: pkg.main, format: 'cjs' },
    external,
    plugins: [babel(babelOptions)],
  },

  {
    input,
    output: { file: pkg.module, format: 'esm' },
    external,
    plugins: [babel(babelOptions)],
  },

  // to check esm production size
  {
    input,
    output: { file: 'dist/rifm.esm.production.js', format: 'esm' },
    external,
    plugins: [
      babel(babelOptions),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      terser(),
      {
        generateBundle(outputOptions, bundle) {
          let sizeInfo = '';
          for (const [name, chunk] of Object.entries(bundle)) {
            const parsedSize = chunk.code.length;
            const gzippedSize = gzipSize.sync(chunk.code);
            const brotliedSize = brotliSize.sync(chunk.code);
            sizeInfo += `Size of ${name}
            =============================
            min: ${parsedSize} b
            gzip: ${gzippedSize} b
            brotli: ${brotliedSize} b\n`.replace(/^\s+/gm, '');
          }
          console.info(sizeInfo);
          fs.writeFileSync('size-snapshot.txt', sizeInfo, 'utf-8');
        },
      },
    ],
  },
];
